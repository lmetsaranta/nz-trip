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
  vehicleBearing,
  routeIndex,
  routeProgress,
  routeDistance,
  arrivalType,
  arrivalPosition,
  zoomCommand,
  onZoomHandled,
  onStopClick,
  arrivingStop,
  isFinalDay,
  onMapViewChange,
  initialView,
}) {
  const tile = TILE_LAYERS[theme];

  // Get visible stops and identify overnight destinations for z-index boosting
  // During playback, stops only appear when vehicle is 80%+ through the route to that stop
  const { visibleStops, overnightStopIds } = useMemo(() => {
    // All stops from previous days are visible
    const pastStops = stops.filter((s) => s.day < currentDay);

    // For current day, determine which stops should be visible based on progress
    const currentDayStops = stops.filter((s) => s.day === currentDay);
    const currentDayRoutes = routes.filter((r) => r.day === currentDay);

    let visibleCurrentDayStops = [];

    if (isPlaying) {
      // During playback: only show stops when 80% through the route to that stop
      for (const stop of currentDayStops) {
        // Find the route that leads TO this stop
        const routeToStop = currentDayRoutes.findIndex((r) => r.to === stop.id);

        if (routeToStop === -1) {
          // This is a starting point (no route leads to it), show if it's the first stop
          const isStartingPoint = currentDayRoutes.length > 0 && currentDayRoutes[0].from === stop.id;
          if (isStartingPoint) {
            visibleCurrentDayStops.push(stop);
          }
        } else if (routeToStop < routeIndex) {
          // Route to this stop is already completed
          visibleCurrentDayStops.push(stop);
        } else if (routeToStop === routeIndex && routeProgress >= 0.8) {
          // Currently on the route to this stop and 80%+ complete
          visibleCurrentDayStops.push(stop);
        }
        // Otherwise, don't show this stop yet
      }
    } else {
      // Not playing: show all current day stops
      visibleCurrentDayStops = currentDayStops;
    }

    const visible = [...pastStops, ...visibleCurrentDayStops];

    // Find the overnight destination IDs for each day (last route's "to" destination)
    const overnightIds = new Set();
    for (let day = 1; day <= currentDay; day++) {
      const dayRoutes = routes.filter((r) => r.day === day);
      if (dayRoutes.length > 0) {
        const lastRoute = dayRoutes[dayRoutes.length - 1];
        if (lastRoute.to) {
          overnightIds.add(lastRoute.to);
        }
      }
    }

    return { visibleStops: visible, overnightStopIds: overnightIds };
  }, [currentDay, isPlaying, routeIndex, routeProgress]);

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
          isFinalDay={isFinalDay}
          onMapViewChange={onMapViewChange}
          initialView={initialView}
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
          <StopMarker
            key={stop.id}
            stop={stop}
            onClick={onStopClick}
            isOvernight={overnightStopIds.has(stop.id)}
          />
        ))}

        {/* Arrival animation at destination */}
        {isPlaying && arrivalType && (
          <ArrivalMarker position={arrivalPosition} type={arrivalType} />
        )}

        {/* Animated vehicle */}
        {isPlaying && vehiclePosition && (
          <AnimatedVehicle position={vehiclePosition} mode={vehicleMode} bearing={vehicleBearing} />
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
