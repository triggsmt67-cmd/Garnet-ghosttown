export type Building = {
  slug: string;
  number: string;
  name: string;
  type: string;
  era: string;
  summary: string;
  story: string[];
  lookFor: string;
  source: string;
  sourceLabel: string;
  map: {
    left: string;
    top: string;
    width: string;
    height: string;
    rotate: string;
  };
};

export const buildings: Building[] = [
  {
    slug: "wells-hotel",
    number: "01",
    name: "J.K. Wells Hotel",
    type: "Hotel & gathering place",
    era: "Gold-boom years",
    summary:
      "The hotel is one of the clearest places to picture Garnet as a working town rather than a collection of empty cabins.",
    story: [
      "Travelers, mine workers, and salesmen needed rooms, meals, and a place to exchange news. Garnet supported several hotels during its busiest years, and the Wells became one of the town’s defining commercial buildings.",
      "Its scale makes the speed of the boom tangible. A remote gulch that had been thinly settled soon needed a substantial hotel, dining space, and beds for people arriving to work or do business.",
    ],
    lookFor:
      "Pause at the dining area and compare its generous public rooms with the much smaller miners’ cabins uphill.",
    source:
      "https://www.blm.gov/sites/default/files/docs/2021-07/THE%20ROAD%20TO%20GARNET%27S%20GOLD%20%28002%29.pdf",
    sourceLabel: "BLM · The Road to Garnet’s Gold",
    map: { left: "23%", top: "54%", width: "21%", height: "13%", rotate: "-7deg" },
  },
  {
    slug: "kellys-saloon",
    number: "02",
    name: "Kelly’s Saloon",
    type: "Saloon & social room",
    era: "Before 1898",
    summary:
      "Kelly’s predates Garnet’s 1898 peak and survived long enough to become one of the town’s most familiar landmarks.",
    story: [
      "At Garnet’s height, thirteen saloons served a population of roughly 1,000. They were places to drink, certainly, but also places to hear news, find company, and pass a winter evening.",
      "Kelly’s is often attached to Garnet’s ghost stories. The documented history is compelling on its own: a two-story commercial building that outlasted the rush that made it busy.",
    ],
    lookFor:
      "Notice the false front and the building’s position along the commercial street, close to the hotel and stores.",
    source:
      "https://www.blm.gov/sites/default/files/documents/files/magazine-national-My_Public_Lands_Magazine_Spring_2015_Web.pdf",
    sourceLabel: "BLM · My Public Lands",
    map: { left: "48%", top: "48%", width: "18%", height: "12%", rotate: "6deg" },
  },
  {
    slug: "davey-store",
    number: "03",
    name: "F.A. Davey Store",
    type: "General mercantile",
    era: "Records from 1899–1909",
    summary:
      "Davey’s shelves supplied more than groceries. The firm handled general merchandise, building materials, and farm implements.",
    story: [
      "A mining town could not run on ore alone. Stores connected Garnet to wholesalers and rail towns, bringing in food, household goods, tools, and the materials needed to keep businesses and cabins working.",
      "The surviving Davey Mercantile records include invoices, letters, checks, and ledgers. They offer an unusually practical record of what people bought and how an isolated town stayed supplied.",
    ],
    lookFor:
      "Think about the trip behind every item on the shelf: rail or wagon to the valley, then the long climb into Garnet.",
    source: "https://mhs.libraryhost.com/repositories/2/resources/1370",
    sourceLabel: "Montana Historical Society archives",
    map: { left: "32%", top: "36%", width: "17%", height: "11%", rotate: "-4deg" },
  },
  {
    slug: "schoolhouse",
    number: "04",
    name: "Garnet Schoolhouse",
    type: "One-room school",
    era: "Current building: 1937–38",
    summary:
      "The schoolhouse is evidence that Garnet was home to families, not only miners passing through for a season.",
    story: [
      "Garnet opened its first school during the 1890s boom. The one-room building standing today came later, in 1937–38, during a smaller revival of mining activity.",
      "Attendance rose and fell with the mines. Oral histories preserved by the University of Montana record children skiing in winter, playing through the summer, and attending school in this remote town.",
    ],
    lookFor:
      "Look at the room’s scale and imagine one teacher working with children of several ages through a Garnet winter.",
    source: "https://scholarworks.umt.edu/garnet_oralhistory/5/",
    sourceLabel: "University of Montana oral history",
    map: { left: "62%", top: "24%", width: "18%", height: "11%", rotate: "8deg" },
  },
  {
    slug: "dahl-cabin",
    number: "05",
    name: "Dahl Cabin",
    type: "Home & winter rental",
    era: "Built in 1938",
    summary:
      "A family cabin during Garnet’s later years, the Dahl now gives winter visitors a rare overnight stay inside the townsite.",
    story: [
      "The Dahl belongs to Garnet’s later chapter, when higher gold prices brought limited mining activity back to the mountains. Its small rooms show how spare daily life remained.",
      "Today the BLM rents the primitive cabin from December through April. It sleeps up to six, uses wood heat and propane light, and has no electricity or indoor plumbing.",
    ],
    lookFor:
      "Compare the cabin’s compact footprint with the commercial buildings below, then picture reaching it only by ski, snowshoe, or snowmobile.",
    source: "https://garnetghosttown.org/cabin-rentals.php",
    sourceLabel: "Official winter cabin information",
    map: { left: "68%", top: "62%", width: "16%", height: "10%", rotate: "-9deg" },
  },
];

export function getBuilding(slug: string) {
  return buildings.find((building) => building.slug === slug);
}
