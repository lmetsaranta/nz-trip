import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stops } from "../data/trip";
import { probeLocalImages, getUnsplashFallbackUrl } from "../utils/images";
import ProtectedImage from "../components/ProtectedImage";
import { useImageProtection } from "../hooks/useImageProtection";
import "../styles/destination.css";

function Destination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const stop = stops.find((s) => s.id === id);

  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Image protection
  const pageRef = useRef(null);
  useImageProtection(pageRef);

  // Probe for local images
  useEffect(() => {
    if (stop) {
      probeLocalImages(stop.id).then((foundImages) => {
        if (foundImages.length > 0) {
          setImages(foundImages);
        } else {
          setImages([getUnsplashFallbackUrl(stop)]);
        }
        setImagesLoaded(true);
      });
    }
  }, [stop]);

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

  const heroImage = images[0] || getUnsplashFallbackUrl(stop);

  return (
    <div className="destination" ref={pageRef}>
      {/* Hero image */}
      <div className="destination__hero">
        {imagesLoaded && (
          <ProtectedImage
            src={heroImage}
            alt={stop.name}
            className="destination__hero-image"
          />
        )}
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
          <p className="destination__text">{displayContent}</p>
        </div>

        {/* Image carousel */}
        {images.length > 0 && (
          <div className="destination__gallery">
            <div className="destination__gallery-scroll">
              {images.map((img, index) => (
                <div key={index} className="destination__gallery-item">
                  <ProtectedImage
                    src={img}
                    alt={`${stop.name} ${index + 1}`}
                    className="destination__gallery-image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

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
