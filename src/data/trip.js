export const MAP_CONFIG = {
  center: [-41.5, 173.0],
  zoom: 6,
  minZoom: 5,
};

export const TILE_LAYERS = {
  light: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
  },
};

export const TIMELINE_CONFIG = {
  totalDays: 27,
};

export const stops = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Day 1 — Auckland arrival
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "auckland",
    name: "Auckland",
    description: "City of Sails — walking in the city center and good food.",
    coords: [-36.8485, 174.7633],
    type: "destination",
    day: 1,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 2 — Waiheke Island (ferry + bike)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "auckland-harbour",
    name: "Auckland Harbour",
    description: "Ferry terminal for Waiheke Island.",
    coords: [-36.8440, 174.7670],
    type: "destination",
    day: 2,
  },
  {
    id: "waiheke",
    name: "Waiheke Island",
    description: "Beautiful island with wineries and beaches.",
    coords: [-36.8011, 175.0878],
    type: "destination",
    day: 2,
  },
  {
    id: "waiheke-bike",
    name: "Waiheke eBike Tour",
    description: "Explore Waiheke Island wineries and beaches with eBikes.",
    coords: [-36.7880, 175.0650],
    type: "bike",
    day: 2,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 3 — Fly to Queenstown, Roys Peak, Red Bridge campground
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "queenstown",
    name: "Queenstown",
    description: "Adventure capital of NZ — pick up campervan.",
    coords: [-45.0312, 168.6626],
    type: "destination",
    day: 3,
  },
  {
    id: "crown-range",
    name: "Crown Range",
    description: "Scenic mountain road between Queenstown and Wanaka.",
    coords: [-44.9500, 168.9300],
    type: "destination",
    day: 3,
  },
  {
    id: "wanaka",
    name: "Wanaka",
    description: "Laid-back lakeside town — campervan pickup.",
    coords: [-44.6950, 169.1320],
    type: "destination",
    day: 3,
  },
  {
    id: "roys-peak",
    name: "Roys Peak",
    description: "Iconic Wanaka viewpoint — stunning panorama over lake and mountains.",
    coords: [-44.6980, 169.0440],
    type: "hike",
    day: 3,
  },
  {
    id: "red-bridge-camp",
    name: "Red Bridge Campground",
    description: "Scenic DOC campsite near Lake Hawea.",
    coords: [-44.7287, 169.2826],
    type: "camp",
    day: 3,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 4 — Grocery shopping, drive to Te Anau
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "queenstown-paknsave",
    name: "Queenstown PackNSave",
    description: "Grocery shopping for the road ahead.",
    coords: [-45.0100, 168.7400],
    type: "destination",
    day: 4,
  },
  {
    id: "te-anau",
    name: "Te Anau Top 10 Camping",
    description: "Gateway to Fiordland — peaceful lakeside town.",
    coords: [-45.4147, 167.7181],
    type: "camp",
    day: 4,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 5 — Lake Marian, Lake Gunn, Cascade Creek
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "lake-marian",
    name: "Lake Marian",
    description: "Stunning alpine lake with mirror reflections.",
    coords: [-44.8055, 168.0828],
    type: "hike",
    day: 5,
  },
  {
    id: "lake-gunn",
    name: "Lake Gunn Nature Walk",
    description: "Ancient beech forest walk.",
    coords: [-44.9364, 168.0503],
    type: "hike",
    day: 5,
  },
  {
    id: "cascade-creek",
    name: "Cascade Creek Campsite",
    description: "Beautiful DOC campsite in the heart of Fiordland.",
    coords: [-44.8939, 168.0756],
    type: "camp",
    day: 5,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 6 — Milford Sound cruise, Gertrude Saddle, back to Te Anau
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "milford-sound",
    name: "Milford Sound",
    description: "Iconic fiord — waterfalls and wildlife cruise.",
    coords: [-44.6714, 167.9269],
    type: "destination",
    day: 6,
  },
  {
    id: "gertrude-saddle",
    name: "Gertrude Saddle",
    description: "Challenging climb with breathtaking views.",
    coords: [-44.7750, 167.9900],
    type: "hike",
    day: 6,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 7 — Rent camping gear, Earnslaw Burn (tent camping)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "queenstown-small-planet",
    name: "Queenstown Small Planet",
    description: "Camping gear rental.",
    coords: [-45.0310, 168.6630],
    type: "destination",
    day: 7,
  },
  {
    id: "earnslaw-burn-parking",
    name: "Earnslaw Burn Trailhead",
    description: "Trailhead parking for the Earnslaw Burn Track.",
    coords: [-44.7404, 168.4105],
    type: "destination",
    day: 7,
  },
  {
    id: "earnslaw-burn",
    name: "Earnslaw Burn",
    description: "Into the valley near hanging glacier — tent camping overnight.",
    coords: [-44.7543, 168.3478],
    type: "hike",
    day: 7,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 8 — Return from Earnslaw Burn, Queenstown
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "queenstown-camp",
    name: "Queenstown Campsite",
    description: "Back in Queenstown for the night.",
    coords: [-45.0312, 168.6626],
    type: "camp",
    day: 8,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 9 — Christmas Eve in Arrowtown
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "arrowtown",
    name: "Hampshire Holiday Parks - Arrowtown",
    description: "Christmas Eve in a magical historic gold-mining village.",
    coords: [-44.9367, 168.8308],
    type: "camp",
    day: 9,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 10 — Arrowtown → Lake Tekapo area
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "lake-tekapo",
    name: "Lake Tekapo",
    description: "Turquoise glacier-fed lake — walking in Tekapo.",
    coords: [-44.0033, 170.4820],
    type: "destination",
    day: 10,
  },
  {
    id: "mackenzie-rv-camp",
    name: "Mackenzie Waitaki RV Camping",
    description: "Scenic camping with mountain views.",
    coords: [-44.0619, 170.5031],
    type: "camp",
    day: 10,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 11 — Tekapo Hot Springs, Lake Pukaki
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tekapo-spa",
    name: "Tekapo Hot Springs",
    description: "Hot pools with stunning mountain and lake views.",
    coords: [-44.0033, 170.4820],
    type: "spa",
    day: 11,
  },
  {
    id: "lake-pukaki",
    name: "Lake Pukaki Overnight Parking",
    description: "Brilliant blue lake with views of Aoraki/Mt Cook.",
    coords: [-44.1845, 170.1510],
    type: "camp",
    day: 11,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 12 — Mt Cook hikes, Chamberlains Ford
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mt-cook",
    name: "Mount Cook Village",
    description: "Aoraki/Mt Cook — NZ's highest peak.",
    coords: [-43.7340, 170.0964],
    type: "destination",
    day: 12,
  },
  {
    id: "sealy-tarns",
    name: "Sealy Tarns Track",
    description: "Views of NZ's highest peak.",
    coords: [-43.7315, 170.0940],
    type: "hike",
    day: 12,
  },
  {
    id: "blue-lakes",
    name: "Blue Lakes & Tasman Glacier View",
    description: "Easy walk to turquoise lakes and glacier views.",
    coords: [-43.7200, 170.1800],
    type: "hike",
    day: 12,
  },
  {
    id: "chamberlains-ford",
    name: "Chamberlains Ford",
    description: "Peaceful freedom camping spot.",
    coords: [-43.6897, 172.3649],
    type: "camp",
    day: 12,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 13 — Christchurch, Akaroa kayaking
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "christchurch",
    name: "Christchurch",
    description: "Garden City — explore the city center.",
    coords: [-43.5321, 172.6362],
    type: "destination",
    day: 13,
  },
  {
    id: "akaroa",
    name: "Akaroa",
    description: "Charming French-inspired harbor town.",
    coords: [-43.8037, 172.9680],
    type: "camp",
    day: 13,
  },
  {
    id: "akaroa-kayaking",
    name: "Akaroa Harbour Kayaking",
    description: "Kayaking in Akaroa harbor and Lushington Bay.",
    coords: [-43.8100, 172.9550],
    type: "canoeing",
    day: 13,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 14 — Bealey Spur, Devils Punch Bowl, Jacksons
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "bealey-spur",
    name: "Bealey Spur Track",
    description: "Beautiful beech forest track with Southern Alps panorama.",
    coords: [-42.9580, 171.5880],
    type: "hike",
    day: 14,
  },
  {
    id: "devils-punch-bowl",
    name: "Devils Punch Bowl",
    description: "Short walk to dramatic 131m waterfall.",
    coords: [-42.9420, 171.5650],
    type: "hike",
    day: 14,
  },
  {
    id: "jacksons",
    name: "Jacksons Retreat Alpine Holiday Park",
    description: "Cozy West Coast holiday park.",
    coords: [-42.7466, 171.5130],
    type: "camp",
    day: 14,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 15 — Franz Josef
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "franz-josef",
    name: "Franz Josef",
    description: "Famous glacier town — restaurants and bars.",
    coords: [-43.3862, 170.1833],
    type: "destination",
    day: 15,
  },
  {
    id: "orange-sheep",
    name: "Orange Sheep Franz Josef",
    description: "Accommodation in Franz Josef.",
    coords: [-43.3870, 170.1840],
    type: "camp",
    day: 15,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 16 — Alex Knob, drive to Brewster trailhead
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "alex-knob",
    name: "Alex Knob Track",
    description: "Challenging summit hike with glacier and coastline views.",
    coords: [-43.4080, 170.1420],
    type: "hike",
    day: 16,
  },
  {
    id: "brewster-trailhead",
    name: "Brewster Track Trailhead",
    description: "Campsite at the Brewster Hut trailhead.",
    coords: [-44.0894, 169.3508],
    type: "camp",
    day: 16,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 17 — Brewster Track, back to Red Bridge
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "brewster-hut",
    name: "Brewster Track",
    description: "Alpine adventure with panoramic glacier views.",
    coords: [-44.1067, 169.3175],
    type: "hike",
    day: 17,
  },
  {
    id: "red-bridge-camp-return",
    name: "Red Bridge Campground",
    description: "Back to Red Bridge near Wanaka.",
    coords: [-44.7287, 169.2826],
    type: "camp",
    day: 17,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 18 — Wanaka exploration
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "wanaka-center",
    name: "Wanaka Center",
    description: "Leave campervan, explore Wanaka city center.",
    coords: [-44.6950, 169.1320],
    type: "destination",
    day: 18,
  },
  {
    id: "hampshire-wanaka",
    name: "Hampshire Holiday Parks - Wanaka",
    description: "Rest day accommodation in Wanaka.",
    coords: [-44.6920, 169.1450],
    type: "camp",
    day: 18,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 19 — Bus to Queenstown, explore
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "queenstown-explore",
    name: "Queenstown",
    description: "Explore Queenstown city center.",
    coords: [-45.0312, 168.6626],
    type: "destination",
    day: 19,
  },
  {
    id: "black-sheep",
    name: "Black Sheep Backpackers",
    description: "Hostel in Queenstown.",
    coords: [-45.0320, 168.6610],
    type: "hostel",
    day: 19,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 20 — Fly to Wellington, explore, drive to Porirua
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "wellington",
    name: "Wellington",
    description: "Cuba Street, Cable Car, Botanic Garden.",
    coords: [-41.2865, 174.7762],
    type: "destination",
    day: 20,
  },
  {
    id: "porirua",
    name: "Porirua",
    description: "Airbnb in Porirua.",
    coords: [-41.1339, 174.8405],
    type: "hostel",
    day: 20,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 21 — Powell Hut, drive to Hastings
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "powell-hut-trailhead",
    name: "Powell Hut Trailhead",
    description: "Tararua Ranges trailhead.",
    coords: [-40.9300, 175.4650],
    type: "destination",
    day: 21,
  },
  {
    id: "powell-hut",
    name: "Powell Hut",
    description: "Challenging climb with incredible ridge views.",
    coords: [-40.9150, 175.4830],
    type: "hike",
    day: 21,
  },
  {
    id: "hastings",
    name: "Hastings",
    description: "Art deco town in Hawke's Bay wine country.",
    coords: [-39.6381, 176.8493],
    type: "hostel",
    day: 21,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 22 — Golf and winery in Hastings
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hastings-golf",
    name: "Hastings Golf",
    description: "Morning golf session.",
    coords: [-39.6100, 176.8300],
    type: "destination",
    day: 22,
  },
  {
    id: "hastings-wine",
    name: "Hawke's Bay Wineries",
    description: "Winery tour through Hawke's Bay.",
    coords: [-39.6381, 176.8493],
    type: "destination",
    day: 22,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 23 — Surfing, Napier, Taupo spa, Turangi
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "waimarama",
    name: "Waimarama Beach",
    description: "Morning surf at Waimarama Beach.",
    coords: [-39.7870, 176.9920],
    type: "surfing",
    day: 23,
  },
  {
    id: "napier",
    name: "Napier",
    description: "Art deco city — lunch stop.",
    coords: [-39.4928, 176.9120],
    type: "destination",
    day: 23,
  },
  {
    id: "taupo",
    name: "Taupo",
    description: "Lakeside town on NZ's largest lake.",
    coords: [-38.6857, 176.0702],
    type: "destination",
    day: 23,
  },
  {
    id: "spa-park",
    name: "Spa Park Hot Pools",
    description: "Hot water beach and Otumuheke Stream.",
    coords: [-38.6840, 176.0620],
    type: "spa",
    day: 23,
  },
  {
    id: "turangi",
    name: "Turangi",
    description: "Gateway to Tongariro.",
    coords: [-38.9900, 175.8100],
    type: "hostel",
    day: 23,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 24 — Tongariro Alpine Crossing, Rotorua
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tongariro-start",
    name: "Tongariro Crossing Start",
    description: "Mangatepopo car park.",
    coords: [-39.1330, 175.5720],
    type: "destination",
    day: 24,
  },
  {
    id: "tongariro",
    name: "Tongariro Alpine Crossing",
    description: "NZ's best day hike — emerald lakes, volcanic craters.",
    coords: [-39.1150, 175.6480],
    type: "hike",
    day: 24,
  },
  {
    id: "rotorua",
    name: "Rotorua",
    description: "Geothermal wonderland — explore city center.",
    coords: [-38.1368, 176.2497],
    type: "hostel",
    day: 24,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 25 — Rafting, Mt Maunganui, Tairua
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "kaituna-cascades",
    name: "Kaituna Cascades",
    description: "White water rafting with 7-meter Tutea Falls.",
    coords: [-38.0167, 176.3833],
    type: "rafting",
    day: 25,
  },
  {
    id: "mt-maunganui",
    name: "Mount Maunganui",
    description: "Base loop track with ocean views.",
    coords: [-37.6318, 176.1711],
    type: "hike",
    day: 25,
  },
  {
    id: "tairua",
    name: "Tairua",
    description: "Coromandel Peninsula coastal town.",
    coords: [-36.9930, 175.8450],
    type: "hostel",
    day: 25,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 26 — The Pinnacles hike
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "pinnacles-trailhead",
    name: "The Pinnacles Trailhead",
    description: "Trailhead for The Pinnacles.",
    coords: [-36.9700, 175.7600],
    type: "destination",
    day: 26,
  },
  {
    id: "pinnacles",
    name: "The Pinnacles",
    description: "Native forest and peninsula views.",
    coords: [-36.9580, 175.7500],
    type: "hike",
    day: 26,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 27 — Sailors Grave beach, Auckland Airport, fly home
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "sailors-grave",
    name: "Sailors Grave Beach",
    description: "Beautiful secluded beach near Tairua — last taste of paradise.",
    coords: [-36.9565, 175.8419],
    type: "destination",
    day: 27,
  },
  {
    id: "auckland-airport",
    name: "Auckland Airport",
    description: "Return rental car — time to fly home.",
    coords: [-37.0082, 174.7850],
    type: "destination",
    day: 27,
  },
  {
    id: "home",
    name: "Home",
    description: "Back home — what a trip!",
    coords: [-33.0, 170.0],
    type: "plane",
    day: 27,
  },
];

export const routes = [
  // ═══════════════════════════════════════════════════════════════════════════
  // Day 2: Auckland → Waiheke Island (ferry + bike)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "auckland-harbour-ferry",
    from: "auckland",
    to: "auckland-harbour",
    day: 2,
    mode: "drive",
    waypoints: [
      [-36.8485, 174.7633],
      [-36.8440, 174.7670],
    ],
  },
  {
    id: "auckland-waiheke",
    from: "auckland-harbour",
    to: "waiheke",
    day: 2,
    mode: "ferry",
    waypoints: [
      [-36.8440, 174.7670],
      [-36.838, 174.810],
      [-36.830, 174.860],
      [-36.822, 174.915],
      [-36.814, 174.970],
      [-36.808, 175.030],
      [-36.801, 175.088],
    ],
  },
  {
    id: "waiheke-bike-tour",
    from: "waiheke",
    to: "waiheke-bike",
    day: 2,
    mode: "bike",
    waypoints: [
      [-36.801, 175.088],
      [-36.792, 175.075],
      [-36.785, 175.060],
      [-36.778, 175.045],
      [-36.770, 175.030],
      [-36.765, 175.015],
      [-36.775, 175.000],
      [-36.788, 175.020],
      [-36.795, 175.040],
      [-36.788, 175.065],
    ],
  },
  {
    id: "waiheke-bike-return",
    from: "waiheke-bike",
    to: "waiheke",
    day: 2,
    mode: "bike",
    waypoints: [
      [-36.788, 175.065],
      [-36.795, 175.075],
      [-36.801, 175.088],
    ],
  },
  {
    id: "waiheke-auckland",
    from: "waiheke",
    to: "auckland-harbour",
    day: 2,
    mode: "ferry",
    waypoints: [
      [-36.801, 175.088],
      [-36.808, 175.030],
      [-36.814, 174.970],
      [-36.822, 174.915],
      [-36.830, 174.860],
      [-36.838, 174.810],
      [-36.8440, 174.7670],
    ],
  },
  {
    id: "harbour-auckland",
    from: "auckland-harbour",
    to: "auckland",
    day: 2,
    mode: "drive",
    waypoints: [
      [-36.8440, 174.7670],
      [-36.8485, 174.7633],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 3: Fly to Queenstown, Crown Range, Roys Peak, Red Bridge
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "auckland-queenstown",
    from: "auckland",
    to: "queenstown",
    day: 3,
    mode: "fly",
    waypoints: [
      [-36.8485, 174.7633],
      [-38.5, 173.5],
      [-40.5, 172.0],
      [-42.5, 170.5],
      [-44.0, 169.5],
      [-45.0312, 168.6626],
    ],
  },
  {
    id: "queenstown-crown-range",
    from: "queenstown",
    to: "crown-range",
    day: 3,
    mode: "drive",
    waypoints: [
      [-45.0312, 168.6626],
      [-45.000, 168.720],
      [-44.980, 168.780],
      [-44.960, 168.850],
      [-44.9500, 168.9300],
    ],
  },
  {
    id: "crown-range-wanaka",
    from: "crown-range",
    to: "wanaka",
    day: 3,
    mode: "drive",
    waypoints: [
      [-44.9500, 168.9300],
      [-44.880, 169.000],
      [-44.800, 169.060],
      [-44.750, 169.100],
      [-44.6950, 169.1320],
    ],
  },
  {
    id: "wanaka-roys-trailhead",
    from: "wanaka",
    to: "roys-peak",
    day: 3,
    mode: "drive",
    waypoints: [
      [-44.6950, 169.1320],
      [-44.690, 169.110],
      [-44.680, 169.090],
      [-44.671, 169.064],
    ],
  },
  {
    id: "roys-peak-up",
    from: "roys-peak",
    to: "roys-peak",
    day: 3,
    mode: "hike",
    waypoints: [
      [-44.671, 169.064],
      [-44.675, 169.058],
      [-44.680, 169.053],
      [-44.684, 169.050],
      [-44.688, 169.047],
      [-44.691, 169.045],
      [-44.694, 169.044],
      [-44.698, 169.044],
    ],
  },
  {
    id: "roys-peak-down",
    from: "roys-peak",
    to: "roys-peak",
    day: 3,
    mode: "hike",
    waypoints: [
      [-44.698, 169.044],
      [-44.694, 169.044],
      [-44.691, 169.045],
      [-44.688, 169.047],
      [-44.684, 169.050],
      [-44.680, 169.053],
      [-44.675, 169.058],
      [-44.671, 169.064],
    ],
  },
  {
    id: "roys-red-bridge",
    from: "roys-peak",
    to: "red-bridge-camp",
    day: 3,
    mode: "drive",
    waypoints: [
      [-44.671, 169.064],
      [-44.680, 169.090],
      [-44.695, 169.132],
      [-44.710, 169.180],
      [-44.720, 169.230],
      [-44.7287, 169.2826],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 4: Red Bridge → PackNSave → Te Anau
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "red-bridge-paknsave",
    from: "red-bridge-camp",
    to: "queenstown-paknsave",
    day: 4,
    mode: "drive",
    waypoints: [
      [-44.7287, 169.2826],
      [-44.720, 169.200],
      [-44.710, 169.150],
      [-44.695, 169.132],
      [-44.750, 169.100],
      [-44.800, 169.060],
      [-44.880, 169.000],
      [-44.9500, 168.9300],
      [-44.980, 168.850],
      [-44.990, 168.790],
      [-45.0100, 168.7400],
    ],
  },
  {
    id: "paknsave-te-anau",
    from: "queenstown-paknsave",
    to: "te-anau",
    day: 4,
    mode: "drive",
    waypoints: [
      [-45.0100, 168.7400],
      [-45.05, 168.68],
      [-45.10, 168.70],
      [-45.18, 168.72],
      [-45.25, 168.72],
      [-45.338, 168.719],
      [-45.42, 168.62],
      [-45.47, 168.56],
      [-45.52, 168.48],
      [-45.55, 168.42],
      [-45.62, 168.32],
      [-45.69, 168.21],
      [-45.60, 168.00],
      [-45.52, 167.85],
      [-45.4147, 167.7181],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 5: Te Anau → Lake Marian → Lake Gunn → Cascade Creek
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "te-anau-lake-marian",
    from: "te-anau",
    to: "lake-marian",
    day: 5,
    mode: "drive",
    waypoints: [
      [-45.4147, 167.7181],
      [-45.370, 167.740],
      [-45.320, 167.770],
      [-45.270, 167.800],
      [-45.218, 167.830],
      [-45.165, 167.855],
      [-45.110, 167.880],
      [-45.058, 167.908],
      [-45.010, 167.930],
      [-44.962, 167.952],
      [-44.900, 168.020],
      [-44.850, 168.080],
      [-44.7893, 168.1285],
    ],
  },
  {
    id: "lake-marian-up",
    from: "lake-marian",
    to: "lake-marian",
    day: 5,
    mode: "hike",
    waypoints: [
      [-44.7893, 168.1285],
      [-44.793, 168.120],
      [-44.798, 168.110],
      [-44.802, 168.098],
      [-44.8055, 168.0828],
    ],
  },
  {
    id: "lake-marian-down",
    from: "lake-marian",
    to: "lake-marian",
    day: 5,
    mode: "hike",
    waypoints: [
      [-44.8055, 168.0828],
      [-44.802, 168.098],
      [-44.798, 168.110],
      [-44.793, 168.120],
      [-44.7893, 168.1285],
    ],
  },
  {
    id: "lake-marian-cascade",
    from: "lake-marian",
    to: "cascade-creek",
    day: 5,
    mode: "drive",
    waypoints: [
      [-44.7893, 168.1285],
      [-44.830, 168.095],
      [-44.860, 168.082],
      [-44.8939, 168.0756],
    ],
  },
  {
    id: "cascade-lake-gunn",
    from: "cascade-creek",
    to: "lake-gunn",
    day: 5,
    mode: "drive",
    waypoints: [
      [-44.8939, 168.0756],
      [-44.9200, 168.0600],
      [-44.9364, 168.0503],
    ],
  },
  {
    id: "lake-gunn-walk",
    from: "lake-gunn",
    to: "lake-gunn",
    day: 5,
    mode: "hike",
    waypoints: [
      [-44.9364, 168.0503],
      [-44.934, 168.055],
      [-44.932, 168.060],
      [-44.930, 168.055],
      [-44.932, 168.052],
      [-44.9364, 168.0503],
    ],
  },
  {
    id: "lake-gunn-cascade",
    from: "lake-gunn",
    to: "cascade-creek",
    day: 5,
    mode: "drive",
    waypoints: [
      [-44.9364, 168.0503],
      [-44.9200, 168.0600],
      [-44.8939, 168.0756],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 6: Cascade Creek → Milford Sound → Gertrude Saddle → Te Anau
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "cascade-milford",
    from: "cascade-creek",
    to: "milford-sound",
    day: 6,
    mode: "drive",
    waypoints: [
      [-44.8939, 168.0756],
      [-44.850, 168.050],
      [-44.810, 168.020],
      [-44.770, 167.990],
      [-44.740, 167.965],
      [-44.710, 167.950],
      [-44.690, 167.940],
      [-44.6714, 167.9269],
    ],
  },
  {
    id: "milford-cruise",
    from: "milford-sound",
    to: "milford-sound",
    day: 6,
    mode: "ferry",
    waypoints: [
      // Depart from Freshwater Basin terminal
      [-44.6714, 167.9269],
      [-44.6690, 167.9230],
      // Head out along eastern side of fjord, passing Mitre Peak views
      [-44.6650, 167.9180],
      [-44.6600, 167.9120],
      [-44.6540, 167.9050],
      [-44.6480, 167.8980],
      // Continue down fjord, slight curve following eastern shore
      [-44.6420, 167.8900],
      [-44.6350, 167.8820],
      [-44.6280, 167.8740],
      [-44.6200, 167.8650],
      // Approaching The Elephant and narrows
      [-44.6120, 167.8560],
      [-44.6040, 167.8470],
      [-44.5960, 167.8380],
      // Near Dale Point, fjord widens toward mouth
      [-44.5880, 167.8280],
      [-44.5800, 167.8180],
      // Approaching Anita Bay and St Anne Point
      [-44.5720, 167.8100],
      [-44.5650, 167.8020],
      // Near the mouth - views of Tasman Sea
      [-44.5580, 167.7950],
      [-44.5530, 167.7900],
      // Brief venture toward open sea, seal rocks
      [-44.5480, 167.7840],
      [-44.5450, 167.7800],
      // Turn and head back along western shore
      [-44.5480, 167.7760],
      [-44.5530, 167.7720],
      [-44.5600, 167.7780],
      // Return route - western side closer to waterfalls
      [-44.5680, 167.7860],
      [-44.5760, 167.7940],
      [-44.5840, 167.8020],
      // Passing Fairy Falls area
      [-44.5920, 167.8100],
      [-44.6000, 167.8190],
      [-44.6080, 167.8280],
      // Approaching Stirling Falls - boat goes close!
      [-44.6160, 167.8370],
      [-44.6220, 167.8440],
      [-44.6260, 167.8500],
      // Close to Stirling Falls spray
      [-44.6280, 167.8540],
      [-44.6300, 167.8580],
      // Continue back toward terminal along western shore
      [-44.6360, 167.8660],
      [-44.6420, 167.8750],
      [-44.6480, 167.8850],
      // Passing Mitre Peak on port side now
      [-44.6540, 167.8950],
      [-44.6600, 167.9050],
      [-44.6650, 167.9140],
      [-44.6690, 167.9200],
      // Return to Freshwater Basin terminal
      [-44.6714, 167.9269],
    ],
  },
  {
    id: "milford-gertrude",
    from: "milford-sound",
    to: "gertrude-saddle",
    day: 6,
    mode: "drive",
    waypoints: [
      [-44.6714, 167.9269],
      [-44.690, 167.940],
      [-44.710, 167.950],
      [-44.740, 167.965],
      [-44.762, 168.020],
    ],
  },
  {
    id: "gertrude-saddle-up",
    from: "gertrude-saddle",
    to: "gertrude-saddle",
    day: 6,
    mode: "hike",
    waypoints: [
      [-44.762, 168.020],
      [-44.765, 168.013],
      [-44.768, 168.006],
      [-44.770, 167.998],
      [-44.773, 167.993],
      [-44.775, 167.990],
    ],
  },
  {
    id: "gertrude-saddle-down",
    from: "gertrude-saddle",
    to: "gertrude-saddle",
    day: 6,
    mode: "hike",
    waypoints: [
      [-44.775, 167.990],
      [-44.773, 167.993],
      [-44.770, 167.998],
      [-44.768, 168.006],
      [-44.765, 168.013],
      [-44.762, 168.020],
    ],
  },
  {
    id: "gertrude-te-anau",
    from: "gertrude-saddle",
    to: "te-anau",
    day: 6,
    mode: "drive",
    waypoints: [
      [-44.762, 168.020],
      [-44.800, 168.045],
      [-44.850, 168.050],
      [-44.890, 167.990],
      [-44.922, 167.975],
      [-44.962, 167.952],
      [-45.010, 167.930],
      [-45.058, 167.908],
      [-45.110, 167.880],
      [-45.165, 167.855],
      [-45.218, 167.830],
      [-45.270, 167.800],
      [-45.320, 167.770],
      [-45.370, 167.740],
      [-45.4147, 167.7181],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 7: Te Anau → Queenstown Small Planet → Earnslaw Burn (tent)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "te-anau-small-planet",
    from: "te-anau",
    to: "queenstown-small-planet",
    day: 7,
    mode: "drive",
    waypoints: [
      [-45.4147, 167.7181],
      [-45.52, 167.85],
      [-45.60, 168.00],
      [-45.69, 168.21],
      [-45.62, 168.32],
      [-45.55, 168.42],
      [-45.47, 168.56],
      [-45.42, 168.62],
      [-45.338, 168.719],
      [-45.25, 168.72],
      [-45.18, 168.72],
      [-45.10, 168.70],
      [-45.05, 168.68],
      [-45.0310, 168.6630],
    ],
  },
  {
    id: "small-planet-earnslaw",
    from: "queenstown-small-planet",
    to: "earnslaw-burn-parking",
    day: 7,
    mode: "drive",
    waypoints: [
      [-45.0310, 168.6630],
      [-45.005, 168.625],
      [-44.975, 168.580],
      [-44.945, 168.535],
      [-44.915, 168.490],
      [-44.885, 168.445],
      [-44.8485, 168.3822],
      [-44.800, 168.395],
      [-44.7600, 168.405],
      [-44.7404, 168.4105],
    ],
  },
  {
    id: "earnslaw-burn-up",
    from: "earnslaw-burn-parking",
    to: "earnslaw-burn",
    day: 7,
    mode: "hike",
    waypoints: [
      [-44.7404, 168.4105],
      [-44.750, 168.390],
      [-44.755, 168.370],
      [-44.7543, 168.3478],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 8: Earnslaw Burn return → Queenstown campsite
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "earnslaw-burn-down",
    from: "earnslaw-burn",
    to: "earnslaw-burn-parking",
    day: 8,
    mode: "hike",
    waypoints: [
      [-44.7543, 168.3478],
      [-44.755, 168.370],
      [-44.750, 168.390],
      [-44.7404, 168.4105],
    ],
  },
  {
    id: "earnslaw-queenstown",
    from: "earnslaw-burn-parking",
    to: "queenstown-camp",
    day: 8,
    mode: "drive",
    waypoints: [
      [-44.7404, 168.4105],
      [-44.7600, 168.405],
      [-44.800, 168.395],
      [-44.8485, 168.3822],
      [-44.885, 168.445],
      [-44.915, 168.490],
      [-44.945, 168.535],
      [-44.975, 168.580],
      [-45.005, 168.625],
      [-45.0312, 168.6626],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 9: Queenstown → Arrowtown (Christmas Eve)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "queenstown-arrowtown",
    from: "queenstown-camp",
    to: "arrowtown",
    day: 9,
    mode: "drive",
    waypoints: [
      [-45.0312, 168.6626],
      [-45.020, 168.700],
      [-45.005, 168.735],
      [-44.990, 168.765],
      [-44.975, 168.790],
      [-44.960, 168.810],
      [-44.9367, 168.8308],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 10: Arrowtown → Lake Tekapo → Mackenzie RV Camping
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "arrowtown-tekapo",
    from: "arrowtown",
    to: "lake-tekapo",
    day: 10,
    mode: "drive",
    waypoints: [
      [-44.9367, 168.8308],
      [-44.960, 168.870],
      [-44.988, 168.920],
      [-45.010, 168.980],
      [-45.030, 169.040],
      [-45.038, 169.100],
      [-45.035, 169.160],
      [-45.020, 169.220],
      [-44.988, 169.280],
      [-44.948, 169.340],
      [-44.900, 169.400],
      [-44.845, 169.460],
      [-44.785, 169.520],
      [-44.720, 169.580],
      [-44.650, 169.650],
      [-44.575, 169.730],
      [-44.495, 169.820],
      [-44.410, 169.910],
      [-44.320, 170.005],
      [-44.230, 170.105],
      [-44.140, 170.210],
      [-44.060, 170.320],
      [-44.0033, 170.4820],
    ],
  },
  {
    id: "tekapo-mackenzie",
    from: "lake-tekapo",
    to: "mackenzie-rv-camp",
    day: 10,
    mode: "drive",
    waypoints: [
      [-44.0033, 170.4820],
      [-44.0300, 170.490],
      [-44.0619, 170.5031],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 11: Mackenzie → Tekapo Hot Springs → Lake Pukaki
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "mackenzie-spa",
    from: "mackenzie-rv-camp",
    to: "tekapo-spa",
    day: 11,
    mode: "drive",
    waypoints: [
      [-44.0619, 170.5031],
      [-44.0300, 170.490],
      [-44.0033, 170.4820],
    ],
  },
  {
    id: "spa-session",
    from: "tekapo-spa",
    to: "tekapo-spa",
    day: 11,
    mode: "spa",
    waypoints: [
      [-44.0033, 170.4820],
      [-44.0030, 170.4825],
      [-44.0028, 170.4830],
      [-44.0030, 170.4825],
      [-44.0033, 170.4820],
    ],
  },
  {
    id: "spa-pukaki",
    from: "tekapo-spa",
    to: "lake-pukaki",
    day: 11,
    mode: "drive",
    waypoints: [
      [-44.0033, 170.4820],
      [-44.02, 170.40],
      [-44.05, 170.32],
      [-44.08, 170.25],
      [-44.11, 170.20],
      [-44.14, 170.17],
      [-44.1845, 170.1510],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 12: Lake Pukaki → Mt Cook → Sealy Tarns → Blue Lakes → Chamberlains Ford
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "pukaki-mtcook",
    from: "lake-pukaki",
    to: "mt-cook",
    day: 12,
    mode: "drive",
    waypoints: [
      [-44.1845, 170.1510],
      [-44.10, 170.12],
      [-44.00, 170.11],
      [-43.90, 170.10],
      [-43.80, 170.098],
      [-43.7340, 170.0964],
    ],
  },
  {
    id: "sealy-tarns-up",
    from: "mt-cook",
    to: "sealy-tarns",
    day: 12,
    mode: "hike",
    waypoints: [
      [-43.7340, 170.0964],
      [-43.733, 170.095],
      [-43.732, 170.094],
      [-43.7315, 170.0940],
    ],
  },
  {
    id: "sealy-tarns-down",
    from: "sealy-tarns",
    to: "mt-cook",
    day: 12,
    mode: "hike",
    waypoints: [
      [-43.7315, 170.0940],
      [-43.732, 170.094],
      [-43.733, 170.095],
      [-43.7340, 170.0964],
    ],
  },
  {
    id: "mtcook-blue-lakes",
    from: "mt-cook",
    to: "blue-lakes",
    day: 12,
    mode: "drive",
    waypoints: [
      [-43.7340, 170.0964],
      [-43.730, 170.120],
      [-43.725, 170.150],
      [-43.7200, 170.1800],
    ],
  },
  {
    id: "blue-lakes-hike",
    from: "blue-lakes",
    to: "blue-lakes",
    day: 12,
    mode: "hike",
    waypoints: [
      [-43.7200, 170.1800],
      [-43.718, 170.185],
      [-43.715, 170.190],
      [-43.718, 170.185],
      [-43.7200, 170.1800],
    ],
  },
  {
    id: "blue-lakes-chamberlains",
    from: "blue-lakes",
    to: "chamberlains-ford",
    day: 12,
    mode: "drive",
    waypoints: [
      [-43.7200, 170.1800],
      [-43.730, 170.220],
      [-43.760, 170.300],
      [-43.800, 170.400],
      [-43.830, 170.520],
      [-43.850, 170.650],
      [-43.860, 170.800],
      [-43.855, 170.950],
      [-43.840, 171.100],
      [-43.820, 171.250],
      [-43.800, 171.400],
      [-43.780, 171.550],
      [-43.760, 171.700],
      [-43.740, 171.850],
      [-43.720, 172.000],
      [-43.705, 172.150],
      [-43.6950, 172.280],
      [-43.6897, 172.3649],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 13: Chamberlains Ford → Christchurch → Akaroa kayaking → Akaroa
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "chamberlains-christchurch",
    from: "chamberlains-ford",
    to: "christchurch",
    day: 13,
    mode: "drive",
    waypoints: [
      [-43.6897, 172.3649],
      [-43.670, 172.420],
      [-43.640, 172.480],
      [-43.610, 172.540],
      [-43.580, 172.590],
      [-43.5500, 172.6200],
      [-43.5321, 172.6362],
    ],
  },
  {
    id: "christchurch-akaroa",
    from: "christchurch",
    to: "akaroa",
    day: 13,
    mode: "drive",
    waypoints: [
      [-43.5321, 172.6362],
      [-43.548, 172.650],
      [-43.570, 172.665],
      [-43.592, 172.680],
      [-43.615, 172.698],
      [-43.638, 172.718],
      [-43.660, 172.740],
      [-43.680, 172.762],
      [-43.700, 172.788],
      [-43.720, 172.815],
      [-43.740, 172.843],
      [-43.758, 172.870],
      [-43.775, 172.898],
      [-43.790, 172.928],
      [-43.800, 172.952],
      [-43.8037, 172.9680],
    ],
  },
  {
    id: "akaroa-kayaking",
    from: "akaroa",
    to: "akaroa-kayaking",
    day: 13,
    mode: "canoeing",
    waypoints: [
      [-43.8037, 172.9680],
      [-43.810, 172.960],
      [-43.815, 172.950],
      [-43.820, 172.940],
      [-43.815, 172.950],
      [-43.810, 172.960],
      [-43.8100, 172.9550],
    ],
  },
  {
    id: "kayaking-akaroa",
    from: "akaroa-kayaking",
    to: "akaroa",
    day: 13,
    mode: "canoeing",
    waypoints: [
      [-43.8100, 172.9550],
      [-43.8037, 172.9680],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 14: Akaroa → Bealey Spur → Devils Punch Bowl → Jacksons
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "akaroa-bealey",
    from: "akaroa",
    to: "bealey-spur",
    day: 14,
    mode: "drive",
    waypoints: [
      [-43.8037, 172.9680],
      [-43.800, 172.952],
      [-43.790, 172.928],
      [-43.775, 172.898],
      [-43.758, 172.870],
      [-43.740, 172.843],
      [-43.720, 172.815],
      [-43.700, 172.788],
      [-43.680, 172.762],
      [-43.660, 172.740],
      [-43.638, 172.718],
      [-43.615, 172.698],
      [-43.592, 172.680],
      [-43.570, 172.665],
      [-43.548, 172.650],
      [-43.5321, 172.6362],
      [-43.520, 172.540],
      [-43.505, 172.445],
      [-43.488, 172.350],
      [-43.468, 172.258],
      [-43.445, 172.168],
      [-43.420, 172.080],
      [-43.393, 171.995],
      [-43.365, 171.915],
      [-43.335, 171.840],
      [-43.302, 171.770],
      [-43.268, 171.708],
      [-43.232, 171.655],
      [-43.195, 171.615],
      [-43.155, 171.585],
      [-43.112, 171.565],
      [-43.068, 171.558],
      [-43.025, 171.555],
      [-42.980, 171.555],
      [-42.9580, 171.5880],
    ],
  },
  {
    id: "bealey-spur-up",
    from: "bealey-spur",
    to: "bealey-spur",
    day: 14,
    mode: "hike",
    waypoints: [
      [-42.9580, 171.5880],
      [-42.955, 171.592],
      [-42.952, 171.596],
      [-42.955, 171.592],
      [-42.9580, 171.5880],
    ],
  },
  {
    id: "bealey-devils",
    from: "bealey-spur",
    to: "devils-punch-bowl",
    day: 14,
    mode: "drive",
    waypoints: [
      [-42.9580, 171.5880],
      [-42.950, 171.575],
      [-42.9420, 171.5650],
    ],
  },
  {
    id: "devils-punch-bowl-walk",
    from: "devils-punch-bowl",
    to: "devils-punch-bowl",
    day: 14,
    mode: "hike",
    waypoints: [
      [-42.9420, 171.5650],
      [-42.940, 171.568],
      [-42.938, 171.570],
      [-42.940, 171.568],
      [-42.9420, 171.5650],
    ],
  },
  {
    id: "devils-jacksons",
    from: "devils-punch-bowl",
    to: "jacksons",
    day: 14,
    mode: "drive",
    waypoints: [
      [-42.9420, 171.5650],
      [-42.900, 171.555],
      [-42.855, 171.540],
      [-42.810, 171.528],
      [-42.765, 171.520],
      [-42.7466, 171.5130],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 15: Jacksons → Franz Josef
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "jacksons-franz-josef",
    from: "jacksons",
    to: "franz-josef",
    day: 15,
    mode: "drive",
    waypoints: [
      [-42.7466, 171.5130],
      [-42.740, 171.460],
      [-42.758, 171.408],
      [-42.775, 171.355],
      [-42.730, 171.310],
      [-42.710, 171.260],
      [-42.698, 171.208],
      [-42.688, 171.155],
      [-42.680, 171.100],
      [-42.690, 171.045],
      [-42.710, 170.990],
      [-42.735, 170.938],
      [-42.765, 170.885],
      [-42.800, 170.835],
      [-42.840, 170.788],
      [-42.885, 170.740],
      [-42.932, 170.695],
      [-42.980, 170.650],
      [-43.030, 170.600],
      [-43.080, 170.548],
      [-43.130, 170.495],
      [-43.180, 170.440],
      [-43.230, 170.385],
      [-43.280, 170.328],
      [-43.330, 170.268],
      [-43.3862, 170.1833],
    ],
  },
  {
    id: "franz-orange-sheep",
    from: "franz-josef",
    to: "orange-sheep",
    day: 15,
    mode: "drive",
    waypoints: [
      [-43.3862, 170.1833],
      [-43.3870, 170.1840],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 16: Alex Knob hike → Brewster trailhead
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "orange-sheep-alex",
    from: "orange-sheep",
    to: "alex-knob",
    day: 16,
    mode: "drive",
    waypoints: [
      [-43.3870, 170.1840],
      [-43.3900, 170.1700],
      [-43.4000, 170.1500],
    ],
  },
  {
    id: "alex-knob-up",
    from: "alex-knob",
    to: "alex-knob",
    day: 16,
    mode: "hike",
    waypoints: [
      [-43.4000, 170.1500],
      [-43.402, 170.148],
      [-43.405, 170.145],
      [-43.4080, 170.1420],
      [-43.405, 170.145],
      [-43.402, 170.148],
      [-43.4000, 170.1500],
    ],
  },
  {
    id: "alex-brewster",
    from: "alex-knob",
    to: "brewster-trailhead",
    day: 16,
    mode: "drive",
    waypoints: [
      [-43.4000, 170.1500],
      [-43.3862, 170.1833],
      [-43.4640, 170.0178],
      [-43.52, 169.88],
      [-43.58, 169.75],
      [-43.65, 169.55],
      [-43.72, 169.35],
      [-43.80, 169.15],
      [-43.8810, 169.0420],
      [-43.92, 169.10],
      [-43.96, 169.18],
      [-44.00, 169.25],
      [-44.04, 169.30],
      [-44.0894, 169.3508],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 17: Brewster Track → Red Bridge campground
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "brewster-hut-up",
    from: "brewster-trailhead",
    to: "brewster-hut",
    day: 17,
    mode: "hike",
    waypoints: [
      [-44.0894, 169.3508],
      [-44.093, 169.345],
      [-44.097, 169.338],
      [-44.100, 169.330],
      [-44.103, 169.325],
      [-44.1067, 169.3175],
    ],
  },
  {
    id: "brewster-hut-down",
    from: "brewster-hut",
    to: "brewster-trailhead",
    day: 17,
    mode: "hike",
    waypoints: [
      [-44.1067, 169.3175],
      [-44.103, 169.325],
      [-44.100, 169.330],
      [-44.097, 169.338],
      [-44.093, 169.345],
      [-44.0894, 169.3508],
    ],
  },
  {
    id: "brewster-red-bridge",
    from: "brewster-trailhead",
    to: "red-bridge-camp-return",
    day: 17,
    mode: "drive",
    waypoints: [
      [-44.0894, 169.3508],
      [-44.12, 169.35],
      [-44.18, 169.32],
      [-44.25, 169.28],
      [-44.32, 169.25],
      [-44.40, 169.22],
      [-44.50, 169.18],
      [-44.58, 169.15],
      [-44.65, 169.14],
      [-44.695, 169.132],
      [-44.710, 169.180],
      [-44.720, 169.230],
      [-44.7287, 169.2826],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 18: Red Bridge → Wanaka center → Hampshire Wanaka
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "red-bridge-wanaka",
    from: "red-bridge-camp-return",
    to: "wanaka-center",
    day: 18,
    mode: "drive",
    waypoints: [
      [-44.7287, 169.2826],
      [-44.720, 169.230],
      [-44.710, 169.180],
      [-44.695, 169.132],
    ],
  },
  {
    id: "wanaka-hampshire",
    from: "wanaka-center",
    to: "hampshire-wanaka",
    day: 18,
    mode: "drive",
    waypoints: [
      [-44.695, 169.132],
      [-44.6920, 169.1450],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 19: Bus Wanaka → Queenstown, explore
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hampshire-queenstown-bus",
    from: "hampshire-wanaka",
    to: "queenstown-explore",
    day: 19,
    mode: "drive",
    waypoints: [
      [-44.6920, 169.1450],
      [-44.718, 169.088],
      [-44.733, 169.063],
      [-44.751, 169.038],
      [-44.773, 169.010],
      [-44.795, 168.985],
      [-44.818, 168.962],
      [-44.838, 168.940],
      [-44.855, 168.912],
      [-44.872, 168.883],
      [-44.890, 168.857],
      [-44.905, 168.828],
      [-44.917, 168.800],
      [-44.929, 168.775],
      [-44.943, 168.758],
      [-44.963, 168.748],
      [-44.982, 168.734],
      [-44.998, 168.713],
      [-45.017, 168.688],
      [-45.0312, 168.6626],
    ],
  },
  {
    id: "queenstown-black-sheep",
    from: "queenstown-explore",
    to: "black-sheep",
    day: 19,
    mode: "drive",
    waypoints: [
      [-45.0312, 168.6626],
      [-45.0320, 168.6610],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 20: Fly Queenstown → Wellington, explore, drive to Porirua
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "queenstown-wellington",
    from: "black-sheep",
    to: "wellington",
    day: 20,
    mode: "fly",
    waypoints: [
      [-45.0320, 168.6610],
      [-44.0, 170.0],
      [-43.0, 171.5],
      [-42.0, 173.0],
      [-41.2865, 174.7762],
    ],
  },
  {
    id: "wellington-porirua",
    from: "wellington",
    to: "porirua",
    day: 20,
    mode: "drive",
    waypoints: [
      [-41.2865, 174.7762],
      [-41.250, 174.790],
      [-41.210, 174.808],
      [-41.170, 174.825],
      [-41.1339, 174.8405],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 21: Porirua → Powell Hut → Hastings
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "porirua-powell-trailhead",
    from: "porirua",
    to: "powell-hut-trailhead",
    day: 21,
    mode: "drive",
    waypoints: [
      [-41.1339, 174.8405],
      [-41.100, 174.870],
      [-41.075, 174.920],
      [-41.055, 174.978],
      [-41.045, 175.050],
      [-41.048, 175.130],
      [-41.020, 175.220],
      [-40.980, 175.320],
      [-40.950, 175.400],
      [-40.9300, 175.4650],
    ],
  },
  {
    id: "powell-hut-up",
    from: "powell-hut-trailhead",
    to: "powell-hut",
    day: 21,
    mode: "hike",
    waypoints: [
      [-40.9300, 175.4650],
      [-40.925, 175.470],
      [-40.920, 175.477],
      [-40.9150, 175.4830],
    ],
  },
  {
    id: "powell-hut-down",
    from: "powell-hut",
    to: "powell-hut-trailhead",
    day: 21,
    mode: "hike",
    waypoints: [
      [-40.9150, 175.4830],
      [-40.920, 175.477],
      [-40.925, 175.470],
      [-40.9300, 175.4650],
    ],
  },
  {
    id: "powell-hastings",
    from: "powell-hut-trailhead",
    to: "hastings",
    day: 21,
    mode: "drive",
    waypoints: [
      [-40.9300, 175.4650],
      [-40.880, 175.550],
      [-40.820, 175.650],
      [-40.750, 175.750],
      [-40.680, 175.850],
      [-40.600, 175.950],
      [-40.520, 176.050],
      [-40.440, 176.150],
      [-40.350, 176.260],
      [-40.260, 176.380],
      [-40.160, 176.510],
      [-40.050, 176.640],
      [-39.940, 176.750],
      [-39.830, 176.820],
      [-39.720, 176.850],
      [-39.6381, 176.8493],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 22: Golf and winery in Hastings
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hastings-golf",
    from: "hastings",
    to: "hastings-golf",
    day: 22,
    mode: "drive",
    waypoints: [
      [-39.6381, 176.8493],
      [-39.6200, 176.8400],
      [-39.6100, 176.8300],
    ],
  },
  {
    id: "golf-winery",
    from: "hastings-golf",
    to: "hastings-wine",
    day: 22,
    mode: "drive",
    waypoints: [
      [-39.6100, 176.8300],
      [-39.6200, 176.8400],
      [-39.6381, 176.8493],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 23: Surfing → Napier → Taupo spa → Turangi
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hastings-waimarama",
    from: "hastings-wine",
    to: "waimarama",
    day: 23,
    mode: "drive",
    waypoints: [
      [-39.6381, 176.8493],
      [-39.680, 176.890],
      [-39.720, 176.935],
      [-39.755, 176.972],
      [-39.7870, 176.9920],
    ],
  },
  {
    id: "waimarama-surfing",
    from: "waimarama",
    to: "waimarama",
    day: 23,
    mode: "surfing",
    waypoints: [
      [-39.7870, 176.9920],
      [-39.790, 176.998],
      [-39.795, 177.005],
      [-39.790, 176.998],
      [-39.7870, 176.9920],
    ],
  },
  {
    id: "waimarama-napier",
    from: "waimarama",
    to: "napier",
    day: 23,
    mode: "drive",
    waypoints: [
      [-39.7870, 176.9920],
      [-39.720, 176.955],
      [-39.660, 176.930],
      [-39.600, 176.920],
      [-39.545, 176.915],
      [-39.4928, 176.9120],
    ],
  },
  {
    id: "napier-taupo",
    from: "napier",
    to: "taupo",
    day: 23,
    mode: "drive",
    waypoints: [
      [-39.4928, 176.9120],
      [-39.440, 176.870],
      [-39.385, 176.815],
      [-39.330, 176.755],
      [-39.275, 176.690],
      [-39.220, 176.620],
      [-39.165, 176.548],
      [-39.110, 176.475],
      [-39.055, 176.400],
      [-39.000, 176.325],
      [-38.945, 176.250],
      [-38.890, 176.200],
      [-38.838, 176.155],
      [-38.788, 176.115],
      [-38.738, 176.088],
      [-38.6857, 176.0702],
    ],
  },
  {
    id: "taupo-spa-park",
    from: "taupo",
    to: "spa-park",
    day: 23,
    mode: "drive",
    waypoints: [
      [-38.6857, 176.0702],
      [-38.6840, 176.0620],
    ],
  },
  {
    id: "spa-park-session",
    from: "spa-park",
    to: "spa-park",
    day: 23,
    mode: "spa",
    waypoints: [
      [-38.6840, 176.0620],
      [-38.6835, 176.0625],
      [-38.6840, 176.0620],
    ],
  },
  {
    id: "spa-park-turangi",
    from: "spa-park",
    to: "turangi",
    day: 23,
    mode: "drive",
    waypoints: [
      [-38.6840, 176.0620],
      [-38.720, 176.040],
      [-38.760, 176.000],
      [-38.810, 175.960],
      [-38.855, 175.920],
      [-38.900, 175.878],
      [-38.942, 175.845],
      [-38.9900, 175.8100],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 24: Tongariro Alpine Crossing → Rotorua
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "turangi-tongariro-start",
    from: "turangi",
    to: "tongariro-start",
    day: 24,
    mode: "drive",
    waypoints: [
      [-38.9900, 175.8100],
      [-39.020, 175.765],
      [-39.055, 175.680],
      [-39.090, 175.620],
      [-39.1330, 175.5720],
    ],
  },
  {
    id: "tongariro-crossing",
    from: "tongariro-start",
    to: "tongariro",
    day: 24,
    mode: "hike",
    waypoints: [
      [-39.1330, 175.5720],
      [-39.128, 175.585],
      [-39.122, 175.592],
      [-39.117, 175.605],
      [-39.115, 175.620],
      [-39.112, 175.635],
      [-39.1150, 175.6480],
      [-39.116, 175.663],
      [-39.112, 175.680],
      [-39.105, 175.695],
      [-39.095, 175.710],
      [-39.088, 175.720],
      [-39.080, 175.735],
      [-39.073, 175.752],
    ],
  },
  {
    id: "tongariro-rotorua",
    from: "tongariro",
    to: "rotorua",
    day: 24,
    mode: "drive",
    waypoints: [
      [-39.073, 175.752],
      [-39.050, 175.775],
      [-39.010, 175.805],
      [-38.968, 175.840],
      [-38.925, 175.875],
      [-38.882, 175.910],
      [-38.838, 175.945],
      [-38.795, 175.980],
      [-38.750, 176.015],
      [-38.705, 176.048],
      [-38.660, 176.080],
      [-38.615, 176.112],
      [-38.568, 176.142],
      [-38.520, 176.170],
      [-38.472, 176.192],
      [-38.422, 176.212],
      [-38.372, 176.226],
      [-38.322, 176.238],
      [-38.272, 176.244],
      [-38.222, 176.248],
      [-38.175, 176.249],
      [-38.1368, 176.2497],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 25: Rafting → Mt Maunganui → Tairua
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "rotorua-kaituna",
    from: "rotorua",
    to: "kaituna-cascades",
    day: 25,
    mode: "drive",
    waypoints: [
      [-38.1368, 176.2497],
      [-38.088, 176.295],
      [-38.050, 176.340],
      [-38.0167, 176.3833],
    ],
  },
  {
    id: "kaituna-rafting",
    from: "kaituna-cascades",
    to: "kaituna-cascades",
    day: 25,
    mode: "rafting",
    waypoints: [
      [-38.0167, 176.3833],
      [-38.025, 176.390],
      [-38.035, 176.395],
      [-38.045, 176.392],
      [-38.055, 176.385],
      [-38.060, 176.375],
      [-38.055, 176.365],
      [-38.045, 176.360],
      [-38.030, 176.365],
      [-38.0167, 176.3833],
    ],
  },
  {
    id: "kaituna-maunganui",
    from: "kaituna-cascades",
    to: "mt-maunganui",
    day: 25,
    mode: "drive",
    waypoints: [
      [-38.0167, 176.3833],
      [-38.000, 176.340],
      [-37.960, 176.300],
      [-37.920, 176.260],
      [-37.880, 176.230],
      [-37.838, 176.210],
      [-37.788, 176.200],
      [-37.738, 176.190],
      [-37.688, 176.180],
      [-37.6318, 176.1711],
    ],
  },
  {
    id: "maunganui-hike",
    from: "mt-maunganui",
    to: "mt-maunganui",
    day: 25,
    mode: "hike",
    waypoints: [
      [-37.6318, 176.1711],
      [-37.635, 176.175],
      [-37.638, 176.178],
      [-37.635, 176.175],
      [-37.6318, 176.1711],
    ],
  },
  {
    id: "maunganui-tairua",
    from: "mt-maunganui",
    to: "tairua",
    day: 25,
    mode: "drive",
    waypoints: [
      [-37.6318, 176.1711],
      [-37.580, 176.130],
      [-37.520, 176.080],
      [-37.460, 176.020],
      [-37.400, 175.960],
      [-37.340, 175.900],
      [-37.280, 175.860],
      [-37.220, 175.850],
      [-37.160, 175.845],
      [-37.100, 175.843],
      [-37.040, 175.844],
      [-36.9930, 175.8450],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 26: The Pinnacles hike
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tairua-pinnacles-trailhead",
    from: "tairua",
    to: "pinnacles-trailhead",
    day: 26,
    mode: "drive",
    waypoints: [
      [-36.9930, 175.8450],
      [-36.980, 175.820],
      [-36.9700, 175.7600],
    ],
  },
  {
    id: "pinnacles-up",
    from: "pinnacles-trailhead",
    to: "pinnacles",
    day: 26,
    mode: "hike",
    waypoints: [
      [-36.9700, 175.7600],
      [-36.968, 175.758],
      [-36.965, 175.755],
      [-36.962, 175.752],
      [-36.9580, 175.7500],
    ],
  },
  {
    id: "pinnacles-down",
    from: "pinnacles",
    to: "pinnacles-trailhead",
    day: 26,
    mode: "hike",
    waypoints: [
      [-36.9580, 175.7500],
      [-36.962, 175.752],
      [-36.965, 175.755],
      [-36.968, 175.758],
      [-36.9700, 175.7600],
    ],
  },
  {
    id: "pinnacles-tairua",
    from: "pinnacles-trailhead",
    to: "tairua",
    day: 26,
    mode: "drive",
    waypoints: [
      [-36.9700, 175.7600],
      [-36.980, 175.820],
      [-36.9930, 175.8450],
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // Day 27: Sailors Grave beach → Auckland Airport → Home
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "tairua-sailors-grave",
    from: "tairua",
    to: "sailors-grave",
    day: 27,
    mode: "drive",
    waypoints: [
      [-36.9930, 175.8450],
      [-36.970, 175.843],
      [-36.9565, 175.8419],
    ],
  },
  {
    id: "sailors-grave-beach",
    from: "sailors-grave",
    to: "sailors-grave",
    day: 27,
    mode: "hike",
    waypoints: [
      [-36.9565, 175.8419],
      [-36.955, 175.845],
      [-36.954, 175.848],
      [-36.955, 175.845],
      [-36.9565, 175.8419],
    ],
  },
  {
    id: "sailors-grave-airport",
    from: "sailors-grave",
    to: "auckland-airport",
    day: 27,
    mode: "drive",
    waypoints: [
      [-36.9565, 175.8419],
      [-37.020, 175.780],
      [-37.050, 175.720],
      [-37.080, 175.660],
      [-37.110, 175.600],
      [-37.1383, 175.5378],
      [-37.150, 175.480],
      [-37.180, 175.380],
      [-37.200, 175.300],
      [-37.220, 175.220],
      [-37.230, 175.140],
      [-37.225, 175.060],
      [-37.210, 174.980],
      [-37.180, 174.920],
      [-37.140, 174.870],
      [-37.100, 174.840],
      [-37.060, 174.810],
      [-37.0082, 174.7850],
    ],
  },
  {
    id: "auckland-home",
    from: "auckland-airport",
    to: "home",
    day: 27,
    mode: "fly",
    waypoints: [
      [-37.0082, 174.7850],
      [-35.0, 172.5],
      [-33.0, 170.0],
    ],
  },
];
