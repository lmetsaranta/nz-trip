import { useState, useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stops } from "../data/trip";
import { probeLocalImages } from "../utils/images";
import { isStoryWorthy } from "../utils/contentClassifier";
import StoryPage from "./StoryPage";

/**
 * DestinationRouter - Routes to the appropriate experience based on content richness
 *
 * Story-worthy stops (story > 400 chars AND 3+ images) -> StoryPage scrollytelling
 * Minimal stops -> Redirect to /map with modal open
 */
function DestinationRouter() {
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const stop = stops.find((s) => s.id === id);

  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowStory, setShouldShowStory] = useState(false);

  useEffect(() => {
    if (!stop) {
      setIsLoading(false);
      return;
    }

    // Check content richness
    const checkContent = async () => {
      // Get story content
      const storyContent = t(`${stop.id}`, { ns: "stories", defaultValue: "" });

      // Probe for images
      const images = await probeLocalImages(stop.id);
      const imageCount = images.length;

      // Determine if story-worthy
      const worthy = isStoryWorthy(stop.id, storyContent, imageCount);
      setShouldShowStory(worthy);
      setIsLoading(false);
    };

    checkContent();
  }, [stop, t]);

  // Still loading - show nothing or a subtle loading state
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary, #fefffe)'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          border: '2px solid #e4ebe7',
          borderTopColor: '#4a9c7d',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Stop not found - redirect to map
  if (!stop) {
    return <Navigate to="/map" replace />;
  }

  // Story-worthy stop - show scrollytelling page
  if (shouldShowStory) {
    return <StoryPage />;
  }

  // Minimal stop - redirect to map with stop parameter to open modal
  // The map component should handle opening the modal for this stop
  return <Navigate to={`/map?stop=${id}`} replace />;
}

export default DestinationRouter;
