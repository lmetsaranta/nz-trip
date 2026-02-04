import "leaflet/dist/leaflet.css";
import "../styles/map.css";

import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MAP_CONFIG, TILE_LAYERS, stops, routes } from "../data/trip";
import StopMarker from "./StopMarker";
import RoutePolyline from "./RoutePolyline";

function TripMap() {
  const [theme, setTheme] = useState("light");
  const tile = TILE_LAYERS[theme];

  return (
    <div className="map-wrapper">
      <MapContainer
        className="trip-map"
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        minZoom={MAP_CONFIG.minZoom}
        scrollWheelZoom={true}
      >
        <TileLayer key={theme} attribution={tile.attribution} url={tile.url} />
        {stops.map((stop) => (
          <StopMarker key={stop.id} stop={stop} />
        ))}
        {routes.map((route) => (
          <RoutePolyline key={route.id} route={route} />
        ))}
      </MapContainer>
      <button
        className="theme-toggle"
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}

export default TripMap;
