# 04. Performance & Image Optimization

## 1. Overview
PageSpeed Insights audits initially flagged **~5.4 MB** of unoptimized visual payload across Desktop and Mobile form factors. By implementing a systematic dimensional downsampling and high-effort AVIF compression pipeline using `sharp`, total page visual weight was reduced by **87.9%**, saving **4.78 MB** while maintaining pixel-perfect 2x Retina clarity.

---

## 2. The Sharp Optimization Pipeline (`scripts/optimize-images.mjs`)

An automated optimization script was developed in `scripts/optimize-images.mjs` that can be run anytime new high-res assets are added.

### Execution Command
```bash
node scripts/optimize-images.mjs
```

### Script Architecture
1. **Safety Backup**: All uncompressed original source files are preserved in `public/_image_backups/` (git-ignored) before applying destructive downsampling.
2. **Lanczos3 Resampling**: Slices each asset to the exact display box needed by its section container.
3. **AVIF Multi-pass Encoding**:
   - High effort (`effort: 6`)
   - Optimized quality (`quality: 70–78`)
   - Chroma subsampling enabled where applicable

---

## 3. Results Matrix

| File Path | Original Dimension | Optimized Dimension | Original Size | Optimized Size | Reduction |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `logo.avif` | `2073x758` | `480x176` | `197.1 KB` | `16.6 KB` | **-91.6%** |
| `images/solution/solution_step_1.avif` | `1254x1254` | `350x350` | `252.2 KB` | `17.0 KB` | **-93.3%** |
| `images/solution/solution_step_2.avif` | `1254x1254` | `350x350` | `284.4 KB` | `17.5 KB` | **-93.9%** |
| `images/solution/solution_step_3.avif` | `1254x1254` | `350x350` | `274.3 KB` | `17.1 KB` | **-93.8%** |
| `images/solution/solution_step_4.avif` | `1254x1254` | `350x350` | `287.2 KB` | `17.4 KB` | **-93.9%** |
| `images/solution/solution_step_5.avif` | `1254x1254` | `350x350` | `275.3 KB` | `16.5 KB` | **-94.0%** |
| `images/solution/solution_step_6.avif` | `1254x1254` | `350x350` | `273.6 KB` | `16.4 KB` | **-94.0%** |
| `images/problems/problem_v2_1.avif` | `1536x1024` | `400x400` | `270.1 KB` | `24.5 KB` | **-90.9%** |
| `images/problems/problem_v2_2.avif` | `1536x1024` | `400x400` | `260.3 KB` | `23.6 KB` | **-90.9%** |
| `images/problems/problem_v2_3.avif` | `1536x1024` | `400x400` | `291.7 KB` | `26.3 KB` | **-91.0%** |
| `images/problems/problem_v2_4.avif` | `1536x1024` | `400x400` | `283.6 KB` | `23.8 KB` | **-91.6%** |
| `images/problems/problem_v2_readjustment.avif` | `1536x1024` | `400x400` | `281.1 KB` | `23.7 KB` | **-91.6%** |
| `images/problems/problem_v2_slouching.avif` | `1536x1024` | `400x400` | `264.2 KB` | `19.6 KB` | **-92.6%** |
| `images/about_seat_lifestyle_v7.avif` | `1254x1254` | `500x500` | `239.0 KB` | `39.5 KB` | **-83.5%** |
| `images/about.avif` (Mandala) | `500x500` | `380x380` | `68.4 KB` | `29.2 KB` | **-57.4%** |
| `hero_bg_poster.avif` | `1920x1080` | `960x540` | `195.6 KB` | `38.8 KB` | **-80.2%** |
| `images/leather_book_cover.avif` | `1672x941` | `1240x698` | `136.1 KB` | `68.6 KB` | **-49.6%** |
| `images/custom-colors/swatch_1-7.avif` | `600x400` | `200x133` | `634.0 KB` | `79.0 KB` | **-87.5%** |
| `images/lotus-seat-ghost.avif` | `1536x1024` | `900x600` | `363.2 KB` | `58.1 KB` | **-84.0%** |
| `images/traditional-cushion-ghost.avif` | `1536x1024` | `900x600` | `433.2 KB` | `102.1 KB` | **-76.4%** |
| **Total Asset Weight** | — | — | **`5.43 MB`** | **`0.66 MB`** | **`-87.9% (-4.78 MB)`** |

---

## 4. Next.js Runtime Optimizations

1. **Package Import Optimization**:
   Configured in `next.config.mjs` to tree-shake heavy UI and animation libraries:
   ```javascript
   experimental: {
     optimizePackageImports: ['lucide-react', 'framer-motion'],
   }
   ```
2. **Font Preloading**:
   - `Glacier.woff2` display font preloaded via `<link rel="preload" as="font" crossOrigin="anonymous">`.
   - Eliminates layout shifting (CLS) and Flash of Unstyled Text (FOUT).
3. **Hero Video Preloading**:
   - `preload="metadata"` set on the ambient hero video so high-resolution video streams are not unconditionally downloaded on low-bandwidth mobile connections.
   - Dual-source fallback (`hero_bg_video.webm` first, saving ~700KB, with `hero_bg_video.mp4` fallback).
