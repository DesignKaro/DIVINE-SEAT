# The Lotus Seat / Divine Seat — SEO & Search Architecture Specification

Comprehensive search engine optimization blueprint, metadata standards, keyword strategy, OpenGraph/Twitter card specifications, and semantic HTML structure.

---

## 1. Primary Keyword Architecture & Search Clusters

```
┌────────────────────────────────────────────────────────────────────────┐
│                        KEYWORD CLUSTERS & INTENT                       │
├────────────────────────────┬─────────────────────────────┬─────────────┤
│ Cluster                    │ Target Query Keywords       │ Intent      │
├────────────────────────────┼─────────────────────────────┼─────────────┤
│ 1. Brand & Luxury Seating  │ "The Lotus Seat"            │ Commercial/ │
│                            │ "Divine Seat meditation"    │ Navigational│
│                            │ "luxury ergonomic seat"     │             │
├────────────────────────────┼─────────────────────────────┼─────────────┤
│ 2. Problem & Posture Pain  │ "meditation seat back pain" │ Informative/│
│                            │ "prevent leg numbness sit"  │ Commercial  │
│                            │ "pelvic support meditation" │             │
├────────────────────────────┼─────────────────────────────┼─────────────┤
│ 3. Yogic & Biomechanics    │ "Siddhasana seat cushion"   │ Niche/High- │
│                            │ "Sthira Sukham Asanam seat" │ Intent      │
│                            │ "Padmasana spine alignment" │             │
├────────────────────────────┼─────────────────────────────┼─────────────┤
│ 4. Sustainable Materials   │ "natural latex zafu"        │ Commercial/ │
│                            │ "cork meditation cushion"   │ Transaction │
│                            │ "organic washable cushion"  │             │
└────────────────────────────┴─────────────────────────────┴─────────────┘
```

---

## 2. Meta Tags & Social Sharing Specification

### 2.1 Next.js App Router Metadata Object (`src/app/layout.tsx` / `page.tsx`)

```typescript
export const metadata = {
  title: "The Lotus Seat — Architectural Ergonomic Meditation Seat | Divine Seat",
  description:
    "Where ancient wisdom meets modern comfort. The Lotus Seat supports an upright, fatigue-free meditation posture with natural latex and Portuguese cork composite.",
  keywords: [
    "meditation seat",
    "ergonomic meditation chair",
    "the lotus seat",
    "divine seat",
    "natural latex meditation cushion",
    "cork posture seat",
    "siddhasana meditation cushion",
    "luxury mindfulness furniture"
  ],
  authors: [{ name: "Divine Seat" }],
  creator: "Divine Seat",
  publisher: "Divine Seat",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://divineseat.com",
    siteName: "The Lotus Seat",
    title: "The Lotus Seat — Sit with ease. Stay with the practice.",
    description:
      "Engineered with responsive botanical latex and an 8.5° inclined cork base to eliminate back discomfort and leg numbness during meditation.",
    images: [
      {
        url: "https://divineseat.com/og-lotus-seat.jpg",
        width: 1200,
        height: 630,
        alt: "The Lotus Seat Luxury 3D Ergonomic Meditation Cushion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lotus Seat — Architectural Ergonomic Meditation Seat",
    description: "Sit with ease. Stay with the practice. Crafted from Portuguese cork & natural latex.",
    images: ["https://divineseat.com/og-lotus-seat.jpg"],
  },
  alternates: {
    canonical: "https://divineseat.com",
  },
};
```

---

## 3. Semantic Heading Hierarchy (H1–H3)

```html
<!-- Page Semantic Skeleton -->
<header>
  <nav aria-label="Main Navigation">...</nav>
</header>

<main id="main-content">
  <!-- Section 1: Hero -->
  <section aria-labelledby="hero-title">
    <span class="eyebrow">Where ancient wisdom meets modern comfort</span>
    <h1 id="hero-title">THE LOTUS SEAT</h1>
    <p class="tagline">“Sit with ease. Stay with the practice.”</p>
  </section>

  <!-- Section 2: Problem -->
  <section id="problem" aria-labelledby="problem-title">
    <span class="eyebrow">The Physical Friction</span>
    <h2 id="problem-title">Meditation doesn’t need to become a test of endurance.</h2>
    <!-- 4 Cards -->
    <h3>1. Back Discomfort</h3>
    <h3>2. Numbness & Tingling</h3>
    <h3>3. Pressure Buildup</h3>
    <h3>4. Constant Readjustment</h3>
  </section>

  <!-- Section 3: The Answer -->
  <section id="answer" aria-labelledby="answer-title">
    <span class="eyebrow">A Better Foundation</span>
    <h2 id="answer-title">Sit with ease. Stay with the practice.</h2>
  </section>

  <!-- Section 4: 3D Showcase -->
  <section id="explore" aria-labelledby="explore-title">
    <h2 id="explore-title">Architectural Anatomy in Pure Harmony</h2>
  </section>

  <!-- Section 5: Pricing -->
  <section id="pricing" aria-labelledby="pricing-title">
    <span class="eyebrow">Investment in Your Practice</span>
    <h2 id="pricing-title">Select Your Foundation</h2>
    <h3>The Lotus Seat (€149)</h3>
    <h3>The Lotus Seat — Custom (€199)</h3>
  </section>

  <!-- Section 6: Biomechanics -->
  <section id="ergonomics" aria-labelledby="ergonomics-title">
    <h2 id="ergonomics-title">What Changes When You Sit</h2>
  </section>

  <!-- Section 7: Wisdom -->
  <section id="wisdom" aria-labelledby="wisdom-title">
    <span class="eyebrow">Tradition & Lineage</span>
    <h2 id="wisdom-title">“Sthira Sukham Asanam” — Steadiness & Ease</h2>
  </section>

  <!-- Section 8: Materials -->
  <section id="materials" aria-labelledby="materials-title">
    <h2 id="materials-title">Sustainable Natural Materials</h2>
  </section>

  <!-- Section 9: FAQ -->
  <section id="faq" aria-labelledby="faq-title">
    <h2 id="faq-title">Frequently Asked Questions</h2>
  </section>
</main>
```

---

## 4. Accessibility & Search Engine Best Practices
1. **Descriptive `alt` Attributes**: All media elements must feature sensory-rich, descriptive alt text (e.g. `alt="The Lotus Seat sculpted Portuguese cork base with forward pelvic incline"`).
2. **Anchor Link Identifiers**: Every major section has a semantic `#id` matching canonical navigation (`#problem`, `#answer`, `#ergonomics`, `#pricing`, `#materials`, `#faq`).
3. **Automated Sitemap & Robots.txt**: Auto-generated via Next.js `app/sitemap.ts` and `app/robots.ts`.
