import { useMemo } from "react";
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

const MODE_LABELS = {
  fly: "Flights",
  drive: "Driving",
  hike: "Hiking",
  ferry: "Ferry",
  bike: "Biking",
  canoeing: "Canoeing",
  rafting: "Rafting",
  surfing: "Surfing",
  spa: "Hot Springs",
};

function TripStats({ theme, isVisible, onClose }) {
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
        <h3 className="trip-stats__title">Trip Statistics</h3>
        <button className="trip-stats__close" onClick={onClose} title="Close">
          ×
        </button>
      </div>

      <div className="trip-stats__content">
        {/* Summary */}
        <div className="trip-stats__summary">
          <div className="trip-stats__stat">
            <span className="trip-stats__stat-value">{stats.totalDays}</span>
            <span className="trip-stats__stat-label">Days</span>
          </div>
          <div className="trip-stats__stat">
            <span className="trip-stats__stat-value">{stats.totalRoutes}</span>
            <span className="trip-stats__stat-label">Routes</span>
          </div>
        </div>

        {/* Mode breakdown */}
        <h4 className="trip-stats__section-title">By Transport Mode</h4>
        <div className="trip-stats__modes">
          {stats.modes.map(({ mode, count }) => (
            <div key={mode} className="trip-stats__mode">
              <div className={`trip-stats__mode-icon trip-stats__mode-icon--${mode}`}>
                {MODE_ICONS[mode] || "•"}
              </div>
              <div className="trip-stats__mode-info">
                <div className="trip-stats__mode-name">
                  {MODE_LABELS[mode] || mode}
                </div>
                <div className="trip-stats__mode-count">
                  {count} {count === 1 ? "route" : "routes"}
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
