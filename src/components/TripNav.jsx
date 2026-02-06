import "../styles/navbar.css";
import { TIMELINE_CONFIG } from "../data/trip";

function TripNav({
  theme,
  onThemeToggle,
  onZoomIn,
  onZoomOut,
  currentDay,
  onDayClick,
  isPlaying,
  onPlayPause,
  speedMultiplier,
  onSpeedChange,
  progress,
  highlightStep,
  showStats,
  onStatsToggle,
  showWeather,
  onWeatherToggle,
}) {
  const dayProgress = ((currentDay - 1) / (TIMELINE_CONFIG.totalDays - 1)) * 100;

  // Highlight mapping:
  // Step 1: Navigation controls (left - zoom, theme)
  // Step 2: Playback controls (right - speed, play)
  // Step 3: Timeline (center - slider)
  const highlightLeft = highlightStep === 1;
  const highlightRight = highlightStep === 2;
  const highlightCenter = highlightStep === 3;

  return (
    <div className={`trip-nav${theme === "dark" ? " trip-nav--dark" : ""}`}>
      {/* Left: zoom + theme + stats */}
      <div className={`trip-nav__left${highlightLeft ? " trip-nav__highlight" : ""}`}>
        <button className="trip-nav__btn" onClick={onZoomIn} title="Zoom in">
          +
        </button>
        <button className="trip-nav__btn" onClick={onZoomOut} title="Zoom out">
          −
        </button>
        <button className="trip-nav__btn" onClick={onThemeToggle} title="Toggle theme">
          {theme === "light" ? "☾" : "☀"}
        </button>
        <button
          className={`trip-nav__btn${showStats ? " trip-nav__btn--active" : ""}`}
          onClick={onStatsToggle}
          title="Trip statistics"
        >
          📊
        </button>
        <button
          className={`trip-nav__btn${showWeather ? " trip-nav__btn--active" : ""}`}
          onClick={onWeatherToggle}
          title="Weather"
        >
          🌤️
        </button>
      </div>

      <div className="trip-nav__divider" />

      {/* Center: timeline slider */}
      <div className={`trip-nav__center${highlightCenter ? " trip-nav__highlight" : ""}`}>
        <div className="trip-nav__day-info">
          <span className="trip-nav__day-label">Day {currentDay}</span>
          <div className="trip-nav__day-progress">
            <div
              className="trip-nav__day-progress-fill"
              style={{ width: `${(progress || 0) * 100}%` }}
            />
          </div>
        </div>
        <input
          type="range"
          className="trip-nav__slider"
          min={1}
          max={TIMELINE_CONFIG.totalDays}
          value={currentDay}
          onChange={(e) => onDayClick(Number(e.target.value))}
          style={{ "--progress": `${dayProgress}%` }}
        />
      </div>

      <div className="trip-nav__divider" />

      {/* Right: speed + play/pause */}
      <div className={`trip-nav__right${highlightRight ? " trip-nav__highlight" : ""}`}>
        <button
          className="trip-nav__btn trip-nav__speed"
          onClick={onSpeedChange}
          title="Change speed"
        >
          {speedMultiplier}x
        </button>
        <button
          className={`trip-nav__btn trip-nav__play${isPlaying ? " trip-nav__play--playing" : ""}`}
          onClick={onPlayPause}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>
    </div>
  );
}

export default TripNav;
