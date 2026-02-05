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
