export const MAP_CONFIG = {
  center: [-44.85, 169.2],
  zoom: 10,
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

export const stops = [
  {
    id: "queenstown",
    name: "Queenstown",
    description: "Adventure capital of NZ — bungee, jet boats, and stunning lake views.",
    coords: [-45.0312, 168.6626],
    type: "camp",
  },
  {
    id: "wanaka",
    name: "Wanaka",
    description: "Laid-back lakeside town with epic mountain scenery.",
    coords: [-44.695, 169.1320],
    type: "destination",
  },
];

export const routes = [
  {
    id: "queenstown-wanaka",
    from: "queenstown",
    to: "wanaka",
    waypoints: [
      [-45.0312, 168.6626],
      [-45.0150, 168.7300],
      [-44.9720, 168.7900],
      [-44.9400, 168.8500],
      [-44.9200, 168.9100],
      [-44.8800, 168.9600],
      [-44.8400, 169.0000],
      [-44.7900, 169.0400],
      [-44.7500, 169.0800],
      [-44.695, 169.1320],
    ],
    style: "dashed",
    vehicleMarker: {
      id: "van-qt-wk",
      name: "On the road",
      description: "Driving from Queenstown to Wanaka via Crown Range.",
      coords: [-44.9200, 168.9100],
      type: "van",
    },
  },
];
