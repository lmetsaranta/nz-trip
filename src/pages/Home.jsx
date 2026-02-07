import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { TIMELINE_CONFIG, routes, stops } from "../data/trip";
import { useAnimationTick } from "../hooks/useAnimationTick";
import { interpolatePosition, calculateBearing } from "../utils/interpolate";
import { getStopImageUrl } from "../utils/images";
import { useMapState } from "../context/MapStateContext";
import TripNav from "../components/TripNav";
import TripMap from "../components/TripMap";
import StopModal from "../components/StopModal";
import OnboardingModal from "../components/OnboardingModal";
import TripEndModal from "../components/TripEndModal";
import TripStats from "../components/TripStats";
import WeatherPanel from "../components/WeatherPanel";
import PhotoGalleryPanel from "../components/PhotoGalleryPanel";
import TreasureModal from "../components/TreasureModal";
import { useWeatherData } from "../hooks/useWeatherData";

// Auckland coordinates for initial zoom
const AUCKLAND_COORDS = [-36.8485, 174.7633];

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

// Faster speed for final departure flight
const FINAL_FLIGHT_MS_PER_UNIT = 150;

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
function calculateDayDuration(dayRoutes, isFinalDay = false) {
  if (!dayRoutes.length) return MIN_DAY_DURATION_MS;

  let totalMs = 0;
  for (let i = 0; i < dayRoutes.length; i++) {
    const route = dayRoutes[i];
    const distance = calculateRouteDistance(route.waypoints);
    // Use faster speed for final departure flight
    const isFinalFlight = isFinalDay && route.mode === "fly";
    const msPerUnit = isFinalFlight ? FINAL_FLIGHT_MS_PER_UNIT : (MODE_MS_PER_UNIT[route.mode] || MODE_MS_PER_UNIT.drive);
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
  // Get persisted state from context
  const { state: mapState, updateState, saveMapView } = useMapState();

  // Initialize local state from context (or defaults for first visit)
  const [theme, setTheme] = useState(mapState.theme);
  const [currentDay, setCurrentDay] = useState(mapState.currentDay);
  const [isPlaying, setIsPlaying] = useState(false); // Always start paused when returning
  const [zoomCommand, setZoomCommand] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(mapState.speedMultiplier);
  const [showOnboarding, setShowOnboarding] = useState(!mapState.initialZoomDone);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showTripEnd, setShowTripEnd] = useState(false);
  const [initialZoomDone, setInitialZoomDone] = useState(mapState.initialZoomDone);
  const [showStats, setShowStats] = useState(mapState.showStats);
  const [showWeather, setShowWeather] = useState(mapState.showWeather);
  const [showGallery, setShowGallery] = useState(mapState.showGallery);
  const [showTreasure, setShowTreasure] = useState(false);
  const shownTooltipsRef = useRef(new Set());

  // Weather data hook
  const { weatherData, loading: weatherLoading } = useWeatherData();

  // Sync state changes back to context
  useEffect(() => {
    updateState({
      currentDay,
      theme,
      speedMultiplier,
      showStats,
      showWeather,
      showGallery,
      initialZoomDone,
    });
  }, [currentDay, theme, speedMultiplier, showStats, showWeather, showGallery, initialZoomDone, updateState]);

  // Handle map view changes
  const handleMapViewChange = useCallback((center, zoom) => {
    saveMapView(center, zoom);
  }, [saveMapView]);

  // Initial zoom to Auckland on mount (only if first visit)
  useEffect(() => {
    // If we have a saved view, don't do initial zoom
    if (mapState.mapView) return;

    // Trigger zoom to Auckland immediately
    setZoomCommand({ type: "flyTo", coords: AUCKLAND_COORDS, zoom: 11 });

    // Show onboarding after zoom starts (1 second delay)
    const timer = setTimeout(() => {
      setShowOnboarding(true);
      setInitialZoomDone(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Preload images for current and next day stops
  useEffect(() => {
    const preloadImages = () => {
      const daysToPreload = [currentDay, currentDay + 1].filter(
        (d) => d <= TIMELINE_CONFIG.totalDays
      );

      daysToPreload.forEach((day) => {
        const dayStops = stops.filter((s) => s.day === day);
        dayStops.forEach((stop) => {
          const imageUrl = getStopImageUrl(stop);
          const img = new Image();
          img.src = imageUrl;
        });
      });
    };

    preloadImages();
  }, [currentDay]);

  const handleDayComplete = useCallback(() => {
    setCurrentDay((d) => {
      if (d >= TIMELINE_CONFIG.totalDays) {
        setIsPlaying(false);
        // Modal is already shown during final flight
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
  const isFinalDay = currentDay === TIMELINE_CONFIG.totalDays;
  const dayDuration = useMemo(
    () => calculateDayDuration(currentRoutes, isFinalDay),
    [currentRoutes, isFinalDay]
  );

  // Animation progress (0 to 1) over the calculated day duration
  const progress = useAnimationTick(isPlaying, currentDay, dayDuration, handleDayComplete, speedMultiplier);

  // Track previous day to detect day transitions
  const prevDayForVehicle = useRef(currentDay);

  // Compute vehicle position - each segment takes time proportional to distance * mode speed
  // Also accounts for pause time between route segments
  const vehicleData = useMemo(() => {
    if (!currentRoutes.length)
      return { position: null, mode: "drive", routeIndex: 0, routeProgress: 0, isPaused: false };

    // Guard against stale progress during day transitions
    // When day changes, currentRoutes updates before progress resets to 0
    // This prevents the vehicle from briefly appearing at the destination
    let safeProgress = progress;
    if (prevDayForVehicle.current !== currentDay) {
      safeProgress = 0;
      prevDayForVehicle.current = currentDay;
    }

    // Calculate time for each segment based on distance * msPerUnit
    const segmentTimes = currentRoutes.map((r) => {
      const distance = calculateRouteDistance(r.waypoints);
      // Use faster speed for final departure flight
      const isFinalFlight = isFinalDay && r.mode === "fly";
      const msPerUnit = isFinalFlight ? FINAL_FLIGHT_MS_PER_UNIT : (MODE_MS_PER_UNIT[r.mode] || MODE_MS_PER_UNIT.drive);
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

      if (safeProgress < segEnd || i === currentRoutes.length - 1) {
        routeIndex = i;
        routeProgress = Math.min(
          Math.max((safeProgress - segStart) / (segEnd - segStart), 0),
          1,
        );
        break;
      }
      accumulated += segmentTimes[i];

      // Check if we're in a pause segment (between routes)
      if (i < currentRoutes.length - 1) {
        const pauseStart = accumulated / totalTime;
        const pauseEnd = (accumulated + PAUSE_AT_STOP_MS) / totalTime;

        if (safeProgress >= pauseStart && safeProgress < pauseEnd) {
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
      return { position: null, mode: "drive", routeIndex, routeProgress: 0, isPaused: false, routeDistance: 0, bearing: 0 };

    const position = interpolatePosition(route.waypoints, routeProgress);
    const bearing = calculateBearing(route.waypoints, routeProgress);
    const routeDistance = calculateRouteDistance(route.waypoints);
    return { position, mode: route.mode, routeProgress, routeIndex, isPaused, routeDistance, bearing };
  }, [currentRoutes, progress, isFinalDay, currentDay]);

  // Compute arriving stop when routeProgress > 0.85 (only show once per stop)
  const arrivingStop = useMemo(() => {
    if (!isPlaying || !currentRoutes.length) return null;
    if (vehicleData.routeProgress < 0.85) return null;

    const route = currentRoutes[vehicleData.routeIndex];
    if (!route?.to) return null;

    // Don't show tooltip if already shown for this stop
    if (shownTooltipsRef.current.has(route.to)) return null;

    return stops.find((s) => s.id === route.to) || null;
  }, [isPlaying, currentRoutes, vehicleData.routeIndex, vehicleData.routeProgress]);

  // Track the previous route index to know when we've moved to a new route
  const prevRouteRef = useRef({ day: currentDay, index: vehicleData.routeIndex });

  // Mark tooltip as shown when we leave a route (move to next route or new day)
  useEffect(() => {
    const prevDay = prevRouteRef.current.day;
    const prevIndex = prevRouteRef.current.index;

    // If we've moved to a different route or day, mark the previous route's destination as shown
    if (currentDay !== prevDay || vehicleData.routeIndex !== prevIndex) {
      const prevRoutes = routes.filter((r) => r.day === prevDay);
      const prevRoute = prevRoutes[prevIndex];
      if (prevRoute?.to) {
        shownTooltipsRef.current.add(prevRoute.to);
      }
    }

    prevRouteRef.current = { day: currentDay, index: vehicleData.routeIndex };
  }, [currentDay, vehicleData.routeIndex]);

  // Arrival animation (landing / parking / camping)
  // Shows at 80% progress to match when destination stop markers appear
  const arrivalData = useMemo(() => {
    if (!isPlaying || !currentRoutes.length) return null;

    const route = currentRoutes[vehicleData.routeIndex];
    if (!route?.waypoints?.length) return null;

    const threshold = 0.8;
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

  // Show trip end modal during final flight (at 50% progress)
  const tripEndShownRef = useRef(false);
  useEffect(() => {
    if (!isPlaying || !isFinalDay || tripEndShownRef.current) return;

    const route = currentRoutes[vehicleData.routeIndex];
    const isFinalFlight = route?.mode === "fly" && route?.to === "home";

    if (isFinalFlight && vehicleData.routeProgress >= 0.5) {
      tripEndShownRef.current = true;
      setShowTripEnd(true);
    }
  }, [isPlaying, isFinalDay, currentRoutes, vehicleData.routeIndex, vehicleData.routeProgress]);

  // Reset trip end shown flag when day changes or replay
  useEffect(() => {
    if (currentDay < TIMELINE_CONFIG.totalDays) {
      tripEndShownRef.current = false;
    }
  }, [currentDay]);

  const handleThemeToggle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const handleZoomIn = useCallback(() => setZoomCommand("in"), []);
  const handleZoomOut = useCallback(() => setZoomCommand("out"), []);
  const handleZoomHandled = useCallback(() => setZoomCommand(null), []);

  const handleDayClick = useCallback((day) => {
    setIsPlaying(false);
    setCurrentDay(day);
    shownTooltipsRef.current = new Set(); // Reset tooltips when changing day
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

  // Onboarding handlers
  const handleOnboardingComplete = useCallback(() => {
    setShowOnboarding(false);
  }, []);

  const handleOnboardingStepChange = useCallback((step) => {
    setOnboardingStep(step);
  }, []);

  const handleStartAnimation = useCallback(() => {
    setShowOnboarding(false);
    shownTooltipsRef.current = new Set(); // Reset tooltips when starting
    // Start playing immediately since zoom is already done
    setIsPlaying(true);
  }, []);

  // Trip end handlers
  const handleTripEndClose = useCallback(() => {
    setShowTripEnd(false);
    // Zoom out to show full map
    setZoomCommand({ type: "flyTo", coords: [-41.5, 173.0], zoom: 6 });
  }, []);

  const handleReplayTrip = useCallback(() => {
    setShowTripEnd(false);
    setCurrentDay(1);
    shownTooltipsRef.current = new Set(); // Reset tooltips when replaying
    // Zoom to Auckland and start playing
    setZoomCommand({ type: "flyTo", coords: AUCKLAND_COORDS, zoom: 11 });
    setTimeout(() => setIsPlaying(true), 2000);
  }, []);

  const handleStatsToggle = useCallback(() => {
    setShowStats((s) => !s);
  }, []);

  const handleWeatherToggle = useCallback(() => {
    setShowWeather((w) => !w);
  }, []);

  const handleGalleryToggle = useCallback(() => {
    setShowGallery((g) => !g);
  }, []);

  const handleTreasureClick = useCallback(() => {
    setShowTreasure(true);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if focused on an input element
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case " ": // Space = toggle play/pause
          e.preventDefault();
          setIsPlaying((p) => !p);
          break;
        case "ArrowLeft": // Left arrow = previous day
          e.preventDefault();
          setCurrentDay((d) => Math.max(1, d - 1));
          shownTooltipsRef.current = new Set();
          break;
        case "ArrowRight": // Right arrow = next day
          e.preventDefault();
          setCurrentDay((d) => Math.min(TIMELINE_CONFIG.totalDays, d + 1));
          shownTooltipsRef.current = new Set();
          break;
        case "Escape": // Escape = close modals/panels
          if (selectedStop) {
            setSelectedStop(null);
          } else if (showOnboarding) {
            setShowOnboarding(false);
          } else if (showTripEnd) {
            setShowTripEnd(false);
          } else if (showGallery) {
            setShowGallery(false);
          }
          break;
        case "w": // 'w' = toggle weather panel
        case "W":
          setShowWeather((w) => !w);
          break;
        case "p": // 'p' = toggle photo gallery
        case "P":
          setShowGallery((g) => !g);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStop, showOnboarding, showTripEnd, showGallery]);

  // Map onboarding step to navbar highlight
  // Step 0: Welcome (no highlight)
  // Step 1: Navigation (highlight controls)
  // Step 2: Watch (highlight play button and speed)
  // Step 3: Explore (highlight timeline)
  const navHighlight = showOnboarding ? onboardingStep : null;

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
        highlightStep={navHighlight}
        showStats={showStats}
        onStatsToggle={handleStatsToggle}
        showWeather={showWeather}
        onWeatherToggle={handleWeatherToggle}
        showGallery={showGallery}
        onGalleryToggle={handleGalleryToggle}
      />
      <TripMap
        theme={theme}
        currentDay={currentDay}
        isPlaying={isPlaying}
        vehiclePosition={vehicleData.position}
        vehicleMode={vehicleData.mode}
        vehicleBearing={vehicleData.bearing}
        routeIndex={vehicleData.routeIndex}
        routeProgress={vehicleData.routeProgress}
        routeDistance={vehicleData.routeDistance}
        arrivalType={arrivalData?.type}
        arrivalPosition={arrivalData?.position}
        zoomCommand={zoomCommand}
        onZoomHandled={handleZoomHandled}
        onStopClick={handleStopClick}
        onTreasureClick={handleTreasureClick}
        arrivingStop={arrivingStop}
        isFinalDay={isFinalDay}
        onMapViewChange={handleMapViewChange}
        initialView={mapState.mapView}
      />
      <TripStats
        theme={theme}
        isVisible={showStats}
        onClose={handleStatsToggle}
      />
      <WeatherPanel
        theme={theme}
        currentDay={currentDay}
        weatherData={weatherData}
        isVisible={showWeather}
        onClose={handleWeatherToggle}
        loading={weatherLoading}
      />
      <PhotoGalleryPanel
        theme={theme}
        isVisible={showGallery}
        onClose={handleGalleryToggle}
        currentDay={currentDay}
      />
      {selectedStop && (
        <StopModal stop={selectedStop} onClose={handleCloseModal} />
      )}
      {showOnboarding && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onStartAnimation={handleStartAnimation}
          onStepChange={handleOnboardingStepChange}
        />
      )}
      {showTripEnd && (
        <TripEndModal
          onClose={handleTripEndClose}
          onReplay={handleReplayTrip}
        />
      )}
      {showTreasure && (
        <TreasureModal
          isOpen={showTreasure}
          onClose={() => setShowTreasure(false)}
          projectUrl="https://www.farmoi.com/?lang=fi"
          projectName="Farmoi"
          projectDescription="You're curious too! I thought you'd click here. So click ahead and check out an important project called Farmoi. Let's support Finnish local food production."
        />
      )}
    </div>
  );
}

export default Home;
