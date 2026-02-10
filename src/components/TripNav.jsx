import { useTranslation } from "react-i18next";
import "../styles/navbar.css";
import { TIMELINE_CONFIG } from "../data/trip";
import { useAccess } from "../context/AccessContext";
import LanguageSwitcher from "./LanguageSwitcher";

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
  showGallery,
  onGalleryToggle,
}) {
  const { t } = useTranslation();
  const { hasFullAccess } = useAccess();
  const dayProgress = ((currentDay - 1) / (TIMELINE_CONFIG.totalDays - 1)) * 100;

  // Highlight mapping:
  // Step 1: Navigation controls (left - zoom, theme)
  // Step 2: Playback controls (right - speed, play)
  // Step 3: Timeline (center - slider)
  const highlightLeft = highlightStep === 1;
  const highlightRight = highlightStep === 2;
  const highlightCenter = highlightStep === 3;

  const darkClass = theme === "dark" ? " trip-nav--dark" : "";

  return (
    <>
      {/* Top navigation bar */}
      <div className={`trip-nav${darkClass}`}>
        {/* Left: zoom + theme + language + stats */}
        <div className={`trip-nav__left${highlightLeft ? " trip-nav__highlight" : ""}`}>
          <button className="trip-nav__btn" onClick={onZoomIn} title={t("nav.zoomIn")}>
            +
          </button>
          <button className="trip-nav__btn" onClick={onZoomOut} title={t("nav.zoomOut")}>
            −
          </button>
          <button className="trip-nav__btn" onClick={onThemeToggle} title={t("nav.toggleTheme")}>
            {theme === "light" ? "☾" : "☀"}
          </button>
          <LanguageSwitcher />
          <button
            className={`trip-nav__btn${showStats ? " trip-nav__btn--active" : ""}`}
            onClick={onStatsToggle}
            title={t("nav.tripStats")}
          >
            📊
          </button>
          <button
            className={`trip-nav__btn${showWeather ? " trip-nav__btn--active" : ""}`}
            onClick={onWeatherToggle}
            title={t("nav.weather")}
          >
            🌤️
          </button>
          {hasFullAccess && (
            <button
              className={`trip-nav__btn${showGallery ? " trip-nav__btn--active" : ""}`}
              onClick={onGalleryToggle}
              title={t("nav.photoGallery")}
            >
              📷
            </button>
          )}
        </div>

        <div className="trip-nav__divider" />

        {/* Center: timeline slider (desktop only, hidden on mobile) */}
        <div className={`trip-nav__center trip-nav__center--desktop${highlightCenter ? " trip-nav__highlight" : ""}`}>
          <div className="trip-nav__day-info">
            <span className="trip-nav__day-label">{t("nav.day")} {currentDay}</span>
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
            title={t("nav.changeSpeed")}
          >
            {speedMultiplier}x
          </button>
          <button
            className={`trip-nav__btn trip-nav__play${isPlaying ? " trip-nav__play--playing" : ""}`}
            onClick={onPlayPause}
            title={isPlaying ? t("nav.pause") : t("nav.play")}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      </div>

      {/* Bottom timeline bar (mobile only) */}
      <div className={`trip-nav__bottom${darkClass}${highlightCenter ? " trip-nav__highlight" : ""}`}>
        <div className="trip-nav__day-info">
          <span className="trip-nav__day-label">{t("nav.day")} {currentDay}</span>
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
    </>
  );
}

export default TripNav;
