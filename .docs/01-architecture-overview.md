# 01. Architecture Overview

## 1. System Vision
The Divine Lotus web platform is built as an ultra-high performance, editorial luxury e-commerce showcase and 3D product visualizer for **The Lotus Seat** — an architectural ergonomic meditation foundation crafted with sustainable Portuguese cork and natural botanical latex.

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | `16.3.2` | SSR/SSG hybrid architecture, static generation, metadata routing |
| **UI Library** | React | `19.2.8` | Component rendering, concurrent transitions, hooks |
| **Language** | TypeScript | `^5.0` | Strict type safety, interface contracts |
| **Styling** | Tailwind CSS (PostCSS plugin) | `^4.0` | Modern utility classes, CSS variables, zero runtime CSS |
| **Animations** | Framer Motion | `^13.1.1` | Hardware-accelerated spring animations, scroll triggers, layout morphs |
| **Icons** | Lucide React | `^1.33.0` | Crisp, scalable SVG iconography |
| **Image Processing** | Sharp | Node native | Downsampling, Lanczos3 filtering, AVIF/WebP encoding |
| **Process Manager** | PM2 | Production | Node.js clustering, background daemon, instant hot-reloads |
| **Web Server** | Nginx | Hostinger VPS | Reverse proxy (`127.0.0.1:3001`), SSL termination, gzip/brotli compression |

---

## 3. Directory Layout

```
/Users/abhisheksingh/Desktop/3d/
├── .docs/                          # Complete technical documentation hub
├── .github/workflows/              # CI/CD workflows
├── public/                         # Static assets served at root
│   ├── fonts/                      # Self-hosted Glacier.woff2 & Glacier-Bold.woff2
│   ├── images/                     # Photographic assets, materials, solution steps
│   │   ├── custom-colors/          # Swatch color preview images
│   │   ├── frames/                 # 200 high-res frames for 3D rotation player
│   │   ├── materials/              # Cork, latex, velvet material macro shots
│   │   ├── problems/               # Problem carousel photos
│   │   └── solution/               # Biomechanical solution feature photos
│   ├── videos/                     # Ambient hero background video (WebM & MP4)
│   ├── favicon-48.png              # Multi-resolution favicons
│   ├── llms.txt                    # Standardized AI agent context per llmstxt.org
│   ├── logo.avif                   # Optimized brand logo mark
│   ├── og-image.jpg / png          # 1200x630 Open Graph preview cards
│   ├── robots.txt                  # RFC 9309 search engine directives
│   └── sitemap.xml                 # XML sitemap index
├── scripts/                        # Administrative and build automation scripts
│   └── optimize-images.mjs         # Sharp-based image optimization pipeline
├── src/
│   ├── app/                        # Next.js 16 App Router hierarchy
│   │   ├── contact/                # Contact & support page
│   │   ├── cookie-policy/          # Cookie policy & consent management
│   │   ├── disclaimer/             # Ergonomic sitting & medical disclaimer
│   │   ├── privacy-policy/         # Privacy policy & GDPR compliance
│   │   ├── refund-policy/          # 30-day trial & refund policy
│   │   ├── shipping-policy/        # Domestic & international freight terms
│   │   ├── terms/                  # Terms of service
│   │   ├── warranty-policy/        # 5-year structural craft warranty
│   │   ├── globals.css             # Design tokens, typography variables & utilities
│   │   ├── layout.tsx              # Root HTML layout, Google tag, Schema & CookieBanner
│   │   ├── page.tsx                # Single-page narrative showcase
│   │   └── robots.ts               # Programmatic fallback robots route
│   └── components/                 # Isolated, reusable presentation components
│       ├── AboutFoundationSection.tsx
│       ├── AncientWisdomSection.tsx
│       ├── BaseFeatureCard.tsx
│       ├── BiomechanicalBenefitsSection.tsx
│       ├── BiomechanicalChainSection.tsx
│       ├── ComparisonSection.tsx
│       ├── CookieBanner.tsx        # Consent banner & WordPress sync
│       ├── CustomizeModal.tsx      # Bespoke customizer & color extractor
│       ├── FinalCtaSection.tsx
│       ├── Footer.tsx              # Brand footer & social channel links
│       ├── Header.tsx              # Glassmorphic header with scroll spy
│       ├── HeroSection.tsx         # Video hero with Glacier kinetic typography
│       ├── JsonLd.tsx              # Structured data injector
│       ├── PricingSection.tsx      # Standard vs Custom purchase tiers
│       ├── ProblemsSection.tsx     # Contoured problem card carousel
│       ├── RealThingSection.tsx    # 200-frame interactive 3D rotation player
│       ├── RecaptchaProvider.tsx
│       └── SolutionSection.tsx     # 6-step anatomical solution showcase
├── wordpress-plugin/               # Standalone WordPress Consent DB plugin
│   └── divine-lotus-consent/       # PHP plugin files & database tables
├── ecosystem.config.cjs            # PM2 production configuration
├── next.config.mjs                 # Next.js production compiler settings
└── package.json                    # Project dependencies & npm scripts
```

---

## 4. Routing & Page Architecture

The application implements a narrative single-page experience at `/` with dedicated legal and support pages:

```mermaid
graph TD
  A[Root Layout: layout.tsx] --> B[Homepage: page.tsx]
  A --> C[Legal & Policy Sub-pages]
  
  B --> H1[HeroSection]
  B --> H2[AncientWisdomSection]
  B --> H3[ProblemsSection]
  B --> H4[SolutionSection]
  B --> H5[RealThingSection - 3D Player]
  B --> H6[BiomechanicalChainSection]
  B --> H7[AboutFoundationSection]
  B --> H8[ComparisonSection]
  B --> H9[PricingSection]
  B --> H10[FinalCtaSection]
  B --> H11[Footer]

  C --> L1[/shipping-policy]
  C --> L2[/warranty-policy]
  C --> L3[/refund-policy]
  C --> L4[/privacy-policy]
  C --> L5[/cookie-policy]
  C --> L6[/terms]
  C --> L7[/disclaimer]
  C --> L8[/contact]
```

---

## 5. State Management & Data Flow

- **Global Cookie State**: Persistent in browser `localStorage` under `divine_lotus_cookie_consent_v1`, synchronized with custom WordPress REST API telemetry endpoint (`/wp-json/divine/v1/consent`) and Google Tag Consent Mode v2.
- **Customizer Modal State**: Managed with React state in `CustomizeModal.tsx` and triggered via lightweight custom event dispatches (`open-cookie-settings`, `open-customize-modal`).
- **3D Frame Player State**: Rendered directly onto an HTML5 `<canvas>` using preloaded image arrays, indexed via scrub thresholds, touch drags, and cursor coordinates.
