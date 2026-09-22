import type { GarnetStory } from "./types";

// Client-supplied stories, lightly copyedited. Used as sample content when
// WordPress isn't connected. The same text, field by field, is in
// wordpress/story-paste-sheet.md along with open questions for the client.

const p = (...paragraphs: string[]) => paragraphs.map((t) => `<p>${t}</p>`).join("\n");
const excerpt = (cite: string, ...paragraphs: string[]) =>
  `<blockquote>${p(...paragraphs)}</blockquote>\n<p class="excerpt-cite">— ${cite}</p>`;
const h3 = (text: string) => `<h3>${text}</h3>`;

const BLM_ROAD_TO_GARNET =
  "https://www.blm.gov/sites/default/files/docs/2021-07/THE%20ROAD%20TO%20GARNET%27S%20GOLD%20%28002%29.pdf";

export const mockStories: GarnetStory[] = [
  {
    id: "mock-leshou",
    slug: "john-leshou",
    title: "John Leshou",
    storyType: "person",
    timeFrame: "1873",
    startYear: 1873,
    leadIn:
      "John Leshou left a war-torn homeland, crossed the “Bloody Bozeman” Trail, and built a fortune in the Garnet mining district.",
    bodyHtml: [
      p(
        "John Leshou was born in Holstein, Germany, in 1840. Like many of his countrymen, he left to escape ongoing war, most likely sailing from Hamburg, and eventually settled in Iowa, home to a large German community.",
        "He worked as a bullwhacker, driving ox teams, and was eventually asked to bring a team of oxen and supplies west to Montana’s Bitterroot Valley on the Bozeman Trail. The route earned the name “Bloody Bozeman”: it cut through the territory of the Lakota, Cheyenne, and Arapaho, who fought to defend it, and many travelers died along the way. The survivors reached Fort Owen in the Bitterroot Valley.",
        "Prospectors passing through spoke of gold on Bear Creek, a two-day ride away. Leshou made his way to Beartown, where he opened a trading post and served as postmaster. He and his friend Charles Kroger were invited to dinner in Deer Lodge to meet two sisters from his hometown in Holstein. In 1873, John married Dora Rusch, and Charles married her sister. John and Dora raised their three children in Beartown.",
        "Leshou and Kroger decided to mine farther up the gulch, in the area that would become Garnet. They bought a claim in 1873, the first claim surveyed in the headwaters of what became the Garnet district. They found gold: according to geologist J.T. Pardee, the claim yielded $240,000.",
        "In 1892, John began buying hundreds of acres of land along Grant Creek, along with water rights. In 1900 he became president of the Western Montana National Bank on Higgins Street in Missoula. He died in 1921, and he and Dora are buried in the Missoula Cemetery. Several miners are buried near them; it is said John paid for their burials when their luck didn’t pan out.",
      ),
    ].join("\n"),
  },
  {
    id: "mock-neuman",
    slug: "philip-neuman",
    title: "Philip Neuman",
    storyType: "person",
    timeFrame: "1895",
    startYear: 1895,
    leadIn:
      "Philip Neuman’s story is one of love, craftsmanship, and heartbreak, and the unfinished house he left behind became known as Garnet’s “Gingerbread House.”",
    bodyHtml: p(
      "Philip Neuman was born in Buffalo, New York, in 1864 and arrived in the Garnet area in his early thirties. He owned a large steam-powered sawmill on Anderson Hill, near Garnet, that supplied lumber for the town’s buildings, mines, and mills.",
      "Philip fell in love with a woman from a red-light district and set out to build her a home. Townsfolk called it the “Gingerbread House.” No detail of its design or construction was too small. He hauled a piano up the steep grade and bought a new Majestic range from the Missoula Mercantile so his bride would have every luxury.",
      "Before the house was finished, she took the stage to Helena and never returned. Philip stopped construction and lived alone in the unfinished house. He died of influenza in Philipsburg at the age of 56.",
      "Philip also built the Joseph Fitzgerald house up Dublin Gulch, the only house in Garnet with a concrete foundation, and a showcase of his design and craftsmanship. The Gingerbread House was destroyed by arson in 1971.",
    ),
    source: { label: "BLM, The Road to Garnet’s Gold", url: BLM_ROAD_TO_GARNET },
  },
  {
    id: "mock-kellys-saloon",
    slug: "kellys-saloon-and-residence",
    title: "Kelly’s Saloon and Residence",
    storyType: "place",
    timeFrame: "1898 – late 1930s",
    startYear: 1898,
    leadIn:
      "Kelly’s Saloon offers a rare look at how a saloon owner’s family lived in late-19th-century Garnet.",
    bodyHtml: p(
      "Kelly’s Saloon is a two-story, false-front building on Garnet’s Main Street. Built before the 1898 gold boom, it was originally known as the Bob Moore Saloon. In October 1898, L.P. Kelly bought it from Robert Moore for $1,500. After Kelly sold a partial interest, it became the Kelly and Fraser Saloon.",
      "The Kelly family lived in the apartment above the saloon. It had two bedrooms and one large room with a kitchen range, cupboards, a table and chairs, a couch, and several rocking chairs.",
      "Garnet’s saloons were for men; women and children rarely went inside. So visitors calling on Mrs. Kelly announced themselves at the outside staircase and climbed the stairs to her apartment.",
      "Frank Fitzgerald, a longtime Garnet resident, remembered visiting Mrs. Kelly with his mother when he was a small boy, and being served a glass of beer.",
      "During Prohibition, the entire building became the family’s home. The Kellys left Garnet in the 1930s. The building has been the focus of extensive preservation work over the years, and descendants of the Kelly family return to Garnet and take part in Garnet Day activities.",
    ),
    voice: {
      quote:
        "I can remember holding this big glass, it seemed big to me. My hands wouldn’t go all the way around it and I can remember drinking that beer and I like beer pretty well and I can remember that real well, ’cause I know I spilled some of the beer and was kidded about being drunk.",
      speaker: "Frank Fitzgerald, longtime Garnet resident",
    },
    mapBuilding: "kellys-saloon",
  },
  {
    id: "mock-warren",
    slug: "edward-brook-warren",
    title: "Edward Brook Warren",
    storyType: "person",
    timeFrame: "1898",
    startYear: 1898,
    leadIn:
      "A life defined by perseverance, community, and the thrill of discovery: Edward Warren went from a struggling Butte salesman to one of Garnet’s most cherished miners and residents.",
    bodyHtml: [
      p(
        "Edward Brook Warren was born on February 2, 1861, in Ontario, Canada, and came to the United States in 1882. He settled in Butte, married, and ran a boarding house with his wife. After a divorce, he moved to Garnet.",
        "In October 1898, the <em>Butte Daily Post</em> reported on his change of fortune:",
      ),
      excerpt(
        "<em>Butte Daily Post</em>, October 6, 1898",
        "<strong>As a Life Insurance Agent, He Was a Failure, but as a Prospector, He Is About to Realize on His Stock of Energy—Struck It Rich Near Garnet.</strong>",
        "Edward B. Warren has encountered a body of rich free milling gold ore in one of his claims near Garnet, and no one who knows him will be sorry to hear of his good fortune. Mr. Warren was formerly a resident of Butte. While here, he has followed two occupations, that of life insurance agent and salesman in a shoe store, but in neither following did he acquire a sufficient amount of worlds goods to enable him to rest comfortably on Easy Street the balance of his days.",
        "Last January he concluded that telling a man how much money he would have coming to him after he died was not the business for which he had been created and, like a race horse going over the first hurtle, he leaped the job and struck out for Garnet with nothing on which to operate save a prospector’s pick, a shoemaker’s last and a bottomless shaft of pluck.",
        "On arriving at his destination, he opened a shoe store, but about the time ‘things began to come his way’ the place caught fire and burned down. All of his stock of shoes was destroyed, as was also the last, but the pick and his pluck were saved. With these he began to prospect and in a short time had located several claims he considered good. On July 4, he discovered the one on which he made the strike. In view of the fact it was found on the Nation’s Day, he called it the National. Ben Mount, a well-known mining man of that section, has an interest in the property. The vein is about several feet in width and has every appearance of being a true fissure of the high-pressure brand. Liberal offers have already been made for the property by men of means, but there is no prospect of a sale just now.",
      ),
      p(
        "Warren’s cabin was tucked into the forest a little over a mile from town, toward the north side of the mountain range.",
      ),
    ].join("\n"),
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
    bodyHtml: p(
      "Samuel Adams came west from Pennsylvania with his friend Pete Shipler to seek his fortune in Montana. He bought and opened the Adams Mercantile and partnered with Shipler in mining at Copper Cliff and other locations. In 1904, Samuel returned to Pennsylvania and married Jennie Starr.",
      "After a short time in Missoula, the couple settled in Garnet. Thanks to Samuel’s mining interests and other ventures, the Adams house was considered one of the nicest homes in town, second only to the more elegant Sam Ritchie home. It stood at the top of the hill above town: a three-room log house covered in yellow drop siding, with a white picket fence and an organ and plants in the parlor. Jennie Adams served as Garnet’s postmistress in the early 1900s.",
      "The family knew loss. Their son Samuel Jr. was born and died in 1906. Their daughter Mary Agnes was born in 1909 and lived until 1912. Mary Jane Adams was born on March 2, 1917, at St. Patrick’s Hospital in Missoula.",
      "Mary Jane remembered Christmas in Garnet as a special treat. Her father trimmed the tree with candles clipped to the ends of the branches, lighting two or three so she could see them before putting them out because of the fire danger. Strings of popcorn finished the decorations. She also remembered picnics at Warren Park and the gardens the family grew.",
      "The Adams family lived in Garnet from 1904 to 1927, moving to Missoula when Mary Jane was 10. She married Alan Morin, raised two sons, and ran a boarding house in Missoula, where Garnet’s blacksmith, Billie Liberty, was one of her boarders. Starting in the 1940s, she returned to spend many summer days in Garnet, and for years she came up for Garnet Appreciation Day, where she was well known and well liked.",
    ),
    relatedStories: [
      { slug: "edward-brook-warren", title: "Edward Brook Warren", timeFrame: "1898" },
    ],
  },
  {
    id: "mock-seadin",
    slug: "the-seadin-family",
    title: "The Seadin Family",
    storyType: "family",
    timeFrame: "1905–1939",
    startYear: 1905,
    leadIn:
      "The Seadin family was among the many immigrant families who came to Garnet seeking opportunity and made their lives in this remote mining town.",
    bodyHtml: [
      p(
        "Nels and Lena Seadin were Swedish immigrants who came to Garnet in 1905. Nels was a miner, and over the years the family moved away from Garnet many times, following work. In 1930 they returned for the last time, and Nels served as Garnet’s postmaster until his death in 1939.",
      ),
      h3("Tor Seadin"),
      p(
        "Tor, the Seadins’ son, was born in Garnet and graduated from high school in Missoula. In 1923 he enrolled at the School of Mines in Butte, which specialized in science and engineering. He spent the summer before classes began working at the Elm Orlu mine in Butte, where he was killed in a mine explosion.",
      ),
      h3("Margaret Seadin"),
      p(
        "Margaret, the Seadins’ daughter, was also born in Garnet. She was born with spina bifida and used a wheelchair throughout her life. With her bouncing blonde curls, she was adored by the whole town. She died of complications of her condition at 25.",
      ),
    ].join("\n"),
    source: {
      label:
        "Family information and photos courtesy of Sharon Seadin Baldwin, granddaughter of Nels and Lena Seadin",
    },
  },
  {
    id: "mock-toole",
    slug: "john-h-toole",
    title: "John H. Toole",
    storyType: "person",
    timeFrame: "1936",
    startYear: 1936,
    leadIn:
      "As a teenager in the 1930s, John “Johnny” Toole saw Garnet change from a bustling mining town into the quiet place it would become.",
    bodyHtml: [
      p(
        "John H. Toole was born in Missoula in 1919 and grew up there, though for a time the Toole family also had a home up Dublin Gulch. “Johnny,” as he was called, spent his teenage years working his family’s mines in the Douglas Creek and Top O’Deep area and in Garnet.",
        "He played accordion and guitar in a band that often performed in Garnet in the 1930s, alongside fiddle and banjo players. They played ragtime, jazz, waltzes, polkas, and schottisches. Toole described the scene in the bar around midnight:",
      ),
      excerpt(
        "John H. Toole",
        "Many (in the bar) were veterans of World War I. It became a ritual that, at midnight, we would play “My Buddy,” the poignant song of death in the trenches sixteen years before. Everybody would rise, heads bowed, and silently gaze at the floor. The song would end; a miner would boom out, “Parlez vous!” and we would launch into the rollicking “Mademoiselle from Armentières.” The miners would sail across the floor yelling Hi-Yee Hi-Yee Hi-Yee! and the old hall would begin to shake and sway again. Was there an economic collapse in America? At this moment of the blending of rhythm, music and pure mountain air, these superbly strong people were happily unaware of it.",
      ),
      p(
        "By 1936, Garnet had changed. Toole was visiting the Circle W, a dude ranch owned by the Weisel family, when the guests decided to see the “ghost town” of Garnet. John Weisel and Toole drove a Model A Ford over the rough old mining road from Greenough Hill past Coloma and down into Garnet to scout the trip before the guests followed. Toole described that visit:",
      ),
      excerpt(
        "John H. Toole",
        "Garnet was beginning a new relapse into a long sleep. Upon our entry into town, Mr. Davey came out in the street and greeted us, but the throng of miners had diminished; the mines had proved to be poorer than anticipated and jobs were more plentiful in the county. Nevertheless, I rounded up some musicians for a dance, and in a couple of days the Weisel pack string and guests arrived. There was the usual exploration of the old buildings, the fruitless efforts involved in panning for gold and ‘oohing’ and ‘ahhing’ over Mr. Davey’s inventory. In 1936 this inventory was Garnet’s most intriguing attraction.",
      ),
    ].join("\n"),
    mapBuilding: "davey-store",
  },
];
