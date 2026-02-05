import { useState, useCallback, useMemo } from "react";
import { TIMELINE_CONFIG, routes, stops } from "../data/trip";
import { useAnimationTick } from "../hooks/useAnimationTick";
import { interpolatePosition } from "../utils/interpolate";
import TripNav from "../components/TripNav";
import TripMap from "../components/TripMap";
import StopModal from "../components/StopModal";

// Speed multipliers (higher = faster): plane fastest, then ferry, then drive, then activities/hike
const MODE_SPEEDS = { fly: 10, ferry: 4, drive: 2, rafting: 1, surfing: 0.8, canoeing: 0.8, spa: 0.3, hike: 0.5 };

// Calculate route distance from waypoints
function calculateRouteDistance(waypoints) {
  if (!waypoints || waypoints.length < 2) return 0;
  let dist = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const dLat = waypoints[i][0] - waypoints[i - 1][0];
    const dLng = waypoints[i][1] - waypoints[i - 1][1];
    dist += Math.sqrt(dLat * dLat + dLng * dLng);
  }
  return dist;
}

function Home() {
  const [theme, setTheme] = useState("light");
  const [currentDay, setCurrentDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomCommand, setZoomCommand] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);

  const handleDayComplete = useCallback(() => {
    setCurrentDay((d) => {
      if (d >= TIMELINE_CONFIG.totalDays) {
        setIsPlaying(false);
        return d;
      }
      return d + 1;
    });
  }, []);

  const progress = useAnimationTick(isPlaying, currentDay, handleDayComplete);

  // Find routes for current day
  const currentRoutes = useMemo(
    () => routes.filter((r) => r.day === currentDay),
    [currentDay],
  );

  // Compute vehicle position with speed-based timing (distance / speed = time)
  const vehicleData = useMemo(() => {
    if (!currentRoutes.length)
      return { position: null, mode: "drive", routeIndex: 0, routeProgress: 0 };

    // Calculate time for each segment based on distance / speed
    const segmentTimes = currentRoutes.map((r) => {
      const distance = calculateRouteDistance(r.waypoints);
      const speed = MODE_SPEEDS[r.mode] || 1;
      return distance / speed; // time = distance / speed
    });
    const totalTime = segmentTimes.reduce((a, b) => a + b, 0);

    if (totalTime === 0)
      return { position: null, mode: "drive", routeIndex: 0, routeProgress: 0 };

    let routeIndex = 0;
    let routeProgress = 0;
    let accumulated = 0;

    for (let i = 0; i < currentRoutes.length; i++) {
      const segStart = accumulated / totalTime;
      const segEnd = (accumulated + segmentTimes[i]) / totalTime;

      if (progress < segEnd || i === currentRoutes.length - 1) {
        routeIndex = i;
        routeProgress = Math.min(
          Math.max((progress - segStart) / (segEnd - segStart), 0),
          1,
        );
        break;
      }
      accumulated += segmentTimes[i];
    }

    const route = currentRoutes[routeIndex];
    if (!route?.waypoints?.length)
      return { position: null, mode: "drive", routeIndex, routeProgress: 0 };

    const position = interpolatePosition(route.waypoints, routeProgress);
    return { position, mode: route.mode, routeProgress, routeIndex };
  }, [currentRoutes, progress]);

  // Arrival animation (landing / parking / camping)
  const arrivalData = useMemo(() => {
    if (!isPlaying || !currentRoutes.length) return null;

    const route = currentRoutes[vehicleData.routeIndex];
    if (!route?.waypoints?.length) return null;

    const threshold = route.mode === "fly" ? 0.75 : 0.85;
    if (vehicleData.routeProgress < threshold) return null;

    const destPosition = route.waypoints[route.waypoints.length - 1];

    if (route.mode === "fly") return { type: "landing", position: destPosition };

    if (route.mode === "drive") {
      const nextRoute = currentRoutes[vehicleData.routeIndex + 1];
      const destStop = stops.find((s) => s.id === route.to);
      if (nextRoute?.mode === "hike")
        return { type: "parking", position: destPosition };
      if (destStop?.type === "camp")
        return { type: "camping", position: destPosition };
    }

    return null;
  }, [isPlaying, currentRoutes, vehicleData.routeIndex, vehicleData.routeProgress]);

  const handleThemeToggle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const handleZoomIn = useCallback(() => setZoomCommand("in"), []);
  const handleZoomOut = useCallback(() => setZoomCommand("out"), []);
  const handleZoomHandled = useCallback(() => setZoomCommand(null), []);

  const handleDayClick = useCallback((day) => {
    setIsPlaying(false);
    setCurrentDay(day);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  const handleStopClick = useCallback((stop) => {
    setSelectedStop(stop);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedStop(null);
  }, []);

  return (
    <div className="page-home">
      <TripNav
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        currentDay={currentDay}
        onDayClick={handleDayClick}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
      />
      <TripMap
        theme={theme}
        currentDay={currentDay}
        isPlaying={isPlaying}
        vehiclePosition={vehicleData.position}
        vehicleMode={vehicleData.mode}
        routeIndex={vehicleData.routeIndex}
        routeProgress={vehicleData.routeProgress}
        arrivalType={arrivalData?.type}
        arrivalPosition={arrivalData?.position}
        zoomCommand={zoomCommand}
        onZoomHandled={handleZoomHandled}
        onStopClick={handleStopClick}
      />
      {selectedStop && (
        <StopModal stop={selectedStop} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Home;
