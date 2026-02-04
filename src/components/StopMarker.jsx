import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

const ICONS = {
  camp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
    <polygon points="16,4 28,26 4,26" fill="#2d8a56" stroke="#1a5e38" stroke-width="1.5"/>
    <rect x="13" y="18" width="6" height="8" rx="1" fill="#fafafa"/>
  </svg>`,
  van: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 28" width="36" height="28">
    <rect x="1" y="4" width="34" height="16" rx="4" fill="#3b82f6" stroke="#1e40af" stroke-width="1.5"/>
    <rect x="4" y="7" width="8" height="6" rx="1" fill="#bfdbfe"/>
    <rect x="14" y="7" width="8" height="6" rx="1" fill="#bfdbfe"/>
    <rect x="24" y="7" width="8" height="6" rx="1" fill="#bfdbfe"/>
    <circle cx="9" cy="23" r="3.5" fill="#1e293b"/>
    <circle cx="27" cy="23" r="3.5" fill="#1e293b"/>
    <circle cx="9" cy="23" r="1.5" fill="#94a3b8"/>
    <circle cx="27" cy="23" r="1.5" fill="#94a3b8"/>
  </svg>`,
  destination: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#ef4444" stroke="#b91c1c" stroke-width="1"/>
    <circle cx="12" cy="11" r="5" fill="#fafafa"/>
  </svg>`,
};

const ANCHORS = {
  camp: [16, 26],
  van: [18, 14],
  destination: [12, 36],
};

function createIcon(type) {
  const svg = ICONS[type] || ICONS.destination;
  const anchor = ANCHORS[type] || ANCHORS.destination;
  return L.divIcon({
    html: svg,
    className: "map-icon",
    iconSize: type === "van" ? [36, 28] : type === "camp" ? [32, 32] : [24, 36],
    iconAnchor: anchor,
    popupAnchor: [0, -anchor[1]],
  });
}

function StopMarker({ stop }) {
  return (
    <Marker position={stop.coords} icon={createIcon(stop.type)}>
      <Popup>
        <strong>{stop.name}</strong>
        <br />
        {stop.description}
      </Popup>
    </Marker>
  );
}

export default StopMarker;
