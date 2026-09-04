import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const backupDir = path.resolve('public/_image_backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const tasks = [
  // 1. Logo
  {
    relPath: 'logo.avif',
    width: 480,
    height: null,
    fit: 'inside',
    quality: 80,
  },
  // 2. Solution steps
  ...[1, 2, 3, 4, 5, 6].map((i) => ({
    relPath: `images/solution/solution_step_${i}.avif`,
    width: 700,
    height: 700,
    fit: 'cover',
    quality: 75,
  })),
  // 3. Problems
  ...['problem_v2_1.avif', 'problem_v2_2.avif', 'problem_v2_3.avif', 'problem_v2_4.avif', 'problem_v2_readjustment.avif', 'problem_v2_slouching.avif'].map((name) => ({
    relPath: `images/problems/${name}`,
    width: 960,
    height: 640,
    fit: 'cover',
    quality: 76,
  })),
  // 4. About lifestyle
  {
    relPath: 'images/about_seat_lifestyle_v7.avif',
    width: 800,
    height: 800,
    fit: 'cover',
    quality: 75,
  },
  // 5. Leather book cover
  {
    relPath: 'images/leather_book_cover.avif',
    width: 1340,
    height: 754,
    fit: 'cover',
    quality: 75,
  },
  // 6. About mandala pattern
  {
    relPath: 'images/about.avif',
    width: 500,
    height: 500,
    fit: 'inside',
    quality: 75,
  },
  // 7. Hero bg poster
  {
    relPath: 'hero_bg_poster.avif',
    width: 1536,
    height: 864,
    fit: 'cover',
    quality: 75,
  },
  // 8. Custom color swatches
  ...[1, 2, 3, 4, 5, 6, 7].map((i) => ({
    relPath: `images/custom-colors/swatch_${i}.avif`,
    width: 200,
    height: 133,
    fit: 'cover',
    quality: 80,
  })),
  // 9. Comparison ghost watermarks
  {
    relPath: 'images/lotus-seat-ghost.avif',
    width: 900,
    height: 600,
    fit: 'cover',
    quality: 75,
  },
  {
    relPath: 'images/traditional-cushion-ghost.avif',
    width: 900,
    height: 600,
    fit: 'cover',
    quality: 75,
  },
];

async function run() {
  console.log('--- Starting Image Optimization ---');
  let totalOrig = 0;
  let totalNew = 0;

  for (const t of tasks) {
    const srcFile = path.resolve('public', t.relPath);
    if (!fs.existsSync(srcFile)) {
      console.warn(`File not found: ${t.relPath}, skipping.`);
      continue;
    }

    const backupFile = path.join(backupDir, t.relPath);
    const backupSubdir = path.dirname(backupFile);
    if (!fs.existsSync(backupSubdir)) {
      fs.mkdirSync(backupSubdir, { recursive: true });
    }

    // Only backup if not already backed up
    if (!fs.existsSync(backupFile)) {
      fs.copyFileSync(srcFile, backupFile);
    }

    const origStat = fs.statSync(backupFile);
    const origMeta = await sharp(backupFile).metadata();

    let transform = sharp(backupFile);
    if (t.width || t.height) {
      transform = transform.resize(t.width, t.height, {
        fit: t.fit || 'cover',
        withoutEnlargement: true,
      });
    }

    const outputBuffer = await transform
      .avif({
        quality: t.quality || 75,
        effort: 6,
      })
      .toBuffer();

    fs.writeFileSync(srcFile, outputBuffer);

    const newStat = fs.statSync(srcFile);
    const newMeta = await sharp(srcFile).metadata();

    totalOrig += origStat.size;
    totalNew += newStat.size;

    const savedKb = (origStat.size - newStat.size) / 1024;
    const pct = ((1 - newStat.size / origStat.size) * 100).toFixed(1);

    console.log(
      `✓ ${t.relPath}: ${origMeta.width}x${origMeta.height} (${(origStat.size / 1024).toFixed(1)} KB) -> ${newMeta.width}x${newMeta.height} (${(newStat.size / 1024).toFixed(1)} KB) | Saved: ${savedKb.toFixed(1)} KB (-${pct}%)`
    );
  }

  console.log('\n=======================================');
  console.log(`Original total: ${(totalOrig / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized total: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Net Savings: ${((totalOrig - totalNew) / 1024 / 1024).toFixed(2)} MB (-${((1 - totalNew / totalOrig) * 100).toFixed(1)}%)`);
  console.log('=======================================');
}

run().catch(console.error);
