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
  msPerDay: 1500,
};

export const stops = [
  // Day 1 — Auckland arrival
  {
    id: "auckland",
    name: "Auckland",
    description: "City of Sails — arrival and first night in NZ.",
    coords: [-36.8485, 174.7633],
    type: "destination",
    day: 1,
  },
  // Day 2 — Waiheke Island (ferry day trip)
  {
    id: "waiheke",
    name: "Waiheke Island",
    description: "Beautiful island with wineries and beaches.",
    coords: [-36.8011, 175.0878],
    type: "destination",
    day: 2,
  },
  // Day 3 — Fly Auckland → Queenstown, drive to Wanaka, hike Roys Peak
  {
    id: "queenstown",
    name: "Queenstown",
    description: "Adventure capital of NZ — bungee, jet boats, and stunning lake views.",
    coords: [-45.0312, 168.6626],
    type: "destination",
    day: 3,
  },
  {
    id: "wanaka",
    name: "Wanaka",
    description: "Laid-back lakeside town with epic mountain scenery.",
    coords: [-44.695, 169.132],
    type: "camp",
    day: 3,
  },
  {
    id: "roys-peak",
    name: "Roys Peak",
    description: "Iconic Wanaka viewpoint — stunning panorama over lake and mountains.",
    coords: [-44.698, 169.044],
    type: "hike",
    day: 3,
  },
  // Day 4 — Wanaka → Te Anau
  {
    id: "te-anau",
    name: "Te Anau",
    description: "Gateway to Fiordland — peaceful lakeside town.",
    coords: [-45.4147, 167.7181],
    type: "camp",
    day: 4,
  },
  // Day 5 — Lake Marian hike & Cascade Creek camp
  {
    id: "lake-marian",
    name: "Lake Marian",
    description: "Stunning alpine lake surrounded by towering peaks.",
    coords: [-44.8055, 168.0828],
    type: "hike",
    day: 5,
  },
  {
    id: "cascade-creek",
    name: "Cascade Creek Campsite",
    description: "Beautiful DOC campsite in the heart of Fiordland, along the Milford Road.",
    coords: [-44.8847, 168.0708],
    type: "camp",
    day: 5,
  },
  // Day 6 — Gertrude Saddle hike, Milford Sound cruise, back to Te Anau
  {
    id: "gertrude-saddle",
    name: "Gertrude Saddle",
    description: "Steep alpine route with jaw-dropping Fiordland views.",
    coords: [-44.775, 167.990],
    type: "hike",
    day: 6,
  },
  {
    id: "milford-sound",
    name: "Milford Sound",
    description: "Iconic fiord — towering cliffs, waterfalls, dolphins.",
    coords: [-44.6714, 167.9269],
    type: "destination",
    day: 6,
  },
  // Day 7 — Te Anau → Glenorchy, Earnslaw Burn hike
  {
    id: "glenorchy",
    name: "Glenorchy",
    description: "Remote and beautiful — Lord of the Rings filming location.",
    coords: [-44.8485, 168.3822],
    type: "camp",
    day: 7,
  },
  {
    id: "earnslaw-burn-parking",
    name: "Earnslaw Burn Track Parking",
    description: "Trailhead parking for the Earnslaw Burn Track.",
    coords: [-44.8156, 168.3897],
    type: "destination",
    day: 7,
  },
  {
    id: "earnslaw-burn",
    name: "Earnslaw Burn",
    description: "Dramatic glacier waterfall and alpine valley track.",
    coords: [-44.770, 168.366],
    type: "hike",
    day: 7,
  },
  // Day 8 — Earnslaw Burn return, Glenorchy → Queenstown
  {
    id: "queenstown-return",
    name: "Queenstown",
    description: "Back in Queenstown for more adventure.",
    coords: [-45.0312, 168.6626],
    type: "camp",
    day: 8,
  },
  // Day 9 — Christmas Eve in Arrowtown
  {
    id: "arrowtown",
    name: "Arrowtown",
    description: "Christmas Eve in a magical historic gold-mining village. Twinkling lights on the Avenue of Trees, carol singers, a cozy campfire under the stars, and mulled wine to warm the soul. The perfect way to celebrate Christmas in summer!",
    coords: [-44.9367, 168.8308],
    type: "camp",
    day: 9,
  },
  // Day 10 — Arrowtown → Lake Tekapo
  {
    id: "lake-tekapo",
    name: "Mackenzie Waitaki RV Camping",
    description: "Turquoise glacier-fed lake — hot pools, spa day, and stargazing reserve.",
    coords: [-44.0047, 170.4772],
    type: "camp",
    day: 10,
  },
  // Day 11 — Spa day in Lake Tekapo, short drive to Lake Pukaki
  {
    id: "tekapo-spa",
    name: "Tekapo Springs",
    description: "Hot pools and day spa with stunning mountain and lake views.",
    coords: [-44.0033, 170.4820],
    type: "spa",
    day: 11,
  },
  {
    id: "lake-pukaki",
    name: "Lake Pukaki Overnight Campervan Parking",
    description: "Brilliant blue lake with views of Aoraki/Mt Cook.",
    coords: [-44.0942, 170.1703],
    type: "camp",
    day: 11,
  },
  // Day 12 — Sealy Tarns hike, Mt Cook → Christchurch
  {
    id: "sealy-tarns",
    name: "Sealy Tarns",
    description: "Alpine tarns with glacier views — 2,200 steps up from Mt Cook village.",
    coords: [-43.720, 170.098],
    type: "hike",
    day: 12,
  },
  {
    id: "mt-cook",
    name: "Mt Cook",
    description: "Aoraki/Mt Cook — NZ's highest peak.",
    coords: [-43.7340, 170.0964],
    type: "destination",
    day: 12,
  },
  {
    id: "christchurch",
    name: "Christchurch",
    description: "Garden City — rebuilt and vibrant after the earthquakes.",
    coords: [-43.5321, 172.6362],
    type: "camp",
    day: 12,
  },
  // Day 13 — Christchurch → Akaroa (loop)
  {
    id: "akaroa",
    name: "Akaroa",
    description: "Charming French-inspired harbor town on Banks Peninsula.",
    coords: [-43.8037, 172.9680],
    type: "camp",
    day: 13,
  },
  {
    id: "akaroa-canoeing",
    name: "Akaroa Harbour Kayaking",
    description: "Sea kayaking in the scenic Akaroa Harbour with dolphins and penguins.",
    coords: [-43.8100, 172.9550],
    type: "canoeing",
    day: 13,
  },
  // Day 14 — Christchurch → Bealey Spur hike → Arthur's Pass → Jacksons
  {
    id: "arthurs-pass",
    name: "Arthur's Pass",
    description: "Stunning alpine pass through the Southern Alps.",
    coords: [-42.9426, 171.5600],
    type: "destination",
    day: 14,
  },
  {
    id: "bealey-spur",
    name: "Bealey Spur",
    description: "Beautiful beech forest track with Southern Alps panorama.",
    coords: [-42.958, 171.588],
    type: "hike",
    day: 14,
  },
  {
    id: "jacksons",
    name: "Jacksons",
    description: "Tiny West Coast settlement — great camping stop.",
    coords: [-42.7254, 171.5128],
    type: "camp",
    day: 14,
  },
  // Day 15 — Jacksons → Franz Josef
  {
    id: "franz-josef",
    name: "Franz Josef",
    description: "Famous glacier town — ice meets rainforest.",
    coords: [-43.3862, 170.1833],
    type: "camp",
    day: 15,
  },
  // Day 16 — Alex Knob hike, drive to Brewster trailhead
  {
    id: "alex-knob",
    name: "Alex Knob",
    description: "Challenging summit hike with glacier and coastline views.",
    coords: [-43.408, 170.142],
    type: "hike",
    day: 16,
  },
  {
    id: "brewster",
    name: "Brewster Trailhead",
    description: "Parking and campsite at the Brewster Hut trailhead.",
    coords: [-44.0833, 169.4500],
    type: "camp",
    day: 16,
  },
  // Day 17 — Brewster Hut hike, drive to Wanaka
  {
    id: "brewster-hut",
    name: "Brewster Hut",
    description: "Alpine hut above the bushline with panoramic glacier views.",
    coords: [-44.097, 169.418],
    type: "hike",
    day: 17,
  },
  {
    id: "wanaka-return",
    name: "Wanaka",
    description: "Back in Wanaka — rest and recharge.",
    coords: [-44.695, 169.132],
    type: "camp",
    day: 17,
  },
  // Day 18 — Wanaka → Queenstown
  {
    id: "queenstown-final",
    name: "Queenstown",
    description: "Final night in Queenstown before heading north.",
    coords: [-45.0312, 168.6626],
    type: "hostel",
    day: 18,
  },
  // Day 19 — Fly Queenstown → Wellington
  {
    id: "wellington",
    name: "Wellington",
    description: "NZ's capital — culture, coffee, and wind.",
    coords: [-41.2865, 174.7762],
    type: "hostel",
    day: 19,
  },
  // Day 20 — Wellington → Porirua → Powell Hut hike → Hastings
  {
    id: "porirua",
    name: "Porirua",
    description: "Coastal city north of Wellington.",
    coords: [-41.1339, 174.8405],
    type: "hostel",
    day: 20,
  },
  {
    id: "powell-hut",
    name: "Powell Hut",
    description: "Tararua Range hut with incredible ridge views.",
    coords: [-41.0500, 175.2667],
    type: "hike",
    day: 20,
  },
  {
    id: "hastings",
    name: "Hastings",
    description: "Art deco town in the heart of Hawke's Bay wine country.",
    coords: [-39.6381, 176.8493],
    type: "hostel",
    day: 20,
  },
  // Day 21 — Wine tour in Hastings
  {
    id: "hastings-wine",
    name: "Hawke's Bay Wine Tour",
    description: "Wine tour through Hawke's Bay — world-class reds and vineyard views.",
    coords: [-39.6381, 176.8493],
    type: "destination",
    day: 21,
  },
  // Day 22 — Hastings → Waimarama → Napier → Taupo → Turangi
  {
    id: "waimarama-surfing",
    name: "Waimarama Beach Surfing",
    description: "Morning surf session at the beautiful Waimarama Beach.",
    coords: [-39.7870, 176.9920],
    type: "surfing",
    day: 22,
  },
  {
    id: "waimarama",
    name: "Waimarama",
    description: "Secluded beach south of Napier.",
    coords: [-39.7853, 176.9906],
    type: "destination",
    day: 22,
  },
  {
    id: "napier",
    name: "Napier",
    description: "Art deco city on Hawke's Bay — rebuilt after 1931 earthquake.",
    coords: [-39.4928, 176.9120],
    type: "destination",
    day: 22,
  },
  {
    id: "taupo",
    name: "Taupo",
    description: "Lakeside town on NZ's largest lake.",
    coords: [-38.6857, 176.0702],
    type: "destination",
    day: 22,
  },
  {
    id: "turangi",
    name: "Turangi",
    description: "Trout fishing capital — gateway to Tongariro.",
    coords: [-38.9900, 175.8100],
    type: "hostel",
    day: 22,
  },
  // Day 23 — Tongariro Alpine Crossing, drive to Rotorua
  {
    id: "tongariro",
    name: "Tongariro Alpine Crossing",
    description: "NZ's best day hike — volcanic landscapes and emerald lakes.",
    coords: [-39.115, 175.648],  // Red Crater - the iconic summit point
    type: "hike",
    day: 23,
  },
  {
    id: "rotorua",
    name: "Rotorua",
    description: "Geothermal wonderland — mud pools, geysers, and Maori culture.",
    coords: [-38.1368, 176.2497],
    type: "hostel",
    day: 23,
  },
  // Day 24 — Kaituna Cascades rafting, Rotorua → Mt Maunganui → Tairua
  {
    id: "kaituna-cascades",
    name: "Kaituna Cascades",
    description: "White water rafting down the Kaituna River with the famous 7-meter Tutea Falls.",
    coords: [-38.0167, 176.3833],
    type: "rafting",
    day: 24,
  },
  {
    id: "mt-maunganui",
    name: "Mt Maunganui",
    description: "Iconic beach town with a climbable volcanic mount.",
    coords: [-37.6318, 176.1711],
    type: "destination",
    day: 24,
  },
  {
    id: "tairua",
    name: "Tairua",
    description: "Coromandel Peninsula coastal town — surf and bush walks.",
    coords: [-36.9930, 175.8450],
    type: "hostel",
    day: 24,
  },
  // Day 25 — The Pinnacles hike
  {
    id: "pinnacles",
    name: "The Pinnacles",
    description: "Dramatic rock formations — rewarding hike in the Coromandel.",
    coords: [-36.9580, 175.7500],
    type: "hike",
    day: 25,
  },
  // Day 26 — Tairua → Auckland Airport
  {
    id: "auckland-airport",
    name: "Auckland Airport",
    description: "End of the road — time to fly home.",
    coords: [-37.0082, 174.7850],
    type: "destination",
    day: 26,
  },
  // Day 27 — Fly home
  {
    id: "home",
    name: "Home",
    description: "Back home — what a trip!",
    coords: [-20.0, 160.0],  // Flying away northwest
    type: "plane",
    day: 27,
  },
];

export const routes = [
  // ── Day 2: Waiheke Island ferry ──
  {
    id: "auckland-waiheke",
    from: "auckland",
    to: "waiheke",
    day: 2,
    mode: "ferry",
    waypoints: [
      [-36.844, 174.767],
      [-36.838, 174.810],
      [-36.830, 174.860],
      [-36.822, 174.915],
      [-36.814, 174.970],
      [-36.808, 175.030],
      [-36.801, 175.088],
    ],
  },
  {
    id: "waiheke-auckland",
    from: "waiheke",
    to: "auckland",
    day: 2,
    mode: "ferry",
    waypoints: [
      [-36.801, 175.088],
      [-36.808, 175.030],
      [-36.814, 174.970],
      [-36.822, 174.915],
      [-36.830, 174.860],
      [-36.838, 174.810],
      [-36.844, 174.767],
    ],
  },

  // ── Day 3: Fly to Queenstown, drive to Wanaka, hike Roys Peak ──
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
    id: "queenstown-wanaka",
    from: "queenstown",
    to: "wanaka",
    day: 3,
    mode: "drive",
    waypoints: [
      [-45.0312, 168.6626],
      [-45.017, 168.688],
      [-44.998, 168.713],
      [-44.982, 168.734],
      [-44.963, 168.748],
      [-44.943, 168.758],
      [-44.929, 168.775],
      [-44.917, 168.800],
      [-44.905, 168.828],
      [-44.890, 168.857],
      [-44.872, 168.883],
      [-44.855, 168.912],
      [-44.838, 168.940],
      [-44.818, 168.962],
      [-44.795, 168.985],
      [-44.773, 169.010],
      [-44.751, 169.038],
      [-44.733, 169.063],
      [-44.718, 169.088],
      [-44.695, 169.132],
    ],
  },
  {
    id: "wanaka-roys-trailhead",
    from: "wanaka",
    to: "roys-peak",
    day: 3,
    mode: "drive",
    waypoints: [
      [-44.695, 169.132],
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
    id: "roys-trailhead-wanaka",
    from: "roys-peak",
    to: "wanaka",
    day: 3,
    mode: "drive",
    waypoints: [
      [-44.671, 169.064],
      [-44.680, 169.090],
      [-44.690, 169.110],
      [-44.695, 169.132],
    ],
  },

  // ── Day 4: Wanaka → Te Anau via SH6 (Cromwell, Queenstown, Kingston) ──
  {
    id: "wanaka-te-anau",
    from: "wanaka",
    to: "te-anau",
    day: 4,
    mode: "drive",
    waypoints: [
      [-44.695, 169.132],   // Wanaka
      [-44.72, 169.18],     // Albert Town
      [-44.75, 169.25],     // Luggate
      [-44.85, 169.25],     // Along Lake Dunstan
      [-44.95, 169.22],     // Approaching Cromwell
      [-45.038, 169.199],   // Cromwell
      [-45.05, 169.10],     // Kawarau Gorge entrance
      [-45.03, 169.00],     // Nevis Bluff area
      [-45.03, 168.92],     // Gibbston Valley
      [-45.00, 168.85],     // Towards Arrow Junction
      [-44.98, 168.80],     // Arrow Junction
      [-45.00, 168.75],     // Frankton approach
      [-45.02, 168.72],     // Frankton (Queenstown bypass)
      [-45.05, 168.68],     // Kelvin Heights
      [-45.10, 168.70],     // Lake Wakatipu shore
      [-45.18, 168.72],     // Devil's Staircase
      [-45.25, 168.72],     // Approaching Kingston
      [-45.338, 168.719],   // Kingston
      [-45.42, 168.62],     // Towards Garston
      [-45.47, 168.56],     // Garston
      [-45.52, 168.48],     // Towards Five Rivers
      [-45.55, 168.42],     // Five Rivers
      [-45.62, 168.32],     // Towards Mossburn
      [-45.69, 168.21],     // Mossburn
      [-45.60, 168.00],     // SH94 towards Te Anau
      [-45.52, 167.85],     // Approaching Te Anau
      [-45.4147, 167.7181], // Te Anau
    ],
  },

  // ── Day 5: Te Anau → Lake Marian trailhead, hike, → Cascade Creek camp ──
  {
    id: "te-anau-marian-trailhead",
    from: "te-anau",
    to: "lake-marian",
    day: 5,
    mode: "drive",
    waypoints: [
      [-45.4147, 167.7181],  // Te Anau
      [-45.370, 167.740],    // Route 94 (Milford Road)
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
      [-44.7893, 168.1285],  // Lake Marian trailhead on Hollyford Road
    ],
  },
  {
    id: "lake-marian-up",
    from: "lake-marian",
    to: "lake-marian",
    day: 5,
    mode: "hike",
    waypoints: [
      [-44.7893, 168.1285],  // Trailhead on Hollyford Road
      [-44.793, 168.120],    // Through forest
      [-44.798, 168.110],
      [-44.802, 168.098],    // Climbing
      [-44.8055, 168.0828],  // Lake Marian
    ],
  },
  {
    id: "lake-marian-down",
    from: "lake-marian",
    to: "lake-marian",
    day: 5,
    mode: "hike",
    waypoints: [
      [-44.8055, 168.0828],  // Lake Marian
      [-44.802, 168.098],
      [-44.798, 168.110],
      [-44.793, 168.120],
      [-44.7893, 168.1285],  // Back to trailhead
    ],
  },
  {
    id: "marian-trailhead-cascade-creek",
    from: "lake-marian",
    to: "cascade-creek",
    day: 5,
    mode: "drive",
    waypoints: [
      [-44.7893, 168.1285],  // Lake Marian trailhead
      [-44.820, 168.105],    // Back on Route 94
      [-44.850, 168.085],
      [-44.8847, 168.0708],  // Cascade Creek Campsite
    ],
  },

  // ── Day 6: Cascade Creek → Milford Sound cruise → Gertrude Saddle hike → Te Anau ──
  {
    id: "cascade-creek-milford",
    from: "cascade-creek",
    to: "milford-sound",
    day: 6,
    mode: "drive",
    waypoints: [
      [-44.8847, 168.0708],  // Cascade Creek
      [-44.850, 168.050],    // Along Route 94
      [-44.810, 168.020],
      [-44.770, 167.990],
      [-44.740, 167.965],
      [-44.710, 167.950],    // Homer Tunnel approach
      [-44.690, 167.940],
      [-44.6714, 167.9269],  // Milford Sound
    ],
  },
  {
    id: "milford-cruise",
    from: "milford-sound",
    to: "milford-sound",
    day: 6,
    mode: "ferry",
    waypoints: [
      [-44.6714, 167.9269],  // Milford terminal
      [-44.665, 167.915],
      [-44.658, 167.900],
      [-44.650, 167.885],
      [-44.640, 167.870],
      [-44.630, 167.850],
      [-44.615, 167.830],
      [-44.598, 167.808],
      [-44.580, 167.788],
      [-44.560, 167.768],
      [-44.540, 167.750],    // Dale Point area
      [-44.520, 167.735],
      [-44.500, 167.720],
      [-44.480, 167.700],    // Anita Bay / mouth of fjord
      [-44.500, 167.720],    // Return trip
      [-44.520, 167.735],
      [-44.540, 167.750],
      [-44.560, 167.768],
      [-44.580, 167.788],
      [-44.598, 167.808],
      [-44.615, 167.830],
      [-44.630, 167.850],
      [-44.640, 167.870],
      [-44.650, 167.885],
      [-44.658, 167.900],
      [-44.665, 167.915],
      [-44.6714, 167.9269],  // Back to terminal
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
      [-44.762, 168.020],    // Gertrude trailhead
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
      [-44.762, 168.020],    // Gertrude trailhead
      [-44.800, 168.045],
      [-44.830, 168.028],
      [-44.858, 168.010],
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
      [-45.4147, 167.7181],  // Te Anau
    ],
  },

  // ── Day 7: Te Anau → Glenorchy via Route 94, Route 6, Glenorchy-Queenstown Road ──
  {
    id: "te-anau-glenorchy",
    from: "te-anau",
    to: "glenorchy",
    day: 7,
    mode: "drive",
    waypoints: [
      [-45.4147, 167.7181],  // Te Anau
      [-45.52, 167.85],      // Route 94 east
      [-45.60, 168.00],
      [-45.69, 168.21],      // Mossburn - junction with Route 6
      [-45.62, 168.32],      // Route 6 north towards Five Rivers
      [-45.55, 168.42],      // Five Rivers
      [-45.47, 168.56],      // Garston
      [-45.42, 168.62],
      [-45.338, 168.719],    // Kingston
      [-45.25, 168.72],      // Along Lake Wakatipu
      [-45.18, 168.72],      // Devil's Staircase
      [-45.10, 168.70],
      [-45.05, 168.68],      // Kelvin Heights
      [-45.0312, 168.6626],  // Queenstown
      [-45.005, 168.625],    // Glenorchy-Queenstown Road
      [-44.975, 168.580],
      [-44.945, 168.535],
      [-44.915, 168.490],
      [-44.885, 168.445],
      [-44.8485, 168.3822],  // Glenorchy
    ],
  },
  {
    id: "glenorchy-earnslaw-parking",
    from: "glenorchy",
    to: "earnslaw-burn-parking",
    day: 7,
    mode: "drive",
    waypoints: [
      [-44.8485, 168.3822],  // Glenorchy
      [-44.835, 168.385],
      [-44.8156, 168.3897],  // Earnslaw Burn Track Parking
    ],
  },
  {
    id: "earnslaw-burn-up",
    from: "earnslaw-burn-parking",
    to: "earnslaw-burn",
    day: 7,
    mode: "hike",
    waypoints: [
      [-44.8156, 168.3897],  // Parking
      [-44.810, 168.385],
      [-44.800, 168.380],
      [-44.790, 168.375],
      [-44.780, 168.370],
      [-44.770, 168.366],    // Earnslaw Burn waterfall
    ],
  },

  // ── Day 8: Earnslaw Burn return, Glenorchy → Queenstown ──
  {
    id: "earnslaw-burn-down",
    from: "earnslaw-burn",
    to: "earnslaw-burn-parking",
    day: 8,
    mode: "hike",
    waypoints: [
      [-44.770, 168.366],    // Earnslaw Burn waterfall
      [-44.780, 168.370],
      [-44.790, 168.375],
      [-44.800, 168.380],
      [-44.810, 168.385],
      [-44.8156, 168.3897],  // Back to parking
    ],
  },
  {
    id: "earnslaw-parking-glenorchy",
    from: "earnslaw-burn-parking",
    to: "glenorchy",
    day: 8,
    mode: "drive",
    waypoints: [
      [-44.8156, 168.3897],  // Parking
      [-44.835, 168.385],
      [-44.8485, 168.3822],  // Glenorchy
    ],
  },
  {
    id: "glenorchy-queenstown",
    from: "glenorchy",
    to: "queenstown-return",
    day: 8,
    mode: "drive",
    waypoints: [
      [-44.8485, 168.3822],
      [-44.860, 168.405],
      [-44.875, 168.430],
      [-44.890, 168.458],
      [-44.905, 168.485],
      [-44.918, 168.510],
      [-44.930, 168.535],
      [-44.942, 168.555],
      [-44.955, 168.572],
      [-44.965, 168.590],
      [-44.975, 168.608],
      [-44.985, 168.622],
      [-44.995, 168.635],
      [-45.005, 168.645],
      [-45.015, 168.653],
      [-45.0312, 168.6626],
    ],
  },

  // ── Day 9: Queenstown → Arrowtown (Christmas Eve) ──
  {
    id: "queenstown-arrowtown",
    from: "queenstown-return",
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

  // ── Day 10: Arrowtown → Lake Tekapo ──
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
      [-44.0047, 170.4772],
    ],
  },

  // ── Day 11: Spa day in Lake Tekapo, drive to Lake Pukaki ──
  {
    id: "tekapo-to-spa",
    from: "lake-tekapo",
    to: "tekapo-spa",
    day: 11,
    mode: "drive",
    waypoints: [
      [-44.0047, 170.4772],
      [-44.0040, 170.4800],
      [-44.0033, 170.4820],
    ],
  },
  {
    id: "tekapo-spa-session",
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
      [-44.0047, 170.4772],
      [-44.015, 170.445],
      [-44.025, 170.415],
      [-44.038, 170.385],
      [-44.050, 170.355],
      [-44.060, 170.325],
      [-44.070, 170.295],
      [-44.078, 170.260],
      [-44.085, 170.225],
      [-44.090, 170.195],
      [-44.0942, 170.1703],
    ],
  },

  // ── Day 12: Lake Pukaki → Mt Cook, Sealy Tarns hike, → Christchurch ──
  {
    id: "pukaki-mtcook",
    from: "lake-pukaki",
    to: "mt-cook",
    day: 12,
    mode: "drive",
    waypoints: [
      [-44.0942, 170.1703],
      [-44.050, 170.150],
      [-44.000, 170.130],
      [-43.950, 170.120],
      [-43.900, 170.110],
      [-43.850, 170.105],
      [-43.800, 170.100],
      [-43.760, 170.098],
      [-43.734, 170.096],
    ],
  },
  {
    id: "sealy-tarns-up",
    from: "mt-cook",
    to: "sealy-tarns",
    day: 12,
    mode: "hike",
    waypoints: [
      [-43.734, 170.096],
      [-43.731, 170.097],
      [-43.728, 170.097],
      [-43.725, 170.097],
      [-43.722, 170.098],
      [-43.720, 170.098],
    ],
  },
  {
    id: "sealy-tarns-down",
    from: "sealy-tarns",
    to: "mt-cook",
    day: 12,
    mode: "hike",
    waypoints: [
      [-43.720, 170.098],
      [-43.722, 170.098],
      [-43.725, 170.097],
      [-43.728, 170.097],
      [-43.731, 170.097],
      [-43.734, 170.096],
    ],
  },
  {
    id: "mtcook-christchurch",
    from: "mt-cook",
    to: "christchurch",
    day: 12,
    mode: "drive",
    waypoints: [
      [-43.734, 170.0964],
      [-43.760, 170.135],
      [-43.800, 170.175],
      [-43.850, 170.220],
      [-43.895, 170.268],
      [-43.935, 170.315],
      [-43.960, 170.370],
      [-43.970, 170.430],
      [-43.965, 170.490],
      [-43.945, 170.560],
      [-43.918, 170.635],
      [-43.890, 170.720],
      [-43.860, 170.810],
      [-43.830, 170.905],
      [-43.800, 171.000],
      [-43.770, 171.100],
      [-43.742, 171.205],
      [-43.715, 171.315],
      [-43.690, 171.430],
      [-43.665, 171.550],
      [-43.642, 171.675],
      [-43.620, 171.800],
      [-43.600, 171.930],
      [-43.582, 172.060],
      [-43.565, 172.195],
      [-43.550, 172.330],
      [-43.540, 172.470],
      [-43.5321, 172.6362],
    ],
  },

  // ── Day 13: Christchurch → Akaroa, kayaking, → Christchurch ──
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
      [-43.8037, 172.968],
    ],
  },
  {
    id: "akaroa-kayaking",
    from: "akaroa",
    to: "akaroa-canoeing",
    day: 13,
    mode: "canoeing",
    waypoints: [
      [-43.8037, 172.968],
      [-43.810, 172.960],
      [-43.815, 172.950],
      [-43.820, 172.940],
      [-43.815, 172.950],
      [-43.810, 172.960],
      [-43.8100, 172.9550],
    ],
  },
  {
    id: "akaroa-christchurch",
    from: "akaroa-canoeing",
    to: "christchurch",
    day: 13,
    mode: "drive",
    waypoints: [
      [-43.8100, 172.9550],
      [-43.8037, 172.968],
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
    ],
  },

  // ── Day 14: Christchurch → Arthur's Pass, Bealey Spur hike, → Jacksons ──
  {
    id: "christchurch-arthurs-pass",
    from: "christchurch",
    to: "arthurs-pass",
    day: 14,
    mode: "drive",
    waypoints: [
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
      [-42.9426, 171.560],
    ],
  },
  {
    id: "bealey-spur-up",
    from: "arthurs-pass",
    to: "bealey-spur",
    day: 14,
    mode: "hike",
    waypoints: [
      [-42.943, 171.560],
      [-42.946, 171.565],
      [-42.949, 171.572],
      [-42.952, 171.578],
      [-42.955, 171.583],
      [-42.958, 171.588],
    ],
  },
  {
    id: "bealey-spur-down",
    from: "bealey-spur",
    to: "arthurs-pass",
    day: 14,
    mode: "hike",
    waypoints: [
      [-42.958, 171.588],
      [-42.955, 171.583],
      [-42.952, 171.578],
      [-42.949, 171.572],
      [-42.946, 171.565],
      [-42.943, 171.560],
    ],
  },
  {
    id: "arthurs-pass-jacksons",
    from: "arthurs-pass",
    to: "jacksons",
    day: 14,
    mode: "drive",
    waypoints: [
      [-42.9426, 171.560],
      [-42.900, 171.555],
      [-42.855, 171.540],
      [-42.810, 171.528],
      [-42.765, 171.520],
      [-42.7254, 171.5128],
    ],
  },

  // ── Day 15: Jacksons → Franz Josef ──
  {
    id: "jacksons-franz-josef",
    from: "jacksons",
    to: "franz-josef",
    day: 15,
    mode: "drive",
    waypoints: [
      [-42.7254, 171.5128],
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

  // ── Day 16: Alex Knob hike, drive to Brewster trailhead ──
  {
    id: "alex-knob-up",
    from: "franz-josef",
    to: "alex-knob",
    day: 16,
    mode: "hike",
    waypoints: [
      [-43.386, 170.183],
      [-43.390, 170.175],
      [-43.394, 170.167],
      [-43.398, 170.158],
      [-43.402, 170.150],
      [-43.405, 170.145],
      [-43.408, 170.142],
    ],
  },
  {
    id: "alex-knob-down",
    from: "alex-knob",
    to: "franz-josef",
    day: 16,
    mode: "hike",
    waypoints: [
      [-43.408, 170.142],
      [-43.405, 170.145],
      [-43.402, 170.150],
      [-43.398, 170.158],
      [-43.394, 170.167],
      [-43.390, 170.175],
      [-43.386, 170.183],
    ],
  },
  {
    id: "franz-josef-brewster",
    from: "franz-josef",
    to: "brewster",
    day: 16,
    mode: "drive",
    waypoints: [
      [-43.3862, 170.1833],
      [-43.410, 170.148],
      [-43.440, 170.110],
      [-43.475, 170.072],
      [-43.512, 170.032],
      [-43.550, 169.990],
      [-43.590, 169.948],
      [-43.632, 169.905],
      [-43.672, 169.860],
      [-43.710, 169.812],
      [-43.748, 169.765],
      [-43.785, 169.718],
      [-43.822, 169.670],
      [-43.860, 169.622],
      [-43.898, 169.575],
      [-43.935, 169.530],
      [-43.970, 169.495],
      [-44.010, 169.468],
      [-44.048, 169.458],
      [-44.0833, 169.450],
    ],
  },

  // ── Day 17: Brewster Hut hike, drive to Wanaka ──
  {
    id: "brewster-hut-up",
    from: "brewster",
    to: "brewster-hut",
    day: 17,
    mode: "hike",
    waypoints: [
      [-44.083, 169.450],
      [-44.086, 169.445],
      [-44.088, 169.438],
      [-44.091, 169.432],
      [-44.093, 169.426],
      [-44.095, 169.422],
      [-44.097, 169.418],
    ],
  },
  {
    id: "brewster-hut-down",
    from: "brewster-hut",
    to: "brewster",
    day: 17,
    mode: "hike",
    waypoints: [
      [-44.097, 169.418],
      [-44.095, 169.422],
      [-44.093, 169.426],
      [-44.091, 169.432],
      [-44.088, 169.438],
      [-44.086, 169.445],
      [-44.083, 169.450],
    ],
  },
  {
    id: "brewster-wanaka",
    from: "brewster",
    to: "wanaka-return",
    day: 17,
    mode: "drive",
    waypoints: [
      [-44.0833, 169.450],
      [-44.120, 169.438],
      [-44.160, 169.425],
      [-44.200, 169.408],
      [-44.242, 169.388],
      [-44.285, 169.365],
      [-44.328, 169.340],
      [-44.370, 169.312],
      [-44.412, 169.282],
      [-44.452, 169.252],
      [-44.490, 169.225],
      [-44.528, 169.200],
      [-44.565, 169.178],
      [-44.602, 169.160],
      [-44.638, 169.148],
      [-44.668, 169.140],
      [-44.695, 169.132],
    ],
  },

  // ── Day 18: Wanaka → Queenstown ──
  {
    id: "wanaka-queenstown-final",
    from: "wanaka-return",
    to: "queenstown-final",
    day: 18,
    mode: "drive",
    waypoints: [
      [-44.695, 169.132],
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

  // ── Day 19: Queenstown → Wellington (fly) ──
  {
    id: "queenstown-wellington",
    from: "queenstown-final",
    to: "wellington",
    day: 19,
    mode: "fly",
    waypoints: [
      [-45.0312, 168.6626],
      [-44.0, 170.0],
      [-43.0, 171.5],
      [-42.0, 173.0],
      [-41.2865, 174.7762],
    ],
  },

  // ── Day 20: Wellington → Holdsworth, Powell Hut hike, → Hastings ──
  {
    id: "wellington-holdsworth",
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
      [-41.100, 174.870],
      [-41.075, 174.920],
      [-41.055, 174.978],
      [-41.045, 175.050],
      [-41.048, 175.130],
      [-41.050, 175.200],
      [-41.085, 175.282],
    ],
  },
  {
    id: "powell-hut-up",
    from: "porirua",
    to: "powell-hut",
    day: 20,
    mode: "hike",
    waypoints: [
      [-41.085, 175.282],
      [-41.078, 175.278],
      [-41.072, 175.275],
      [-41.065, 175.272],
      [-41.058, 175.270],
      [-41.050, 175.267],
    ],
  },
  {
    id: "powell-hut-down",
    from: "powell-hut",
    to: "porirua",
    day: 20,
    mode: "hike",
    waypoints: [
      [-41.050, 175.267],
      [-41.058, 175.270],
      [-41.065, 175.272],
      [-41.072, 175.275],
      [-41.078, 175.278],
      [-41.085, 175.282],
    ],
  },
  {
    id: "holdsworth-hastings",
    from: "porirua",
    to: "hastings",
    day: 20,
    mode: "drive",
    waypoints: [
      [-41.085, 175.282],
      [-41.035, 175.340],
      [-41.010, 175.418],
      [-40.975, 175.500],
      [-40.932, 175.585],
      [-40.885, 175.668],
      [-40.832, 175.748],
      [-40.775, 175.825],
      [-40.712, 175.900],
      [-40.645, 175.970],
      [-40.575, 176.038],
      [-40.502, 176.108],
      [-40.428, 176.180],
      [-40.350, 176.255],
      [-40.272, 176.335],
      [-40.192, 176.418],
      [-40.110, 176.502],
      [-40.025, 176.588],
      [-39.938, 176.670],
      [-39.848, 176.745],
      [-39.755, 176.798],
      [-39.6381, 176.8493],
    ],
  },

  // ── Day 22: Hastings → Waimarama surfing → Napier → Taupo → Turangi ──
  {
    id: "hastings-waimarama",
    from: "hastings",
    to: "waimarama-surfing",
    day: 22,
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
    id: "waimarama-surfing-session",
    from: "waimarama-surfing",
    to: "waimarama",
    day: 22,
    mode: "surfing",
    waypoints: [
      [-39.7870, 176.9920],
      [-39.790, 176.998],
      [-39.795, 177.005],
      [-39.790, 176.998],
      [-39.7853, 176.9906],
    ],
  },
  {
    id: "waimarama-turangi",
    from: "waimarama",
    to: "turangi",
    day: 22,
    mode: "drive",
    waypoints: [
      [-39.7853, 176.9906],
      [-39.720, 176.955],
      [-39.660, 176.930],
      [-39.600, 176.920],
      [-39.545, 176.915],
      [-39.4928, 176.912],
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
      [-38.720, 176.040],
      [-38.760, 176.000],
      [-38.810, 175.960],
      [-38.855, 175.920],
      [-38.900, 175.878],
      [-38.942, 175.845],
      [-38.990, 175.810],
    ],
  },

  // ── Day 23: Turangi → Mangatepopo, Tongariro Crossing, → Rotorua ──
  {
    id: "turangi-mangatepopo",
    from: "turangi",
    to: "tongariro",
    day: 23,
    mode: "drive",
    waypoints: [
      [-38.990, 175.810],    // Turangi
      [-39.020, 175.765],
      [-39.055, 175.680],
      [-39.090, 175.620],
      [-39.133, 175.572],    // Mangatepopo carpark
    ],
  },
  {
    id: "tongariro-crossing",
    from: "tongariro",
    to: "tongariro",
    day: 23,
    mode: "hike",
    waypoints: [
      [-39.133, 175.572],    // Mangatepopo carpark
      [-39.128, 175.585],    // Mangatepopo Valley
      [-39.122, 175.592],    // Soda Springs
      [-39.117, 175.605],    // Approaching South Crater
      [-39.115, 175.620],    // South Crater
      [-39.112, 175.635],    // Climbing to Red Crater
      [-39.115, 175.648],    // Red Crater summit
      [-39.116, 175.663],    // Emerald Lakes
      [-39.112, 175.680],    // Central Crater
      [-39.105, 175.695],    // Blue Lake
      [-39.095, 175.710],    // North Crater rim
      [-39.088, 175.720],    // Ketetahi Shelter
      [-39.080, 175.735],    // Descending
      [-39.073, 175.752],    // Ketetahi carpark
    ],
  },
  {
    id: "ketetahi-rotorua",
    from: "tongariro",
    to: "rotorua",
    day: 23,
    mode: "drive",
    waypoints: [
      [-39.073, 175.752],    // Ketetahi carpark
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
      [-38.1368, 176.2497],  // Rotorua
    ],
  },

  // ── Day 24: Rotorua → Kaituna Cascades rafting → Mt Maunganui → Tairua ──
  {
    id: "rotorua-kaituna",
    from: "rotorua",
    to: "kaituna-cascades",
    day: 24,
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
    day: 24,
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
    day: 24,
    mode: "drive",
    waypoints: [
      [-38.0167, 176.3833],  // Kaituna Cascades
      [-38.000, 176.340],
      [-37.960, 176.300],
      [-37.920, 176.260],
      [-37.880, 176.230],
      [-37.838, 176.210],
      [-37.788, 176.200],
      [-37.738, 176.190],
      [-37.688, 176.180],
      [-37.6318, 176.1711], // Mt Maunganui
    ],
  },
  {
    id: "maunganui-tairua",
    from: "mt-maunganui",
    to: "tairua",
    day: 24,
    mode: "drive",
    waypoints: [
      [-37.6318, 176.1711], // Mt Maunganui
      [-37.670, 176.130],   // SH2 heading south
      [-37.710, 176.080],   // Te Puke area
      [-37.750, 176.020],
      [-37.785, 175.960],   // Paengaroa
      [-37.815, 175.910],
      [-37.840, 175.870],   // Approaching Waihi
      [-37.3856, 175.8355], // Waihi - SH2/SH25 junction
      [-37.340, 175.840],   // SH25 north
      [-37.300, 175.850],   // Waihi Beach area
      [-37.250, 175.860],
      [-37.2116, 175.8675], // Whangamata
      [-37.160, 175.870],
      [-37.110, 175.868],
      [-37.060, 175.862],
      [-37.010, 175.855],
      [-36.993, 175.845],   // Tairua
    ],
  },

  // ── Day 25: The Pinnacles hike ──
  {
    id: "tairua-pinnacles",
    from: "tairua",
    to: "pinnacles",
    day: 25,
    mode: "hike",
    waypoints: [
      [-36.993, 175.845],
      [-36.988, 175.832],
      [-36.982, 175.818],
      [-36.978, 175.802],
      [-36.975, 175.788],
      [-36.972, 175.775],
      [-36.968, 175.762],
      [-36.962, 175.755],
      [-36.958, 175.750],
    ],
  },
  {
    id: "pinnacles-tairua",
    from: "pinnacles",
    to: "tairua",
    day: 25,
    mode: "hike",
    waypoints: [
      [-36.958, 175.750],
      [-36.962, 175.755],
      [-36.968, 175.762],
      [-36.972, 175.775],
      [-36.975, 175.788],
      [-36.978, 175.802],
      [-36.982, 175.818],
      [-36.988, 175.832],
      [-36.993, 175.845],
    ],
  },

  // ── Day 26: Tairua → Thames → Auckland Airport ──
  {
    id: "tairua-airport",
    from: "tairua",
    to: "auckland-airport",
    day: 26,
    mode: "drive",
    waypoints: [
      [-36.993, 175.845],    // Tairua
      [-37.020, 175.780],    // SH25 south
      [-37.050, 175.720],
      [-37.080, 175.660],
      [-37.110, 175.600],
      [-37.1383, 175.5378],  // Thames
      [-37.150, 175.480],    // SH25 west towards Kopu
      [-37.180, 175.380],    // SH2 south of Thames
      [-37.200, 175.300],
      [-37.220, 175.220],
      [-37.230, 175.140],
      [-37.225, 175.060],    // Heading towards Pokeno
      [-37.210, 174.980],
      [-37.180, 174.920],
      [-37.140, 174.870],    // SH1 area
      [-37.100, 174.840],
      [-37.060, 174.810],
      [-37.0082, 174.785],   // Auckland Airport
    ],
  },

  // ── Day 27: Auckland → Home (fly away from NZ) ──
  {
    id: "auckland-home",
    from: "auckland-airport",
    to: "home",
    day: 27,
    mode: "fly",
    waypoints: [
      [-37.0082, 174.785],   // Auckland Airport
      [-35.5, 173.0],        // Heading northwest
      [-33.0, 170.0],
      [-30.0, 167.0],
      [-27.0, 164.0],
      [-24.0, 162.0],
      [-20.0, 160.0],        // Flying away into the distance
    ],
  },
];
