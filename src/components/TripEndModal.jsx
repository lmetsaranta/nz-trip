import { useState, useEffect } from "react";
import "../styles/onboarding.css";

function TripEndModal({ onClose, onReplay }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 400);
  };

  const handleReplay = () => {
    setIsExiting(true);
    setTimeout(onReplay, 400);
  };

  return (
    <div className={`onboarding-overlay ${isVisible && !isExiting ? "visible" : ""}`}>
      <div className={`onboarding-modal onboarding-modal--end ${isVisible && !isExiting ? "visible" : ""}`}>
        {/* Plane flying away animation */}
        <div className="trip-end-plane">
          <svg viewBox="0 0 64 64" width="64" height="64">
            <path
              d="M32 8 L40 20 L58 24 L42 32 L44 52 L32 44 L20 52 L22 32 L6 24 L24 20 Z"
              fill="#10B981"
              opacity="0.9"
            />
            <path
              d="M32 12 L38 22 L32 20 L26 22 Z"
              fill="#34D399"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="onboarding-content">
          <p className="onboarding-subtitle">Journey Complete</p>
          <h2 className="onboarding-title">Thanks for Watching!</h2>
          <p className="onboarding-text">
            You've just experienced our 27-day adventure across New Zealand.
            Now you can explore each stop in detail — click any marker on the map
            to discover photos, stories, and tips from that location.
          </p>
        </div>

        {/* Stats summary */}
        <div className="trip-end-stats">
          <div className="trip-end-stat">
            <span className="trip-end-stat-value">27</span>
            <span className="trip-end-stat-label">Days</span>
          </div>
          <div className="trip-end-stat">
            <span className="trip-end-stat-value">2</span>
            <span className="trip-end-stat-label">Islands</span>
          </div>
          <div className="trip-end-stat">
            <span className="trip-end-stat-value">∞</span>
            <span className="trip-end-stat-label">Memories</span>
          </div>
        </div>

        {/* Actions */}
        <div className="onboarding-nav onboarding-nav--center">
          <button className="onboarding-btn onboarding-btn--secondary" onClick={handleReplay}>
            Watch Again
          </button>
          <button className="onboarding-btn onboarding-btn--primary" onClick={handleClose}>
            Explore Stops
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripEndModal;
