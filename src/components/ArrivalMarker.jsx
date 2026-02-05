import L from "leaflet";
import { Marker } from "react-leaflet";

const LANDING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <circle cx="40" cy="40" fill="none" stroke="#8b5cf6" stroke-width="2">
    <animate attributeName="r" from="8" to="36" dur="1.2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" from="0.7" to="0" dur="1.2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="40" cy="40" fill="none" stroke="#8b5cf6" stroke-width="2">
    <animate attributeName="r" from="8" to="36" dur="1.2s" begin="0.4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" from="0.7" to="0" dur="1.2s" begin="0.4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="40" cy="40" fill="none" stroke="#8b5cf6" stroke-width="2">
    <animate attributeName="r" from="8" to="36" dur="1.2s" begin="0.8s" repeatCount="indefinite"/>
    <animate attributeName="opacity" from="0.7" to="0" dur="1.2s" begin="0.8s" repeatCount="indefinite"/>
  </circle>
  <circle cx="40" cy="40" r="4" fill="#8b5cf6" opacity="0.6"/>
</svg>`;

const PARKING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <circle cx="16" cy="16" r="13" fill="#2563eb" stroke="#fff" stroke-width="2"/>
  <text x="16" y="22" text-anchor="middle" fill="#fff" font-size="16" font-weight="bold"
    font-family="system-ui,sans-serif">P</text>
</svg>`;

const CAMPING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 36" width="40" height="36">
  <polygon points="20,4 36,32 4,32" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <polygon points="20,4 28,32 12,32" fill="#fbbf24"/>
  <rect x="16" y="22" width="8" height="10" rx="1" fill="#92400e"/>
</svg>`;

const arrivalIcons = {
  landing: L.divIcon({
    html: LANDING_SVG,
    className: "arrival-marker arrival-landing",
    iconSize: [80, 80],
    iconAnchor: [40, 40],
  }),
  parking: L.divIcon({
    html: PARKING_SVG,
    className: "arrival-marker arrival-parking",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  }),
  camping: L.divIcon({
    html: CAMPING_SVG,
    className: "arrival-marker arrival-camping",
    iconSize: [40, 36],
    iconAnchor: [20, 36],
  }),
};

function ArrivalMarker({ position, type }) {
  if (!position || !type || !arrivalIcons[type]) return null;

  return <Marker position={position} icon={arrivalIcons[type]} zIndexOffset={999} />;
}

export default ArrivalMarker;
