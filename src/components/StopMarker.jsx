import L from "leaflet";
import { Marker } from "react-leaflet";

const ICONS = {
  // Isometric tent - green camping tent with depth
  camp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <defs>
      <linearGradient id="campLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4ade80"/>
        <stop offset="100%" stop-color="#22c55e"/>
      </linearGradient>
    </defs>
    <!-- Shadow -->
    <ellipse cx="20" cy="35" rx="12" ry="3" fill="rgba(0,0,0,0.15)"/>
    <!-- Back face -->
    <path d="M20 8 L32 28 L20 28 Z" fill="#15803d"/>
    <!-- Front face -->
    <path d="M20 8 L8 28 L20 28 Z" fill="url(#campLight)"/>
    <!-- Door -->
    <path d="M20 28 L20 18 L14 28 Z" fill="#166534"/>
    <path d="M20 28 L20 18 L26 28 Z" fill="#14532d"/>
    <!-- Top highlight -->
    <path d="M20 8 L21 10 L20 28 L19 10 Z" fill="#86efac"/>
  </svg>`,

  // Isometric building - hostel/hotel
  hostel: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Shadow -->
    <path d="M8 32 L20 38 L32 32 L20 26 Z" fill="rgba(0,0,0,0.15)"/>
    <!-- Left wall -->
    <path d="M8 14 L8 30 L20 36 L20 20 Z" fill="#fbbf24"/>
    <!-- Right wall -->
    <path d="M20 20 L20 36 L32 30 L32 14 Z" fill="#d97706"/>
    <!-- Roof -->
    <path d="M8 14 L20 8 L32 14 L20 20 Z" fill="#fcd34d"/>
    <!-- Left windows -->
    <rect x="11" y="18" width="4" height="4" fill="#fef3c7" transform="skewY(26.57)"/>
    <rect x="11" y="25" width="4" height="4" fill="#fef3c7" transform="skewY(26.57)"/>
    <!-- Right windows -->
    <rect x="23" y="22" width="4" height="4" fill="#92400e" transform="skewY(-26.57)"/>
    <rect x="23" y="29" width="4" height="4" fill="#92400e" transform="skewY(-26.57)"/>
    <!-- Door -->
    <path d="M17 30 L17 36 L20 38 L20 32 Z" fill="#92400e"/>
  </svg>`,

  // Isometric mountain with flag
  hike: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Shadow -->
    <ellipse cx="20" cy="36" rx="14" ry="3" fill="rgba(0,0,0,0.15)"/>
    <!-- Back mountain -->
    <path d="M28 12 L38 34 L24 34 Z" fill="#86efac"/>
    <path d="M28 12 L18 34 L24 34 Z" fill="#22c55e"/>
    <!-- Front mountain - left face -->
    <path d="M16 6 L4 34 L16 34 Z" fill="#4ade80"/>
    <!-- Front mountain - right face -->
    <path d="M16 6 L28 34 L16 34 Z" fill="#16a34a"/>
    <!-- Snow cap left -->
    <path d="M16 6 L12 14 L16 12 Z" fill="#f0fdf4"/>
    <!-- Snow cap right -->
    <path d="M16 6 L20 14 L16 12 Z" fill="#dcfce7"/>
    <!-- Flag pole -->
    <line x1="16" y1="6" x2="16" y2="2" stroke="#7c2d12" stroke-width="1.5"/>
    <!-- Flag -->
    <path d="M16 2 L24 4 L16 6 Z" fill="#ef4444"/>
  </svg>`,

  // Isometric location pin
  destination: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 44" width="40" height="44">
    <!-- Shadow -->
    <ellipse cx="20" cy="42" rx="8" ry="2" fill="rgba(0,0,0,0.2)"/>
    <!-- Pin body - back -->
    <path d="M20 40 L20 18 Q28 18 28 10 Q28 2 20 2" fill="#dc2626"/>
    <!-- Pin body - front -->
    <path d="M20 40 L20 18 Q12 18 12 10 Q12 2 20 2" fill="#ef4444"/>
    <!-- Highlight -->
    <path d="M20 2 Q14 2 13 8" fill="none" stroke="#fca5a5" stroke-width="2" stroke-linecap="round"/>
    <!-- Inner circle back -->
    <ellipse cx="21" cy="10" rx="4" ry="4" fill="#b91c1c"/>
    <!-- Inner circle front -->
    <ellipse cx="19" cy="10" rx="4" ry="4" fill="#fef2f2"/>
    <!-- Shine -->
    <circle cx="17" cy="8" r="1.5" fill="#fff"/>
  </svg>`,

  // Isometric airplane
  plane: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Shadow -->
    <ellipse cx="20" cy="36" rx="10" ry="3" fill="rgba(0,0,0,0.15)"/>
    <!-- Fuselage back -->
    <path d="M20 6 L23 10 L23 26 L20 30 Z" fill="#7c3aed"/>
    <!-- Fuselage front -->
    <path d="M20 6 L17 10 L17 26 L20 30 Z" fill="#a78bfa"/>
    <!-- Left wing -->
    <path d="M17 14 L6 18 L6 20 L17 18 Z" fill="#8b5cf6"/>
    <!-- Right wing -->
    <path d="M23 14 L34 18 L34 20 L23 18 Z" fill="#6d28d9"/>
    <!-- Tail left -->
    <path d="M17 24 L12 22 L12 24 L17 26 Z" fill="#8b5cf6"/>
    <!-- Tail right -->
    <path d="M23 24 L28 22 L28 24 L23 26 Z" fill="#6d28d9"/>
    <!-- Tail fin -->
    <path d="M20 24 L20 20 L23 22 Z" fill="#c4b5fd"/>
    <!-- Cockpit -->
    <path d="M18 8 L20 6 L22 8 L20 10 Z" fill="#ddd6fe"/>
    <!-- Window line -->
    <line x1="18" y1="12" x2="18" y2="20" stroke="#ddd6fe" stroke-width="1" stroke-dasharray="2 2"/>
  </svg>`,

  // Isometric raft with person
  rafting: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Water -->
    <path d="M4 32 Q12 28 20 32 Q28 36 36 32 L36 36 Q28 40 20 36 Q12 32 4 36 Z" fill="#38bdf8" opacity="0.5"/>
    <!-- Shadow on water -->
    <ellipse cx="20" cy="30" rx="12" ry="4" fill="rgba(0,0,0,0.1)"/>
    <!-- Raft base -->
    <path d="M8 24 L20 30 L32 24 L20 18 Z" fill="#0284c7"/>
    <!-- Raft top -->
    <path d="M8 22 L20 28 L32 22 L20 16 Z" fill="#0ea5e9"/>
    <!-- Raft rim left -->
    <path d="M8 22 L8 24 L20 30 L20 28 Z" fill="#0369a1"/>
    <!-- Raft rim right -->
    <path d="M20 28 L20 30 L32 24 L32 22 Z" fill="#0c4a6e"/>
    <!-- Person body -->
    <ellipse cx="20" cy="18" rx="3" ry="2" fill="#fbbf24"/>
    <!-- Person head -->
    <circle cx="20" cy="14" r="3" fill="#fef3c7"/>
    <!-- Paddle left -->
    <line x1="14" y1="12" x2="8" y2="20" stroke="#a16207" stroke-width="2" stroke-linecap="round"/>
    <!-- Paddle blade -->
    <ellipse cx="7" cy="21" rx="2" ry="3" fill="#fde047" transform="rotate(-30 7 21)"/>
  </svg>`,

  // Isometric surfboard with wave
  surfing: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Wave back -->
    <path d="M2 30 Q10 22 20 26 Q30 30 38 24 L38 34 Q30 38 20 34 Q10 30 2 36 Z" fill="#22d3ee"/>
    <!-- Wave front -->
    <path d="M2 32 Q10 26 20 30 Q30 34 38 28 L38 32 Q30 36 20 32 Q10 28 2 34 Z" fill="#06b6d4"/>
    <!-- Wave foam -->
    <path d="M2 30 Q10 22 20 26 Q30 30 38 24" fill="none" stroke="#fff" stroke-width="2" opacity="0.6"/>
    <!-- Board shadow -->
    <ellipse cx="20" cy="28" rx="8" ry="2" fill="rgba(0,0,0,0.1)"/>
    <!-- Surfboard bottom -->
    <path d="M14 10 L12 24 L20 28 L28 24 L26 10 Z" fill="#ea580c"/>
    <!-- Surfboard top -->
    <path d="M14 10 L12 24 L20 26 L20 8 Z" fill="#fb923c"/>
    <path d="M20 8 L20 26 L28 24 L26 10 Z" fill="#f97316"/>
    <!-- Stripe -->
    <path d="M18 10 L17 22 L20 24 L23 22 L22 10 Z" fill="#fff" opacity="0.3"/>
    <!-- Fin -->
    <path d="M20 26 L18 30 L22 30 Z" fill="#7c2d12"/>
  </svg>`,

  // Isometric kayak
  canoeing: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Water ripple -->
    <ellipse cx="20" cy="34" rx="16" ry="4" fill="#38bdf8" opacity="0.4"/>
    <!-- Shadow -->
    <ellipse cx="20" cy="30" rx="14" ry="3" fill="rgba(0,0,0,0.1)"/>
    <!-- Kayak body back -->
    <path d="M6 26 L20 30 L34 26 L20 22 Z" fill="#65a30d"/>
    <!-- Kayak body left -->
    <path d="M6 24 L6 26 L20 30 L20 28 Z" fill="#84cc16"/>
    <!-- Kayak body right -->
    <path d="M20 28 L20 30 L34 26 L34 24 Z" fill="#4d7c0f"/>
    <!-- Kayak top -->
    <path d="M6 24 L20 28 L34 24 L20 20 Z" fill="#a3e635"/>
    <!-- Cockpit -->
    <ellipse cx="20" cy="24" rx="4" ry="2" fill="#365314"/>
    <!-- Person -->
    <circle cx="20" cy="18" r="3" fill="#fef3c7"/>
    <ellipse cx="20" cy="22" rx="2" ry="1.5" fill="#fbbf24"/>
    <!-- Paddle -->
    <line x1="10" y1="16" x2="30" y2="24" stroke="#a16207" stroke-width="1.5"/>
    <!-- Paddle blades -->
    <ellipse cx="9" cy="15" rx="3" ry="1.5" fill="#fde047" transform="rotate(-20 9 15)"/>
    <ellipse cx="31" cy="25" rx="3" ry="1.5" fill="#ca8a04" transform="rotate(-20 31 25)"/>
  </svg>`,

  // Isometric hot tub / spa
  spa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Shadow -->
    <ellipse cx="20" cy="36" rx="14" ry="4" fill="rgba(0,0,0,0.15)"/>
    <!-- Tub outer back -->
    <path d="M6 20 L6 30 L20 36 L34 30 L34 20" fill="#a855f7"/>
    <!-- Tub outer left -->
    <path d="M6 20 L6 30 L20 36 L20 26 Z" fill="#c084fc"/>
    <!-- Tub outer right -->
    <path d="M20 26 L20 36 L34 30 L34 20 Z" fill="#7e22ce"/>
    <!-- Tub top rim -->
    <ellipse cx="20" cy="20" rx="14" ry="6" fill="#d8b4fe"/>
    <!-- Water surface -->
    <ellipse cx="20" cy="22" rx="11" ry="4.5" fill="#c084fc"/>
    <!-- Steam 1 -->
    <path d="M14 14 Q12 10 14 6" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.6" stroke-linecap="round"/>
    <!-- Steam 2 -->
    <path d="M20 12 Q18 8 20 4" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.6" stroke-linecap="round"/>
    <!-- Steam 3 -->
    <path d="M26 14 Q24 10 26 6" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.6" stroke-linecap="round"/>
    <!-- Bubbles -->
    <circle cx="15" cy="23" r="1" fill="#e9d5ff" opacity="0.8"/>
    <circle cx="22" cy="24" r="1.2" fill="#e9d5ff" opacity="0.8"/>
    <circle cx="18" cy="21" r="0.8" fill="#e9d5ff" opacity="0.8"/>
    <circle cx="25" cy="22" r="1" fill="#e9d5ff" opacity="0.8"/>
  </svg>`,
};

const SIZES = {
  camp: [40, 40],
  hostel: [40, 40],
  hike: [40, 40],
  destination: [40, 44],
  plane: [40, 40],
  rafting: [40, 40],
  surfing: [40, 40],
  canoeing: [40, 40],
  spa: [40, 40],
};

const ANCHORS = {
  camp: [20, 35],
  hostel: [20, 36],
  hike: [20, 36],
  destination: [20, 42],
  plane: [20, 30],
  rafting: [20, 32],
  surfing: [20, 32],
  canoeing: [20, 32],
  spa: [20, 36],
};

function createIcon(type) {
  const svg = ICONS[type] || ICONS.destination;
  const size = SIZES[type] || SIZES.destination;
  const anchor = ANCHORS[type] || ANCHORS.destination;
  return L.divIcon({
    html: svg,
    className: "map-icon",
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -anchor[1]],
  });
}

function StopMarker({ stop, onClick }) {
  if (!stop.coords) return null;

  const handleClick = () => {
    if (onClick) onClick(stop);
  };

  return (
    <Marker
      position={stop.coords}
      icon={createIcon(stop.type)}
      eventHandlers={{ click: handleClick }}
    />
  );
}

export default StopMarker;
