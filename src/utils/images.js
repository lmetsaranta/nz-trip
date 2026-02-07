/**
 * Get the primary image URL for a stop.
 *
 * @param {Object} stop - The stop object
 * @returns {string} - Image URL
 */
export function getStopImageUrl(stop) {
  if (stop.image) {
    return stop.image;
  }
  return `/images/stops/${stop.id}.jpg`;
}

/**
 * Get all potential local image URLs for a stop.
 * Naming convention: {stop-id}.jpg, {stop-id}-2.jpg, {stop-id}-3.jpg, etc.
 *
 * @param {string} stopId - The stop ID
 * @param {number} maxImages - Maximum images to check (default 10)
 * @returns {string[]} - Array of potential image paths
 */
export function getLocalImagePaths(stopId, maxImages = 10) {
  const paths = [`/images/stops/${stopId}.jpg`];
  for (let i = 2; i <= maxImages; i++) {
    paths.push(`/images/stops/${stopId}-${i}.jpg`);
  }
  return paths;
}

/**
 * Get the Unsplash fallback URL for a stop.
 *
 * @param {Object} stop - The stop object
 * @returns {string} - Unsplash image URL
 */
export function getUnsplashFallbackUrl(stop) {
  return `https://source.unsplash.com/800x600/?${encodeURIComponent(stop.name + " new zealand")}`;
}

/**
 * Probe which local images exist for a stop.
 * Returns a promise that resolves to an array of valid image URLs.
 *
 * @param {string} stopId - The stop ID
 * @returns {Promise<string[]>} - Array of existing image URLs
 */
export async function probeLocalImages(stopId) {
  const paths = getLocalImagePaths(stopId);
  const validImages = [];

  for (const path of paths) {
    try {
      const exists = await checkImageExists(path);
      if (exists) {
        validImages.push(path);
      } else {
        // Stop probing after first missing image in sequence
        break;
      }
    } catch {
      break;
    }
  }

  return validImages;
}

/**
 * Check if an image exists at the given URL.
 *
 * @param {string} url - Image URL to check
 * @returns {Promise<boolean>} - Whether the image exists
 */
function checkImageExists(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
