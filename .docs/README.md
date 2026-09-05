# The Divine Lotus — Technical Documentation Hub

Welcome to the comprehensive technical documentation for **The Divine Lotus** (`https://thedivinelotus.org`).

This documentation repository covers the complete architecture, engineering design, interactive 3D systems, performance optimizations, SEO & agentic browsing specifications, WordPress telemetry integration, and production VPS deployment workflows.

---

## Documentation Index

| Guide | Description | Key Modules Covered |
| :--- | :--- | :--- |
| **[01. Architecture Overview](./01-architecture-overview.md)** | Tech stack, directory layout, routing, and data flow. | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| **[02. Design System & Brand Identity](./02-design-system.md)** | Typography, luxury color tokens, glassmorphism, and motion. | Glacier, Manrope, Cormorant Garamond, Tokens |
| **[03. Interactive Systems & 3D Customizer](./03-interactive-features.md)** | 200-frame 3D rotation player, palette builder, and bespoke customizer. | Canvas, Framer Motion, Drag scrub, Hex palette |
| **[04. Performance & Image Optimization](./04-performance-optimization.md)** | Sharp automation pipeline, AVIF/WebP encoding, and 88% payload reduction. | Sharp, AVIF, Lighthouse 100/100, Core Web Vitals |
| **[05. SEO, Social & Agentic Browsing](./05-seo-and-social.md)** | JSON-LD schema, 1200×630 OG social cards, RFC 9309 robots, and `llms.txt`. | Open Graph, Twitter Cards, Sitemap, llmstxt.org |
| **[06. Analytics & WordPress Consent Plugin](./06-analytics-and-wordpress-plugin.md)** | Google tag (GA4), Consent Mode v2 sync, and custom WP telemetry plugin. | gtag.js, REST API, MySQL, Device fingerprinting |
| **[07. Deployment & DevOps Guide](./07-deployment-and-devops.md)** | Hostinger VPS setup, PM2 process management, Nginx proxy, and SSL. | PM2, Nginx, Hostinger VPS, GitHub workflow |

---

## Quick Reference Commands

### Local Development
```bash
npm run dev        # Launch Turbopack dev server on http://localhost:3000
npm run build      # Execute static & production build verification
npm run lint       # Run ESLint analysis
```

### Optimize Asset Images
```bash
node scripts/optimize-images.mjs  # Downsample & compress images using sharp
```

### Production VPS Deployment
```bash
cd /var/www/divine-lotus && git pull origin main && npm run build && pm2 reload divine-lotus
```

---

## Canonical Resources
- **Production Website**: [https://thedivinelotus.org](https://thedivinelotus.org)
- **Source Code Repository**: [https://github.com/DesignKaro/DIVINE-SEAT](https://github.com/DesignKaro/DIVINE-SEAT)
- **Google Analytics Stream**: `G-ZSSGEY2MH8`
- **AI Agent Context**: [https://thedivinelotus.org/llms.txt](https://thedivinelotus.org/llms.txt)
- **Sitemap**: [https://thedivinelotus.org/sitemap.xml](https://thedivinelotus.org/sitemap.xml)
