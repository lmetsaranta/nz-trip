import "leaflet/dist/leaflet.css";
import "../styles/map.css";

import { useMemo, useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { MAP_CONFIG, TILE_LAYERS, stops, routes } from "../data/trip";
import StopMarker from "./StopMarker";
import RoutePolyline from "./RoutePolyline";
import MapController from "./MapController";
import AnimatedVehicle from "./AnimatedVehicle";
import ArrivalMarker from "./ArrivalMarker";
import StopTooltip from "./StopTooltip";

// Helper component to convert lat/lng to screen position
function TooltipPositioner({ stop, vehiclePosition, theme }) {
  const map = useMap();
  const [screenPos, setScreenPos] = useState(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!stop || !vehiclePosition) {
      setScreenPos(null);
      return;
    }

    const updatePosition = () => {
      const point = map.latLngToContainerPoint(vehiclePosition);
      setScreenPos({ x: point.x, y: point.y });
      rafRef.current = requestAnimationFrame(updatePosition);
    };

    rafRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [map, stop, vehiclePosition]);

  if (!stop || !screenPos) return null;

  return <StopTooltip stop={stop} position={screenPos} theme={theme} />;
}

function TripMap({
  theme,
  currentDay,
  isPlaying,
  vehiclePosition,
  vehicleMode,
  routeIndex,
  routeProgress,
  routeDistance,
  arrivalType,
  arrivalPosition,
  zoomCommand,
  onZoomHandled,
  onStopClick,
  arrivingStop,
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
        zoomControl={false}
      >
        <TileLayer key={theme} attribution={tile.attribution} url={tile.url} />
        <MapController
          zoomCommand={zoomCommand}
          onZoomHandled={onZoomHandled}
          currentDay={currentDay}
          isPlaying={isPlaying}
          vehiclePosition={vehiclePosition}
          vehicleMode={vehicleMode}
          routeProgress={routeProgress}
          routeDistance={routeDistance}
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

        {/* Stop tooltip on arrival */}
        <TooltipPositioner
          stop={arrivingStop}
          vehiclePosition={vehiclePosition}
          theme={theme}
        />
      </MapContainer>
    </div>
  );
}

export default TripMap;
