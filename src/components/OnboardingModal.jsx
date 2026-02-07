import { useState, useEffect } from "react";
import "../styles/onboarding.css";

const ONBOARDING_STEPS = [
  {
    title: "Welcome to New Zealand",
    subtitle: "27 Days of Adventure",
    content: "Our journey begins in Auckland, the City of Sails. From here we'll explore both islands, from volcanic landscapes to pristine fjords.",
    icon: "🇳🇿",
  },
  {
    title: "How to Navigate",
    subtitle: "Your Controls",
    content: "Use the timeline to jump to any day and adjust playback speed (0.5x-2x). Toggle the weather panel for conditions, photo gallery for snapshots, and switch between light/dark themes.",
    icon: "🎛️",
  },
  {
    title: "Watch the Journey",
    subtitle: "Recommended First Experience",
    content: "We recommend watching the full animation first to see the complete adventure unfold. The route draws in real-time as we travel across New Zealand.",
    icon: "▶️",
  },
  {
    title: "Explore at Your Pace",
    subtitle: "Dive Deeper",
    content: "Click any stop marker to learn more about that location. Browse the photo gallery, check weather conditions, and discover details about each destination.",
    icon: "📍",
  },
];

function OnboardingModal({ onComplete, onStartAnimation, onStepChange }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleStartWatching = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
      onStartAnimation();
    }, 400);
  };

  const handleExploreManually = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const step = ONBOARDING_STEPS[currentStep];
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  return (
    <div className={`onboarding-overlay ${isVisible && !isExiting ? "visible" : ""}`}>
      <div className={`onboarding-modal ${isVisible && !isExiting ? "visible" : ""}`}>
        {/* Progress dots */}
        <div className="onboarding-progress">
          {ONBOARDING_STEPS.map((_, i) => (
            <button
              key={i}
              className={`onboarding-dot ${i === currentStep ? "active" : ""} ${i < currentStep ? "completed" : ""}`}
              onClick={() => setCurrentStep(i)}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="onboarding-icon">{step.icon}</div>

        {/* Content */}
        <div className="onboarding-content">
          <p className="onboarding-subtitle">{step.subtitle}</p>
          <h2 className="onboarding-title">{step.title}</h2>
          <p className="onboarding-text">{step.content}</p>
        </div>

        {/* Navigation */}
        <div className="onboarding-nav">
          {currentStep > 0 ? (
            <button className="onboarding-btn onboarding-btn--secondary" onClick={handlePrev}>
              Back
            </button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <div className="onboarding-actions">
              <button className="onboarding-btn onboarding-btn--secondary" onClick={handleExploreManually}>
                Explore Manually
              </button>
              <button className="onboarding-btn onboarding-btn--primary" onClick={handleStartWatching}>
                Start Journey
              </button>
            </div>
          ) : (
            <button className="onboarding-btn onboarding-btn--primary" onClick={handleNext}>
              Next
            </button>
          )}
        </div>

        {/* Skip link */}
        {!isLastStep && (
          <button className="onboarding-skip" onClick={handleExploreManually}>
            Skip intro
          </button>
        )}
      </div>
    </div>
  );
}

export default OnboardingModal;
