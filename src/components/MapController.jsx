import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { stops } from "../data/trip";

// Zoom levels for different activity types
const MODE_ZOOM_LEVELS = {
  fly: 6,        // Zoomed out for flights
  drive: 9,      // Medium zoom for driving
  ferry: 10,     // Medium zoom for ferry
  bike: 11,      // Closer for bike rides
  hike: 12,      // Zoomed in for hikes
  rafting: 12,   // Close for activities
  surfing: 12,
  canoeing: 12,
  spa: 13,       // Very close for spa
};

// Threshold for "long" routes that warrant zoom out/in transition
const LONG_ROUTE_THRESHOLD = 0.5; // degrees

function MapController({
  zoomCommand,
  onZoomHandled,
  currentDay,
  isPlaying,
  vehiclePosition,
  vehicleMode,
  routeProgress,
  routeDistance,
  isFinalDay,
  onMapViewChange,
  initialView,
}) {
  const map = useMap();
  const prevDayRef = useRef(currentDay);
  const prevModeRef = useRef(null);
  const targetZoomRef = useRef(map.getZoom());
  const hasRestoredView = useRef(false);

  // Restore saved view on mount (only once)
  useEffect(() => {
    if (initialView && !hasRestoredView.current) {
      hasRestoredView.current = true;
      map.setView(initialView.center, initialView.zoom, { animate: false });
    }
  }, [initialView, map]);

  // Report map view changes for state preservation
  useEffect(() => {
    if (!onMapViewChange) return;

    const handleMoveEnd = () => {
      const center = map.getCenter();
      onMapViewChange([center.lat, center.lng], map.getZoom());
    };

    map.on("moveend", handleMoveEnd);
    return () => map.off("moveend", handleMoveEnd);
  }, [map, onMapViewChange]);

  // Handle manual zoom commands
  useEffect(() => {
    if (!zoomCommand) return;

    if (zoomCommand === "in") {
      map.zoomIn();
    } else if (zoomCommand === "out") {
      map.zoomOut();
    } else if (zoomCommand.type === "flyTo" && zoomCommand.coords) {
      // Custom flyTo command with coordinates and zoom level
      map.flyTo(zoomCommand.coords, zoomCommand.zoom || 10, {
        duration: 2.5,
        easeLinearity: 0.25
      });
    }

    onZoomHandled();
  }, [zoomCommand, map, onZoomHandled]);

  // Fly to current day's stop when day changes (not during playback)
  useEffect(() => {
    if (prevDayRef.current === currentDay) return;
    prevDayRef.current = currentDay;

    if (isPlaying) return;

    const dayStop = stops.find((s) => s.day === currentDay);
    if (dayStop?.coords) {
      map.flyTo(dayStop.coords, 10, { duration: 1.5 });
    }
  }, [currentDay, isPlaying, map]);

  // Auto-zoom based on vehicle mode during playback
  // For long routes: zoom out at start, zoom in for arrival
  // For final day departure: continuously zoom out as plane flies away
  useEffect(() => {
    if (!isPlaying || !vehicleMode) return;

    const baseZoom = MODE_ZOOM_LEVELS[vehicleMode] || 10;
    const isLongRoute = routeDistance && routeDistance > LONG_ROUTE_THRESHOLD;
    const isFinalFlight = isFinalDay && vehicleMode === "fly";

    // Calculate target zoom based on progress
    let targetZoom = baseZoom;

    if (isFinalFlight) {
      // Final departure: start zoomed in, progressively zoom out as plane flies away
      const startZoom = 8;
      const endZoom = 4;
      targetZoom = startZoom - (startZoom - endZoom) * routeProgress;
    } else if (isLongRoute) {
      // Zoom out at start (progress < 0.2), zoom in for arrival (progress > 0.7)
      if (routeProgress < 0.2) {
        // Start: zoomed out (2 levels below base)
        targetZoom = Math.max(baseZoom - 2, 5);
      } else if (routeProgress > 0.7) {
        // Arrival: gradually zoom in
        const arrivalProgress = (routeProgress - 0.7) / 0.3; // 0 to 1 over last 30%
        targetZoom = Math.max(baseZoom - 2, 5) + (baseZoom - Math.max(baseZoom - 2, 5)) * arrivalProgress;
      } else {
        // Middle: stay zoomed out
        targetZoom = Math.max(baseZoom - 2, 5);
      }
    }

    // Only animate zoom when mode changes or when there's significant zoom difference
    const currentZoom = map.getZoom();
    const shouldAnimate = prevModeRef.current !== vehicleMode ||
      (isLongRoute && Math.abs(currentZoom - targetZoom) > 0.3) ||
      (isFinalFlight && Math.abs(currentZoom - targetZoom) > 0.2);

    if (prevModeRef.current !== vehicleMode) {
      prevModeRef.current = vehicleMode;
    }

    if (shouldAnimate) {
      targetZoomRef.current = targetZoom;
      map.flyTo(vehiclePosition || map.getCenter(), targetZoom, {
        duration: isFinalFlight ? 1 : (isLongRoute ? 2 : 1.5),
        easeLinearity: 0.5
      });
    }
  }, [isPlaying, vehicleMode, vehiclePosition, map, routeProgress, routeDistance, isFinalDay]);

  // Follow vehicle during playback (smooth panning)
  useEffect(() => {
    if (!isPlaying || !vehiclePosition) return;

    // Use panTo for smooth following without zoom change
    const currentZoom = map.getZoom();
    const targetZoom = targetZoomRef.current;

    // Gentle pan to follow vehicle
    map.setView(vehiclePosition, currentZoom, {
      animate: true,
      duration: 0.3,
      easeLinearity: 0.5
    });
  }, [isPlaying, vehiclePosition, map]);

  // Reset mode ref when playback stops
  useEffect(() => {
    if (!isPlaying) {
      prevModeRef.current = null;
    }
  }, [isPlaying]);

  return null;
}

export default MapController;
