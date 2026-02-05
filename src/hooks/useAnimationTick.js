import { useState, useEffect, useRef, useCallback } from "react";
import { TIMELINE_CONFIG } from "../data/trip";

const PAUSE_BETWEEN_DAYS_MS = 800;

/**
 * Animation loop hook that ticks progress from 0 to 1 over msPerDay.
 * @param {boolean} isPlaying - Whether animation is active
 * @param {number} currentDay - Current day (used to reset on day change)
 * @param {function} onDayComplete - Called when progress reaches 1
 * @returns {number} progress - Value from 0 to 1
 */
export function useAnimationTick(isPlaying, currentDay, onDayComplete) {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const onDayCompleteRef = useRef(onDayComplete);
  onDayCompleteRef.current = onDayComplete;

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
    const p = Math.min(elapsed / TIMELINE_CONFIG.msPerDay, 1);
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
