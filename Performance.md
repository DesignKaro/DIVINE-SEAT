# The Lotus Seat / Divine Seat — Performance & Engineering Budget

Technical benchmarks, WebGL optimization standards, asset compression pipelines, Next.js bundle budgets, and Core Web Vitals guarantees.

---

## 1. Core Web Vitals & SLA Benchmarks

```
┌─────────────────────────────────────────────────────────────┐
│                    TARGET SLA BENCHMARKS                    │
├──────────────────────────┬──────────────┬───────────────────┤
│ Metric                   │ Target       │ Hard Ceiling      │
├──────────────────────────┼──────────────┼───────────────────┤
│ LCP (Largest Contentful) │ < 1.1s       │ 1.8s              │
│ INP (Interaction Next)   │ < 40ms       │ 80ms              │
│ CLS (Cumulative Shift)   │ 0.000        │ 0.020             │
│ FID (First Input Delay)  │ < 15ms       │ 30ms              │
│ TTFB (Time to First Byte)│ < 180ms      │ 350ms             │
│ Framerate (WebGL/Scroll) │ 60 / 120 FPS │ 58 FPS minimum    │
└──────────────────────────┴──────────────┴───────────────────┘
```

---

## 2. 3D WebGL & Canvas Optimization Standards

### 2.1 Geometry & Polygon Limits
- **Max Total Polygons per Scene**: `< 24,000 Triangles`
- **Cork Base Geometry**: Subdivided cylinder with chamfered edges (`segmentsRadial: 48`, `segmentsHeight: 8`).
- **Latex Cushion Geometry**: Parametric contoured loft with curved ergonomic indentation (`segmentsRadial: 48`).
- **Total Draw Calls**: `< 12 per Frame`.

### 2.2 Texture Memory & Shaders
- **Procedural Shaders vs Heavy Textures**: Use procedural WebGL noise shaders for micro cork grain and linen weave rather than 4K heavy PNG/JPG textures.
- **Max Texture Resolution**: `1024x1024` with BC7 / KTX2 GPU compression where static textures are required.
- **Anisotropic Filtering**: Clamped to `4x` on desktop, `2x` on mobile.

### 2.3 Frame Rate & Device Adaptability
```typescript
// Dynamic Device Pixel Ratio clamping for battery & GPU preservation
const dpr = Math.min(window.devicePixelRatio || 1, 2);
renderer.setPixelRatio(dpr);

// Pause render loop when canvas is out of viewport (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    isCanvasInView = entry.isIntersecting;
  });
}, { threshold: 0.05 });
```

### 2.4 Lifecycle & Memory Disposal
To prevent WebGL memory leaks during client-side route navigation:
- Explicitly dispose all geometries: `geometry.dispose()`.
- Explicitly dispose all materials: `material.dispose()`.
- Explicitly dispose textures: `texture.dispose()`.
- Clear WebGL context: `renderer.dispose()`, `renderer.forceContextLoss()`.

---

## 3. Image Compression & Modern Media Pipeline

### 3.1 Next-Gen Asset Formats
- **Hero Background**: Ultra-optimized AVIF (`hero_bg.avif`), target `< 350 KB` with 4:4:4 chroma subsampling for crisp luxury gradients.
- **Product Photographs**: Responsive WebP + AVIF `<picture>` elements with fallback JPG.
- **Vector Graphics**: Clean, hand-optimized inline SVGs for icons and brand seals.

### 3.2 Responsive Sizing Table
| Asset Role | Desktop (1440px+) | Tablet (768px–1024px) | Mobile (<768px) | Target Size |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Media** | `1920x1080` AVIF | `1200x800` AVIF | `800x600` AVIF | `< 320 KB` |
| **Product Closeups** | `1200x900` WebP | `800x600` WebP | `600x450` WebP | `< 110 KB` |
| **Lifestyle Editorial**| `1400x900` WebP | `900x600` WebP | `600x400` WebP | `< 140 KB` |

---

## 4. Next.js & Frontend Architecture Budget

### 4.1 Bundle Size Limits
- **First Load JS (Shared & Page)**: `< 115 KB (Gzipped)`
- **Three.js Chunking**: Dynamically imported via `next/dynamic` with `ssr: false` to ensure zero initial server rendering penalty:
  ```typescript
  const Product3DViewer = dynamic(
    () => import('@/components/Product3DViewer'),
    { 
      ssr: false, 
      loading: () => <div className="h-[500px] flex items-center justify-center bg-transparent" /> 
    }
  );
  ```

### 4.2 Font Optimization
- **Glacier (Display Serif)**: Subdivided OTF/WOFF2 font containing Latin glyph set only; preloaded via `<link rel="preload">`.
- **Manrope (Sans-Serif)**: Loaded via `next/font/google` with `display: 'swap'` and `subsets: ['latin']`.

### 4.3 CSS & Tailwind Optimization
- Zero unused CSS via Tailwind tree-shaking.
- GPU acceleration enforced via `transform: translate3d(0,0,0)` and `will-change` on dynamic transitions.
