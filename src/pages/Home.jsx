import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { TIMELINE_CONFIG, routes, stops } from "../data/trip";
import { useAnimationTick } from "../hooks/useAnimationTick";
import { interpolatePosition } from "../utils/interpolate";
import TripNav from "../components/TripNav";
import TripMap from "../components/TripMap";
import StopModal from "../components/StopModal";

// Time per unit distance in ms (lower = faster) - constant speed per mode
// These define how many milliseconds it takes to travel 1 degree of lat/lng
const MODE_MS_PER_UNIT = {
  fly: 400,      // Fast - 400ms per degree
  ferry: 1500,   // Moderate - 1.5s per degree
  drive: 1200,   // Moderate - 1.2s per degree
  bike: 2500,    // Slower - 2.5s per degree
  hike: 4000,    // Slow - 4s per degree (enjoy the views)
  rafting: 3000, // Leisurely - 3s per degree
  surfing: 3500, // Leisurely
  canoeing: 3000,
  spa: 8000,     // Very slow and relaxing - 8s per degree
};

// Minimum duration for any day (so very short days aren't instant)
const MIN_DAY_DURATION_MS = 3000;

// Pause duration at each stop within a day (ms)
const PAUSE_AT_STOP_MS = 1500;

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

// Calculate total duration for a day's routes based on distance and mode speeds
// Includes pause time between routes (for stops within a day)
function calculateDayDuration(dayRoutes) {
  if (!dayRoutes.length) return MIN_DAY_DURATION_MS;

  let totalMs = 0;
  for (let i = 0; i < dayRoutes.length; i++) {
    const route = dayRoutes[i];
    const distance = calculateRouteDistance(route.waypoints);
    const msPerUnit = MODE_MS_PER_UNIT[route.mode] || MODE_MS_PER_UNIT.drive;
    totalMs += distance * msPerUnit;

    // Add pause time after each route except the last one
    if (i < dayRoutes.length - 1) {
      totalMs += PAUSE_AT_STOP_MS;
    }
  }

  return Math.max(totalMs, MIN_DAY_DURATION_MS);
}

const SPEED_OPTIONS = [0.5, 1, 2];

function Home() {
  const [theme, setTheme] = useState("dark");
  const [currentDay, setCurrentDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomCommand, setZoomCommand] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const handleDayComplete = useCallback(() => {
    setCurrentDay((d) => {
      if (d >= TIMELINE_CONFIG.totalDays) {
        setIsPlaying(false);
        return d;
      }
      return d + 1;
    });
  }, []);

  // Find routes for current day
  const currentRoutes = useMemo(
    () => routes.filter((r) => r.day === currentDay),
    [currentDay],
  );

  // Calculate duration for current day based on route distances and mode speeds
  const dayDuration = useMemo(
    () => calculateDayDuration(currentRoutes),
    [currentRoutes]
  );

  // Animation progress (0 to 1) over the calculated day duration
  const progress = useAnimationTick(isPlaying, currentDay, dayDuration, handleDayComplete, speedMultiplier);

  // Compute vehicle position - each segment takes time proportional to distance * mode speed
  // Also accounts for pause time between route segments
  const vehicleData = useMemo(() => {
    if (!currentRoutes.length)
      return { position: null, mode: "drive", routeIndex: 0, routeProgress: 0, isPaused: false };

    // Calculate time for each segment based on distance * msPerUnit
    const segmentTimes = currentRoutes.map((r) => {
      const distance = calculateRouteDistance(r.waypoints);
      const msPerUnit = MODE_MS_PER_UNIT[r.mode] || MODE_MS_PER_UNIT.drive;
      return distance * msPerUnit;
    });

    // Total time includes pause time between segments
    const numPauses = currentRoutes.length - 1;
    const totalTravelTime = segmentTimes.reduce((a, b) => a + b, 0);
    const totalTime = totalTravelTime + numPauses * PAUSE_AT_STOP_MS;

    if (totalTime === 0)
      return { position: null, mode: "drive", routeIndex: 0, routeProgress: 0, isPaused: false };

    let routeIndex = 0;
    let routeProgress = 0;
    let isPaused = false;
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

      // Check if we're in a pause segment (between routes)
      if (i < currentRoutes.length - 1) {
        const pauseStart = accumulated / totalTime;
        const pauseEnd = (accumulated + PAUSE_AT_STOP_MS) / totalTime;

        if (progress >= pauseStart && progress < pauseEnd) {
          routeIndex = i;
          routeProgress = 1; // At end of current route
          isPaused = true;
          break;
        }
        accumulated += PAUSE_AT_STOP_MS;
      }
    }

    const route = currentRoutes[routeIndex];
    if (!route?.waypoints?.length)
      return { position: null, mode: "drive", routeIndex, routeProgress: 0, isPaused: false, routeDistance: 0 };

    const position = interpolatePosition(route.waypoints, routeProgress);
    const routeDistance = calculateRouteDistance(route.waypoints);
    return { position, mode: route.mode, routeProgress, routeIndex, isPaused, routeDistance };
  }, [currentRoutes, progress]);

  // Compute arriving stop when routeProgress > 0.85
  const arrivingStop = useMemo(() => {
    if (!isPlaying || !currentRoutes.length) return null;
    if (vehicleData.routeProgress < 0.85) return null;

    const route = currentRoutes[vehicleData.routeIndex];
    if (!route?.to) return null;

    return stops.find((s) => s.id === route.to) || null;
  }, [isPlaying, currentRoutes, vehicleData.routeIndex, vehicleData.routeProgress]);

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

  const handleSpeedChange = useCallback(() => {
    setSpeedMultiplier((current) => {
      const currentIndex = SPEED_OPTIONS.indexOf(current);
      const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
      return SPEED_OPTIONS[nextIndex];
    });
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
        speedMultiplier={speedMultiplier}
        onSpeedChange={handleSpeedChange}
        progress={progress}
      />
      <TripMap
        theme={theme}
        currentDay={currentDay}
        isPlaying={isPlaying}
        vehiclePosition={vehicleData.position}
        vehicleMode={vehicleData.mode}
        routeIndex={vehicleData.routeIndex}
        routeProgress={vehicleData.routeProgress}
        routeDistance={vehicleData.routeDistance}
        arrivalType={arrivalData?.type}
        arrivalPosition={arrivalData?.position}
        zoomCommand={zoomCommand}
        onZoomHandled={handleZoomHandled}
        onStopClick={handleStopClick}
        arrivingStop={arrivingStop}
      />
      {selectedStop && (
        <StopModal stop={selectedStop} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Home;
