import "server-only";
import sampleUpdates from "./sample-updates.json";
import { isWordPressConfigured, wpFetch } from "./client";
import { toDenverISO } from "./time";
export const updateCategories = {
  road: "Road status", snow: "Snow conditions", grooming: "Trail grooming", access: "Seasonal access", fire: "Fire restrictions & danger", map: "Snowmobile trail maps", event: "Event notices", announcement: "Public announcements", seasonal: "Beargrass & seasonal updates", alert: "Visitor alerts", "land-scam": "Land-sale scam information", meeting: "Meetings & minutes",
} as const;
export type VisitorUpdate = { id: string; title: string; category: keyof typeof updateCategories; summary: string; details: string; verifiedAt?: string | null; modifiedAt?: string; expiresAt?: string | null; meetingAt?: string | null; resourceUrl?: string | null; resourceLabel?: string | null; featured: boolean; sample: boolean; stale: boolean };
type Node = { databaseId: number; title: string; modifiedGmt?: string; updateDetails?: { category?: string | string[] | null; summary?: string | null; details?: string | null; verifiedAt?: string | null; expiresAt?: string | null; meetingAt?: string | null; resourceUrl?: string | null; resourceLabel?: string | null; featureOnHomepage?: boolean; isSample?: boolean } };
const query = `query GarnetUpdates($after: String) { visitorUpdates(first: 100, after: $after, where: {status: PUBLISH}) { pageInfo { hasNextPage endCursor } nodes { databaseId title modifiedGmt updateDetails { category summary details verifiedAt expiresAt resourceUrl resourceLabel meetingAt featureOnHomepage isSample } } } }`;
function safeUrl(value?: string | null) { try { const url = new URL(value || ""); return ["https:", "http:"].includes(url.protocol) ? url.href : undefined; } catch { return undefined; } }
export async function getVisitorUpdates(): Promise<{ updates: VisitorUpdate[]; unavailable: boolean }> {
  const previewMode = !isWordPressConfigured || (process.env.NODE_ENV === "production" && (() => { try { return new URL(process.env.WORDPRESS_GRAPHQL_URL || "").hostname.endsWith(".local"); } catch { return false; } })());
  try {
    const nodes: Node[] = previewMode ? sampleUpdates : []; let after: string | null = null;
    if (!previewMode) do {
      const data: {visitorUpdates: {nodes: Node[]; pageInfo: {hasNextPage: boolean; endCursor: string}}} = await wpFetch(query, {variables:{after},tags:["visitor-updates"],revalidate:60});
      nodes.push(...data.visitorUpdates.nodes); after = data.visitorUpdates.pageInfo.hasNextPage ? data.visitorUpdates.pageInfo.endCursor : null;
    } while (after);
    const now = Date.now();
    const updates = nodes.flatMap((node): VisitorUpdate[] => {
      const fields = node.updateDetails; if (!fields?.summary) return [];
      const expiresAt = toDenverISO(fields.expiresAt); if (expiresAt && new Date(expiresAt).getTime() <= now) return [];
      const rawCategory = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      const category = rawCategory && rawCategory in updateCategories ? rawCategory as VisitorUpdate["category"] : "announcement";
      const verifiedAt = toDenverISO(fields.verifiedAt);
      const stale = ["road","snow","grooming","access","fire"].includes(category) && (!verifiedAt || new Date(verifiedAt).getTime() > now || now - new Date(verifiedAt).getTime() > 7*86400000);
      return [{id:String(node.databaseId),title:node.title,category,summary:fields.summary,details:fields.details || "",verifiedAt,expiresAt,modifiedAt:node.modifiedGmt ? toDenverISO(`${node.modifiedGmt.replace(/Z$/, "")}Z`) : undefined,meetingAt:toDenverISO(fields.meetingAt),resourceUrl:safeUrl(fields.resourceUrl),resourceLabel:fields.resourceLabel || "View source or document",featured:!!fields.featureOnHomepage,sample:!!fields.isSample,stale}];
    }).sort((a,b)=>new Date(b.verifiedAt || b.modifiedAt || 0).getTime()-new Date(a.verifiedAt || a.modifiedAt || 0).getTime());
    return {updates,unavailable:false};
  } catch(error) { console.warn("[content] Current updates unavailable:",error instanceof Error ? error.message : String(error));return {updates:[],unavailable:true}; }
}
