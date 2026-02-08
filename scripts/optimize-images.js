/**
 * Image Optimization Script
 *
 * Uses sharp to:
 * - Resize originals to max 1920px width (web/)
 * - Generate 400px thumbnails (thumbs/)
 * - Convert to WebP format for smaller file sizes
 * - Preserve originals (not moved, just processed)
 *
 * Usage: npm run optimize-images
 */

import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

const SOURCE_DIR = "public/images/stops";
const WEB_DIR = "public/images/web";
const THUMBS_DIR = "public/images/thumbs";

const WEB_MAX_WIDTH = 1920;
const THUMB_WIDTH = 400;

// Supported input formats
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

async function getImageFiles(dir) {
  const files = await fs.readdir(dir);
  return files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
  });
}

async function optimizeImage(inputPath, outputPath, maxWidth) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Only resize if larger than maxWidth
  const resizeOptions =
    metadata.width > maxWidth ? { width: maxWidth, withoutEnlargement: true } : {};

  await image
    .resize(resizeOptions)
    .webp({ quality: 80 })
    .toFile(outputPath);
}

async function processImages() {
  console.log("Starting image optimization...\n");

  // Ensure output directories exist
  await ensureDir(WEB_DIR);
  await ensureDir(THUMBS_DIR);

  // Get all image files
  const files = await getImageFiles(SOURCE_DIR);
  console.log(`Found ${files.length} images to process.\n`);

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const webOutputPath = path.join(WEB_DIR, `${baseName}.webp`);
    const thumbOutputPath = path.join(THUMBS_DIR, `${baseName}.webp`);

    try {
      // Check if outputs already exist and are newer than source
      const inputStat = await fs.stat(inputPath);
      let webExists = false;
      let thumbExists = false;

      try {
        const webStat = await fs.stat(webOutputPath);
        const thumbStat = await fs.stat(thumbOutputPath);
        webExists = webStat.mtime > inputStat.mtime;
        thumbExists = thumbStat.mtime > inputStat.mtime;
      } catch {
        // Files don't exist, need to process
      }

      if (webExists && thumbExists) {
        skipped++;
        continue;
      }

      // Generate web version (max 1920px)
      if (!webExists) {
        await optimizeImage(inputPath, webOutputPath, WEB_MAX_WIDTH);
      }

      // Generate thumbnail (400px)
      if (!thumbExists) {
        await optimizeImage(inputPath, thumbOutputPath, THUMB_WIDTH);
      }

      processed++;
      console.log(`  Processed: ${file}`);
    } catch (err) {
      console.error(`  Error processing ${file}: ${err.message}`);
    }
  }

  console.log(`\nDone!`);
  console.log(`  Processed: ${processed}`);
  console.log(`  Skipped (up-to-date): ${skipped}`);
  console.log(`\nOutputs:`);
  console.log(`  Web images (${WEB_MAX_WIDTH}px max): ${WEB_DIR}/`);
  console.log(`  Thumbnails (${THUMB_WIDTH}px): ${THUMBS_DIR}/`);
}

processImages().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
