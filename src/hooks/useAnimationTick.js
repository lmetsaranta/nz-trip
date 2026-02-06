import { useState, useEffect, useRef, useCallback } from "react";

const PAUSE_BETWEEN_DAYS_MS = 2000;  // 2 second pause between days

/**
 * Animation loop hook that ticks progress from 0 to 1 over the given duration.
 * @param {boolean} isPlaying - Whether animation is active
 * @param {number} currentDay - Current day (used to reset on day change)
 * @param {number} durationMs - Duration in milliseconds for this day
 * @param {function} onDayComplete - Called when progress reaches 1
 * @param {number} speedMultiplier - Speed multiplier (0.5, 1, 2) - higher = faster
 * @returns {number} progress - Value from 0 to 1
 */
export function useAnimationTick(isPlaying, currentDay, durationMs, onDayComplete, speedMultiplier = 1) {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const onDayCompleteRef = useRef(onDayComplete);
  const durationRef = useRef(durationMs);
  const speedRef = useRef(speedMultiplier);

  onDayCompleteRef.current = onDayComplete;
  durationRef.current = durationMs;
  speedRef.current = speedMultiplier;

  // Reset progress when day changes
  useEffect(() => {
    setProgress(0);
    startTimeRef.current = null;
  }, [currentDay]);

  const tick = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const duration = (durationRef.current || 5000) / speedRef.current;
    const p = Math.min(elapsed / duration, 1);
    setProgress(p);

    if (p >= 1) {
      // Pause before moving to next day
      pauseTimeoutRef.current = setTimeout(() => {
        onDayCompleteRef.current();
      }, PAUSE_BETWEEN_DAYS_MS);
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = null;
      }
    };
  }, [isPlaying, currentDay, tick]);

  return progress;
}
