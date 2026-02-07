import { useState, useEffect, useCallback, useMemo } from "react";
import { stops } from "../data/trip";
import { probeLocalImages } from "../utils/images";
import "../styles/gallery.css";

function PhotoGalleryPanel({ theme, isVisible, onClose, currentDay }) {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = all, 1-27 = specific day
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Probe all stops for images on mount
  useEffect(() => {
    let mounted = true;

    const loadPhotos = async () => {
      setLoading(true);
      const allPhotos = [];

      for (const stop of stops) {
        // Skip non-visual stops
        if (stop.type === "plane" || stop.id === "home") continue;

        const images = await probeLocalImages(stop.id);
        for (const imageUrl of images) {
          allPhotos.push({
            stopId: stop.id,
            stopName: stop.name,
            day: stop.day,
            imageUrl,
          });
        }
      }

      if (mounted) {
        setPhotos(allPhotos);
        setLoading(false);
      }
    };

    loadPhotos();

    return () => {
      mounted = false;
    };
  }, []);

  // Filter photos by selected day
  const filteredPhotos = useMemo(() => {
    if (selectedDay === 0) return photos;
    return photos.filter((p) => p.day === selectedDay);
  }, [photos, selectedDay]);

  // Get unique days that have photos
  const daysWithPhotos = useMemo(() => {
    const days = new Set(photos.map((p) => p.day));
    return Array.from(days).sort((a, b) => a - b);
  }, [photos]);

  // Lightbox navigation
  const openLightbox = useCallback(
    (photo) => {
      const index = filteredPhotos.findIndex(
        (p) => p.imageUrl === photo.imageUrl
      );
      setLightboxIndex(index);
      setLightboxPhoto(photo);
    },
    [filteredPhotos]
  );

  const closeLightbox = useCallback(() => {
    setLightboxPhoto(null);
  }, []);

  const nextPhoto = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    const nextIndex = (lightboxIndex + 1) % filteredPhotos.length;
    setLightboxIndex(nextIndex);
    setLightboxPhoto(filteredPhotos[nextIndex]);
  }, [filteredPhotos, lightboxIndex]);

  const prevPhoto = useCallback(() => {
    if (filteredPhotos.length === 0) return;
    const prevIndex =
      (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxIndex(prevIndex);
    setLightboxPhoto(filteredPhotos[prevIndex]);
  }, [filteredPhotos, lightboxIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxPhoto) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          nextPhoto();
          break;
        case "ArrowLeft":
          prevPhoto();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxPhoto, closeLightbox, nextPhoto, prevPhoto]);

  // Sync with current day when panel opens
  useEffect(() => {
    if (isVisible && currentDay) {
      // Check if current day has photos
      if (daysWithPhotos.includes(currentDay)) {
        setSelectedDay(currentDay);
      }
    }
  }, [isVisible, currentDay, daysWithPhotos]);

  return (
    <>
      <div
        className={`gallery-panel${theme === "dark" ? " gallery-panel--dark" : ""}${!isVisible ? " gallery-panel--hidden" : ""}`}
      >
        <div className="gallery-panel__header">
          <h3 className="gallery-panel__title">Photos</h3>
          <button
            className="gallery-panel__close"
            onClick={onClose}
            title="Close"
          >
            &times;
          </button>
        </div>

        <div className="gallery-panel__day-filter">
          <button
            className={`gallery-panel__day-btn${selectedDay === 0 ? " gallery-panel__day-btn--active" : ""}`}
            onClick={() => setSelectedDay(0)}
          >
            All
          </button>
          {daysWithPhotos.map((day) => (
            <button
              key={day}
              className={`gallery-panel__day-btn${selectedDay === day ? " gallery-panel__day-btn--active" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="gallery-panel__content">
          {loading ? (
            <div className="gallery-panel__loading">
              <div className="gallery-panel__skeleton" />
              <div className="gallery-panel__skeleton" />
              <div className="gallery-panel__skeleton" />
              <div className="gallery-panel__skeleton" />
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="gallery-panel__empty">No photos for this day</div>
          ) : (
            <div className="gallery-panel__grid">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={`${photo.stopId}-${idx}`}
                  className="gallery-panel__thumb"
                  onClick={() => openLightbox(photo)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.stopName}
                    loading="lazy"
                  />
                  <span className="gallery-panel__thumb-label">
                    Day {photo.day}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <div className="gallery-lightbox" onClick={closeLightbox}>
          <div
            className="gallery-lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-lightbox__close"
              onClick={closeLightbox}
              title="Close"
            >
              &times;
            </button>

            <img
              src={lightboxPhoto.imageUrl}
              alt={lightboxPhoto.stopName}
              className="gallery-lightbox__image"
            />

            <div className="gallery-lightbox__info">
              <span className="gallery-lightbox__name">
                {lightboxPhoto.stopName}
              </span>
              <span className="gallery-lightbox__day">
                Day {lightboxPhoto.day}
              </span>
            </div>

            {filteredPhotos.length > 1 && (
              <>
                <button
                  className="gallery-lightbox__nav gallery-lightbox__nav--prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                  title="Previous"
                >
                  ‹
                </button>
                <button
                  className="gallery-lightbox__nav gallery-lightbox__nav--next"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                  title="Next"
                >
                  ›
                </button>
                <div className="gallery-lightbox__counter">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default PhotoGalleryPanel;
