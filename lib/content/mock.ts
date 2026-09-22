import type { GarnetEvent, GarnetStory, TimelineEntry, VisitorStatus } from "./types";

// Used only while WORDPRESS_GRAPHQL_URL is unset (local development and design
// review). Contains verified facts only — no invented events.

export const mockEvents: GarnetEvent[] = [
  {
    id: "mock-step-back-in-time-2026",
    title: "Step Back in Time",
    startDate: "2026-09-12T12:30:00-06:00",
    homepageSummary:
      "Meet Garnet's 1917 residents inside five historic buildings, then stay for a chili feed, live music, and a street dance. Event ticket is separate from the standard day pass.",
    description:
      "Meet Garnet's 1917 residents inside five historic buildings, then stay for a chili feed, live music, and a street dance. Costumed interpreters bring the mining era to life in ways no sign ever could.",
    price: 20,
    priceNote: "Ages 12 and younger are free",
    detailsUrl: "https://main.glaciermt.io/montana-event/52870",
    featureOnHomepage: true,
    status: "scheduled",
    registrationRequired: false,
  },
];

/** Built per request so the sample never trips the stale-report safeguard. */
export function getMockVisitorStatus(): VisitorStatus {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  return {
    roadStatus: "Wheeled access open",
    roadNote: "Highway 200 route recommended",
    lastVerified: yesterday,
    tone: "open",
    isSample: true,
  };
}

export const mockTimeline: TimelineEntry[] = [
  {
    id: "mock-1860s",
    yearLabel: "1860s",
    sortYear: 1860,
    title: "Gold in the gulches",
    summary:
      "Placer miners work the streams of the Garnet Mountains, washing gravel for free-floating gold.",
  },
  {
    id: "mock-1895",
    yearLabel: "1895",
    sortYear: 1895,
    title: "A town takes shape",
    summary:
      "Dr. Armistead Mitchell builds a stamp mill at the head of First Chance Gulch. A settlement grows around it.",
  },
  {
    id: "mock-1898",
    yearLabel: "1898",
    sortYear: 1898,
    title: "The height of the boom",
    summary:
      "Nearly 1,000 people live in Garnet, supported by hotels, stores, a school, livery stables, and thirteen saloons.",
  },
  {
    id: "mock-1898-kelly",
    yearLabel: "1898",
    sortYear: 1898,
    title: "L.P. Kelly buys the Bob Moore Saloon",
    summary:
      "Kelly pays Robert Moore $1,500 for the two-story saloon on Main Street, and his family moves into the apartment upstairs.",
    relatedStory: { slug: "kellys-saloon-and-residence", title: "Kelly’s Saloon and Residence" },
  },
  {
    id: "mock-1904-adams",
    yearLabel: "1904",
    sortYear: 1904,
    title: "The Adams family settles in Garnet",
    summary:
      "Samuel Adams returns from Pennsylvania with his new wife, Jennie. The family will call Garnet home until 1927.",
    relatedStory: { slug: "samuel-and-jennie-adams", title: "Samuel and Jennie Adams" },
  },
  {
    id: "mock-1905",
    yearLabel: "1905",
    sortYear: 1905,
    title: "Gold becomes harder to reach",
    summary:
      "Many mines are abandoned and the population falls to roughly 150. A 1912 fire later destroys much of the business district.",
  },
  {
    id: "mock-1940s",
    yearLabel: "1940s",
    sortYear: 1940,
    title: "A ghost town",
    summary:
      "War work draws residents away again. Cabins, furnishings, and commercial buildings are left behind in the mountains.",
  },
  {
    id: "mock-today",
    yearLabel: "Today",
    sortYear: 9999,
    title: "A story kept standing",
    summary:
      "The Bureau of Land Management and Garnet Preservation Association stabilize buildings and interpret the town for new generations.",
  },
];

// Client-supplied stories (lightly copyedited). Used as sample content until
// WordPress is connected; the same text is in wordpress/story-paste-sheet.md.
export const mockStories: GarnetStory[] = [
  {
    id: "mock-kellys-saloon",
    slug: "kellys-saloon-and-residence",
    title: "Kelly’s Saloon and Residence",
    storyType: "place",
    timeFrame: "1898 – late 1930s",
    startYear: 1898,
    leadIn:
      "Kelly’s Saloon offers a rare look at how a saloon owner’s family lived in late-19th-century Garnet.",
    bodyHtml: [
      "<p>Kelly’s Saloon is a two-story, false-front building on Garnet’s Main Street. Built before the 1898 gold boom, it was originally known as the Bob Moore Saloon. In October 1898, L.P. Kelly bought it from Robert Moore for $1,500. After Kelly sold a partial interest, it became the Kelly and Fraser Saloon.</p>",
      "<p>The Kelly family lived in the apartment above the saloon. It had two bedrooms and one large room with a kitchen range, cupboards, a table and chairs, a couch, and several rocking chairs.</p>",
      "<p>Garnet’s saloons were for men; women and children rarely went inside. So visitors calling on Mrs. Kelly announced themselves at the outside staircase and climbed the stairs to her apartment.</p>",
      "<p>Frank Fitzgerald, a longtime Garnet resident, remembered visiting Mrs. Kelly with his mother when he was a small boy, and being served a glass of beer.</p>",
      "<p>During Prohibition, the entire building became the family’s home. The Kellys left Garnet in the 1930s. The building has been the focus of extensive preservation work over the years, and descendants of the Kelly family return to Garnet and take part in Garnet Day activities.</p>",
    ].join("\n"),
    voice: {
      quote:
        "I can remember holding this big glass, it seemed big to me. My hands wouldn’t go all the way around it and I can remember drinking that beer and I like beer pretty well and I can remember that real well, ’cause I know I spilled some of the beer and was kidded about being drunk.",
      speaker: "Frank Fitzgerald, longtime Garnet resident",
    },
    mapBuilding: "kellys-saloon",
  },
  {
    id: "mock-adams",
    slug: "samuel-and-jennie-adams",
    title: "Samuel and Jennie Adams",
    storyType: "family",
    timeFrame: "1904–1927",
    startYear: 1904,
    leadIn:
      "The Adams family’s story is one of prosperity, success, and the kind of sadness felt by many mining families in Garnet.",
    bodyHtml: [
      "<p>Samuel Adams came west from Pennsylvania with his friend Pete Shipler to seek his fortune in Montana. He bought and opened the Adams Mercantile and partnered with Shipler in mining at Copper Cliff and other locations. In 1904, Samuel returned to Pennsylvania and married Jennie Starr.</p>",
      "<p>After a short time in Missoula, the couple settled in Garnet. Thanks to Samuel’s mining interests and other ventures, the Adams house was considered one of the nicest homes in town, second only to the more elegant Sam Ritchie home. It stood at the top of the hill above town: a three-room log house covered in yellow drop siding, with a white picket fence and an organ and plants in the parlor. Jennie Adams served as Garnet’s postmistress in the early 1900s.</p>",
      "<p>The family knew loss. Their son Samuel Jr. was born and died in 1906. Their daughter Mary Agnes was born in 1909 and lived until 1912. Mary Jane Adams was born on March 2, 1917, at St. Patrick’s Hospital in Missoula.</p>",
      "<p>Mary Jane remembered Christmas in Garnet as a special treat. Her father trimmed the tree with candles clipped to the ends of the branches, lighting two or three so she could see them before putting them out because of the fire danger. Strings of popcorn finished the decorations. She also remembered picnics at Warren Park and the gardens the family grew.</p>",
      "<p>The Adams family lived in Garnet from 1904 to 1927, moving to Missoula when Mary Jane was 10. She married Alan Morin, raised two sons, and ran a boarding house in Missoula, where Garnet’s blacksmith, Billie Liberty, was one of her boarders. Starting in the 1940s, she returned to spend many summer days in Garnet, and for years she came up for Garnet Appreciation Day, where she was well known and well liked.</p>",
    ].join("\n"),
  },
];
