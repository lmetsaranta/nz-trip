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
}) {
  const dayProgress = ((currentDay - 1) / (TIMELINE_CONFIG.totalDays - 1)) * 100;

  return (
    <div className={`trip-nav${theme === "dark" ? " trip-nav--dark" : ""}`}>
      {/* Left: zoom + theme */}
      <div className="trip-nav__left">
        <button className="trip-nav__btn" onClick={onZoomIn} title="Zoom in">
          +
        </button>
        <button className="trip-nav__btn" onClick={onZoomOut} title="Zoom out">
          −
        </button>
        <button className="trip-nav__btn" onClick={onThemeToggle} title="Toggle theme">
          {theme === "light" ? "☾" : "☀"}
        </button>
      </div>

      <div className="trip-nav__divider" />

      {/* Center: timeline slider */}
      <div className="trip-nav__center">
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
      <div className="trip-nav__right">
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
