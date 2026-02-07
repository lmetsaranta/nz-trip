import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  const stop = stops.find((s) => s.id === id);

  if (!stop) {
    return (
      <div className="destination destination--not-found">
        <div className="destination__container">
          <h1 className="destination__title">Destination not found</h1>
          <p className="destination__text">
            The destination you're looking for doesn't exist.
          </p>
          <Link to="/map" className="destination__back">
            Back to Map
          </Link>
        </div>
      </div>
    );
  }

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
      text: stop.content || stop.description,
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
          <span className="destination__back-text">Back to Map</span>
        </button>
        <div className="destination__hero-content">
          <span className={`destination__type destination__type--${stop.type}`}>
            {stop.type}
          </span>
          <h1 className="destination__title">{stop.name}</h1>
          <p className="destination__day">Day {stop.day}</p>
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
            <span className="destination__coords-label">Coordinates</span>
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
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}

export default Destination;
