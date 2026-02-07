import { useMemo } from "react";
import L from "leaflet";
import { Marker } from "react-leaflet";

/* ── Modern vehicle SVGs ── */

// Flat illustrated campervan - side view, clean and modern
const VAN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 28" width="40" height="28">
  <!-- Shadow -->
  <ellipse cx="20" cy="26" rx="14" ry="2" fill="rgba(0,0,0,0.15)"/>
  <!-- Body - orange -->
  <path d="M4 12 L4 22 Q4 24 6 24 L34 24 Q36 24 36 22 L36 12 L4 12 Z" fill="#f97316"/>
  <!-- Roof/cabin top - cream -->
  <path d="M4 12 L4 8 Q4 6 8 6 L28 6 Q32 6 34 8 L36 12 L4 12 Z" fill="#fef3c7"/>
  <!-- Windshield -->
  <path d="M30 6 Q32 6 34 8 L36 12 L30 12 L30 6 Z" fill="#67e8f9"/>
  <!-- Side windows -->
  <rect x="6" y="8" width="8" height="4" rx="1" fill="#67e8f9"/>
  <rect x="16" y="8" width="8" height="4" rx="1" fill="#67e8f9"/>
  <!-- Door line -->
  <line x1="26" y1="12" x2="26" y2="24" stroke="#ea580c" stroke-width="1"/>
  <!-- Door handle -->
  <rect x="27" y="16" width="3" height="1" rx="0.5" fill="#374151"/>
  <!-- Front wheel -->
  <circle cx="10" cy="24" r="4" fill="#374151"/>
  <circle cx="10" cy="24" r="2" fill="#6b7280"/>
  <!-- Rear wheel -->
  <circle cx="30" cy="24" r="4" fill="#374151"/>
  <circle cx="30" cy="24" r="2" fill="#6b7280"/>
  <!-- Headlight -->
  <rect x="34" y="14" width="2" height="3" rx="0.5" fill="#fde047"/>
  <!-- Taillight -->
  <rect x="4" y="14" width="1.5" height="3" rx="0.5" fill="#ef4444"/>
</svg>`;

// Flat illustrated airplane - angled top-down view
const PLANE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <!-- Shadow -->
  <ellipse cx="20" cy="38" rx="12" ry="2" fill="rgba(0,0,0,0.12)"/>
  <!-- Fuselage - white -->
  <path d="M20 2 L23 8 L23 30 L20 36 L17 30 L17 8 Z" fill="#ffffff"/>
  <!-- Wings - sky blue -->
  <path d="M17 14 L2 22 L2 24 L17 20 Z" fill="#38bdf8"/>
  <path d="M23 14 L38 22 L38 24 L23 20 Z" fill="#38bdf8"/>
  <!-- Tail wings -->
  <path d="M17 28 L10 30 L10 32 L17 31 Z" fill="#38bdf8"/>
  <path d="M23 28 L30 30 L30 32 L23 31 Z" fill="#38bdf8"/>
  <!-- Tail fin -->
  <path d="M20 26 L20 22 L23 26 Z" fill="#1e3a5a"/>
  <!-- Cockpit windows -->
  <ellipse cx="20" cy="7" rx="2" ry="3" fill="#1e3a5a"/>
  <!-- Fuselage windows -->
  <circle cx="20" cy="13" r="1" fill="#1e3a5a"/>
  <circle cx="20" cy="17" r="1" fill="#1e3a5a"/>
  <!-- Wing accents -->
  <path d="M17 15 L6 21 L6 22 L17 18 Z" fill="#0ea5e9"/>
  <path d="M23 15 L34 21 L34 22 L23 18 Z" fill="#0ea5e9"/>
  <!-- Engine pods -->
  <ellipse cx="12" cy="20" rx="2" ry="1.5" fill="#e5e7eb"/>
  <ellipse cx="28" cy="20" rx="2" ry="1.5" fill="#e5e7eb"/>
</svg>`;

// Isometric hiker
const HIKER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="32" height="40">
  <!-- Shadow -->
  <ellipse cx="16" cy="38" rx="6" ry="2" fill="rgba(0,0,0,0.15)"/>
  <!-- Back leg -->
  <path d="M18 24 L22 36" stroke="#15803d" stroke-width="3" stroke-linecap="round"/>
  <!-- Front leg -->
  <path d="M14 24 L10 36" stroke="#22c55e" stroke-width="3" stroke-linecap="round"/>
  <!-- Body -->
  <path d="M16 12 L16 24" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
  <!-- Backpack back -->
  <path d="M17 14 L21 16 L21 22 L17 24 Z" fill="#ea580c"/>
  <!-- Backpack front -->
  <path d="M15 14 L17 14 L17 24 L15 24 Z" fill="#f97316"/>
  <!-- Back arm -->
  <path d="M16 14 L22 20" stroke="#15803d" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Front arm -->
  <path d="M16 14 L10 18" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Walking stick -->
  <line x1="10" y1="18" x2="8" y2="34" stroke="#a16207" stroke-width="2" stroke-linecap="round"/>
  <!-- Head -->
  <circle cx="16" cy="8" r="5" fill="#fef3c7"/>
  <!-- Hat -->
  <path d="M10 7 L16 4 L22 7 L16 9 Z" fill="#22c55e"/>
  <ellipse cx="16" cy="7" rx="7" ry="2" fill="#16a34a"/>
</svg>`;

// Isometric ferry/boat
const BOAT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36">
  <!-- Water -->
  <path d="M4 32 Q16 28 24 32 Q32 36 44 32 L44 36 Q32 40 24 36 Q16 32 4 36 Z" fill="#38bdf8" opacity="0.4"/>
  <!-- Shadow -->
  <ellipse cx="24" cy="30" rx="16" ry="3" fill="rgba(0,0,0,0.1)"/>
  <!-- Hull back -->
  <path d="M24 20 L40 26 L36 30 L24 32 Z" fill="#0369a1"/>
  <!-- Hull front -->
  <path d="M24 20 L8 26 L12 30 L24 32 Z" fill="#0ea5e9"/>
  <!-- Hull bottom -->
  <path d="M12 30 L24 32 L36 30 L24 34 Z" fill="#075985"/>
  <!-- Deck -->
  <path d="M10 22 L24 16 L38 22 L24 28 Z" fill="#7dd3fc"/>
  <!-- Cabin back -->
  <path d="M24 14 L32 18 L32 24 L24 26 Z" fill="#0284c7"/>
  <!-- Cabin front -->
  <path d="M24 14 L16 18 L16 24 L24 26 Z" fill="#38bdf8"/>
  <!-- Cabin roof -->
  <path d="M16 14 L24 10 L32 14 L24 18 Z" fill="#7dd3fc"/>
  <!-- Cabin windows -->
  <path d="M18 19 L22 17 L22 21 L18 23 Z" fill="#bae6fd"/>
  <path d="M26 19 L30 17 L30 21 L26 23 Z" fill="#0c4a6e"/>
  <!-- Funnel -->
  <path d="M24 10 L26 8 L26 12 L24 14 Z" fill="#f97316"/>
  <path d="M22 10 L24 10 L24 14 L22 12 Z" fill="#fb923c"/>
</svg>`;

const vanIcon = L.divIcon({
  html: VAN_SVG,
  className: "vehicle-icon vehicle-van",
  iconSize: [40, 28],
  iconAnchor: [20, 24],
});

const planeIcon = L.divIcon({
  html: PLANE_SVG,
  className: "vehicle-icon vehicle-plane",
  iconSize: [40, 40],
  iconAnchor: [20, 36],
});

const hikerIcon = L.divIcon({
  html: HIKER_SVG,
  className: "vehicle-icon vehicle-hiker",
  iconSize: [32, 40],
  iconAnchor: [16, 36],
});

const boatIcon = L.divIcon({
  html: BOAT_SVG,
  className: "vehicle-icon vehicle-boat",
  iconSize: [48, 36],
  iconAnchor: [24, 32],
});

// Isometric kayak for canoeing
const KAYAK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36">
  <!-- Water ripple -->
  <ellipse cx="24" cy="32" rx="18" ry="3" fill="#38bdf8" opacity="0.4"/>
  <!-- Shadow -->
  <ellipse cx="24" cy="28" rx="16" ry="3" fill="rgba(0,0,0,0.1)"/>
  <!-- Kayak body back -->
  <path d="M8 22 L24 26 L40 22 L24 18 Z" fill="#65a30d"/>
  <!-- Kayak body left -->
  <path d="M8 20 L8 22 L24 26 L24 24 Z" fill="#84cc16"/>
  <!-- Kayak body right -->
  <path d="M24 24 L24 26 L40 22 L40 20 Z" fill="#4d7c0f"/>
  <!-- Kayak top -->
  <path d="M8 20 L24 24 L40 20 L24 16 Z" fill="#a3e635"/>
  <!-- Cockpit -->
  <ellipse cx="24" cy="20" rx="5" ry="2.5" fill="#365314"/>
  <!-- Person -->
  <circle cx="24" cy="14" r="3.5" fill="#fef3c7"/>
  <ellipse cx="24" cy="18" rx="2.5" ry="2" fill="#fbbf24"/>
  <!-- Paddle -->
  <line x1="12" y1="12" x2="36" y2="20" stroke="#a16207" stroke-width="2"/>
  <!-- Paddle blades -->
  <ellipse cx="11" cy="11" rx="4" ry="2" fill="#fde047" transform="rotate(-20 11 11)"/>
  <ellipse cx="37" cy="21" rx="4" ry="2" fill="#ca8a04" transform="rotate(-20 37 21)"/>
</svg>`;

const kayakIcon = L.divIcon({
  html: KAYAK_SVG,
  className: "vehicle-icon vehicle-kayak",
  iconSize: [48, 36],
  iconAnchor: [24, 28],
});

// Isometric surfer
const SURFER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36">
  <!-- Wave back -->
  <path d="M4 28 Q16 20 24 24 Q32 28 44 22 L44 32 Q32 36 24 32 Q16 28 4 34 Z" fill="#22d3ee"/>
  <!-- Wave front -->
  <path d="M4 30 Q16 24 24 28 Q32 32 44 26 L44 30 Q32 34 24 30 Q16 26 4 32 Z" fill="#06b6d4"/>
  <!-- Surfboard -->
  <path d="M16 12 L14 24 L24 28 L34 24 L32 12 Z" fill="#fb923c"/>
  <path d="M16 12 L14 24 L24 26 L24 10 Z" fill="#fdba74"/>
  <path d="M24 10 L24 26 L34 24 L32 12 Z" fill="#f97316"/>
  <!-- Person legs -->
  <path d="M22 20 L18 26" stroke="#fef3c7" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M26 20 L30 26" stroke="#fcd34d" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Person body -->
  <ellipse cx="24" cy="16" rx="4" ry="3" fill="#fbbf24"/>
  <!-- Person head -->
  <circle cx="24" cy="10" r="4" fill="#fef3c7"/>
  <!-- Arms -->
  <path d="M20 15 L14 12" stroke="#fef3c7" stroke-width="2" stroke-linecap="round"/>
  <path d="M28 15 L34 12" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"/>
</svg>`;

const surferIcon = L.divIcon({
  html: SURFER_SVG,
  className: "vehicle-icon vehicle-surfer",
  iconSize: [48, 36],
  iconAnchor: [24, 28],
});

// Isometric rafter
const RAFTER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36">
  <!-- Water splash -->
  <path d="M6 30 Q14 26 24 30 Q34 34 42 28" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.6"/>
  <path d="M4 32 Q14 28 24 32 Q34 36 44 30" fill="none" stroke="#0ea5e9" stroke-width="1.5" opacity="0.4"/>
  <!-- Shadow -->
  <ellipse cx="24" cy="28" rx="14" ry="3" fill="rgba(0,0,0,0.1)"/>
  <!-- Raft base -->
  <path d="M8 20 L24 26 L40 20 L24 14 Z" fill="#0284c7"/>
  <!-- Raft top -->
  <path d="M8 18 L24 24 L40 18 L24 12 Z" fill="#0ea5e9"/>
  <!-- Raft rim left -->
  <path d="M8 18 L8 20 L24 26 L24 24 Z" fill="#0369a1"/>
  <!-- Raft rim right -->
  <path d="M24 24 L24 26 L40 20 L40 18 Z" fill="#075985"/>
  <!-- Person body -->
  <ellipse cx="24" cy="16" rx="4" ry="2.5" fill="#fbbf24"/>
  <!-- Person head -->
  <circle cx="24" cy="11" r="3.5" fill="#fef3c7"/>
  <!-- Helmet -->
  <path d="M20 10 L24 7 L28 10" fill="#ef4444" stroke="#dc2626" stroke-width="0.5"/>
  <!-- Paddle left -->
  <line x1="16" y1="10" x2="6" y2="18" stroke="#a16207" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="5" cy="19" rx="3" ry="2" fill="#fde047" transform="rotate(-40 5 19)"/>
</svg>`;

const rafterIcon = L.divIcon({
  html: RAFTER_SVG,
  className: "vehicle-icon vehicle-rafter",
  iconSize: [48, 36],
  iconAnchor: [24, 28],
});

// Isometric person in spa/hot pool
const SPA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36">
  <!-- Shadow -->
  <ellipse cx="24" cy="32" rx="14" ry="3" fill="rgba(0,0,0,0.1)"/>
  <!-- Pool outer -->
  <path d="M8 18 L8 26 L24 32 L40 26 L40 18" fill="#a855f7"/>
  <path d="M8 18 L8 26 L24 32 L24 24 Z" fill="#c084fc"/>
  <path d="M24 24 L24 32 L40 26 L40 18 Z" fill="#7e22ce"/>
  <!-- Pool top rim -->
  <ellipse cx="24" cy="18" rx="16" ry="6" fill="#d8b4fe"/>
  <!-- Water -->
  <ellipse cx="24" cy="20" rx="13" ry="4.5" fill="#c084fc"/>
  <!-- Steam -->
  <path d="M16 10 Q14 6 16 2" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
  <path d="M24 8 Q22 4 24 0" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
  <path d="M32 10 Q30 6 32 2" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
  <!-- Person head -->
  <circle cx="24" cy="14" r="4" fill="#fef3c7"/>
  <!-- Person in water -->
  <ellipse cx="24" cy="20" rx="5" ry="2" fill="#fbbf24" opacity="0.6"/>
  <!-- Bubbles -->
  <circle cx="18" cy="21" r="1" fill="#e9d5ff" opacity="0.7"/>
  <circle cx="28" cy="22" r="1.2" fill="#e9d5ff" opacity="0.7"/>
  <circle cx="22" cy="23" r="0.8" fill="#e9d5ff" opacity="0.7"/>
</svg>`;

const spaIcon = L.divIcon({
  html: SPA_SVG,
  className: "vehicle-icon vehicle-spa",
  iconSize: [48, 36],
  iconAnchor: [24, 28],
});

// Isometric cyclist
const CYCLIST_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 40" width="48" height="40">
  <!-- Shadow -->
  <ellipse cx="24" cy="38" rx="16" ry="3" fill="rgba(0,0,0,0.12)"/>
  <!-- Back wheel -->
  <ellipse cx="12" cy="30" rx="8" ry="8" fill="none" stroke="#374151" stroke-width="2"/>
  <ellipse cx="12" cy="30" rx="2" ry="2" fill="#6b7280"/>
  <!-- Front wheel -->
  <ellipse cx="36" cy="30" rx="8" ry="8" fill="none" stroke="#374151" stroke-width="2"/>
  <ellipse cx="36" cy="30" rx="2" ry="2" fill="#6b7280"/>
  <!-- Frame -->
  <path d="M12 30 L24 18 L36 30" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M12 30 L24 30 L24 18" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Seat post -->
  <line x1="20" y1="24" x2="18" y2="16" stroke="#dc2626" stroke-width="2"/>
  <!-- Seat -->
  <ellipse cx="17" cy="15" rx="4" ry="1.5" fill="#1f2937"/>
  <!-- Handlebars -->
  <line x1="24" y1="18" x2="32" y2="16" stroke="#dc2626" stroke-width="2"/>
  <path d="M30 14 L34 16 L32 18" fill="none" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
  <!-- Rider body -->
  <path d="M18 15 Q22 14 26 16" stroke="#22c55e" stroke-width="4" stroke-linecap="round"/>
  <!-- Rider head -->
  <circle cx="28" cy="10" r="4" fill="#fef3c7"/>
  <!-- Helmet -->
  <path d="M24 8 L28 5 L32 8" fill="#22c55e" stroke="#16a34a" stroke-width="0.5"/>
  <!-- Legs on pedals -->
  <path d="M20 22 L24 30" stroke="#fef3c7" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M22 20 L20 30" stroke="#fcd34d" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Pedals -->
  <circle cx="24" cy="30" r="2.5" fill="#6b7280"/>
</svg>`;

const cyclistIcon = L.divIcon({
  html: CYCLIST_SVG,
  className: "vehicle-icon vehicle-cyclist",
  iconSize: [48, 40],
  iconAnchor: [24, 36],
});

const STATIC_ICONS = { hike: hikerIcon, ferry: boatIcon, canoeing: kayakIcon, surfing: surferIcon, rafting: rafterIcon, spa: spaIcon, bike: cyclistIcon };

// Create a rotated plane icon
function createRotatedPlaneIcon(bearing) {
  const html = `<div style="transform: rotate(${bearing}deg); transform-origin: center center;">${PLANE_SVG}</div>`;
  return L.divIcon({
    html,
    className: "vehicle-icon vehicle-plane",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

// Create a van icon that flips based on direction (side view)
function createDirectionalVanIcon(bearing) {
  // Van faces right (east = 90°). Flip horizontally if heading more west than east
  const isHeadingWest = bearing > 90 && bearing < 270;
  const transform = isHeadingWest ? "scaleX(-1)" : "";
  const html = `<div style="transform: ${transform}; transform-origin: center center;">${VAN_SVG}</div>`;
  return L.divIcon({
    html,
    className: "vehicle-icon vehicle-van",
    iconSize: [40, 28],
    iconAnchor: [20, 24],
  });
}

function AnimatedVehicle({ position, mode, bearing = 0 }) {
  const icon = useMemo(() => {
    if (mode === "fly") {
      return createRotatedPlaneIcon(bearing);
    }
    if (mode === "drive") {
      return createDirectionalVanIcon(bearing);
    }
    return STATIC_ICONS[mode] || createDirectionalVanIcon(bearing);
  }, [mode, bearing]);

  if (!position) return null;

  return <Marker position={position} icon={icon} zIndexOffset={1000} />;
}

export default AnimatedVehicle;
