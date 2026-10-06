import "server-only";
import { isWordPressConfigured, wpFetch } from "./client";
import type { ContentImage } from "./types";

export type BoardMember = { id: string; name: string; role: string; bio: string; photo?: ContentImage; order: number; placeholder?: boolean };
const placeholders: BoardMember[] = [1, 2, 3].map((number) => ({
  id: `placeholder-${number}`, name: "Board member name", role: "Role to come",
  bio: "A short introduction will share this member’s background and involvement with Garnet. Name, role, and biography will be added after the board provides them.",
  photo: { url: `/images/board/placeholder-${number}.svg`, alt: "Placeholder portrait silhouette" },
  order: number, placeholder: true,
}));
const query = `query GarnetBoardMembers {
  boardMembers(first: 100, where: { status: PUBLISH }) { nodes {
    databaseId title
    featuredImage { node { sourceUrl altText mediaDetails { width height } } }
    boardDetails { role shortBio displayOrder }
  } }
}`;
type Response = { boardMembers?: { nodes: Array<{ databaseId: number; title: string; featuredImage?: { node?: { sourceUrl: string; altText?: string; mediaDetails?: { width?: number; height?: number } } }; boardDetails?: { role?: string; shortBio?: string; displayOrder?: number } }> } };
export async function getBoardMembers(): Promise<BoardMember[]> {
  if (!isWordPressConfigured) return placeholders;
  const data = await wpFetch<Response>(query, { tags: ["board-members"] });
  const members = (data.boardMembers?.nodes ?? []).map((member): BoardMember => {
    const photo = member.featuredImage?.node;
    return { id: String(member.databaseId), name: member.title, role: member.boardDetails?.role ?? "Board member", bio: member.boardDetails?.shortBio ?? "", order: member.boardDetails?.displayOrder ?? 0,
      photo: photo?.sourceUrl ? { url: photo.sourceUrl, alt: photo.altText || member.title, width: photo.mediaDetails?.width, height: photo.mediaDetails?.height } : undefined };
  });
  return members.length ? members.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name)) : placeholders;
}
