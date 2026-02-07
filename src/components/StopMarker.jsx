import L from "leaflet";
import { Marker } from "react-leaflet";

const ICONS = {
  // Isometric camping tent - orange A-frame style
  camp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Ground shadow -->
    <ellipse cx="20" cy="34" rx="14" ry="4" fill="rgba(0,0,0,0.12)"/>
    <!-- Tent back panel -->
    <path d="M20 6 L34 30 L20 30 Z" fill="#c2410c"/>
    <!-- Tent front panel -->
    <path d="M20 6 L6 30 L20 30 Z" fill="#f97316"/>
    <!-- Tent front opening dark -->
    <path d="M20 30 L20 14 L12 30 Z" fill="#9a3412"/>
    <!-- Tent front opening light -->
    <path d="M20 30 L20 14 L28 30 Z" fill="#7c2d12"/>
    <!-- Ridge highlight -->
    <path d="M20 6 L20 30" stroke="#fdba74" stroke-width="1.5"/>
    <!-- Guy ropes -->
    <line x1="6" y1="30" x2="2" y2="32" stroke="#a3a3a3" stroke-width="0.75"/>
    <line x1="34" y1="30" x2="38" y2="32" stroke="#a3a3a3" stroke-width="0.75"/>
    <!-- Stakes -->
    <circle cx="2" cy="32" r="1" fill="#737373"/>
    <circle cx="38" cy="32" r="1" fill="#737373"/>
  </svg>`,

  // Isometric traditional red house
  hostel: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Ground shadow -->
    <ellipse cx="20" cy="36" rx="12" ry="3" fill="rgba(0,0,0,0.12)"/>
    <!-- House left wall -->
    <path d="M6 18 L6 32 L20 38 L20 24 Z" fill="#ef4444"/>
    <!-- House right wall -->
    <path d="M20 24 L20 38 L34 32 L34 18 Z" fill="#b91c1c"/>
    <!-- Roof left side -->
    <path d="M4 18 L20 6 L20 24 L6 18 Z" fill="#7f1d1d"/>
    <!-- Roof right side -->
    <path d="M20 6 L36 18 L34 18 L20 24 Z" fill="#450a0a"/>
    <!-- Roof front edge -->
    <path d="M4 18 L6 18 L20 24 L20 24 Z" fill="#991b1b"/>
    <!-- Chimney -->
    <path d="M28 10 L28 6 L32 8 L32 12 Z" fill="#78716c"/>
    <path d="M28 6 L30 5 L32 6 L32 8 L28 6 Z" fill="#a8a29e"/>
    <!-- Window left -->
    <path d="M9 22 L9 26 L13 28 L13 24 Z" fill="#fef3c7"/>
    <path d="M11 22 L11 28" stroke="#991b1b" stroke-width="0.5"/>
    <path d="M9 25 L13 26" stroke="#991b1b" stroke-width="0.5"/>
    <!-- Window right -->
    <path d="M23 26 L23 30 L27 28 L27 24 Z" fill="#fef3c7" opacity="0.7"/>
    <path d="M25 24 L25 30" stroke="#7f1d1d" stroke-width="0.5"/>
    <!-- Door -->
    <path d="M15 30 L15 38 L20 40 L20 32 Z" fill="#78350f"/>
    <!-- Door knob -->
    <circle cx="18" cy="35" r="0.8" fill="#fbbf24"/>
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

  // Isometric location marker/pin
  destination: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 44" width="40" height="44">
    <!-- Ground shadow -->
    <ellipse cx="20" cy="42" rx="6" ry="2" fill="rgba(0,0,0,0.15)"/>
    <!-- Pin stem -->
    <path d="M20 42 L20 24" stroke="#dc2626" stroke-width="3"/>
    <!-- Pin head back -->
    <circle cx="20" cy="14" r="12" fill="#dc2626"/>
    <!-- Pin head front (3D effect) -->
    <ellipse cx="18" cy="13" rx="10" ry="10" fill="#ef4444"/>
    <!-- Inner circle -->
    <circle cx="18" cy="13" r="5" fill="#fef2f2"/>
    <!-- Highlight -->
    <circle cx="15" cy="10" r="2" fill="#fff" opacity="0.6"/>
    <!-- Small shine -->
    <circle cx="22" cy="16" r="1" fill="#fca5a5"/>
  </svg>`,

  // Isometric airplane - sleek commercial jet
  plane: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Ground shadow -->
    <ellipse cx="20" cy="36" rx="12" ry="3" fill="rgba(0,0,0,0.12)"/>
    <!-- Fuselage body -->
    <ellipse cx="20" cy="18" rx="4" ry="14" fill="#0ea5e9"/>
    <!-- Fuselage highlight -->
    <ellipse cx="18" cy="18" rx="2" ry="12" fill="#38bdf8"/>
    <!-- Left wing -->
    <path d="M16 16 L4 22 L4 24 L16 20 Z" fill="#0284c7"/>
    <!-- Right wing -->
    <path d="M24 16 L36 22 L36 24 L24 20 Z" fill="#0369a1"/>
    <!-- Tail fin -->
    <path d="M20 30 L20 26 L24 28 L24 30 Z" fill="#0284c7"/>
    <path d="M20 30 L20 26 L16 28 L16 30 Z" fill="#38bdf8"/>
    <!-- Tail wings -->
    <path d="M16 28 L10 30 L10 31 L16 30 Z" fill="#0284c7"/>
    <path d="M24 28 L30 30 L30 31 L24 30 Z" fill="#0369a1"/>
    <!-- Cockpit -->
    <ellipse cx="20" cy="5" rx="3" ry="2" fill="#bae6fd"/>
    <!-- Windows -->
    <circle cx="18" cy="10" r="1" fill="#bae6fd"/>
    <circle cx="18" cy="14" r="1" fill="#bae6fd"/>
    <circle cx="18" cy="18" r="1" fill="#bae6fd"/>
    <!-- Engine left -->
    <ellipse cx="10" cy="22" rx="2" ry="1" fill="#64748b"/>
    <!-- Engine right -->
    <ellipse cx="30" cy="22" rx="2" ry="1" fill="#475569"/>
  </svg>`,

  // Isometric inflatable raft with paddles
  rafting: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Water waves -->
    <path d="M2 34 Q10 30 20 34 Q30 38 38 34 L38 38 Q30 42 20 38 Q10 34 2 38 Z" fill="#0ea5e9" opacity="0.4"/>
    <!-- Ground shadow -->
    <ellipse cx="20" cy="32" rx="14" ry="4" fill="rgba(0,0,0,0.1)"/>
    <!-- Raft outer tube - bottom -->
    <ellipse cx="20" cy="28" rx="14" ry="6" fill="#f97316"/>
    <!-- Raft outer tube - top highlight -->
    <ellipse cx="20" cy="26" rx="14" ry="6" fill="#fb923c"/>
    <!-- Raft inner floor -->
    <ellipse cx="20" cy="26" rx="9" ry="4" fill="#7c2d12"/>
    <!-- Tube segments -->
    <path d="M6 26 Q6 22 10 22" stroke="#ea580c" stroke-width="1" fill="none"/>
    <path d="M34 26 Q34 22 30 22" stroke="#ea580c" stroke-width="1" fill="none"/>
    <!-- Person 1 -->
    <circle cx="16" cy="20" r="2.5" fill="#fef3c7"/>
    <ellipse cx="16" cy="24" rx="2" ry="1.5" fill="#3b82f6"/>
    <!-- Person 2 -->
    <circle cx="24" cy="20" r="2.5" fill="#fef3c7"/>
    <ellipse cx="24" cy="24" rx="2" ry="1.5" fill="#ef4444"/>
    <!-- Paddle 1 -->
    <line x1="12" y1="18" x2="4" y2="28" stroke="#a16207" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="3" cy="29" rx="2" ry="3" fill="#fbbf24" transform="rotate(-60 3 29)"/>
    <!-- Paddle 2 -->
    <line x1="28" y1="18" x2="36" y2="28" stroke="#a16207" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="37" cy="29" rx="2" ry="3" fill="#fbbf24" transform="rotate(60 37 29)"/>
  </svg>`,

  // Isometric surfer on surfboard
  surfing: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Wave curl back -->
    <path d="M0 28 Q8 18 18 22 Q28 26 40 20 L40 36 Q28 40 18 36 Q8 32 0 36 Z" fill="#0891b2"/>
    <!-- Wave curl front -->
    <path d="M0 30 Q8 22 18 26 Q28 30 40 24 L40 34 Q28 38 18 34 Q8 30 0 34 Z" fill="#06b6d4"/>
    <!-- Wave foam -->
    <path d="M0 28 Q8 18 18 22 Q28 26 40 20" fill="none" stroke="#fff" stroke-width="2.5" opacity="0.7"/>
    <!-- Board shadow -->
    <ellipse cx="20" cy="30" rx="10" ry="2" fill="rgba(0,0,0,0.15)"/>
    <!-- Surfboard -->
    <path d="M10 28 L14 12 L20 8 L26 12 L30 28 L20 32 Z" fill="#fbbf24"/>
    <!-- Board stripe -->
    <path d="M18 10 L16 28 L20 30 L24 28 L22 10 Z" fill="#f59e0b"/>
    <!-- Board highlight -->
    <path d="M14 12 L16 26 L14 28 L10 28 Z" fill="#fcd34d"/>
    <!-- Surfer body -->
    <ellipse cx="20" cy="20" rx="3" ry="4" fill="#0ea5e9"/>
    <!-- Surfer head -->
    <circle cx="20" cy="14" r="3" fill="#fef3c7"/>
    <!-- Arms out for balance -->
    <line x1="14" y1="18" x2="10" y2="16" stroke="#fef3c7" stroke-width="2" stroke-linecap="round"/>
    <line x1="26" y1="18" x2="30" y2="16" stroke="#fef3c7" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // Isometric sea kayak
  canoeing: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Water -->
    <ellipse cx="20" cy="36" rx="18" ry="4" fill="#0ea5e9" opacity="0.3"/>
    <!-- Shadow -->
    <ellipse cx="20" cy="32" rx="16" ry="4" fill="rgba(0,0,0,0.1)"/>
    <!-- Kayak hull bottom -->
    <path d="M2 28 L20 34 L38 28 L20 22 Z" fill="#0284c7"/>
    <!-- Kayak left side -->
    <path d="M2 26 L2 28 L20 34 L20 32 Z" fill="#0ea5e9"/>
    <!-- Kayak right side -->
    <path d="M20 32 L20 34 L38 28 L38 26 Z" fill="#0369a1"/>
    <!-- Kayak deck -->
    <path d="M2 26 L20 32 L38 26 L20 20 Z" fill="#38bdf8"/>
    <!-- Cockpit rim -->
    <ellipse cx="20" cy="26" rx="5" ry="2.5" fill="#0284c7"/>
    <!-- Cockpit hole -->
    <ellipse cx="20" cy="26" rx="4" ry="2" fill="#0c4a6e"/>
    <!-- Paddler torso -->
    <ellipse cx="20" cy="22" rx="3" ry="2" fill="#ef4444"/>
    <!-- Paddler head -->
    <circle cx="20" cy="18" r="2.5" fill="#fef3c7"/>
    <!-- Paddle shaft -->
    <line x1="8" y1="18" x2="32" y2="26" stroke="#854d0e" stroke-width="1.5"/>
    <!-- Paddle blade left -->
    <ellipse cx="6" cy="17" rx="3" ry="1.5" fill="#fbbf24" transform="rotate(-30 6 17)"/>
    <!-- Paddle blade right -->
    <ellipse cx="34" cy="27" rx="3" ry="1.5" fill="#d97706" transform="rotate(-30 34 27)"/>
    <!-- Bow point -->
    <circle cx="2" cy="27" r="1" fill="#0ea5e9"/>
    <!-- Stern point -->
    <circle cx="38" cy="27" r="1" fill="#0369a1"/>
  </svg>`,

  // Isometric hot spring / thermal spa
  spa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Ground shadow -->
    <ellipse cx="20" cy="36" rx="16" ry="4" fill="rgba(0,0,0,0.12)"/>
    <!-- Pool outer wall back -->
    <ellipse cx="20" cy="28" rx="16" ry="7" fill="#0d9488"/>
    <!-- Pool outer wall front -->
    <path d="M4 28 L4 32 Q4 36 20 36 Q36 36 36 32 L36 28" fill="#14b8a6"/>
    <!-- Pool rim -->
    <ellipse cx="20" cy="28" rx="16" ry="7" fill="#5eead4" />
    <!-- Water surface -->
    <ellipse cx="20" cy="29" rx="13" ry="5.5" fill="#2dd4bf"/>
    <!-- Water depth -->
    <ellipse cx="20" cy="30" rx="12" ry="5" fill="#14b8a6" opacity="0.5"/>
    <!-- Steam wisps -->
    <path d="M12 20 Q10 14 12 8" fill="none" stroke="#fff" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
    <path d="M20 18 Q18 12 20 6" fill="none" stroke="#fff" stroke-width="2" opacity="0.6" stroke-linecap="round"/>
    <path d="M28 20 Q26 14 28 8" fill="none" stroke="#fff" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
    <!-- Bubbles -->
    <circle cx="14" cy="30" r="1.2" fill="#99f6e4" opacity="0.8"/>
    <circle cx="18" cy="28" r="0.8" fill="#99f6e4" opacity="0.7"/>
    <circle cx="23" cy="31" r="1" fill="#99f6e4" opacity="0.8"/>
    <circle cx="26" cy="29" r="1.3" fill="#99f6e4" opacity="0.7"/>
    <circle cx="16" cy="32" r="0.7" fill="#99f6e4" opacity="0.6"/>
    <!-- Rocks around pool -->
    <ellipse cx="6" cy="32" rx="3" ry="2" fill="#78716c"/>
    <ellipse cx="34" cy="32" rx="3" ry="2" fill="#57534e"/>
    <ellipse cx="10" cy="34" rx="2" ry="1.5" fill="#a8a29e"/>
  </svg>`,

  // Isometric bicycle
  bike: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
    <!-- Ground shadow -->
    <ellipse cx="20" cy="36" rx="14" ry="3" fill="rgba(0,0,0,0.1)"/>
    <!-- Back wheel -->
    <ellipse cx="10" cy="28" rx="7" ry="7" fill="none" stroke="#374151" stroke-width="2"/>
    <ellipse cx="10" cy="28" rx="2" ry="2" fill="#6b7280"/>
    <!-- Front wheel -->
    <ellipse cx="30" cy="28" rx="7" ry="7" fill="none" stroke="#374151" stroke-width="2"/>
    <ellipse cx="30" cy="28" rx="2" ry="2" fill="#6b7280"/>
    <!-- Frame - main triangle -->
    <path d="M10 28 L20 16 L30 28" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M10 28 L20 28 L20 16" fill="none" stroke="#dc2626" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Seat post and seat -->
    <line x1="17" y1="22" x2="15" y2="14" stroke="#dc2626" stroke-width="2"/>
    <ellipse cx="14" cy="13" rx="4" ry="1.5" fill="#1f2937"/>
    <!-- Handlebars -->
    <line x1="20" y1="16" x2="28" y2="14" stroke="#dc2626" stroke-width="2"/>
    <path d="M26 12 L30 14 L28 16" fill="none" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
    <!-- Pedals -->
    <circle cx="20" cy="28" r="2" fill="#6b7280"/>
    <line x1="18" y1="30" x2="22" y2="26" stroke="#374151" stroke-width="1.5"/>
    <!-- Spokes hint -->
    <line x1="10" y1="22" x2="10" y2="34" stroke="#9ca3af" stroke-width="0.5" opacity="0.5"/>
    <line x1="4" y1="28" x2="16" y2="28" stroke="#9ca3af" stroke-width="0.5" opacity="0.5"/>
    <line x1="30" y1="22" x2="30" y2="34" stroke="#9ca3af" stroke-width="0.5" opacity="0.5"/>
    <line x1="24" y1="28" x2="36" y2="28" stroke="#9ca3af" stroke-width="0.5" opacity="0.5"/>
  </svg>`,

  // Walking Santa Claus for Christmas Eve
  santa: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 44" width="40" height="44">
    <!-- Shadow -->
    <ellipse cx="20" cy="42" rx="8" ry="2" fill="rgba(0,0,0,0.15)"/>
    <!-- Back leg -->
    <path d="M22 28 L26 40" stroke="#1f2937" stroke-width="4" stroke-linecap="round"/>
    <!-- Front leg -->
    <path d="M18 28 L14 40" stroke="#1f2937" stroke-width="4" stroke-linecap="round"/>
    <!-- Boots -->
    <ellipse cx="14" cy="41" rx="4" ry="2" fill="#1f2937"/>
    <ellipse cx="26" cy="41" rx="4" ry="2" fill="#1f2937"/>
    <!-- Body (red coat) -->
    <path d="M14 16 L14 28 L26 28 L26 16 Z" fill="#dc2626"/>
    <!-- White fur trim bottom -->
    <rect x="12" y="26" width="16" height="3" fill="#fff" rx="1"/>
    <!-- Belt -->
    <rect x="14" y="22" width="12" height="3" fill="#1f2937"/>
    <rect x="18" y="21" width="4" height="5" fill="#fbbf24"/>
    <!-- Arms -->
    <path d="M14 18 L6 22" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
    <path d="M26 18 L34 22" stroke="#dc2626" stroke-width="4" stroke-linecap="round"/>
    <!-- White cuffs -->
    <circle cx="6" cy="22" r="3" fill="#fff"/>
    <circle cx="34" cy="22" r="3" fill="#fff"/>
    <!-- Mittens -->
    <circle cx="5" cy="23" r="2.5" fill="#dc2626"/>
    <circle cx="35" cy="23" r="2.5" fill="#dc2626"/>
    <!-- Sack on back -->
    <ellipse cx="28" cy="18" rx="5" ry="6" fill="#92400e"/>
    <path d="M26 12 L30 12" stroke="#a16207" stroke-width="2"/>
    <!-- Head -->
    <circle cx="20" cy="10" r="6" fill="#fef3c7"/>
    <!-- Beard -->
    <path d="M14 10 Q14 18 20 20 Q26 18 26 10" fill="#fff"/>
    <!-- Mustache -->
    <path d="M16 11 Q20 13 24 11" fill="#fff" stroke="#fff" stroke-width="1"/>
    <!-- Rosy cheeks -->
    <circle cx="16" cy="10" r="1.5" fill="#fca5a5"/>
    <circle cx="24" cy="10" r="1.5" fill="#fca5a5"/>
    <!-- Eyes -->
    <circle cx="17" cy="8" r="1" fill="#1f2937"/>
    <circle cx="23" cy="8" r="1" fill="#1f2937"/>
    <!-- Hat -->
    <path d="M12 8 L20 2 L28 8 Q24 6 20 6 Q16 6 12 8 Z" fill="#dc2626"/>
    <!-- Hat brim -->
    <ellipse cx="20" cy="8" rx="9" ry="2" fill="#fff"/>
    <!-- Hat pom pom -->
    <circle cx="20" cy="2" r="3" fill="#fff"/>
  </svg>`,

  // Christmas scene - Santa walking with Christmas tree for Christmas Eve
  christmas: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 48" width="56" height="48">
    <!-- Shadow -->
    <ellipse cx="28" cy="46" rx="24" ry="3" fill="rgba(0,0,0,0.12)"/>

    <!-- Christmas Tree (right side) -->
    <!-- Trunk -->
    <rect x="38" y="38" width="4" height="5" fill="#92400e"/>
    <!-- Tree bottom layer -->
    <path d="M40 32 L30 42 L50 42 Z" fill="#16a34a"/>
    <!-- Tree middle layer -->
    <path d="M40 22 L32 34 L48 34 Z" fill="#22c55e"/>
    <!-- Tree top layer -->
    <path d="M40 12 L34 24 L46 24 Z" fill="#4ade80"/>
    <!-- Star -->
    <path d="M40 8 L41 10 L43 10.5 L41.5 12 L42 14 L40 13 L38 14 L38.5 12 L37 10.5 L39 10 Z" fill="#fbbf24"/>
    <!-- Ornaments -->
    <circle cx="36" cy="36" r="1.5" fill="#dc2626"/>
    <circle cx="44" cy="38" r="1.5" fill="#fbbf24"/>
    <circle cx="40" cy="28" r="1.5" fill="#3b82f6"/>
    <circle cx="37" cy="26" r="1" fill="#22d3ee"/>
    <circle cx="43" cy="24" r="1" fill="#f472b6"/>

    <!-- Walking Santa (left side) -->
    <!-- Back leg -->
    <path d="M18 32 L22 44" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>
    <!-- Front leg -->
    <path d="M14 32 L10 44" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>
    <!-- Boots -->
    <ellipse cx="10" cy="45" rx="3" ry="1.5" fill="#1f2937"/>
    <ellipse cx="22" cy="45" rx="3" ry="1.5" fill="#1f2937"/>
    <!-- Body (red coat) -->
    <path d="M11 20 L11 32 L21 32 L21 20 Z" fill="#dc2626"/>
    <!-- White fur trim bottom -->
    <rect x="10" y="30" width="12" height="2.5" fill="#fff" rx="1"/>
    <!-- Belt -->
    <rect x="11" y="26" width="10" height="2.5" fill="#1f2937"/>
    <rect x="14" y="25.5" width="4" height="3.5" fill="#fbbf24"/>
    <!-- Arms -->
    <path d="M11 22 L5 26" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
    <path d="M21 22 L27 26" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
    <!-- White cuffs -->
    <circle cx="5" cy="26" r="2.5" fill="#fff"/>
    <circle cx="27" cy="26" r="2.5" fill="#fff"/>
    <!-- Mittens -->
    <circle cx="4" cy="27" r="2" fill="#dc2626"/>
    <circle cx="28" cy="27" r="2" fill="#dc2626"/>
    <!-- Gift in hand -->
    <rect x="25" y="24" width="5" height="5" fill="#22c55e" rx="0.5"/>
    <path d="M25 26.5 L30 26.5 M27.5 24 L27.5 29" stroke="#dc2626" stroke-width="0.8"/>
    <!-- Head -->
    <circle cx="16" cy="14" r="5" fill="#fef3c7"/>
    <!-- Beard -->
    <path d="M11 14 Q11 20 16 22 Q21 20 21 14" fill="#fff"/>
    <!-- Mustache -->
    <path d="M13 15 Q16 16.5 19 15" fill="#fff" stroke="#fff" stroke-width="0.8"/>
    <!-- Rosy cheeks -->
    <circle cx="13" cy="14" r="1" fill="#fca5a5"/>
    <circle cx="19" cy="14" r="1" fill="#fca5a5"/>
    <!-- Eyes -->
    <circle cx="14" cy="12" r="0.8" fill="#1f2937"/>
    <circle cx="18" cy="12" r="0.8" fill="#1f2937"/>
    <!-- Hat -->
    <path d="M10 12 L16 6 L22 12 Q18 10 16 10 Q14 10 10 12 Z" fill="#dc2626"/>
    <!-- Hat brim -->
    <ellipse cx="16" cy="12" rx="7" ry="1.5" fill="#fff"/>
    <!-- Hat pom pom -->
    <circle cx="16" cy="6" r="2.5" fill="#fff"/>
  </svg>`,

  // Treasure island with palm tree and chest
  treasure: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
    <!-- Water/sand shadow -->
    <ellipse cx="24" cy="44" rx="20" ry="4" fill="rgba(14,165,233,0.3)"/>
    <!-- Island sand -->
    <ellipse cx="24" cy="40" rx="18" ry="6" fill="#fbbf24"/>
    <ellipse cx="24" cy="39" rx="16" ry="5" fill="#fcd34d"/>
    <!-- Palm tree trunk -->
    <path d="M16 40 Q14 28 16 16" stroke="#92400e" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Palm leaves -->
    <path d="M16 16 Q8 12 4 18" stroke="#22c55e" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M16 16 Q12 8 6 8" stroke="#16a34a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M16 16 Q20 8 26 10" stroke="#22c55e" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M16 16 Q24 14 28 18" stroke="#16a34a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <!-- Coconuts -->
    <circle cx="15" cy="18" r="2" fill="#854d0e"/>
    <circle cx="18" cy="17" r="1.5" fill="#713f12"/>
    <!-- Treasure chest -->
    <rect x="26" y="32" width="16" height="10" rx="1" fill="#a0522d"/>
    <rect x="26" y="32" width="16" height="10" rx="1" fill="#8b4513"/>
    <rect x="26" y="37" width="16" height="5" rx="1" fill="#6b3710"/>
    <!-- Chest lid -->
    <path d="M26 32 L26 28 Q34 24 42 28 L42 32 Z" fill="#a0522d"/>
    <!-- Metal bands -->
    <rect x="25" y="34" width="18" height="2" fill="#cd853f"/>
    <rect x="25" y="38" width="18" height="2" fill="#cd853f"/>
    <!-- Lock -->
    <rect x="32" y="33" width="4" height="5" rx="1" fill="#ffd700"/>
    <circle cx="34" cy="36" r="1" fill="#b8860b"/>
    <!-- Gold coins spilling out -->
    <circle cx="44" cy="38" r="3" fill="#ffd700"/>
    <circle cx="46" cy="42" r="2.5" fill="#ffaa00"/>
    <circle cx="42" cy="44" r="2" fill="#ffd700"/>
    <!-- Sparkles -->
    <circle cx="38" cy="28" r="1" fill="#fff" opacity="0.8"/>
    <circle cx="30" cy="30" r="0.8" fill="#fff" opacity="0.6"/>
    <circle cx="45" cy="35" r="0.8" fill="#fff" opacity="0.7"/>
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
  bike: [40, 40],
  santa: [40, 44],
  christmas: [56, 48],
  treasure: [48, 48],
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
  bike: [20, 32],
  santa: [20, 42],
  christmas: [28, 46],
  treasure: [24, 44],
};

function createIcon(type, day) {
  // Special Christmas icons for day 9 (Christmas Eve)
  let iconType = type;
  if (day === 9) {
    if (type === "camp") {
      iconType = "christmas"; // Santa walking with Christmas tree
    }
  }

  const svg = ICONS[iconType] || ICONS.destination;
  const size = SIZES[iconType] || SIZES.destination;
  const anchor = ANCHORS[iconType] || ANCHORS.destination;

  // Add special class for treasure marker glow effect
  const className = iconType === "treasure" ? "map-icon map-icon-treasure" : "map-icon";

  return L.divIcon({
    html: svg,
    className: className,
    iconSize: size,
    iconAnchor: anchor,
    popupAnchor: [0, -anchor[1]],
  });
}

function StopMarker({ stop, onClick, isOvernight }) {
  if (!stop.coords) return null;

  const handleClick = () => {
    if (onClick) onClick(stop);
  };

  return (
    <Marker
      position={stop.coords}
      icon={createIcon(stop.type, stop.day)}
      eventHandlers={{ click: handleClick }}
      zIndexOffset={isOvernight ? 500 : 0}
    />
  );
}

export default StopMarker;
