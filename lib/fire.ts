import "server-only";

/**
 * Fire restrictions from Montana DNRC's public ArcGIS layer.
 *
 * JURISDICTION DECISION (2026-09-22): Garnet sits near the Granite/Missoula
 * county line. The site owner confirmed Missoula County restrictions are the
 * ones that govern Garnet visitors, so we query a point inside Missoula County
 * on the Garnet access corridor rather than the townsite coordinates. The UI
 * names the jurisdiction explicitly so it is never presented as a reading taken
 * at the townsite itself. Revisit if the governing jurisdiction changes.
 *
 * Fetched on the server and cached, so visitors never call ArcGIS directly and
 * the page renders with the status already filled in.
 */

import { FIRE_JURISDICTION_LABEL, type FireStatus } from "./fire-shared";

export { FIRE_JURISDICTION_LABEL, FIRE_MAP_URL, type FireStatus } from "./fire-shared";

const QUERY_POINT = { longitude: -113.5, latitude: 46.82559 } as const;

const FIRE_QUERY_URL =
  "https://services2.arcgis.com/DRQySz3VhPgOv7Bo/arcgis/rest/services/" +
  "Fire_Restrictions_by_Jurisdiction_Update_-_Read_Only_view/FeatureServer/2/query?" +
  new URLSearchParams({
    f: "json",
    where: "1=1",
    geometry: `${QUERY_POINT.longitude},${QUERY_POINT.latitude}`,
    geometryType: "esriGeometryPoint",
    inSR: "4326",
    spatialRel: "esriSpatialRelIntersects",
    outFields: "JurisdictionalUnitName,RestrictionType",
    returnGeometry: "false",
  }).toString();

const REVALIDATE_SECONDS = 15 * 60;

type RestrictionAttributes = {
  JurisdictionalUnitName: string | null;
  RestrictionType: string | null;
};

type RestrictionResponse = {
  features?: Array<{ attributes: RestrictionAttributes }>;
  error?: { message?: string };
};

const restrictionLabels: Record<string, string> = {
  "No Restrictions and Closures": "No restrictions shown",
  "Stage 1": "Stage 1 restrictions",
  "Stage 2": "Stage 2 restrictions",
  Closures: "Closure shown",
  "No Data": "Confirm before travel",
};

const URGENT = new Set(["Stage 1", "Stage 2", "Closures"]);

const failedStatus: FireStatus = {
  status: "Check the official map",
  isUrgent: false,
  jurisdiction: FIRE_JURISDICTION_LABEL,
  failed: true,
};

export async function getFireStatus(): Promise<FireStatus> {
  try {
    const response = await fetch(FIRE_QUERY_URL, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["fire-restrictions"] },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = (await response.json()) as RestrictionResponse;
    const attributes = data.features?.[0]?.attributes;
    if (data.error || !attributes) {
      throw new Error(data.error?.message ?? "No restriction record");
    }

    const type = attributes.RestrictionType ?? "";
    return {
      status: restrictionLabels[type] ?? "Confirm before travel",
      isUrgent: URGENT.has(type),
      jurisdiction: attributes.JurisdictionalUnitName?.trim() || FIRE_JURISDICTION_LABEL,
      failed: false,
    };
  } catch (error) {
    console.error("[fire] Restrictions unavailable", error);
    return failedStatus;
  }
}
