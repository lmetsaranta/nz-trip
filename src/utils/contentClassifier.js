/**
 * Content classifier utility for determining how to display stops
 */

/**
 * Determines if a stop deserves the full scrollytelling treatment
 * @param {string} stopId - The stop identifier
 * @param {string} storyText - The story content for the stop
 * @param {number} imageCount - Number of images available for the stop
 * @returns {boolean} True if the stop should get the scrollytelling page
 */
export function isStoryWorthy(stopId, storyText, imageCount) {
  return storyText.length > 400 && imageCount >= 3;
}

/**
 * Splits story text into paragraphs for scrollytelling
 * @param {string} storyText - The full story text
 * @returns {string[]} Array of paragraph strings
 */
export function splitIntoParagraphs(storyText) {
  if (!storyText) return [];

  return storyText
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
}

/**
 * Calculates image layout based on available images and paragraph count
 * @param {number} imageCount - Total images available
 * @param {number} paragraphCount - Number of paragraphs in story
 * @returns {Array<{type: string, indices: number[]}>} Layout configuration
 */
export function calculateImageLayout(imageCount, paragraphCount) {
  if (imageCount <= 1) return [];

  const layouts = [];
  let imageIndex = 1; // Start from 1 since 0 is hero

  // Distribute remaining images between paragraphs
  const imagesAfterHero = imageCount - 1;
  const gaps = Math.max(paragraphCount - 1, 1);

  for (let i = 0; i < gaps && imageIndex < imageCount; i++) {
    const remainingImages = imageCount - imageIndex;
    const remainingGaps = gaps - i;

    // Vary layout types for visual interest
    if (remainingImages >= 2 && i % 3 === 1) {
      // Side by side layout every 3rd position
      layouts.push({
        afterParagraph: i,
        type: 'side-by-side',
        indices: [imageIndex, imageIndex + 1]
      });
      imageIndex += 2;
    } else if (remainingImages >= 1) {
      // Single image
      layouts.push({
        afterParagraph: i,
        type: 'single',
        indices: [imageIndex]
      });
      imageIndex += 1;
    }
  }

  return layouts;
}
