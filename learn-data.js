/* ============================================================
   LEARN-DATA.JS
   Content for the "Briefing Room" political geography module.
   Self-contained — does not read or write anything from data.js
   or app.js, so the existing Explore/Dashboard/Map/Game tabs are
   untouched.
   ============================================================ */

const LEARN_SYSTEMS = [
  {
    id: "presidential",
    name: "Presidential Republic",
    tag: "Executive",
    def: "One person is both head of state and head of government, elected separately from the legislature and serving a fixed term regardless of legislative confidence.",
    trait: "Strict separation of powers — the executive can't be removed by a simple parliamentary vote, and can't dissolve the legislature either.",
    examples: ["United States", "Brazil", "Indonesia", "Nigeria", "Argentina", "South Korea"]
  },
  {
    id: "parliamentary-rep",
    name: "Parliamentary Republic",
    tag: "Executive",
    def: "A prime minister, drawn from and accountable to the legislature, runs the government day to day, while a separate president holds a largely ceremonial role.",
    trait: "The head of government can fall on a vote of no confidence, without needing an election for head of state.",
    examples: ["Germany", "India", "Italy", "Ireland", "Israel"]
  },
  {
    id: "constitutional-monarchy",
    name: "Constitutional Monarchy",
    tag: "Executive",
    def: "A hereditary monarch is head of state within limits set by a constitution, while an elected prime minister and parliament hold real governing power.",
    trait: "The crown reigns; it does not rule. Royal assent to laws is a formality in almost every case.",
    examples: ["United Kingdom", "Japan", "Spain", "Sweden", "Thailand", "Morocco"]
  },
  {
    id: "absolute-monarchy",
    name: "Absolute Monarchy",
    tag: "Executive",
    def: "A monarch holds sweeping, largely unchecked executive, legislative, and often judicial authority, with no binding constitution limiting the throne.",
    trait: "Succession, not election, is the mechanism for choosing the head of state and, in practice, much of the government.",
    examples: ["Saudi Arabia", "Oman", "Eswatini", "Brunei"]
  },
  {
    id: "semi-presidential",
    name: "Semi-Presidential Republic",
    tag: "Executive",
    def: "Executive power is split: a directly elected president handles areas like foreign policy and defense, while a prime minister — answerable to parliament — runs domestic affairs.",
    trait: "Can produce 'cohabitation,' where the president and prime minister come from opposing parties.",
    examples: ["France", "Russia", "Egypt", "Taiwan", "Portugal"]
  },
  {
    id: "one-party",
    name: "One-Party State",
    tag: "Party system",
    def: "A single political party is constitutionally or practically the only one permitted to hold power, controlling the state apparatus without competitive multi-party elections.",
    trait: "Political competition, where it exists, happens inside the party rather than between rival parties.",
    examples: ["China", "Vietnam", "Cuba", "Eritrea", "Laos"]
  },
  {
    id: "federal",
    name: "Federal System",
    tag: "Territorial power",
    def: "Sovereignty is constitutionally divided between a national government and constituent states or provinces, each with its own protected sphere of authority.",
    trait: "Subnational units usually keep their own constitutions, courts, or legislatures that the center can't simply override.",
    examples: ["United States", "Germany", "India", "Brazil", "Nigeria", "Australia", "Ethiopia"]
  },
  {
    id: "unitary",
    name: "Unitary System",
    tag: "Territorial power",
    def: "A central government holds ultimate authority, and any regional or local governments exercise only the powers the center chooses to delegate.",
    trait: "By far the most common structure worldwide — roughly four in five countries are unitary rather than federal.",
    examples: ["France", "Japan", "Egypt", "Poland", "Kenya", "Vietnam"]
  },
  {
    id: "military-rule",
    name: "Military Rule / Junta",
    tag: "De facto power",
    def: "Armed forces hold governing power directly, typically after removing a civilian government by force, and rule without the constitutional constraints that preceded them.",
    trait: "Usually framed as 'transitional,' with a promised — often repeatedly delayed — return to civilian rule.",
    examples: ["Myanmar", "Mali", "Sudan", "Burkina Faso", "Guinea"]
  },
  {
    id: "theocracy",
    name: "Theocracy",
    tag: "Source of authority",
    def: "Religious law or religious leadership forms the direct basis of governing authority, rather than a separately constituted secular state.",
    trait: "Clerical bodies can hold veto power over legislation or candidates, above and beyond any elected institutions.",
    examples: ["Iran", "Vatican City", "Afghanistan"]
  },
  {
    id: "devolution",
    name: "Devolution",
    tag: "Power shift",
    def: "The transfer of political power from a central government down to regional or local authorities, usually driven by ethnic identity, economic disparity, or sheer distance from the capital.",
    trait: "Unlike federalism, devolved power is granted by the center and can, in principle, be revoked or scaled back by it.",
    examples: ["Scotland & Wales (UK)", "Catalonia (Spain)", "Hong Kong (pre-2020, China)"]
  },
  {
    id: "balkanization",
    name: "Balkanization",
    tag: "Power shift",
    def: "The violent fragmentation of a state into smaller, mutually hostile units along ethnic, religious, or linguistic lines.",
    trait: "Named for the breakup of the Ottoman and Austro-Hungarian holdings in the Balkans, then reinforced by Yugoslavia's collapse.",
    examples: ["Yugoslavia (1990s)", "Somalia's fragmentation", "The Soviet periphery's ethnic conflicts"]
  },
  {
    id: "supranationalism",
    name: "Supranationalism",
    tag: "Power shift",
    def: "Three or more states voluntarily delegating selected slices of national sovereignty to a shared body in exchange for collective economic, political, or security gains.",
    trait: "The opposite motion from devolution: power moves up and outward rather than down and inward.",
    examples: ["European Union", "United Nations", "NATO", "African Union"]
  }
];

const LEARN_ORGS = [
  {
    id: "un",
    name: "United Nations",
    abbr: "UN",
    founded: 1945,
    hq: "New York, USA",
    members: 193,
    purpose: "Maintain international peace and security, develop international law, and coordinate humanitarian, health, and development work.",
    fact: "Nearly every recognized sovereign state is a member — Vatican City and Palestine hold observer status instead."
  },
  {
    id: "eu",
    name: "European Union",
    abbr: "EU",
    founded: 1993,
    hq: "Brussels, Belgium",
    members: 27,
    purpose: "Political and economic union creating a single market, shared regulations, and — for most members — a common currency.",
    fact: "The UK left in 2020, the only member state ever to withdraw."
  },
  {
    id: "nato",
    name: "North Atlantic Treaty Organization",
    abbr: "NATO",
    founded: 1949,
    hq: "Brussels, Belgium",
    members: 32,
    purpose: "Collective defense alliance: under Article 5, an attack on one member is treated as an attack on all.",
    fact: "Finland and Sweden joined in 2023–2024, ending decades of military non-alignment."
  },
  {
    id: "au",
    name: "African Union",
    abbr: "AU",
    founded: 2002,
    hq: "Addis Ababa, Ethiopia",
    members: 55,
    purpose: "Promote continental political and economic integration and coordinate peacekeeping and conflict mediation.",
    fact: "Succeeded the Organisation of African Unity (founded 1963) and includes every African state except none currently suspended."
  },
  {
    id: "asean",
    name: "Association of Southeast Asian Nations",
    abbr: "ASEAN",
    founded: 1967,
    hq: "Jakarta, Indonesia",
    members: 10,
    purpose: "Economic integration and regional security cooperation among Southeast Asian states.",
    fact: "Decisions are made by consensus, so any single member can effectively block a joint statement."
  },
  {
    id: "oas",
    name: "Organization of American States",
    abbr: "OAS",
    founded: 1948,
    hq: "Washington, D.C., USA",
    members: 35,
    purpose: "Forum for political dialogue, democracy support, and human rights monitoring across the Western Hemisphere.",
    fact: "Cuba was excluded from 1962–2009 and has not resumed participation since its reinstatement."
  },
  {
    id: "arab-league",
    name: "League of Arab States",
    abbr: "Arab League",
    founded: 1945,
    hq: "Cairo, Egypt",
    members: 22,
    purpose: "Coordinate policy among Arabic-speaking states on political, economic, and cultural matters.",
    fact: "Syria's membership was suspended in 2011 and restored in 2023."
  },
  {
    id: "commonwealth",
    name: "Commonwealth of Nations",
    abbr: "Commonwealth",
    founded: 1931,
    hq: "London, UK",
    members: 56,
    purpose: "Voluntary association promoting democracy, development, and cooperation among mostly former British territories.",
    fact: "Gabon and Rwanda joined despite having no historical constitutional link to the British Empire."
  },
  {
    id: "opec",
    name: "Organization of the Petroleum Exporting Countries",
    abbr: "OPEC",
    founded: 1960,
    hq: "Vienna, Austria",
    members: 12,
    purpose: "Coordinate member states' oil production levels to influence global prices and supply.",
    fact: "The wider 'OPEC+' grouping adds Russia and other non-member producers to production-cut agreements."
  },
  {
    id: "g7",
    name: "Group of Seven",
    abbr: "G7",
    founded: 1975,
    hq: "No permanent HQ — rotating presidency",
    members: 7,
    purpose: "Informal forum where major advanced economies coordinate economic and foreign policy.",
    fact: "Russia was part of an expanded 'G8' from 1998 until its exclusion in 2014."
  },
  {
    id: "g20",
    name: "Group of Twenty",
    abbr: "G20",
    founded: 1999,
    hq: "No permanent HQ — rotating presidency",
    members: 19,
    purpose: "Forum of major economies — plus the EU and African Union — representing roughly 85% of world GDP.",
    fact: "Originally a finance-minister forum; leader-level summits began only after the 2008 financial crisis."
  },
  {
    id: "wto",
    name: "World Trade Organization",
    abbr: "WTO",
    founded: 1995,
    hq: "Geneva, Switzerland",
    members: 164,
    purpose: "Sets and enforces the rules of international trade and adjudicates trade disputes between members.",
    fact: "It replaced the earlier GATT framework, which had governed trade rules since 1948."
  }
];

const LEARN_DISPUTES = [
  {
    id: "kashmir",
    name: "Kashmir",
    parties: "India, Pakistan, China",
    status: "Active",
    region: "South Asia",
    boundaryType: "Subsequent boundary",
    summary: "Divided along the Line of Control since the 1947 partition of British India; China administers a separate eastern portion. All three claim territory the others hold."
  },
  {
    id: "scs",
    name: "South China Sea",
    parties: "China, Vietnam, Philippines, Malaysia, Brunei, Taiwan",
    status: "Active",
    region: "East & Southeast Asia",
    summary: "Overlapping claims to islands, reefs, and shipping lanes; China's expansive 'nine-dash line' claim overlaps the exclusive economic zones of several neighbors."
  },
  {
    id: "western-sahara",
    name: "Western Sahara",
    parties: "Morocco, Polisario Front",
    status: "Frozen",
    region: "North Africa",
    boundaryType: "Superimposed boundary",
    summary: "Morocco controls most of the territory and considers it sovereign land; the Polisario Front's Sahrawi Arab Democratic Republic claims independence and is recognized by dozens of states."
  },
  {
    id: "israel-palestine",
    name: "Israel–Palestine",
    parties: "Israel, Palestinian Authority, Hamas",
    status: "Active",
    region: "Middle East",
    summary: "Contested control and final status of the West Bank, Gaza, and Jerusalem, with roots going back to the 1948 and 1967 wars."
  },
  {
    id: "crimea-donbas",
    name: "Crimea & Donbas",
    parties: "Russia, Ukraine",
    status: "Active",
    region: "Eastern Europe",
    summary: "Russia annexed Crimea in 2014 and, following its 2022 invasion, claims to have annexed four additional Ukrainian regions it does not fully control."
  },
  {
    id: "nagorno-karabakh",
    name: "Nagorno-Karabakh",
    parties: "Armenia, Azerbaijan",
    status: "Resolved (2023)",
    region: "Caucasus",
    summary: "Ethnic Armenian enclave inside Azerbaijan, self-governed for decades; Azerbaijan retook the territory by force in 2023, and nearly all ethnic Armenians fled."
  },
  {
    id: "falklands",
    name: "Falkland Islands / Islas Malvinas",
    parties: "United Kingdom, Argentina",
    status: "Frozen",
    region: "South Atlantic",
    summary: "British overseas territory since 1833, claimed by Argentina; the two fought a war over the islands in 1982, which the UK won."
  },
  {
    id: "kurils",
    name: "Kuril Islands",
    parties: "Russia, Japan",
    status: "Frozen",
    region: "Northeast Asia",
    summary: "Soviet forces seized the southern Kurils from Japan at the end of WWII; the dispute has kept Russia and Japan from ever signing a formal peace treaty."
  },
  {
    id: "taiwan-strait",
    name: "Taiwan Strait",
    parties: "China (PRC), Taiwan",
    status: "Active",
    region: "East Asia",
    summary: "Beijing considers Taiwan a province to be reunified, by force if necessary; Taiwan has governed itself separately since the Chinese Civil War ended in 1949."
  },
  {
    id: "cyprus",
    name: "Cyprus",
    parties: "Republic of Cyprus, Turkey / Northern Cyprus",
    status: "Frozen",
    region: "Eastern Mediterranean",
    summary: "Divided since Turkey's 1974 intervention; the self-declared Turkish Republic of Northern Cyprus is recognized only by Turkey."
  },
  {
    id: "somaliland",
    name: "Somaliland",
    parties: "Somalia, Somaliland",
    status: "Frozen",
    region: "Horn of Africa",
    summary: "Declared independence from Somalia in 1991 and functions as a de facto separate state with its own currency and government, but has zero UN member recognition."
  },
  {
    id: "kosovo",
    name: "Kosovo",
    parties: "Kosovo, Serbia",
    status: "Frozen",
    region: "Balkans",
    summary: "Declared independence from Serbia in 2008 after a 1998–99 war and NATO intervention; recognized by roughly half of UN member states but not by Serbia, Russia, or China."
  }
];

const LEARN_EMPIRES = [
  { id:"rome", name:"Roman Empire", span:"27 BCE – 476 / 1453 CE", reach:"Mediterranean basin, Western Europe, North Africa, the Near East",
    legacy:"Left behind Roman law traditions, the Latin roots of Romance languages, and city foundations still standing across three continents." },
  { id:"mongol", name:"Mongol Empire", span:"1206 – 1368",
    reach:"The largest contiguous land empire in history, spanning from Korea to Eastern Europe",
    legacy:"Unified the Silk Road under one system of protection, reshaping trade and helping define the modern borders of Russia, China, and Central Asia." },
  { id:"ottoman", name:"Ottoman Empire", span:"1299 – 1922",
    reach:"Southeastern Europe, the Middle East, and North Africa",
    legacy:"Its collapse after WWI, carved up under agreements like Sykes-Picot, drew most of the straight-line borders seen in the modern Middle East." },
  { id:"british", name:"British Empire", span:"16th century – 20th century",
    reach:"Peaked as the largest empire in history by land area, spanning every inhabited continent",
    legacy:"Decolonization from the 1940s to 1980s created roughly a quarter of today's sovereign states, along with widespread use of English and common law." },
  { id:"spanish", name:"Spanish Empire", span:"15th century – 19th century",
    reach:"Most of Central and South America, the Caribbean, and the Philippines",
    legacy:"Independence wars in the 1810s–1820s produced most of today's Latin American states, along with the region's shared Spanish-language heritage." },
  { id:"french-colonial", name:"French Colonial Empire", span:"17th century – 20th century",
    reach:"West and Central Africa, Southeast Asia (Indochina), and parts of the Caribbean",
    legacy:"Decolonization in the 1950s–60s left a lasting Francophone bloc of states across Africa that still coordinate closely with France." },
  { id:"austro-hungarian", name:"Austro-Hungarian Empire", span:"1867 – 1918",
    reach:"Central Europe, from the Alps to the Carpathians",
    legacy:"Its 1918 collapse after WWI created Austria, Hungary, and Czechoslovakia, and fed directly into the formation of Yugoslavia." },
  { id:"soviet", name:"Soviet Union", span:"1922 – 1991",
    reach:"Eastern Europe and Northern/Central Asia",
    legacy:"Its 1991 dissolution created 15 newly independent states overnight, from the Baltics to Central Asia." },
  { id:"portuguese", name:"Portuguese Empire", span:"15th century – 20th century",
    reach:"Brazil, coastal Africa (Angola, Mozambique), Goa, and East Timor",
    legacy:"One of the longest-lived colonial empires, it left Portuguese as an official language on four continents." },
  { id:"qing", name:"Qing Dynasty", span:"1644 – 1912",
    reach:"China proper plus Tibet, Xinjiang, Mongolia, and Manchuria",
    legacy:"Its territorial extent still largely defines modern China's borders and its contested claims over Tibet and Xinjiang." }
];

/* ---------------- Foundations: statehood & territory ---------------- */
const LEARN_FOUNDATIONS = [
  { id:"state", name:"State", tag:"Political entity",
    def:"An independent political unit with a defined territory, a permanent population, an established government, and full sovereignty over its internal and external affairs.",
    trait:"Sovereignty is the key word — a state answers to no higher political authority.",
    examples:["Japan","Canada","France"] },
  { id:"nation", name:"Nation", tag:"Political entity",
    def:"A culturally distinct group of people sharing a common identity, language, history, or heritage, attached to a specific geographic homeland.",
    trait:"A nation is a people, not a government — it can exist with or without its own state.",
    examples:["Kurds","Cherokee","Basques"] },
  { id:"nation-state", name:"Nation-State", tag:"Political entity",
    def:"A state whose territorial boundaries closely coincide with the geographic boundaries of a single nation or ethnic group.",
    trait:"Genuinely clean nation-states are rare — most states govern more than one cultural group.",
    examples:["Japan","Iceland"] },
  { id:"multinational-state", name:"Multinational State", tag:"Political entity",
    def:"A state containing two or more distinct nations that agree to coexist while retaining separate national identities or demands for autonomy.",
    trait:"Cohesion depends on whether constituent nations feel fairly represented, not just governed.",
    examples:["United Kingdom (Scots, Welsh, English, Irish)","Canada","Nigeria"] },
  { id:"stateless-nation", name:"Stateless Nation", tag:"Political entity",
    def:"An ethnic or cultural nation that lacks its own recognized sovereign state despite having a national identity and historical homeland.",
    trait:"Often split across the borders of several existing states, complicating any path to self-determination.",
    examples:["The Kurds (Middle East)","The Rohingya (Myanmar)"] },
  { id:"territoriality", name:"Territoriality", tag:"Spatial concept",
    def:"The defense or enforcement of control over a bounded geographic area by an individual, group, or sovereign state.",
    trait:"The basic instinct underneath borders, checkpoints, patrols, and territorial disputes alike.",
    examples:["Border patrols","Exclusive economic zones","Gated communities (at a smaller scale)"] },
  { id:"forward-capital", name:"Forward Capital", tag:"Spatial concept",
    def:"A capital city relocated to an underdeveloped or contested interior region to encourage economic growth, assert territorial control, or unify a nation.",
    trait:"A deliberate statement in stone and concrete: the frontier matters as much as the old center.",
    examples:["Brasília (Brazil)","Islamabad (Pakistan)","Abuja (Nigeria)"] },
  { id:"primate-city", name:"Primate City", tag:"Spatial concept",
    def:"A country's leading city that is disproportionately larger than any other urban center, dominating political, economic, and cultural life.",
    trait:"Often drains talent, investment, and political attention away from the rest of the country.",
    examples:["Paris (France)","Bangkok (Thailand)"] },
  { id:"enclave", name:"Enclave", tag:"Spatial concept",
    def:"A territory or state completely surrounded by the territory of another single state.",
    trait:"Its politics and even its economy are hostage to the goodwill of the one neighbor that encircles it.",
    examples:["Lesotho (inside South Africa)","Vatican City (inside Italy)"] },
  { id:"exclave", name:"Exclave", tag:"Spatial concept",
    def:"A portion of a state's territory that is geographically separated from its main body by the territory of another state.",
    trait:"Governing an exclave usually means routing people, goods, and authority through — or around — someone else's land.",
    examples:["Kaliningrad (Russia, between Poland and Lithuania)","Alaska (US, separated by Canada)"] }
];

/* ---------------- Boundaries: types & maritime law ---------------- */
const LEARN_BOUNDARY_TYPES = [
  { id:"antecedent", name:"Antecedent Boundary", tag:"Boundary type",
    def:"A border established before a cultural landscape fully developed or before dense human settlement occurred.",
    trait:"Because the boundary came first, the human geography on each side developed largely in isolation from it.",
    examples:["The 49th parallel (US–Canada)"] },
  { id:"subsequent", name:"Subsequent Boundary", tag:"Boundary type",
    def:"A border established during or after the development of a cultural landscape, adjusting to existing ethnic, religious, or linguistic patterns.",
    trait:"Drawn to fit the people already there, rather than the other way around.",
    examples:["Northern Ireland / Republic of Ireland border"] },
  { id:"superimposed", name:"Superimposed Boundary", tag:"Boundary type",
    def:"A border forced onto an existing cultural landscape by outside powers or colonizers, without regard to pre-existing ethnic or cultural lines.",
    trait:"The single biggest source of long-running internal conflict in the post-colonial world.",
    examples:["Borders drawn across Africa at the 1884 Berlin Conference"] },
  { id:"relict", name:"Relict Boundary", tag:"Boundary type",
    def:"A border that no longer functions politically but remains visible in the cultural or economic landscape.",
    trait:"The line is gone from the map, but rarely gone from local memory or habits.",
    examples:["The former Berlin Wall","The old North–South Vietnam border"] },
  { id:"geometric", name:"Geometric Boundary", tag:"Boundary type",
    def:"A border drawn using straight lines or arcs, often following lines of latitude or longitude, regardless of physical or cultural features.",
    trait:"Efficient to draw on a map, indifferent to whatever it happens to cut through on the ground.",
    examples:["Egypt–Libya border"] }
];

const LEARN_MARITIME_ZONES = [
  { name:"Territorial Sea", distance:"0 – 12 nautical miles", flex:14, color:"#1F5A72",
    rights:"Full state sovereignty over the water, seabed, and airspace. Foreign vessels retain a right of \u201cinnocent passage.\u201d" },
  { name:"Contiguous Zone", distance:"12 – 24 nautical miles", flex:14, color:"#2F7A94",
    rights:"The coastal state can enforce laws on customs, taxation, immigration, and environmental protection." },
  { name:"Exclusive Economic Zone", distance:"24 – 200 nautical miles", flex:42, color:"#4E9DB5",
    rights:"Sovereign rights to explore, exploit, and manage natural resources — fish, oil, gas — in the water and seabed." },
  { name:"High Seas", distance:"Beyond 200 nautical miles", flex:30, color:"#87C2D4",
    rights:"International waters outside any national jurisdiction, open to every state for navigation and research." }
];

/* ---------------- Geopolitical theories & world-systems ---------------- */
const LEARN_THEORIES = [
  { id:"heartland", name:"Heartland Theory", tag:"Mackinder, 1904",
    def:"Argued that the interior core of Eurasia — the \u201cHeartland\u201d — was shielded from naval power, and that whoever controlled it could go on to control the entire Eurasian-African \u201cWorld-Island,\u201d and ultimately the world.",
    trait:"\u201cWho rules East Europe commands the Heartland; who rules the Heartland commands the World-Island; who rules the World-Island commands the world.\u201d",
    examples:["Cold War containment strategy", "Russia's persistent interest in Eastern Europe"] },
  { id:"rimland", name:"Rimland Theory", tag:"Spykman, 1942",
    def:"Countered Mackinder by arguing that Eurasia's coastal fringes — the \u201cRimland\u201d — mattered more, since they controlled maritime trade and resource access, and that containing the Heartland required controlling the Rimland instead.",
    trait:"Heavily influenced the actual US Cold War strategy of containment along Eurasia's coastlines.",
    examples:["NATO's European frontline", "US alliances across East Asia's coastal states"] },
  { id:"seapower", name:"Sea Power Theory", tag:"Mahan, 1890",
    def:"Held that control over oceanic trade routes, naval choke points such as straits and canals, and forward naval bases was the primary driver of national power and economic supremacy.",
    trait:"Still cited directly to justify modern naval buildups and basing strategy.",
    examples:["The Strait of Hormuz","The Suez and Panama Canals"] },
  { id:"critical-geo", name:"Critical Geopolitics", tag:"Analytical framework",
    def:"Examines how political leaders, institutions, and media construct geographic narratives to justify foreign policy, territorial ambitions, or military intervention.",
    trait:"Treats phrases like \u201cEast vs. West\u201d or \u201cAxis of Evil\u201d as political tools, not neutral descriptions.",
    examples:["Cold War \u201cIron Curtain\u201d framing", "\u201cAxis of Evil\u201d (2002)"] }
];

const LEARN_WORLDSYSTEM = [
  { id:"core", name:"Core", pct:22,
    def:"High-income states with advanced technology, high wages, and dominant control over global economic rules.",
    examples:["United States","Western Europe","Japan"] },
  { id:"semi-periphery", name:"Semi-Periphery", pct:33,
    def:"Transition states that exploit periphery regions for resources and labor while remaining economically dependent on the core.",
    examples:["Brazil","India","China"] },
  { id:"periphery", name:"Periphery", pct:45,
    def:"Low-income states supplying cheap labor and raw materials, structurally dependent on the core for capital, technology, and markets.",
    examples:["Several sub-Saharan African states","Parts of South Asia"] }
];

/* ---------------- Electoral geography ---------------- */
const LEARN_ELECTORAL = [
  { id:"packing", name:"Packing", tag:"Gerrymander",
    def:"Draws district lines to concentrate opposition voters into as few districts as possible, so their votes are 'wasted' winning those districts by huge margins.",
    caption:"Opposition wins 1 of 3 seats by a landslide — despite being competitive almost everywhere else.",
    pattern:[1,1,1,1,1,0,1,1,1,1,1,0, 0,0,0,0,0,1,0,0,0,0,0,1, 0,0,0,0,0,1,0,0,0,0,0,1] },
  { id:"cracking", name:"Cracking", tag:"Gerrymander",
    def:"Spreads opposition voters thinly across many districts so they never reach a majority in any single one.",
    caption:"Opposition holds roughly a third of the overall vote, but wins zero of the three seats.",
    pattern:[1,0,0,0,1,0,0,0,1,0,0,1, 1,0,0,0,1,0,0,0,1,0,0,1, 1,0,0,0,1,0,0,0,1,0,0,1] },
  { id:"hijacking", name:"Hijacking / Kidnapping", tag:"Gerrymander",
    def:"Redraws district lines to place two incumbents from the same party into a single district, forcing them to run against each other and guaranteeing one seat disappears.",
    trait:"Used less to shift party power and more to settle scores or remove a specific rival within a party.",
    examples:["Common after redistricting when a state loses a seat in reapportionment"] }
];

/* ---------------- Resource geopolitics & colonial legacies ---------------- */
const LEARN_RESOURCES = [
  { id:"resource-disputes", name:"Resource Disputes", tag:"Resource geopolitics",
    def:"Conflicts centered on access to vital physical assets — transboundary rivers, oil deposits, arable land, and the rare-earth minerals modern technology depends on.",
    trait:"Case in point: the Grand Ethiopian Renaissance Dam on the Nile has strained relations between Ethiopia, Sudan, and Egypt since construction began in 2011.",
    examples:["The Nile River basin","Rare-earth mineral supply chains","Transboundary aquifers"] },
  { id:"irredentism", name:"Irredentism", tag:"Territorial claim",
    def:"A political or popular movement aiming to reclaim and annex territory in another state on the grounds of historical, ethnic, or cultural ties.",
    trait:"Distinct from a border dispute — irredentism claims territory because of who lives there, not just where the line was drawn.",
    examples:["Russian claims over historic territories", "Somali claims in the Horn of Africa"] },
  { id:"colonial-partitioning", name:"Colonial Partitioning", tag:"Colonial legacy",
    def:"Imperial powers imposed arbitrary administrative lines with no regard for local ethnic groups, establishing borders that persist today as modern state boundaries.",
    trait:"A large share of today's internal conflicts trace back to a line drawn by someone who had never set foot in the region.",
    examples:["The 1884 Berlin Conference partition of Africa"] },
  { id:"neocolonialism", name:"Neocolonialism", tag:"Colonial legacy",
    def:"The continued indirect economic, financial, or political influence exerted by former colonial powers or multinational corporations over nominally independent developing nations.",
    trait:"Independence on paper doesn't always mean independence in practice, if trade terms, debt, or resource contracts still favor the old center.",
    examples:["Franc CFA currency arrangements in parts of Francophone Africa", "Resource-extraction contracts favoring foreign firms"] }
];

const LEARN_DARK = [
  {
    name: "The Holocaust",
    era: "1941 – 1945",
    toll: "an estimated 6 million Jewish people, plus millions of Roma, disabled people, political prisoners, and others",
    summary: "Nazi Germany's state machinery carried out the systematic murder of Europe's Jewish population, alongside other groups it deemed undesirable, using purpose-built camps and mass shootings.",
    mechanism: "A totalitarian one-party state that turned its civil service, railways, and police into instruments of industrialized killing.",
    legacy: "Surviving leaders were tried at Nuremberg; the term 'genocide' was coined specifically to describe what had happened."
  },
  {
    name: "Stalinist Terror & the Holodomor",
    era: "1930 – 1953",
    toll: "millions, including an estimated 3.5–5 million dead in the 1932–33 Ukrainian famine alone",
    summary: "The Soviet state under Stalin combined forced agricultural collectivization, political purges, and a vast forced-labor camp system (the Gulag) that together killed millions of its own citizens.",
    mechanism: "One-party rule with no independent courts, press, or opposition to check state policy, even as it produced mass starvation.",
    legacy: "The 1932–33 famine in Ukraine, the Holodomor, is formally recognized as genocide by dozens of countries."
  },
  {
    name: "Mao's Great Leap Forward & Cultural Revolution",
    era: "1958 – 1976",
    toll: "an estimated 15–45 million famine deaths in 1959–61, plus an unresolved further toll from the Cultural Revolution",
    summary: "Forced collectivization and unrealistic production quotas triggered a mass famine; a decade later, a political mobilization campaign turned much of society against itself.",
    mechanism: "Centralized one-party control that suppressed accurate reporting of the famine's scale while it was happening.",
    legacy: "The Chinese Communist Party has since officially acknowledged the Great Leap Forward as a serious error."
  },
  {
    name: "The Khmer Rouge",
    era: "1975 – 1979",
    toll: "an estimated 1.5–2 million people, roughly a quarter of Cambodia's population",
    summary: "Pol Pot's regime forcibly emptied cities and drove the population into agricultural labor camps in an attempt to build an agrarian, classless society.",
    mechanism: "A one-party revolutionary state that treated educated people, minorities, and perceived dissenters as enemies to be eliminated.",
    legacy: "A UN-backed tribunal convicted senior Khmer Rouge leaders of genocide and crimes against humanity, decades later."
  },
  {
    name: "The Rwandan Genocide",
    era: "1994",
    toll: "an estimated 800,000 people, mostly ethnic Tutsi, killed in around 100 days",
    summary: "Following the assassination of Rwanda's president, extremist Hutu leaders organized the mass killing of Tutsi and moderate Hutu civilians.",
    mechanism: "State radio broadcasts and local administrative structures were used to direct killings at the neighborhood level.",
    legacy: "An international tribunal prosecuted its organizers, and the episode reshaped later debates on the international 'responsibility to protect.'"
  },
  {
    name: "The Armenian Genocide",
    era: "1915 – 1917",
    toll: "an estimated 1–1.5 million Armenians",
    summary: "Ottoman authorities carried out the mass deportation and killing of the empire's Armenian population during World War I.",
    mechanism: "Wartime emergency powers were used to justify forced deportation marches into the desert, with mass killings along the way.",
    legacy: "It remains formally recognized as genocide by many, though not all, states — a continuing point of diplomatic dispute."
  },
  {
    name: "The Transatlantic Slave Trade",
    era: "16th – 19th centuries",
    toll: "an estimated 12.5 million people forcibly transported; a substantial share did not survive the crossing",
    summary: "European trading networks forcibly transported enslaved Africans to the Americas over roughly three centuries to supply colonial plantation economies.",
    mechanism: "A legal and commercial system across multiple empires that treated human beings as property to be bought, sold, and inherited.",
    legacy: "Abolition came gradually across the 19th century; its economic and social effects are still studied and debated today."
  },
  {
    name: "The Congo Free State",
    era: "1885 – 1908",
    toll: "estimates range from roughly 1 million to 10 million deaths",
    summary: "Belgium's King Leopold II ran the Congo as his personal property, enforcing rubber production quotas through forced labor, hostage-taking, and mutilation.",
    mechanism: "A colonial territory governed as a private commercial venture rather than a state, with no external oversight of its methods.",
    legacy: "International outcry over reports from the territory helped force Leopold to cede control to the Belgian government in 1908."
  },
  {
    name: "Apartheid South Africa",
    era: "1948 – 1994",
    toll: "not a single death toll, but a legal system that structurally disadvantaged the majority of a nation for nearly five decades",
    summary: "South Africa's government enforced racial segregation and disenfranchisement by law, controlling where people could live, work, and vote based on race.",
    mechanism: "Legislated racial classification enforced through police powers, forced removals, and denial of political rights to the Black majority.",
    legacy: "Dismantled from 1990–94 through negotiation, followed by a Truth and Reconciliation Commission rather than a single decisive trial."
  },
  {
    name: "The Bosnian War & Srebrenica",
    era: "1992 – 1995",
    toll: "over 8,000 Bosniak men and boys killed at Srebrenica alone, within a wider war that killed roughly 100,000",
    summary: "As Yugoslavia broke apart, ethnic-cleansing campaigns targeted civilian populations; the 1995 massacre at Srebrenica became Europe's worst atrocity since World War II.",
    mechanism: "Paramilitary and military forces used systematic separation and killing of men and boys from a UN-declared 'safe area.'",
    legacy: "International courts later classified the Srebrenica massacre specifically as genocide, and convicted its commanders."
  }
];

const LEARN_QUIZ = [
  /* Systems (10) */
  { cat:"sys", q:"Which system splits executive power between a directly elected president and a prime minister answerable to parliament?", options:["Semi-presidential republic","Parliamentary republic","Absolute monarchy","One-party state"], a:0 },
  { cat:"sys", q:"Roughly what share of the world's countries use a unitary rather than federal structure?", options:["About 1 in 5","About 1 in 2","About 4 in 5","Virtually none"], a:2 },
  { cat:"sys", q:"In a federal system, what protects the power of states or provinces?", options:["Nothing — the center can override them at will","Their own constitutionally guaranteed sphere of authority","A rotating national presidency","Religious law"], a:1 },
  { cat:"sys", q:"Which type of government features a monarch with sweeping, largely unchecked authority and no binding constitution?", options:["Constitutional monarchy","Absolute monarchy","Parliamentary republic","Semi-presidential republic"], a:1 },
  { cat:"sys", q:"In a parliamentary republic, how can the head of government normally be removed between elections?", options:["Only by military intervention","By a vote of no confidence in the legislature","Only by the president's personal decision","They cannot be removed"], a:1 },
  { cat:"sys", q:"What best distinguishes a one-party state from a competitive multi-party democracy?", options:["It has no elections at all","Only one political party is constitutionally or practically permitted to hold power","It has no legislature","It is always a monarchy"], a:1 },
  { cat:"sys", q:"Which structure is used by roughly four out of five of the world's countries?", options:["Federal system","Confederation","Unitary system","Absolute monarchy"], a:2 },
  { cat:"sys", q:"What typically follows a military takeover of a civilian government, at least in name?", options:["Immediate UN membership suspension","A promised transition back to civilian rule","Automatic EU accession","A permanent monarchy"], a:1 },
  { cat:"sys", q:"What most clearly defines a theocracy?", options:["A king rules without any laws","Religious law or leadership forms the direct basis of governing authority","The military appoints all officials","Power rotates yearly among parties"], a:1 },
  { cat:"sys", q:"What is a key feature that separates federal systems from unitary ones?", options:["Subnational units hold a constitutionally protected sphere of authority","The central government controls everything","There is no national government","Only monarchies can be federal"], a:0 },

  /* Alliances / orgs (10) */
  { cat:"org", q:"Which alliance operates on the principle that an attack on one member is an attack on all?", options:["ASEAN","NATO","OPEC","the Commonwealth"], a:1 },
  { cat:"org", q:"The 2008 financial crisis led directly to leader-level summits of which forum?", options:["G7","WTO","G20","Arab League"], a:2 },
  { cat:"org", q:"Which body currently governs the rules of international trade between its 164 members?", options:["The United Nations","OPEC","The World Trade Organization","The African Union"], a:2 },
  { cat:"org", q:"Which organization's members largely share a colonial-era link to the British Empire?", options:["African Union","Commonwealth of Nations","OPEC","Arab League"], a:1 },
  { cat:"org", q:"Which organization coordinates oil production levels among its member states?", options:["WTO","OPEC","G7","ASEAN"], a:1 },
  { cat:"org", q:"Which regional bloc makes decisions by consensus, letting a single member block a joint statement?", options:["NATO","European Union","ASEAN","G20"], a:2 },
  { cat:"org", q:"Which organization succeeded the Organisation of African Unity in 2002?", options:["Arab League","African Union","OAS","Commonwealth"], a:1 },
  { cat:"org", q:"Which forum only began holding leader-level summits after the 2008 financial crisis?", options:["G7","G20","WTO","United Nations"], a:1 },
  { cat:"org", q:"Which body is responsible for enforcing global trade rules and adjudicating trade disputes?", options:["United Nations","World Trade Organization","OPEC","NATO"], a:1 },
  { cat:"org", q:"Which alliance's collective-defense clause is known as Article 5?", options:["European Union","NATO","Arab League","OAS"], a:1 },

  /* Disputes (10) */
  { cat:"dis", q:"Which territorial dispute was effectively resolved by force in 2023, prompting a mass departure of ethnic Armenians?", options:["Cyprus","Nagorno-Karabakh","Kashmir","Western Sahara"], a:1 },
  { cat:"dis", q:"Somaliland and Kosovo have something in common politically. What is it?", options:["Both are full UN members","Both are ruled by absolute monarchs","Both declared independence but lack universal recognition","Both are NATO members"], a:2 },
  { cat:"dis", q:"Which dispute involves overlapping claims by China, Vietnam, the Philippines, and others over islands and shipping lanes?", options:["The Kuril Islands","The South China Sea","Cyprus","The Falkland Islands"], a:1 },
  { cat:"dis", q:"Which territory has functioned as a de facto independent state since 1991 without UN member recognition?", options:["Kosovo","Somaliland","Cyprus","Taiwan"], a:1 },
  { cat:"dis", q:"Which dispute has kept Russia and Japan from signing a formal peace treaty since WWII?", options:["Crimea","The Kuril Islands","Nagorno-Karabakh","Western Sahara"], a:1 },
  { cat:"dis", q:"Which island has been divided since Turkey's 1974 intervention?", options:["Taiwan","Cyprus","Sicily","Crimea"], a:1 },
  { cat:"dis", q:"Since 1949, which territory has governed itself separately following the Chinese Civil War?", options:["Hong Kong","Taiwan","Tibet","Macau"], a:1 },
  { cat:"dis", q:"The Polisario Front seeks independence for which territory currently controlled mostly by Morocco?", options:["Western Sahara","Kashmir","Kosovo","Nagorno-Karabakh"], a:0 },
  { cat:"dis", q:"Kosovo declared independence from which country in 2008?", options:["Serbia","Russia","Albania","Bosnia"], a:0 },
  { cat:"dis", q:"Which 1982 war was fought over the Falkland Islands?", options:["United Kingdom vs Argentina","United Kingdom vs Chile","United States vs Argentina","Spain vs United Kingdom"], a:0 },

  /* Empires (10) */
  { cat:"emp", q:"Whose collapse after WWI is most directly responsible for today's Middle East borders?", options:["The Ottoman Empire","The Mongol Empire","The Soviet Union","The Portuguese Empire"], a:0 },
  { cat:"emp", q:"Which empire's 1991 dissolution created 15 new independent states at once?", options:["British Empire","Austro-Hungarian Empire","Soviet Union","Qing Dynasty"], a:2 },
  { cat:"emp", q:"What made most of Latin America's current borders take shape?", options:["Decolonization from Spain in the 1810s–20s","The fall of the Ottoman Empire","The dissolution of the Soviet Union","British decolonization"], a:0 },
  { cat:"emp", q:"Which empire is credited with unifying protection along the Silk Road trade routes?", options:["Roman Empire","Mongol Empire","Ottoman Empire","British Empire"], a:1 },
  { cat:"emp", q:"Which empire's territorial extent still largely defines modern China's borders, including Tibet and Xinjiang?", options:["Qing Dynasty","Mongol Empire","Ottoman Empire","Soviet Union"], a:0 },
  { cat:"emp", q:"Which empire left Portuguese as an official language on four continents?", options:["Spanish Empire","Portuguese Empire","French Colonial Empire","British Empire"], a:1 },
  { cat:"emp", q:"The 1918 collapse of which empire directly fed into the creation of Czechoslovakia and Yugoslavia?", options:["Ottoman Empire","Austro-Hungarian Empire","Russian Empire","German Empire"], a:1 },
  { cat:"emp", q:"Which empire, at its peak, was the largest in history by land area, spanning every inhabited continent?", options:["Mongol Empire","Roman Empire","British Empire","Spanish Empire"], a:2 },
  { cat:"emp", q:"Decolonization from which empire in the 1950s–60s left a lasting Francophone bloc across Africa?", options:["Portuguese Empire","French Colonial Empire","Belgian Empire","Spanish Empire"], a:1 },
  { cat:"emp", q:"Roman law and city foundations left a lasting legacy across which regions?", options:["Only Britain","Only the Middle East","The Mediterranean, Western Europe, and North Africa","Only Scandinavia"], a:2 },

  /* Dark chapters (10) */
  { cat:"drk", q:"The Holocaust was carried out under which political system?", options:["A parliamentary democracy","A totalitarian one-party Nazi state","A constitutional monarchy","A federal republic"], a:1 },
  { cat:"drk", q:"What Soviet-era famine, tied to forced collectivization, killed millions in Ukraine in 1932–33?", options:["The Holodomor","The Great Leap Forward famine","The Bengal famine","The Irish famine"], a:0 },
  { cat:"drk", q:"Which regime attempted to build an agrarian utopia by force in Cambodia from 1975–1979?", options:["The Khmer Rouge","The Viet Cong","The Ottoman administration","The Belgian colonial government"], a:0 },
  { cat:"drk", q:"The 1994 Rwandan genocide was organized largely through which mechanism?", options:["A foreign invasion","State radio broadcasts and local administrative structures","A United Nations mandate","An economic blockade"], a:1 },
  { cat:"drk", q:"Which empire's authorities carried out the systematic deportation and killing of Armenians from 1915–1917?", options:["The Ottoman Empire","The Austro-Hungarian Empire","The Russian Empire","The British Empire"], a:0 },
  { cat:"drk", q:"Roughly how many enslaved Africans are estimated to have been forcibly transported to the Americas during the Transatlantic Slave Trade?", options:["About 500,000","About 2 million","About 12.5 million","About 50 million"], a:2 },
  { cat:"drk", q:"King Leopold II's personal colonial regime in the Congo Free State enforced forced labor in which industry?", options:["Diamonds","Rubber","Oil","Cotton"], a:1 },
  { cat:"drk", q:"Apartheid, a legalized system of racial segregation, was enforced by the state in which country from 1948–1994?", options:["South Africa","Zimbabwe","Kenya","Namibia"], a:0 },
  { cat:"drk", q:"The 1995 genocide at Srebrenica, during the Bosnian War, killed more than how many Bosniak men and boys?", options:["800","8,000","80,000","800,000"], a:1 },
  { cat:"drk", q:"Mao's Great Leap Forward (1958–1962) combined forced collectivization with which outcome?", options:["A mass famine","A trade boom","A peaceful land reform","Rapid democratization"], a:0 },

  /* Systems — power shifts (3 extra) */
  { cat:"sys", q:"How does devolution differ from federalism?", options:["Devolved power is granted by the center and can be scaled back; federal power is constitutionally protected","They are exactly the same thing","Federalism only exists in monarchies","Devolution always leads to full independence"], a:0 },
  { cat:"sys", q:"What does the term 'balkanization' describe?", options:["Two states merging peacefully","The violent fragmentation of a state along ethnic or linguistic lines","A state joining a trade bloc","A monarch abdicating the throne"], a:1 },
  { cat:"sys", q:"Which direction does power move under supranationalism, compared to devolution?", options:["Up and outward, from states to a shared body, rather than down and inward","Down and inward, from a shared body to states","It stays exactly the same","It moves only within a single city"], a:0 },

  /* Foundations: statehood & territory (10) */
  { cat:"fnd", q:"What is the defining feature that separates a 'state' from a 'nation'?", options:["A state has sovereignty and defined territory; a nation is a cultural identity group","A nation always has more people than a state","A state has no government","There is no real difference"], a:0 },
  { cat:"fnd", q:"Which term describes an ethnic group with no recognized sovereign state of its own?", options:["Nation-state","Multinational state","Stateless nation","Primate city"], a:2 },
  { cat:"fnd", q:"A country whose borders closely match the homeland of a single ethnic group is called a:", options:["Multinational state","Nation-state","Stateless nation","Federal state"], a:1 },
  { cat:"fnd", q:"Brasília and Abuja are examples of which spatial concept?", options:["Primate city","Enclave","Forward capital","Exclave"], a:2 },
  { cat:"fnd", q:"Which city is a classic example of a 'primate city'?", options:["Paris","Ottawa","Canberra","Brasília"], a:0 },
  { cat:"fnd", q:"Lesotho, entirely surrounded by South Africa, is an example of a state that is:", options:["An exclave","An enclave","A forward capital","A stateless nation"], a:1 },
  { cat:"fnd", q:"Kaliningrad, separated from the rest of Russia by Poland and Lithuania, is an example of:", options:["An enclave","An exclave","A primate city","A multinational state"], a:1 },
  { cat:"fnd", q:"The United Kingdom, home to English, Scottish, Welsh, and Irish national identities under one state, is best described as a:", options:["Nation-state","Multinational state","Stateless nation","City-state"], a:1 },
  { cat:"fnd", q:"'Territoriality' most precisely refers to:", options:["The defense or enforcement of control over a bounded geographic area","The population size of a state","A type of maritime boundary","A form of government"], a:0 },
  { cat:"fnd", q:"The Kurds are most commonly cited as an example of a:", options:["Nation-state","Stateless nation","Multinational state","Forward capital"], a:1 },

  /* Boundaries & maritime law (10) */
  { cat:"bnd", q:"A boundary drawn before a region's cultural landscape had fully developed is called:", options:["Subsequent","Antecedent","Relict","Superimposed"], a:1 },
  { cat:"bnd", q:"The borders drawn across Africa at the 1884 Berlin Conference are the classic example of a:", options:["Antecedent boundary","Relict boundary","Superimposed boundary","Geometric boundary"], a:2 },
  { cat:"bnd", q:"A border that no longer functions politically but is still visible in the landscape, like the former Berlin Wall, is called a:", options:["Relict boundary","Subsequent boundary","Geometric boundary","Antecedent boundary"], a:0 },
  { cat:"bnd", q:"A boundary drawn as a straight line or arc along latitude or longitude, like the Egypt–Libya border, is a:", options:["Subsequent boundary","Geometric boundary","Relict boundary","Antecedent boundary"], a:1 },
  { cat:"bnd", q:"A border adjusted to fit existing ethnic or religious settlement patterns, like the Ireland/Northern Ireland line, is called:", options:["Antecedent","Subsequent","Superimposed","Geometric"], a:1 },
  { cat:"bnd", q:"Under UNCLOS, how far does a state's Territorial Sea extend from its baseline?", options:["Up to 12 nautical miles","Up to 24 nautical miles","Up to 200 nautical miles","Unlimited"], a:0 },
  { cat:"bnd", q:"Within the Exclusive Economic Zone, a coastal state holds sovereign rights over:", options:["Only navigation, nothing else","Natural resources like fish, oil, and gas","Foreign military bases","Nothing — it is fully international water"], a:1 },
  { cat:"bnd", q:"What right do foreign vessels retain even within a state's Territorial Sea?", options:["The right to fish freely","Innocent passage","The right to lay military bases","Full customs exemption"], a:1 },
  { cat:"bnd", q:"Waters beyond 200 nautical miles from a coastline are generally classified as:", options:["Contiguous Zone","Territorial Sea","High Seas","Exclusive Economic Zone"], a:2 },
  { cat:"bnd", q:"In the Contiguous Zone (12–24 nautical miles), a state may enforce laws on:", options:["Customs, taxation, immigration, and environmental protection","Full criminal jurisdiction over foreign nationals","Foreign elections","Nothing at all"], a:0 },

  /* Geopolitical theories & world-systems (10) */
  { cat:"geo", q:"Halford Mackinder's Heartland Theory (1904) argued that controlling which region was key to world power?", options:["The interior core of Eurasia","The Amazon basin","The Sahara Desert","The Pacific islands"], a:0 },
  { cat:"geo", q:"Nicholas Spykman's Rimland Theory countered Mackinder by focusing on:", options:["Eurasia's coastal fringes","Antarctica","The open Atlantic","Sub-Saharan Africa's interior"], a:0 },
  { cat:"geo", q:"Alfred Thayer Mahan's Sea Power Theory (1890) emphasized the importance of:", options:["Control of oceanic trade routes and naval choke points","Landlocked farming regions","Mountain fortresses","Space-based satellites"], a:0 },
  { cat:"geo", q:"'Critical geopolitics' as a field is primarily concerned with:", options:["How narratives like 'East vs. West' are constructed to justify policy","Measuring exact geographic coordinates","Naval ship design","Currency exchange rates"], a:0 },
  { cat:"geo", q:"In World-Systems Analysis, which tier holds high-income states with advanced technology and dominant economic control?", options:["Periphery","Semi-periphery","Core","Rimland"], a:2 },
  { cat:"geo", q:"Which World-Systems tier is typically described as exploiting the periphery while remaining dependent on the core?", options:["Semi-periphery","Core","High seas","Heartland"], a:0 },
  { cat:"geo", q:"Which of these is most often cited as a 'periphery' economy in World-Systems Analysis?", options:["United States","Several sub-Saharan African states","Japan","Western Europe"], a:1 },
  { cat:"geo", q:"Who developed World-Systems Analysis, dividing the global economy into core, semi-periphery, and periphery?", options:["Halford Mackinder","Immanuel Wallerstein","Alfred Thayer Mahan","Nicholas Spykman"], a:1 },
  { cat:"geo", q:"Mackinder's famous formula ends with which claim?", options:["'Who rules the World-Island commands the world'","'Who rules the sea commands the world'","'Who rules Africa commands the world'","'Who rules the Rimland commands the world'"], a:0 },
  { cat:"geo", q:"Spykman's Rimland strategy most directly influenced which real-world Cold War policy?", options:["Containment along Eurasia's coastlines","Full military withdrawal from Europe","Colonizing Antarctica","Abandoning naval forces"], a:0 },

  /* Electoral geography (10) */
  { cat:"elec", q:"Drawing district lines to concentrate opposition voters into as few districts as possible is called:", options:["Cracking","Packing","Hijacking","Devolution"], a:1 },
  { cat:"elec", q:"Spreading opposition voters thinly across many districts so they never reach a majority anywhere is called:", options:["Packing","Hijacking","Cracking","Balkanization"], a:2 },
  { cat:"elec", q:"Redrawing district lines to force two incumbents from the same party to run against each other is called:", options:["Cracking","Packing","Hijacking / Kidnapping","Territoriality"], a:2 },
  { cat:"elec", q:"When is redistricting typically carried out?", options:["Periodically after a national census","Only after a war","Every time a new party wins an election","Never — district lines are permanent"], a:0 },
  { cat:"elec", q:"Redrawing voting districts for political advantage, rather than fair representation, is generally known as:", options:["Devolution","Gerrymandering","Balkanization","Irredentism"], a:1 },
  { cat:"elec", q:"In a 'packing' scenario, the opposition typically ends up:", options:["Winning a small number of districts by huge margins while losing the rest","Winning every district by a small margin","Being banned from running","Winning exactly half of all seats"], a:0 },
  { cat:"elec", q:"In a 'cracking' scenario, what happens to the opposition's overall vote share versus its seat count?", options:["Its vote share is significant but its seat count can be zero","Its vote share and seat count are always equal","It automatically wins a majority of seats","There is no relationship between the two"], a:0 },
  { cat:"elec", q:"What is the main practical effect of hijacking two incumbents into the same district?", options:["It merges their voter bases entirely","It guarantees one of the two loses their seat since only one can win","It doubles the district's representation","It has no effect on the outcome"], a:1 },
  { cat:"elec", q:"Electoral geography, as a field, primarily studies:", options:["The spatial distribution of political preferences, representation, and voting behavior","Ocean boundary law","The history of empires","Naval strategy"], a:0 },
  { cat:"elec", q:"Which of the three gerrymandering tactics is most about weakening an opposing party's overall influence, rather than settling a score between allies?", options:["Hijacking","Packing and cracking","Devolution","Balkanization"], a:1 },

  /* Resource geopolitics & colonial legacies (10) */
  { cat:"res", q:"A movement to reclaim and annex territory in another state based on historical or ethnic ties is called:", options:["Irredentism","Devolution","Balkanization","Neocolonialism"], a:0 },
  { cat:"res", q:"The continued indirect economic or political influence of former colonial powers over nominally independent states is called:", options:["Devolution","Neocolonialism","Territoriality","Supranationalism"], a:1 },
  { cat:"res", q:"Arbitrary administrative lines imposed by imperial powers with no regard for local ethnic groups describes:", options:["Colonial partitioning","Forward capitals","Maritime zones","Gerrymandering"], a:0 },
  { cat:"res", q:"The Grand Ethiopian Renaissance Dam dispute, involving Ethiopia, Sudan, and Egypt, is a modern example of a:", options:["Resource dispute over a transboundary river","Maritime boundary dispute","Case of balkanization","Nation-state conflict"], a:0 },
  { cat:"res", q:"Which of the following is most often cited as a resource driving modern geopolitical competition, beyond oil?", options:["Rare-earth minerals","Table salt","Cotton","Coffee"], a:0 },
  { cat:"res", q:"Somali claims to territory in neighboring states based on shared ethnic identity are an example of:", options:["Irredentism","Devolution","A relict boundary","A primate city"], a:0 },
  { cat:"res", q:"What distinguishes irredentism from an ordinary border dispute?", options:["Irredentism is based on who lives in the territory, not just where the line was drawn","Irredentism never involves ethnicity","Border disputes are always resolved by war","There is no meaningful difference"], a:0 },
  { cat:"res", q:"The 1884 Berlin Conference is most closely associated with which concept?", options:["Colonial partitioning of Africa","The founding of the United Nations","The Rimland Theory","Devolution in Europe"], a:0 },
  { cat:"res", q:"Currency arrangements like the Franc CFA in parts of Francophone Africa are often cited as an example of:", options:["Neocolonialism","Balkanization","A geometric boundary","Devolution"], a:0 },
  { cat:"res", q:"Transboundary rivers, arable land, and oil deposits are all examples of what political geography calls:", options:["Sources of resource disputes","Forward capitals","Relict boundaries","Stateless nations"], a:0 }
];
