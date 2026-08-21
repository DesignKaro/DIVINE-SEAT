# The Lotus Seat / Divine Seat — Schema & Structured Data Specification

Structured data schemas (JSON-LD), Google Rich Snippet definitions, and TypeScript data models for e-commerce and 3D product customizer state.

---

## 1. JSON-LD Structured Data for Google Rich Snippets

### 1.1 Product Schema (`schema.org/Product`)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "The Lotus Seat — Ergonomic Luxury Meditation Seat",
  "image": [
    "https://divineseat.com/assets/lotus_seat_hero.jpg",
    "https://divineseat.com/assets/lotus_lifestyle.jpg",
    "https://divineseat.com/assets/lotus_materials.jpg"
  ],
  "description": "An architectural ergonomic meditation seat crafted with a Portuguese cork composite base and responsive natural organic latex to support upright pelvic alignment and eliminate sitting fatigue.",
  "sku": "LOTUS-SEAT-001",
  "mpn": "DS-LOTUS-V1",
  "brand": {
    "@type": "Brand",
    "name": "Divine Seat"
  },
  "material": "High-Density Portuguese Cork Composite, 100% Botanical Natural Latex, Organic Linen-Cotton",
  "color": "Warm Alabaster Linen / Sand Crema",
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "149.00",
    "highPrice": "199.00",
    "priceCurrency": "EUR",
    "offerCount": "2",
    "offers": [
      {
        "@type": "Offer",
        "name": "The Lotus Seat (Standard Signature Edition)",
        "sku": "LOTUS-STD-149",
        "price": "149.00",
        "priceCurrency": "EUR",
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "url": "https://divineseat.com/#pricing",
        "seller": {
          "@type": "Organization",
          "name": "Divine Seat"
        }
      },
      {
        "@type": "Offer",
        "name": "The Lotus Seat — Custom Artisanal Edition",
        "sku": "LOTUS-CUST-199",
        "price": "199.00",
        "priceCurrency": "EUR",
        "priceValidUntil": "2027-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "url": "https://divineseat.com/#pricing",
        "seller": {
          "@type": "Organization",
          "name": "Divine Seat"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.95",
    "reviewCount": "184"
  }
}
```

---

### 1.2 FAQ Page Schema (`schema.org/FAQPage`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is The Lotus Seat suitable for beginners who cannot sit cross-legged?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The seat’s 8.5° forward inclination and elevated foundation gently tilt the pelvis forward, reducing pressure on the hip flexors and making cross-legged postures (Sukhasana, Siddhasana) accessible and comfortable without straining."
      }
    },
    {
      "@type": "Question",
      "name": "How does The Lotus Seat prevent leg numbness during meditation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Leg numbness occurs when sitting on flat or sinking cushions compresses the femoral arteries and nerves. By raising the hips above the knees and dissipating weight via high-resilience natural latex, blood circulation remains unhindered."
      }
    },
    {
      "@type": "Question",
      "name": "Why is natural latex used instead of memory foam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Memory foam collapses under sustained body heat and weight, locking the pelvis in a static rut. Botanical natural latex is instantly responsive, breathable, cooling, and provides buoyant push-back support that never bottoms out."
      }
    },
    {
      "@type": "Question",
      "name": "How is the cover cleaned and maintained?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The outer organic linen-cotton cover is equipped with a concealed YKK zipper. It removes in seconds and is fully machine-washable on a gentle cold cycle."
      }
    }
  ]
}
```

---

### 1.3 Organization & Brand Schema (`schema.org/Organization`)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Divine Seat",
  "url": "https://divineseat.com",
  "logo": "https://divineseat.com/assets/logo.png",
  "description": "Architectural mindfulness furniture bridging ancient yogic biomechanics with contemporary minimalist design.",
  "sameAs": [
    "https://instagram.com/divineseat",
    "https://youtube.com/@divineseat"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Concierge",
    "email": "concierge@divineseat.com"
  }
}
```

---

## 2. Application TypeScript Data Models

### 2.1 Product & Customizer State Model

```typescript
export type ColorwayId = 'crema' | 'linen' | 'sage' | 'espresso';

export interface ColorwayOption {
  id: ColorwayId;
  name: string;
  hex: string;
  rgb: string;
  description: string;
  textureMap?: string;
}

export interface SeatTier {
  id: 'standard' | 'custom';
  title: string;
  price: number;
  currency: 'EUR' | 'USD' | 'GBP';
  priceDisplay: string;
  features: string[];
  includesGuide: boolean;
  extraCoversCount: number;
}

export interface CustomizerState {
  selectedTier: 'standard' | 'custom';
  selectedColorway: ColorwayId;
  explodedView: boolean;
  activeAngle: 'front' | 'side' | 'top' | 'isometric';
  monogramText?: string;
}
```
