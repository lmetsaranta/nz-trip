import { useTranslation } from "react-i18next";
import { TIMELINE_CONFIG } from "../data/trip";
import "../styles/stats.css";

// Fixed trip statistics
const TRIP_STATS = {
  driving: 4019,
  hiking: 292,
  hotSprings: 3,
  iceCreams: 12,
  flights: 6,
};

function TripStats({ theme, isVisible, onClose }) {
  const { t } = useTranslation();

  return (
    <div
      className={`trip-stats${theme === "dark" ? " trip-stats--dark" : ""}${!isVisible ? " trip-stats--hidden" : ""}`}
    >
      <div className="trip-stats__header">
        <h3 className="trip-stats__title">{t("stats.title")}</h3>
        <button className="trip-stats__close" onClick={onClose} title={t("stats.close")}>
          ×
        </button>
      </div>

      <div className="trip-stats__content">
        {/* Summary */}
        <div className="trip-stats__summary">
          <div className="trip-stats__stat">
            <span className="trip-stats__stat-value">{TIMELINE_CONFIG.totalDays}</span>
            <span className="trip-stats__stat-label">{t("stats.days")}</span>
          </div>
          <div className="trip-stats__stat">
            <span className="trip-stats__stat-value">{TRIP_STATS.flights}</span>
            <span className="trip-stats__stat-label">{t("stats.flights")}</span>
          </div>
        </div>

        {/* Distance stats */}
        <h4 className="trip-stats__section-title">{t("stats.distances")}</h4>
        <div className="trip-stats__modes">
          <div className="trip-stats__mode">
            <div className="trip-stats__mode-icon trip-stats__mode-icon--drive">🚐</div>
            <div className="trip-stats__mode-info">
              <div className="trip-stats__mode-name">{t("stats.driving")}</div>
              <div className="trip-stats__mode-count">{TRIP_STATS.driving.toLocaleString()} km</div>
            </div>
          </div>
          <div className="trip-stats__mode">
            <div className="trip-stats__mode-icon trip-stats__mode-icon--hike">🥾</div>
            <div className="trip-stats__mode-info">
              <div className="trip-stats__mode-name">{t("stats.hiking")}</div>
              <div className="trip-stats__mode-count">{TRIP_STATS.hiking} km</div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <h4 className="trip-stats__section-title">{t("stats.highlights")}</h4>
        <div className="trip-stats__modes">
          <div className="trip-stats__mode">
            <div className="trip-stats__mode-icon trip-stats__mode-icon--spa">♨</div>
            <div className="trip-stats__mode-info">
              <div className="trip-stats__mode-name">{t("stats.hotSprings")}</div>
              <div className="trip-stats__mode-count">{TRIP_STATS.hotSprings}</div>
            </div>
          </div>
          <div className="trip-stats__mode">
            <div className="trip-stats__mode-icon trip-stats__mode-icon--icecream">🍦</div>
            <div className="trip-stats__mode-info">
              <div className="trip-stats__mode-name">{t("stats.iceCreams")}</div>
              <div className="trip-stats__mode-count">{TRIP_STATS.iceCreams}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripStats;
