// Local design-review selections. These are not WordPress records.
// Keep the view models separate so a WordPress adapter can replace this data.
import type { GalleryAlbum, GalleryPhoto } from "./gallery-types";
const photo = (filename: string, caption: string): GalleryPhoto => ({ id: filename, src: `/images/${filename}`, alt: caption, caption });
const historic = photo("Home-Top-Banner.webp", "An archival view of Garnet’s main street and hillside.");
const street = photo("Home-Main-Street2.webp", "People and horse-drawn wagons along Garnet’s historic street.");
const mining = photo("About-Early-Mining.webp", "Mining structures and cabins on a wooded mountainside.");
const miners = photo("About-Early-Mining2.webp", "A group gathered beside mining equipment and timber buildings.");
const interior = photo("Home-Building-Interior.webp", "A wooden staircase and patterned wallpaper inside a preserved building.");
const details = photo("Explore-Building-Details.webp", "An old wagon wheel and timber framing inside a Garnet building.");
const cabin = photo("Preserve-Building-Restoration.webp", "A small log cabin among the evergreens.");
const meadow = photo("Explore-Historic-Street.webp", "Wooden buildings beside a grassy meadow and forest.");
const community = photo("AAbout-Community-LIfe.webp", "People gathered outside a false-front building in an archival photograph.");
const gathering = photo("About-Growing-Town.webp", "An archival group portrait outside a timber building.");
const family = photo("History-family-cabin.webp", "A cabin surrounded by winter snow.");
const school = photo("Events-Schoolchildren.webp", "Visitors beside Garnet’s white wooden schoolhouse.");
const spring = photo("Home-Season-Guide-Spring.webp", "Fog settling among Garnet’s cabins and evergreen trees.");
const summer = photo("Home-Seasonal-Guide-Summer.webp", "Garnet’s townsite surrounded by green forest in summer.");
const autumn = photo("Home-Season-Guide-Autumn.webp", "Golden autumn trees behind Garnet’s wooden buildings.");
const winter = photo("Home-Seasonal-Guide-Winter.webp", "Snow covering Garnet’s street and cabins.");
const preservation = photo("About-Preservation.webp", "Weathered timber walls and a shingled cabin roof.");
const stairs = photo("getinvolved-donations-staircaseinhotel.webp", "A preserved interior staircase at Garnet.");
const event = photo("Event-Top-Banner.webp", "Visitors gathered among Garnet’s buildings and outdoor tents.");
const volunteers = photo("Getinvolved-volunteer.webp", "A group in period clothing gathered outside a Garnet building.");
const music = photo("getinvolved-volunteer2.webp", "Musicians in period clothing holding their instruments.");

const previewAlbums: Array<Omit<GalleryAlbum, "photoCount" | "sample" | "pageInfo" | "order">> = [
  { slug: "historic-garnet", title: "Historic Garnet", description: "Streets, mining scenes, and faces from the photographic record.", cover: historic, photos: [historic, street, mining, miners] },
  { slug: "buildings-and-interiors", title: "Buildings & Interiors", description: "Weathered wood, worn thresholds, and the details still waiting inside.", cover: interior, photos: [interior, meadow, details, cabin] },
  { slug: "life-in-garnet", title: "Life in Garnet", description: "A closer look at the people, gathering places, and everyday settings of the town.", cover: gathering, photos: [gathering, community, family, school] },
  { slug: "the-seasons", title: "The Seasons", description: "One mountain town, seen through fog, summer green, autumn gold, and snow.", cover: autumn, photos: [spring, summer, autumn, winter] },
  { slug: "preserving-garnet", title: "Preserving Garnet", description: "The buildings and small details that make this place worth caring for.", cover: preservation, photos: [preservation, cabin, stairs, details] },
  { slug: "events-and-gatherings", title: "Events & Gatherings", description: "Music, living history, and people coming together at the townsite.", cover: event, photos: [event, volunteers, music, school] },
];

export const galleryAlbums: GalleryAlbum[] = previewAlbums.map((album, index) => ({ ...album, photoCount: album.photos.length, sample: true, order: index + 1, pageInfo: { hasNextPage: false, endCursor: null } }));
