import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles/onboarding.css";

const STEP_ICONS = ["🇳🇿", "🎛️", "▶️", "📍"];

function OnboardingModal({ onComplete, onStartAnimation, onStepChange }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { t } = useTranslation();

  const steps = [
    { key: "step1", icon: STEP_ICONS[0] },
    { key: "step2", icon: STEP_ICONS[1] },
    { key: "step3", icon: STEP_ICONS[2] },
    { key: "step4", icon: STEP_ICONS[3] },
  ];

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  // Notify parent of step changes
  useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={`onboarding-overlay ${isVisible && !isExiting ? "visible" : ""}`}>
      <div className={`onboarding-modal ${isVisible && !isExiting ? "visible" : ""}`}>
        {/* Progress dots */}
        <div className="onboarding-progress">
          {steps.map((_, i) => (
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
          <p className="onboarding-subtitle">{t(`onboarding.${step.key}.subtitle`)}</p>
          <h2 className="onboarding-title">{t(`onboarding.${step.key}.title`)}</h2>
          <p className="onboarding-text">{t(`onboarding.${step.key}.content`)}</p>
        </div>

        {/* Navigation */}
        <div className="onboarding-nav">
          {currentStep > 0 ? (
            <button className="onboarding-btn onboarding-btn--secondary" onClick={handlePrev}>
              {t("onboarding.back")}
            </button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <div className="onboarding-actions">
              <button className="onboarding-btn onboarding-btn--secondary" onClick={handleExploreManually}>
                {t("onboarding.exploreManually")}
              </button>
              <button className="onboarding-btn onboarding-btn--primary" onClick={handleStartWatching}>
                {t("onboarding.startJourney")}
              </button>
            </div>
          ) : (
            <button className="onboarding-btn onboarding-btn--primary" onClick={handleNext}>
              {t("onboarding.next")}
            </button>
          )}
        </div>

        {/* Skip link */}
        {!isLastStep && (
          <button className="onboarding-skip" onClick={handleExploreManually}>
            {t("onboarding.skipIntro")}
          </button>
        )}
      </div>
    </div>
  );
}

export default OnboardingModal;
