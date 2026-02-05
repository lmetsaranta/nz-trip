import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { stops } from "../data/trip";

function MapController({ zoomCommand, onZoomHandled, currentDay, isPlaying, vehiclePosition }) {
  const map = useMap();
  const prevDayRef = useRef(currentDay);

  // Handle zoom commands
  useEffect(() => {
    if (!zoomCommand) return;
    if (zoomCommand === "in") map.zoomIn();
    if (zoomCommand === "out") map.zoomOut();
    onZoomHandled();
  }, [zoomCommand, map, onZoomHandled]);

  // Fly to current day's stop when day changes (not during playback)
  useEffect(() => {
    if (prevDayRef.current === currentDay) return;
    prevDayRef.current = currentDay;

    if (isPlaying) return;

    const dayStop = stops.find((s) => s.day === currentDay);
    if (dayStop?.coords) {
      map.flyTo(dayStop.coords, 10, { duration: 1 });
    }
  }, [currentDay, isPlaying, map]);

  // Follow vehicle during playback
  useEffect(() => {
    if (!isPlaying || !vehiclePosition) return;
    map.setView(vehiclePosition, map.getZoom(), { animate: false });
  }, [isPlaying, vehiclePosition, map]);

  return null;
}

export default MapController;
