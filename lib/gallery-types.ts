export type GalleryPhoto = { id: string; src: string; alt: string; caption: string; credit?: string; width?: number; height?: number };
export type GalleryPageInfo = { hasNextPage: boolean; endCursor: string | null };
export type GalleryAlbum = { slug: string; title: string; description: string; cover: GalleryPhoto; photos: GalleryPhoto[]; photoCount: number; sample: boolean; pageInfo: GalleryPageInfo; order: number };
