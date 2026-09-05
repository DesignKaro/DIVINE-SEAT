# 05. SEO, Social & Agentic Browsing

## 1. Overview
The site implements search engine optimization (SEO), social media sharing graph standards, and modern Agentic AI discovery protocols.

---

## 2. Structured Data (JSON-LD Organization Schema)

The root layout (`src/app/layout.tsx`) embeds a comprehensive Schema.org JSON-LD graph linking the Brand, Organization, and WebSite entities:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://thedivinelotus.org/#organization",
      "name": "Divine Lotus",
      "legalName": "Divine Lotus Sanctuary",
      "url": "https://thedivinelotus.org",
      "slogan": "Where ancient wisdom meets modern comfort.",
      "description": "Architectural mindfulness design bridging ancient yogic biomechanics with contemporary ergonomic engineering.",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://thedivinelotus.org/#logo",
        "url": "https://thedivinelotus.org/lotus-favicon.png",
        "caption": "Divine Lotus Emblem"
      },
      "image": "https://thedivinelotus.org/images/ancient_wisdom_modern_comfort.avif",
      "sameAs": [
        "https://www.instagram.com/divinelotus",
        "https://www.threads.net/@theedivinelotus",
        "https://www.youtube.com/@divinelotus",
        "https://twitter.com/divinelotus"
      ],
      "knowsAbout": [
        "Meditation Ergonomics",
        "Spinal Posture Alignment",
        "Botanical Natural Latex Craft",
        "Sustainable Portuguese Cork",
        "Mindful Living Furniture"
      ]
    },
    {
      "@type": "Brand",
      "@id": "https://thedivinelotus.org/#brand",
      "name": "Divine Lotus",
      "url": "https://thedivinelotus.org",
      "logo": "https://thedivinelotus.org/lotus-favicon.png",
      "slogan": "Where ancient wisdom meets modern comfort."
    }
  ]
}
```

---

## 3. Open Graph (OG) & Twitter Card Specifications

Social media crawlers (Facebook, WhatsApp, LinkedIn, Twitter/X, Discord, Slack, iMessage) require specific image dimensions and MIME formats:

- **Primary OG Image**: `https://thedivinelotus.org/og-image.jpg` (1200×630, 115 KB)
- **High-DPI Retina Fallback**: `https://thedivinelotus.org/og-image.png` (1200×630, 402 KB)
- **Web Modern Alternative**: `https://thedivinelotus.org/images/ancient_wisdom_modern_comfort.avif` (1200×800)

### Current Meta Copy
- **OG & Twitter Title**:
  > `The Divine Lotus - Where Ancient Wisdom Meets Modern Comfort`
- **OG & Twitter Description**:
  > `Thoughtfully designed seat for deeper meditation, natural alignment, and a calmer mind. Rooted in the wisdom of ancient asanas like Siddhasana and Padmasana, and handcrafted with natural materials for the way we sit today.`

---

## 4. Robots & Sitemap Configuration

### Robots.txt (`public/robots.txt`)
Complies strictly with **RFC 9309** (Googlebot & Bingbot standard validator):

```txt
User-agent: *
Allow: /
Disallow: /api/

# Sitemaps
Sitemap: https://thedivinelotus.org/sitemap.xml

# LLMs context: https://thedivinelotus.org/llms.txt
```

### Sitemap (`public/sitemap.xml`)
Indexes all canonical sub-pages with change frequencies and priorities:
- `/` (Priority: 1.0)
- `/contact` (Priority: 0.8)
- `/shipping-policy` (Priority: 0.7)
- `/warranty-policy` (Priority: 0.7)
- `/refund-policy` (Priority: 0.7)
- `/terms` (Priority: 0.7)
- `/privacy-policy` (Priority: 0.7)
- `/cookie-policy` (Priority: 0.7)
- `/disclaimer` (Priority: 0.6)

---

## 5. Agentic AI Browsing (`llms.txt`)

Per the official [llmstxt.org specification](https://llmstxt.org) tested by Google Lighthouse and AI search crawlers (Perplexity, ChatGPT, Claude), `public/llms.txt` provides structured markdown context and valid hyperlinks:

```markdown
# Divine Lotus — The Lotus Seat

> Where ancient wisdom meets modern comfort. The Lotus Seat is an architectural ergonomic meditation foundation crafted with a sustainable Portuguese cork base, botanical latex cushioning, and removable velvet upholstery for effortless spinal alignment and pain-free sitting.

## Core Pages
- [Homepage](https://thedivinelotus.org/): Complete overview...
- [Contact & Support](https://thedivinelotus.org/contact): Direct assistance...
...
```
