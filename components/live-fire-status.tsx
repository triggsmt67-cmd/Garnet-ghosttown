import { getFireStatus } from "@/lib/fire";
import { FireStatusBar } from "./fire-status-bar";
import { FireRestrictionsCard } from "./fire-restrictions-card";

export async function LiveFireStatusBar() {
  return <FireStatusBar fire={await getFireStatus()} />;
}

export async function LiveFireRestrictionsCard() {
  return <FireRestrictionsCard fire={await getFireStatus()} compact />;
}
