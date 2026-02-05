import "leaflet/dist/leaflet.css";
import "../styles/map.css";

import { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MAP_CONFIG, TILE_LAYERS, stops, routes } from "../data/trip";
import StopMarker from "./StopMarker";
import RoutePolyline from "./RoutePolyline";
import MapController from "./MapController";
import AnimatedVehicle from "./AnimatedVehicle";
import ArrivalMarker from "./ArrivalMarker";

function TripMap({
  theme,
  currentDay,
  isPlaying,
  vehiclePosition,
  vehicleMode,
  routeIndex,
  routeProgress,
  arrivalType,
  arrivalPosition,
  zoomCommand,
  onZoomHandled,
  onStopClick,
}) {
  const tile = TILE_LAYERS[theme];

  const visibleStops = stops.filter((s) => s.day <= currentDay);

  const { pastRoutes, completedSegments, activeRoute } = useMemo(() => {
    const past = routes.filter((r) => r.day < currentDay);
    const currentDayRoutes = routes.filter((r) => r.day === currentDay);

    if (isPlaying) {
      return {
        pastRoutes: past,
        completedSegments: currentDayRoutes.slice(0, routeIndex),
        activeRoute: currentDayRoutes[routeIndex] || null,
      };
    }

    return {
      pastRoutes: past,
      completedSegments: currentDayRoutes,
      activeRoute: null,
    };
  }, [currentDay, isPlaying, routeIndex]);

  return (
    <div className="map-wrapper">
      <MapContainer
        className={`trip-map ${theme === "dark" ? "trip-map--dark" : ""}`}
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        minZoom={MAP_CONFIG.minZoom}
        scrollWheelZoom={true}
      >
        <TileLayer key={theme} attribution={tile.attribution} url={tile.url} />
        <MapController
          zoomCommand={zoomCommand}
          onZoomHandled={onZoomHandled}
          currentDay={currentDay}
          isPlaying={isPlaying}
          vehiclePosition={vehiclePosition}
        />

        {/* Past routes — fully drawn */}
        {pastRoutes.map((route) => (
          <RoutePolyline key={route.id} route={route} />
        ))}

        {/* Current day completed segments — fully drawn */}
        {completedSegments.map((route) => (
          <RoutePolyline key={route.id} route={route} />
        ))}

        {/* Active route segment — trail drawing */}
        {activeRoute && (
          <RoutePolyline
            key={`trail-${activeRoute.id}`}
            route={activeRoute}
            trailProgress={routeProgress}
          />
        )}

        {/* Stop markers */}
        {visibleStops.map((stop) => (
          <StopMarker key={stop.id} stop={stop} onClick={onStopClick} />
        ))}

        {/* Arrival animation at destination */}
        {isPlaying && arrivalType && (
          <ArrivalMarker position={arrivalPosition} type={arrivalType} />
        )}

        {/* Animated vehicle */}
        {isPlaying && vehiclePosition && (
          <AnimatedVehicle position={vehiclePosition} mode={vehicleMode} />
        )}
      </MapContainer>
    </div>
  );
}

export default TripMap;
