import { useState, useEffect } from "react";
import "../styles/treasure.css";

function TreasureModal({ isOpen, onClose, projectUrl, projectName, projectDescription }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
      // Show content after chest animation completes
      const timer = setTimeout(() => setShowContent(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsExiting(false);
      setIsVisible(false);
      setShowContent(false);
      onClose();
    }, 400);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`treasure-overlay ${isVisible && !isExiting ? "visible" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={`treasure-modal ${isVisible && !isExiting ? "visible" : ""}`}>
        <button className="treasure-close" onClick={handleClose}>
          ×
        </button>

        {/* Treasure Chest */}
        <div className={`treasure-chest ${isVisible ? "treasure-chest--open" : ""}`}>
          {/* Chest Base */}
          <svg className="treasure-chest-svg" viewBox="0 0 120 100" width="120" height="100">
            {/* Chest body - back */}
            <rect x="10" y="45" width="100" height="50" rx="4" fill="#8B4513" />
            {/* Chest body - front */}
            <rect x="10" y="45" width="100" height="50" rx="4" fill="#A0522D" />
            {/* Chest body - bottom highlight */}
            <rect x="10" y="80" width="100" height="15" rx="4" fill="#6B3710" />
            {/* Metal bands */}
            <rect x="8" y="50" width="104" height="6" fill="#CD853F" />
            <rect x="8" y="70" width="104" height="6" fill="#CD853F" />
            <rect x="8" y="85" width="104" height="6" fill="#CD853F" />
            {/* Lock */}
            <rect x="52" y="58" width="16" height="20" rx="2" fill="#FFD700" />
            <circle cx="60" cy="68" r="3" fill="#B8860B" />
          </svg>

          {/* Chest Lid (animated) */}
          <svg className="treasure-lid" viewBox="0 0 120 50" width="120" height="50">
            {/* Lid back */}
            <path d="M10 45 L10 15 Q60 -10 110 15 L110 45 Z" fill="#8B4513" />
            {/* Lid front */}
            <path d="M10 45 L10 20 Q60 -5 110 20 L110 45 Z" fill="#A0522D" />
            {/* Lid highlight */}
            <path d="M10 45 L10 35 Q60 10 110 35 L110 45 Z" fill="#6B3710" />
            {/* Metal band on lid */}
            <path d="M8 42 Q60 20 112 42 L112 48 Q60 26 8 48 Z" fill="#CD853F" />
          </svg>

          {/* Gold Coins */}
          <div className="treasure-coins">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="coin"
                style={{
                  "--delay": `${0.8 + i * 0.08}s`,
                  "--x-offset": `${(Math.random() - 0.5) * 100}px`,
                  "--rotation": `${Math.random() * 720}deg`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className={`treasure-reveal ${showContent ? "visible" : ""}`}>
          <h2 className="treasure-title">You found a treasure!</h2>
          <p className="treasure-description">{projectDescription}</p>
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="treasure-btn"
          >
            Discover {projectName} →
          </a>
        </div>
      </div>
    </div>
  );
}

export default TreasureModal;
