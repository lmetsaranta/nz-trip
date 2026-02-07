// Supported image extensions (in order of preference)
// Note: HEIC not supported by browsers - convert to JPG/PNG first
const IMAGE_EXTENSIONS = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG', '.webp', '.WEBP'];

// Base path for the app (must match vite.config.js)
const BASE_PATH = import.meta.env.BASE_URL || '/nz-trip/';

/**
 * Get the primary image URL for a stop.
 * Note: This returns the .jpg path; actual probing handles other formats.
 *
 * @param {Object} stop - The stop object
 * @returns {string} - Image URL
 */
export function getStopImageUrl(stop) {
  if (stop.image) {
    return stop.image;
  }
  return `${BASE_PATH}images/stops/${stop.id}.jpg`;
}

/**
 * Get all potential local image URLs for a stop.
 * Naming convention: {stop-id}.ext, {stop-id}-2.ext, {stop-id}-3.ext, etc.
 * Checks multiple file extensions for each image number.
 *
 * @param {string} stopId - The stop ID
 * @param {number} maxImages - Maximum images to check (default 10)
 * @returns {string[]} - Array of potential image paths
 */
export function getLocalImagePaths(stopId, maxImages = 10) {
  const paths = [];

  // First image: {stop-id}.ext
  for (const ext of IMAGE_EXTENSIONS) {
    paths.push(`${BASE_PATH}images/stops/${stopId}${ext}`);
  }

  // Additional images: {stop-id}-2.ext, {stop-id}-3.ext, etc.
  for (let i = 2; i <= maxImages; i++) {
    for (const ext of IMAGE_EXTENSIONS) {
      paths.push(`${BASE_PATH}images/stops/${stopId}-${i}${ext}`);
    }
  }

  return paths;
}

/**
 * Get a placeholder fallback URL for a stop.
 * Uses placehold.co with stop name.
 *
 * @param {Object} stop - The stop object
 * @returns {string} - Placeholder image URL
 */
export function getUnsplashFallbackUrl(stop) {
  // source.unsplash.com is deprecated - use placeholder instead
  return `https://placehold.co/800x600/1a1a2e/eaeaea?text=${encodeURIComponent(stop.name)}`;
}

/**
 * Probe which local images exist for a stop.
 * Returns a promise that resolves to an array of valid image URLs.
 * Checks multiple extensions for each image number.
 *
 * @param {string} stopId - The stop ID
 * @param {number} maxImages - Maximum images to check (default 10)
 * @returns {Promise<string[]>} - Array of existing image URLs
 */
export async function probeLocalImages(stopId, maxImages = 10) {
  const validImages = [];

  // Check each image number (1, 2, 3, etc.)
  for (let imageNum = 1; imageNum <= maxImages; imageNum++) {
    let foundForThisNumber = false;

    // Try each extension for this image number
    for (const ext of IMAGE_EXTENSIONS) {
      const path = imageNum === 1
        ? `${BASE_PATH}images/stops/${stopId}${ext}`
        : `${BASE_PATH}images/stops/${stopId}-${imageNum}${ext}`;

      try {
        const exists = await checkImageExists(path);
        if (exists) {
          validImages.push(path);
          foundForThisNumber = true;
          break; // Found this image number, move to next
        }
      } catch {
        // Continue to next extension
      }
    }

    // Stop probing after first missing image number in sequence
    if (!foundForThisNumber) {
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
