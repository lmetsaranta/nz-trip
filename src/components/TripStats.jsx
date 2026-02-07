import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { routes, TIMELINE_CONFIG } from "../data/trip";
import "../styles/stats.css";

const MODE_ICONS = {
  fly: "✈",
  drive: "🚐",
  hike: "🥾",
  ferry: "⛴",
  bike: "🚴",
  canoeing: "🛶",
  rafting: "🚣",
  surfing: "🏄",
  spa: "♨",
};

function TripStats({ theme, isVisible, onClose }) {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    // Count routes by mode
    const modeCount = {};
    routes.forEach((route) => {
      modeCount[route.mode] = (modeCount[route.mode] || 0) + 1;
    });

    // Sort modes by count (descending)
    const sortedModes = Object.entries(modeCount)
      .sort((a, b) => b[1] - a[1])
      .map(([mode, count]) => ({ mode, count }));

    return {
      totalDays: TIMELINE_CONFIG.totalDays,
      totalRoutes: routes.length,
      modes: sortedModes,
    };
  }, []);

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
            <span className="trip-stats__stat-value">{stats.totalDays}</span>
            <span className="trip-stats__stat-label">{t("stats.days")}</span>
          </div>
          <div className="trip-stats__stat">
            <span className="trip-stats__stat-value">{stats.totalRoutes}</span>
            <span className="trip-stats__stat-label">{t("stats.routes")}</span>
          </div>
        </div>

        {/* Mode breakdown */}
        <h4 className="trip-stats__section-title">{t("stats.byTransportMode")}</h4>
        <div className="trip-stats__modes">
          {stats.modes.map(({ mode, count }) => (
            <div key={mode} className="trip-stats__mode">
              <div className={`trip-stats__mode-icon trip-stats__mode-icon--${mode}`}>
                {MODE_ICONS[mode] || "•"}
              </div>
              <div className="trip-stats__mode-info">
                <div className="trip-stats__mode-name">
                  {t(`modes.${mode}`)}
                </div>
                <div className="trip-stats__mode-count">
                  {count} {count === 1 ? t("stats.route") : t("stats.routes_plural")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripStats;
