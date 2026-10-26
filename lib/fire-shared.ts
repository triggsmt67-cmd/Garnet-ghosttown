// Fire-restriction values safe to import from client components.
// Server-side fetching lives in lib/fire.ts.

export const FIRE_MAP_URL =
  "https://mtdnrc.maps.arcgis.com/apps/dashboards/86668bab4c2248f09c1b70b546bff420#";

export const FIRE_JURISDICTION_LABEL = "Missoula County";

// Neutral initial state while the live restriction check streams in.
export const pendingFireStatus: FireStatus = {
  status: "Check the official map",
  isUrgent: false,
  jurisdiction: FIRE_JURISDICTION_LABEL,
  failed: true,
};

export type FireStatus = {
  /** Visitor-facing label, e.g. "Stage 2 restrictions" */
  status: string;
  isUrgent: boolean;
  /** Jurisdiction named by the data source, or our configured label */
  jurisdiction: string;
  failed: boolean;
};
