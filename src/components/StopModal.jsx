import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/modal.css";

function StopModal({ stop, onClose }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Get pages - either from stop.pages or create single page from stop data
  const pages = stop.pages || [
    {
      title: stop.name,
      image: stop.image || `https://source.unsplash.com/800x600/?${encodeURIComponent(stop.name + " new zealand")}`,
      text: stop.content || stop.description,
    },
  ];

  const totalPages = pages.length;
  const page = pages[currentPage];

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
  };

  const nextPage = () => {
    setCurrentPage((p) => (p + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  };

  return (
    <div
      className={`stop-modal-overlay ${isVisible ? "visible" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={`stop-modal ${isVisible ? "visible" : ""}`}>
        {/* Close button */}
        <button className="stop-modal__close" onClick={handleClose}>
          ×
        </button>

        {/* Image */}
        <div className="stop-modal__image-container">
          <img
            src={page.image}
            alt={page.title}
            className="stop-modal__image"
            loading="lazy"
          />
          {/* Day badge */}
          <div className="stop-modal__day">Day {stop.day}</div>
          {/* Type badge */}
          <div className={`stop-modal__type stop-modal__type--${stop.type}`}>
            {stop.type}
          </div>
        </div>

        {/* Content */}
        <div className="stop-modal__content">
          <h2 className="stop-modal__title" onClick={handleTitleClick}>
            {page.title}
            <span className="stop-modal__title-arrow">→</span>
          </h2>
          <p className="stop-modal__text">{page.text}</p>
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
