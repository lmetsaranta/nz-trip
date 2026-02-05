import { useMemo } from "react";
import L from "leaflet";
import { Marker } from "react-leaflet";

/* ── Modern vehicle SVGs ── */

// Isometric white van
const VAN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36">
  <!-- Shadow -->
  <ellipse cx="24" cy="34" rx="16" ry="2" fill="rgba(0,0,0,0.15)"/>
  <!-- Body back (right side) -->
  <path d="M24 12 L40 20 L40 28 L24 32 Z" fill="#e5e7eb"/>
  <!-- Body front (left side) -->
  <path d="M24 12 L8 20 L8 28 L24 32 Z" fill="#f9fafb"/>
  <!-- Roof -->
  <path d="M10 14 L24 8 L38 14 L24 20 Z" fill="#fff"/>
  <!-- Windshield left -->
  <path d="M10 14 L18 10 L18 16 L10 20 Z" fill="#bfdbfe"/>
  <!-- Windshield right -->
  <path d="M38 14 L30 10 L30 16 L38 20 Z" fill="#93c5fd"/>
  <!-- Side windows left -->
  <path d="M12 21 L18 18 L18 24 L12 26 Z" fill="#bfdbfe"/>
  <!-- Side windows right -->
  <path d="M36 21 L30 18 L30 24 L36 26 Z" fill="#93c5fd"/>
  <!-- Front light -->
  <path d="M10 20 L14 18 L14 20 L10 22 Z" fill="#fef08a"/>
  <!-- Rear light -->
  <path d="M38 22 L34 20 L34 22 L38 24 Z" fill="#fca5a5"/>
  <!-- Wheel left -->
  <ellipse cx="14" cy="30" rx="3" ry="1.5" fill="#1f2937"/>
  <ellipse cx="14" cy="30" rx="1.5" ry="0.8" fill="#6b7280"/>
  <!-- Wheel right -->
  <ellipse cx="34" cy="30" rx="3" ry="1.5" fill="#1f2937"/>
  <ellipse cx="34" cy="30" rx="1.5" ry="0.8" fill="#6b7280"/>
  <!-- Roof rack -->
  <path d="M16 10 L24 6 L32 10 L24 14 Z" fill="#d1d5db" opacity="0.5"/>
</svg>`;

// Isometric airplane
const PLANE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36" width="48" height="36">
  <!-- Shadow -->
  <ellipse cx="24" cy="34" rx="12" ry="2" fill="rgba(0,0,0,0.15)"/>
  <!-- Fuselage back -->
  <path d="M24 4 L28 8 L28 24 L24 28 Z" fill="#6d28d9"/>
  <!-- Fuselage front -->
  <path d="M24 4 L20 8 L20 24 L24 28 Z" fill="#a78bfa"/>
  <!-- Left wing -->
  <path d="M20 12 L4 18 L4 20 L20 16 Z" fill="#8b5cf6"/>
  <!-- Right wing -->
  <path d="M28 12 L44 18 L44 20 L28 16 Z" fill="#5b21b6"/>
  <!-- Tail left -->
  <path d="M20 22 L14 20 L14 22 L20 24 Z" fill="#8b5cf6"/>
  <!-- Tail right -->
  <path d="M28 22 L34 20 L34 22 L28 24 Z" fill="#5b21b6"/>
  <!-- Tail fin -->
  <path d="M24 22 L24 18 L28 20 Z" fill="#c4b5fd"/>
  <!-- Cockpit -->
  <path d="M22 6 L24 4 L26 6 L24 8 Z" fill="#ddd6fe"/>
  <!-- Engine glow -->
  <ellipse cx="24" cy="28" rx="2" ry="1" fill="#c4b5fd" opacity="0.6"/>
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
  iconSize: [48, 36],
  iconAnchor: [24, 30],
});

const planeIcon = L.divIcon({
  html: PLANE_SVG,
  className: "vehicle-icon vehicle-plane",
  iconSize: [48, 36],
  iconAnchor: [24, 28],
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

const ICONS = { drive: vanIcon, fly: planeIcon, hike: hikerIcon, ferry: boatIcon, canoeing: kayakIcon, surfing: surferIcon, rafting: rafterIcon, spa: spaIcon };

function AnimatedVehicle({ position, mode }) {
  const icon = useMemo(() => ICONS[mode] || ICONS.drive, [mode]);

  if (!position) return null;

  return <Marker position={position} icon={icon} zIndexOffset={1000} />;
}

export default AnimatedVehicle;
