# Divine Lotus — Complete SEO Architecture & Implementation Checklist

A comprehensive, production-grade search engine optimization (SEO) roadmap tailored specifically for **Divine Lotus** built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## Table of Contents
1. [Core Domain & Metadata Architecture](#1-core-domain--metadata-architecture)
2. [Page-by-Page Metadata Specifications](#2-page-by-page-metadata-specifications)
3. [Social Graph (Open Graph & Twitter Cards)](#3-social-graph-open-graph--twitter-cards)
4. [Structured Data / JSON-LD Schemas](#4-structured-data--json-ld-schemas)
5. [Automated Sitemap (`sitemap.ts`) & Robots (`robots.ts`)](#5-automated-sitemap-sitemapts--robots-robotsts)
6. [Semantic HTML, Accessibility & Content Hierarchy](#6-semantic-html-accessibility--content-hierarchy)
7. [Asset & Image SEO Best Practices](#7-asset--image-seo-best-practices)
8. [Core Web Vitals & Technical SEO](#8-core-web-vitals--technical-seo)
9. [Actionable Implementation Checklist](#9-actionable-implementation-checklist)

---

## 1. Core Domain & Metadata Architecture

### 1.1 Base Configuration
- **Production URL**: `https://divinelotus.com` (or your chosen production domain)
- **Canonical Scheme**: `https://` (force HTTPS, enforce non-www or www redirect)
- **Default Locale**: `en_US`
- **Default Theme Color**: `#ECE7DE` / `#876540`
- **Robots Default**: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`

### 1.2 Global `metadataBase` in Root Layout
In `src/app/layout.tsx`, define `metadataBase` to automatically resolve all relative canonical URLs and social image previews:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://divinelotus.com'),
  title: {
    default: "Divine Lotus — Architectural Ergonomic Meditation Seat",
    template: "%s | Divine Lotus",
  },
  description: "Handcrafted ergonomic meditation seats engineered with Portuguese cork and botanical latex for effortless spinal alignment and pain-free sitting.",
  keywords: [
    "meditation seat",
    "the divine lotus",
    "ergonomic meditation cushion",
    "cork meditation base",
    "botanical latex cushion",
    "posture alignment seat",
    "mindfulness furniture",
    "luxury meditation chair",
  ],
  authors: [{ name: "Divine Lotus Sanctuary" }],
  creator: "Divine Lotus",
  publisher: "Divine Lotus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

---

## 2. Page-by-Page Metadata Specifications

### 2.1 Homepage (`/`)
- **Title**: `Divine Lotus — Architectural Ergonomic Meditation Seat`
- **Description**: `Experience effortless upright posture and deep stillness. Handcrafted with Portuguese cork, natural botanical latex, and organic linen.`
- **Target Keywords**: `ergonomic meditation seat, lotus posture chair, luxury floor meditation cushion, spinal alignment seat`
- **Canonical**: `https://divinelotus.com/`

### 2.2 Privacy Policy (`/privacy-policy`)
- **Title**: `Privacy Policy | Divine Lotus`
- **Description**: `Learn how Divine Lotus collects, manages, and protects your personal information with full GDPR and CCPA compliance.`
- **Robots**: `index, follow`
- **Canonical**: `https://divinelotus.com/privacy-policy`

### 2.3 Terms & Conditions (`/terms`)
- **Title**: `Terms & Conditions | Divine Lotus`
- **Description**: `Review our terms of sale, 3-year structural warranty, materials notice, and small-batch reservation policies.`
- **Robots**: `index, follow`
- **Canonical**: `https://divinelotus.com/terms`

### 2.4 Refund & Return Policy (`/refund-policy`)
- **Title**: `30-Day Practice Trial & Refund Policy | Divine Lotus`
- **Description**: `Explore our risk-free 30-day practice trial, zero restocking fees, prepaid return courier labels, and warranty claim procedures.`
- **Robots**: `index, follow`
- **Canonical**: `https://divinelotus.com/refund-policy`

### 2.5 Contact Concierge (`/contact`)
- **Title**: `Contact Concierge & Studio Support | Divine Lotus`
- **Description**: `Reach our private concierge desk for bespoke seat commissions, studio batch orders, ergonomic guidance, or customer care.`
- **Robots**: `index, follow`
- **Canonical**: `https://divinelotus.com/contact`

---

## 3. Social Graph (Open Graph & Twitter Cards)

### 3.1 Open Graph Specification
All pages should render complete Open Graph cards with high-definition visuals (`1200x630px`):

```typescript
openGraph: {
  title: "Divine Lotus — Architectural Ergonomic Meditation Seat",
  description: "Handcrafted Portuguese cork foundation and botanical latex core for effortless spinal alignment.",
  url: "https://divinelotus.com",
  siteName: "Divine Lotus",
  images: [
    {
      url: "/images/og-divine-lotus.jpg", // 1200x630
      width: 1200,
      height: 630,
      alt: "The Lotus Seat in contemporary sanctuary interior",
    },
  ],
  locale: "en_US",
  type: "website",
}
```

### 3.2 Twitter Cards
```typescript
twitter: {
  card: "summary_large_image",
  title: "Divine Lotus — Architectural Ergonomic Meditation Seat",
  description: "Where ancient wisdom meets modern ergonomics. Handcrafted for deep meditation.",
  images: ["/images/og-divine-lotus.jpg"],
  creator: "@divinelotus",
}
```

---

## 4. Structured Data / JSON-LD Schemas

Injecting rich snippets allows Google to display product stars, pricing, FAQ accordions, and site navigation sitelinks.

### 4.1 Organization & WebSite Schema (Global)
Place in `src/app/layout.tsx` or a dedicated `JsonLd` component:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://divinelotus.com/#organization",
      "name": "Divine Lotus",
      "url": "https://divinelotus.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://divinelotus.com/#logo",
        "url": "https://divinelotus.com/logo.png",
        "caption": "Divine Lotus"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "care@divinelotus.com",
        "contactType": "customer service",
        "availableLanguage": ["English", "German", "French"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://divinelotus.com/#website",
      "url": "https://divinelotus.com",
      "name": "Divine Lotus",
      "publisher": {
        "@id": "https://divinelotus.com/#organization"
      }
    }
  ]
}
```

### 4.2 Product Schema (Homepage / Product Detail)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "The Lotus Seat",
  "image": [
    "https://divinelotus.com/images/seat-stack.webp",
    "https://divinelotus.com/images/seat-profile.webp",
    "https://divinelotus.com/images/about_seat_lifestyle_v4.png"
  ],
  "description": "Architectural ergonomic meditation seat featuring a renewable cork base, natural botanical latex core, and removable organic linen cover.",
  "brand": {
    "@type": "Brand",
    "name": "Divine Lotus"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "249",
    "highPrice": "349",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Divine Lotus"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.95",
    "reviewCount": "128"
  }
}
```

### 4.3 FAQPage Schema (For `/` & FAQ Section)
Enables Google rich result collapsible accordions directly on Search Engine Result Pages (SERP):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes the dual-layer material unique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unlike memory foam that compresses flat or hard wood benches, our responsive botanical latex cushion absorbs sit-bone pressure with active rebound, anchored by a high-density renewable cork foundation."
      }
    },
    {
      "@type": "Question",
      "name": "How does it prevent tailbone ache and numbness?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The anatomical center relief groove provides zero-contact suspension for your tailbone, while contoured side slopes cradle the thighs to prevent nerve compression and numbness."
      }
    },
    {
      "@type": "Question",
      "name": "Which sitting postures work best with the Divine Seat?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Engineered for versatile comfort across Half Lotus (Ardha Padmasana), Full Lotus (Padmasana), Easy Cross-Legged (Sukhasana), Seiza kneeling, and Burmese postures."
      }
    }
  ]
}
```

---

## 5. Automated Sitemap (`sitemap.ts`) & Robots (`robots.ts`)

Next.js App Router allows generating native XML sitemaps and dynamic `robots.txt` directly through TypeScript files.

### 5.1 `src/app/sitemap.ts`
```typescript
// src/app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://divinelotus.com';
  const currentDate = new Date().toISOString();

  return [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
```

### 5.2 `src/app/robots.ts`
```typescript
// src/app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://divinelotus.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## 6. Semantic HTML, Accessibility & Content Hierarchy

### 6.1 Heading Tag Hierarchy Rules
- **Exactly one `<h1>` per page**:
  - Home: `The Divine Lotus — Architectural Ergonomic Meditation Seat`
  - Privacy Policy: `Privacy Policy`
  - Terms: `Terms & Conditions`
  - Refund Policy: `Refund & Return Policy`
  - Contact: `Contact Concierge & Studio Support`
- **Logical `<h2>` for section milestones**:
  - `01. Dual-Density Latex & Cork Core`
  - `Biomechanical Benefits`
  - `Artisan Craftsmanship & Sourcing`
  - `Frequently Asked Questions`
- **Sub-features in `<h3>` or `<h4>`**: Never skip levels (e.g. from `<h1>` directly to `<h4>`).

### 6.2 Semantic Landmarks
- Wrap navigation in `<nav aria-label="...">`.
- Wrap main content in `<main>`.
- Use `<header>` and `<footer>` tags.
- Use `<aside aria-label="Table of Contents">` for sticky policy index navigation.
- Ensure all interactive icon buttons have descriptive `aria-label` tags (e.g., `aria-label="Toggle Menu"`, `aria-label="Notify Me"`).

---

## 7. Asset & Image SEO Best Practices

### 7.1 Image Guidelines
1. **Next.js `<Image>` Component**:
   - Always define explicit `alt` text describing the subject and contextual value (e.g., `alt="Lotus seat dual density latex and cork foundation"` instead of `alt="seat"`).
   - Use `priority` only on above-the-fold Hero visuals (`/images/real-thing-bg-v2.png`).
   - Specify responsive `sizes` (e.g., `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`).
2. **Modern Image Formats**:
   - Serve WebP/AVIF format with high compression efficiency.
3. **Favicons & App Icons**:
   - Place `favicon.ico`, `apple-icon.png` (180x180), and `manifest.webmanifest` in `src/app/`.

---

## 8. Core Web Vitals & Technical SEO

### 8.1 Performance Targets
- **Largest Contentful Paint (LCP)**: `< 1.8s` (optimized hero imagery, font preloading)
- **Cumulative Layout Shift (CLS)**: `< 0.05` (fixed image aspect ratios, reserved canvas height)
- **Interaction to Next Paint (INP)**: `< 100ms` (lean React event listeners, smooth spring animations)

### 8.2 Font Preloading
Fonts loaded via `next/font/google` (`Manrope`, `Cormorant_Garamond`) are automatically zero-layout-shift and self-hosted on the domain without external Google CDN latency.

---

## 9. Actionable Implementation Checklist

| Area | Task | Status | Target File |
| :--- | :--- | :---: | :--- |
| **Metadata** | Configure `metadataBase` & full root metadata object | [x] | `src/app/layout.tsx` |
| **Metadata** | Add page-specific titles, descriptions & canonical links | [x] | `src/app/**/layout.tsx` |
| **Sitemap** | Create dynamic XML sitemap generation | [x] | `src/app/sitemap.ts` |
| **Robots** | Create automated robots.txt handler | [x] | `src/app/robots.ts` |
| **Structured Data** | Add `Organization` & `WebSite` JSON-LD schema | [x] | `src/app/layout.tsx` |
| **Structured Data** | Add `Product` & `AggregateOffer` schema | [x] | `src/app/page.tsx` |
| **Structured Data** | Add `FAQPage` schema for the FAQ section | [x] | `src/app/page.tsx` |
| **Social Graph** | Configure OpenGraph & Twitter cards across all routes | [x] | `src/app/**` |
| **Accessibility** | Audit ARIA labels, semantic landmarks & alt text | [x] | Site-wide |
| **Verification** | Verify zero build & TypeScript compilation errors | [x] | Next.js Build |

---

*Document version: 1.0 — Divine Lotus SEO System*
