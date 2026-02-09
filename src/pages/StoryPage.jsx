import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stops } from "../data/trip";
import { probeLocalImages, getUnsplashFallbackUrl } from "../utils/images";
import ProtectedImage from "../components/ProtectedImage";
import { useImageProtection } from "../hooks/useImageProtection";
import { useScrollProgress, useParallax, ScrollReveal } from "../hooks/useScrollAnimation.jsx";
import { splitIntoParagraphs, calculateImageLayout } from "../utils/contentClassifier";
import "../styles/story.css";

function StoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const stop = stops.find((s) => s.id === id);
  const stopIndex = stops.findIndex((s) => s.id === id);

  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Scroll progress
  const scrollProgress = useScrollProgress();

  // Parallax for hero
  const { ref: heroRef, offset: parallaxOffset } = useParallax(0.4);

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

  // Get navigation stops (prev/next)
  const prevStop = stopIndex > 0 ? stops[stopIndex - 1] : null;
  const nextStop = stopIndex < stops.length - 1 ? stops[stopIndex + 1] : null;

  // Get story content and split into paragraphs
  const storyContent = stop ? t(`${stop.id}`, { ns: "stories", defaultValue: "" }) : "";
  const fallbackContent = stop ? t(`${stop.id}`, { ns: "stops", defaultValue: stop?.description || "" }) : "";
  const displayContent = storyContent || fallbackContent;

  const paragraphs = useMemo(() => splitIntoParagraphs(displayContent), [displayContent]);
  const imageLayout = useMemo(
    () => calculateImageLayout(images.length, paragraphs.length),
    [images.length, paragraphs.length]
  );

  if (!stop) {
    return (
      <div className="story-page story-page--not-found">
        <div className="story-page__content">
          <h1>{t("destination.notFound")}</h1>
          <p>{t("destination.notFoundDescription")}</p>
          <Link to="/map" className="story-page__nav-link story-page__nav-link--map">
            {t("destination.backToMap")}
          </Link>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/map");
    }
  };

  const heroImage = images[0] || getUnsplashFallbackUrl(stop);

  // Build content sections with images interspersed
  const renderStoryContent = () => {
    const sections = [];
    let imageLayoutIndex = 0;

    paragraphs.forEach((paragraph, index) => {
      // Add paragraph
      sections.push(
        <ScrollReveal key={`p-${index}`} animation="fade-up" delay={index * 50}>
          <p className="story-page__paragraph">{paragraph}</p>
        </ScrollReveal>
      );

      // Check if there's an image layout after this paragraph
      const layout = imageLayout.find((l) => l.afterParagraph === index);
      if (layout) {
        if (layout.type === "side-by-side" && layout.indices.length >= 2) {
          sections.push(
            <ScrollReveal key={`img-${imageLayoutIndex}`} animation="fade-up" delay={100}>
              <div className="story-page__image-section story-page__image-duo">
                {layout.indices.map((imgIndex) => (
                  <ProtectedImage
                    key={imgIndex}
                    src={images[imgIndex]}
                    alt={`${stop.name} ${imgIndex + 1}`}
                  />
                ))}
              </div>
            </ScrollReveal>
          );
        } else if (layout.type === "single" && layout.indices[0] !== undefined) {
          const useFullWidth = imageLayoutIndex % 3 === 1;
          sections.push(
            <ScrollReveal
              key={`img-${imageLayoutIndex}`}
              animation={useFullWidth ? "scale" : "fade-up"}
              delay={100}
            >
              <div
                className={`story-page__image-section ${
                  useFullWidth ? "story-page__image-full" : "story-page__image-single"
                }`}
              >
                <ProtectedImage
                  src={images[layout.indices[0]]}
                  alt={`${stop.name} ${layout.indices[0] + 1}`}
                />
              </div>
            </ScrollReveal>
          );
        }
        imageLayoutIndex++;
      }
    });

    return sections;
  };

  return (
    <div className="story-page" ref={pageRef}>
      {/* Progress bar */}
      <div
        className="story-page__progress"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back button */}
      <button className="story-page__back-btn" onClick={handleBack}>
        <span className="story-page__back-icon">←</span>
        <span className="story-page__back-text">{t("destination.backToMap")}</span>
      </button>

      {/* Hero section */}
      <section className="story-page__hero" ref={heroRef}>
        <div className="story-page__hero-image-wrapper">
          {imagesLoaded && (
            <ProtectedImage
              src={heroImage}
              alt={stop.name}
              className="story-page__hero-image"
              style={{ transform: `translateY(${parallaxOffset}px)` }}
            />
          )}
        </div>
        <div className="story-page__hero-overlay" />

        <div className="story-page__hero-content">
          <div className="story-page__meta">
            <span className="story-page__day">
              {t("stopModal.day")} {stop.day}
            </span>
            <span className={`story-page__type story-page__type--${stop.type}`}>
              {t(`stopTypes.${stop.type}`, { defaultValue: stop.type })}
            </span>
          </div>
          <h1 className="story-page__title">{stop.name}</h1>
          <div className="story-page__scroll-hint">
            <span>↓</span>
            <span>{t("story.scrollToRead", { defaultValue: "Scroll to read" })}</span>
          </div>
        </div>
      </section>

      {/* Story content */}
      <div className="story-page__content">
        <div className="story-page__section">
          {renderStoryContent()}
        </div>

        {/* Coordinates section */}
        <div className="story-page__coords-section">
          <div className="story-page__coords">
            <span className="story-page__coords-label">
              {t("destination.coordinates")}
            </span>
            <span className="story-page__coords-value">
              {stop.coords[0].toFixed(4)}, {stop.coords[1].toFixed(4)}
            </span>
          </div>
          <a
            href={
              stop.url ||
              `https://www.google.com/maps?q=${stop.coords[0]},${stop.coords[1]}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="story-page__external-link"
          >
            {stop.url ? t("destination.viewOnDOC") : t("destination.openInGoogleMaps")}
          </a>
        </div>

        {/* Navigation */}
        <nav className="story-page__nav">
          {prevStop ? (
            <Link
              to={`/destination/${prevStop.id}`}
              className="story-page__nav-link story-page__nav-link--prev"
            >
              <span className="story-page__nav-icon">←</span>
              <span>{prevStop.name}</span>
            </Link>
          ) : (
            <span className="story-page__nav-link story-page__nav-link--disabled">
              <span className="story-page__nav-icon">←</span>
              <span>{t("story.noPrev", { defaultValue: "No previous" })}</span>
            </span>
          )}

          <Link to="/map" className="story-page__nav-link story-page__nav-link--map">
            <span>{t("destination.backToMap")}</span>
          </Link>

          {nextStop ? (
            <Link
              to={`/destination/${nextStop.id}`}
              className="story-page__nav-link story-page__nav-link--next"
            >
              <span>{nextStop.name}</span>
              <span className="story-page__nav-icon">→</span>
            </Link>
          ) : (
            <span className="story-page__nav-link story-page__nav-link--disabled">
              <span>{t("story.noNext", { defaultValue: "No next" })}</span>
              <span className="story-page__nav-icon">→</span>
            </span>
          )}
        </nav>
      </div>
    </div>
  );
}

export default StoryPage;
