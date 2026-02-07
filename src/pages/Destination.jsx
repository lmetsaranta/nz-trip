import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stops } from "../data/trip";
import { getStopImageUrl, getUnsplashFallbackUrl } from "../utils/images";
import "../styles/destination.css";

// Image component with fallback handling
function FallbackImage({ src, fallbackSrc, alt, className }) {
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    if (!useFallback && fallbackSrc) {
      setUseFallback(true);
    }
  };

  return (
    <img
      src={useFallback ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}

function Destination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const stop = stops.find((s) => s.id === id);

  if (!stop) {
    return (
      <div className="destination destination--not-found">
        <div className="destination__container">
          <h1 className="destination__title">{t("destination.notFound")}</h1>
          <p className="destination__text">
            {t("destination.notFoundDescription")}
          </p>
          <Link to="/map" className="destination__back">
            {t("destination.backToMap")}
          </Link>
        </div>
      </div>
    );
  }

  // Get story content (longer description) for this stop
  const storyContent = t(`${stop.id}`, { ns: "stories", defaultValue: "" });
  // Fallback to short description if no story exists
  const displayContent = storyContent || t(`${stop.id}`, { ns: "stops", defaultValue: stop.description });

  const handleBack = () => {
    // Use browser back to preserve map state
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/map");
    }
  };

  const pages = stop.pages || [
    {
      title: stop.name,
      image: getStopImageUrl(stop),
      fallbackImage: getUnsplashFallbackUrl(stop),
      text: displayContent,
    },
  ];

  return (
    <div className="destination">
      {/* Hero image */}
      <div className="destination__hero">
        <FallbackImage
          src={pages[0].image}
          fallbackSrc={pages[0].fallbackImage}
          alt={stop.name}
          className="destination__hero-image"
        />
        <div className="destination__hero-overlay" />
        <button
          className="destination__back-btn"
          onClick={handleBack}
        >
          <span className="destination__back-icon">←</span>
          <span className="destination__back-text">{t("destination.backToMap")}</span>
        </button>
        <div className="destination__hero-content">
          <span className={`destination__type destination__type--${stop.type}`}>
            {t(`stopTypes.${stop.type}`, { defaultValue: stop.type })}
          </span>
          <h1 className="destination__title">{stop.name}</h1>
          <p className="destination__day">{t("stopModal.day")} {stop.day}</p>
        </div>
      </div>

      {/* Content */}
      <div className="destination__container">
        <div className="destination__content">
          {pages.map((page, index) => (
            <section key={index} className="destination__section">
              {index > 0 && (
                <>
                  <h2 className="destination__section-title">{page.title}</h2>
                  <FallbackImage
                    src={page.image}
                    fallbackSrc={page.fallbackImage}
                    alt={page.title}
                    className="destination__section-image"
                  />
                </>
              )}
              <p className="destination__text">{page.text}</p>
            </section>
          ))}
        </div>

        {/* Coordinates */}
        <div className="destination__meta">
          <div className="destination__coords">
            <span className="destination__coords-label">{t("destination.coordinates")}</span>
            <span className="destination__coords-value">
              {stop.coords[0].toFixed(4)}, {stop.coords[1].toFixed(4)}
            </span>
          </div>
          <a
            href={`https://www.google.com/maps?q=${stop.coords[0]},${stop.coords[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="destination__maps-link"
          >
            {t("destination.openInGoogleMaps")}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Destination;
