import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { probeLocalImages, getUnsplashFallbackUrl } from "../utils/images";
import { isStoryWorthy } from "../utils/contentClassifier";
import ProtectedImage from "./ProtectedImage";
import { useImageProtection } from "../hooks/useImageProtection";
import "../styles/modal.css";

function StopModal({ stop, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [localImages, setLocalImages] = useState([]);
  const [imagesProbed, setImagesProbed] = useState(false);
  const [isStoryWorthyStop, setIsStoryWorthyStop] = useState(false);

  // Image protection
  const modalRef = useRef(null);
  useImageProtection(modalRef);

  // Get translated description for this stop
  const getStopDescription = () => {
    return t(`${stop.id}`, { ns: "stops", defaultValue: stop.description });
  };

  // Get pages - either from stop.pages or create single page from stop data
  const pages = stop.pages || [
    {
      title: stop.name,
      text: stop.content || getStopDescription(),
    },
  ];

  const totalPages = pages.length;
  const page = pages[currentPage];

  // Get story content for checking if story-worthy
  const storyContent = t(`${stop.id}`, { ns: "stories", defaultValue: "" });

  // Probe for local images when modal opens
  useEffect(() => {
    const probeImages = async () => {
      let images;
      if (!stop.image) {
        images = await probeLocalImages(stop.id);
        setLocalImages(images);
        setImagesProbed(true);
        if (images.length === 0) {
          setImageLoading(true);
        }
      } else {
        images = [stop.image];
        setLocalImages(images);
        setImagesProbed(true);
      }

      // Check if this stop is story-worthy
      const worthy = isStoryWorthy(stop.id, storyContent, images.length);
      setIsStoryWorthyStop(worthy);
    };

    probeImages();
  }, [stop.id, stop.image, storyContent]);

  // Get current image URL
  const getCurrentImageUrl = () => {
    if (localImages.length > 0) {
      return localImages[currentImageIndex];
    }
    // Fallback to Unsplash
    return getUnsplashFallbackUrl(stop);
  };

  const totalImages = localImages.length || 1; // At least 1 for Unsplash fallback

  useEffect(() => {
    // Animate in
    requestAnimationFrame(() => setIsVisible(true));

    // Close on escape
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  const handleTitleClick = () => {
    navigate(`/destination/${stop.id}`);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const goToPage = (index) => {
    setCurrentPage(index);
    setCurrentImageIndex(0);
    setImageLoading(true);
    setImageError(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const nextPage = () => {
    setCurrentPage((p) => (p + 1) % totalPages);
    setCurrentImageIndex(0);
  };

  const prevPage = () => {
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((i) => (i + 1) % totalImages);
    setImageLoading(true);
    setImageError(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((i) => (i - 1 + totalImages) % totalImages);
    setImageLoading(true);
    setImageError(false);
  };

  return (
    <div
      className={`stop-modal-overlay ${isVisible ? "visible" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={`stop-modal ${isVisible ? "visible" : ""}`} ref={modalRef}>
        {/* Close button */}
        <button className="stop-modal__close" onClick={handleClose}>
          ×
        </button>

        {/* Image */}
        <div className="stop-modal__image-container">
          {(imageLoading || !imagesProbed) && !imageError && (
            <div className="stop-modal__image-placeholder" />
          )}
          {imageError ? (
            <div className="stop-modal__image-fallback">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 3L4 8.5V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.5L16 3H8z" />
                <path d="M4 8.5h16" />
                <path d="M12 3v5.5" />
                <path d="M8 14l2 2 4-4 2 2" />
              </svg>
              <span>{t("stopModal.imageUnavailable")}</span>
            </div>
          ) : (
            imagesProbed && (
              <ProtectedImage
                src={getCurrentImageUrl()}
                alt={page.title}
                className={`stop-modal__image ${imageLoading ? "stop-modal__image--loading" : "stop-modal__image--loaded"}`}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )
          )}

          {/* Image navigation arrows (only show if multiple images) */}
          {totalImages > 1 && imagesProbed && (
            <>
              <button
                className="stop-modal__image-nav stop-modal__image-nav--prev"
                onClick={prevImage}
                aria-label={t("stopModal.previousImage")}
              >
                ‹
              </button>
              <button
                className="stop-modal__image-nav stop-modal__image-nav--next"
                onClick={nextImage}
                aria-label={t("stopModal.nextImage")}
              >
                ›
              </button>
              <div className="stop-modal__image-counter">
                {currentImageIndex + 1} / {totalImages}
              </div>
            </>
          )}

          {/* Day badge */}
          <div className="stop-modal__day">{t("stopModal.day")} {stop.day}</div>
          {/* Type badge */}
          <div className={`stop-modal__type stop-modal__type--${stop.type}`}>
            {t(`stopTypes.${stop.type}`, { defaultValue: stop.type })}
          </div>
        </div>

        {/* Content */}
        <div className="stop-modal__content">
          <h2
            className={`stop-modal__title ${isStoryWorthyStop ? 'stop-modal__title--clickable' : ''}`}
            onClick={isStoryWorthyStop ? handleTitleClick : undefined}
          >
            {page.title}
            {isStoryWorthyStop && <span className="stop-modal__title-arrow">→</span>}
          </h2>
          <p className="stop-modal__text">{page.text}</p>

          {/* Coordinates */}
          <div className="stop-modal__coords">
            <span className="stop-modal__coords-icon">📍</span>
            <span className="stop-modal__coords-value">
              {stop.coords[0].toFixed(4)}, {stop.coords[1].toFixed(4)}
            </span>
          </div>

          {/* External link */}
          <a
            href={stop.url || `https://www.google.com/maps?q=${stop.coords[0]},${stop.coords[1]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="stop-modal__external-link"
          >
            <span className="stop-modal__external-icon">🔗</span>
            {stop.url ? t("destination.viewOnDOC") : t("destination.openInGoogleMaps")}
          </a>

          {/* Read full story button - only for story-worthy stops */}
          {isStoryWorthyStop && (
            <button className="stop-modal__story-btn" onClick={handleTitleClick}>
              {t("stopModal.readFullStory", { defaultValue: "Read Full Story" })} →
            </button>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="stop-modal__pagination">
            <button
              className="stop-modal__nav stop-modal__nav--prev"
              onClick={prevPage}
            >
              ‹
            </button>
            <div className="stop-modal__dots">
              {pages.map((_, i) => (
                <button
                  key={i}
                  className={`stop-modal__dot ${i === currentPage ? "active" : ""}`}
                  onClick={() => goToPage(i)}
                />
              ))}
            </div>
            <button
              className="stop-modal__nav stop-modal__nav--next"
              onClick={nextPage}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StopModal;
