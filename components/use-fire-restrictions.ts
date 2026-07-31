"use client";

import { useEffect, useState } from "react";

type RestrictionAttributes = {
  JurisdictionalUnitName: string | null;
  RestrictionType: string | null;
};

type RestrictionResponse = {
  features?: Array<{ attributes: RestrictionAttributes }>;
  error?: { message?: string };
};

export const FIRE_MAP_URL = "https://www.mtfireinfo.org/restrictions";

const FIRE_QUERY_URL =
  "https://services2.arcgis.com/DRQySz3VhPgOv7Bo/arcgis/rest/services/Fire_Restrictions_by_Jurisdiction_Update_-_Read_Only_view/FeatureServer/2/query?f=json&where=1%3D1&geometry=-113.33945%2C46.82559&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=JurisdictionalUnitName%2CRestrictionType&returnGeometry=false";

const restrictionLabels: Record<string, string> = {
  "No Restrictions and Closures": "No restrictions shown",
  "Stage 1": "Stage 1 restrictions",
  "Stage 2": "Stage 2 restrictions",
  Closures: "Closure shown",
  "No Data": "Confirm before travel",
};

function getStatusLabel(restriction: RestrictionAttributes | null, failed: boolean) {
  if (failed || !restriction) return "Check the official map";
  return restrictionLabels[restriction.RestrictionType ?? ""] ?? "Confirm before travel";
}

export function useFireRestrictions() {
  const [restriction, setRestriction] = useState<RestrictionAttributes | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(FIRE_QUERY_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Restrictions unavailable");
        return response.json() as Promise<RestrictionResponse>;
      })
      .then((data) => {
        if (data.error || !data.features?.[0]) {
          throw new Error(data.error?.message ?? "No restriction record");
        }
        setRestriction(data.features[0].attributes);
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") setFailed(true);
      });

    return () => controller.abort();
  }, []);

  const restrictionType = restriction?.RestrictionType ?? "";
  const isUrgent =
    restrictionType === "Stage 1" ||
    restrictionType === "Stage 2" ||
    restrictionType === "Closures";

  return {
    failed,
    isLoading: !restriction && !failed,
    isUrgent,
    office: restriction?.JurisdictionalUnitName ?? "BLM Missoula Field Office",
    status: getStatusLabel(restriction, failed),
  };
}
