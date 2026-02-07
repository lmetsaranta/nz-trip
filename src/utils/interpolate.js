/**
 * Linearly interpolate a position along a polyline of waypoints.
 * @param {Array<[number, number]>} waypoints - Array of [lat, lng] pairs
 * @param {number} progress - Value from 0 to 1
 * @returns {[number, number]|null} Interpolated [lat, lng]
 */
export function interpolatePosition(waypoints, progress) {
  if (!waypoints || waypoints.length === 0) return null;
  if (waypoints.length === 1 || progress <= 0) return waypoints[0];
  if (progress >= 1) return waypoints[waypoints.length - 1];

  const segments = [];
  let totalDist = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const dLat = waypoints[i][0] - waypoints[i - 1][0];
    const dLng = waypoints[i][1] - waypoints[i - 1][1];
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    segments.push(dist);
    totalDist += dist;
  }

  if (totalDist === 0) return waypoints[0];

  let targetDist = progress * totalDist;
  let accumulated = 0;

  for (let i = 0; i < segments.length; i++) {
    if (accumulated + segments[i] >= targetDist) {
      const segProgress = (targetDist - accumulated) / segments[i];
      const lat =
        waypoints[i][0] + segProgress * (waypoints[i + 1][0] - waypoints[i][0]);
      const lng =
        waypoints[i][1] + segProgress * (waypoints[i + 1][1] - waypoints[i][1]);
      return [lat, lng];
    }
    accumulated += segments[i];
  }

  return waypoints[waypoints.length - 1];
}

/**
 * Get the trail positions from start up to the current progress point.
 * Used for drawing a line that follows behind a moving vehicle.
 * @param {Array<[number, number]>} waypoints
 * @param {number} progress - Value from 0 to 1
 * @returns {Array<[number, number]>}
 */
export function getTrailPositions(waypoints, progress) {
  if (!waypoints || waypoints.length < 2 || progress <= 0) return [];
  if (progress >= 1) return waypoints;

  const segments = [];
  let totalDist = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const dLat = waypoints[i][0] - waypoints[i - 1][0];
    const dLng = waypoints[i][1] - waypoints[i - 1][1];
    segments.push(Math.sqrt(dLat * dLat + dLng * dLng));
    totalDist += segments[segments.length - 1];
  }

  if (totalDist === 0) return [waypoints[0]];

  const targetDist = progress * totalDist;
  let accumulated = 0;
  const trail = [waypoints[0]];

  for (let i = 0; i < segments.length; i++) {
    if (accumulated + segments[i] >= targetDist) {
      const t = (targetDist - accumulated) / segments[i];
      trail.push([
        waypoints[i][0] + t * (waypoints[i + 1][0] - waypoints[i][0]),
        waypoints[i][1] + t * (waypoints[i + 1][1] - waypoints[i][1]),
      ]);
      return trail;
    }
    trail.push(waypoints[i + 1]);
    accumulated += segments[i];
  }

  return waypoints;
}

/**
 * Calculate bearing (heading) in degrees at a given progress point along waypoints.
 * Returns angle in degrees where 0 = North, 90 = East, 180 = South, 270 = West.
 * @param {Array<[number, number]>} waypoints - Array of [lat, lng] pairs
 * @param {number} progress - Value from 0 to 1
 * @returns {number} Bearing in degrees (0-360)
 */
export function calculateBearing(waypoints, progress) {
  if (!waypoints || waypoints.length < 2) return 0;

  // Find the current segment based on progress
  const segments = [];
  let totalDist = 0;
  for (let i = 1; i < waypoints.length; i++) {
    const dLat = waypoints[i][0] - waypoints[i - 1][0];
    const dLng = waypoints[i][1] - waypoints[i - 1][1];
    segments.push(Math.sqrt(dLat * dLat + dLng * dLng));
    totalDist += segments[segments.length - 1];
  }

  if (totalDist === 0) return 0;

  const targetDist = Math.max(0, Math.min(1, progress)) * totalDist;
  let accumulated = 0;

  for (let i = 0; i < segments.length; i++) {
    if (accumulated + segments[i] >= targetDist || i === segments.length - 1) {
      // Calculate bearing for this segment
      const from = waypoints[i];
      const to = waypoints[i + 1];

      const dLat = to[0] - from[0];
      const dLng = to[1] - from[1];

      // Convert to bearing (0 = North, clockwise)
      // atan2 gives angle from positive X axis, counter-clockwise
      // We need angle from positive Y (North), clockwise
      const angleRad = Math.atan2(dLng, dLat);
      const angleDeg = (angleRad * 180) / Math.PI;

      // Normalize to 0-360
      return (angleDeg + 360) % 360;
    }
    accumulated += segments[i];
  }

  return 0;
}
