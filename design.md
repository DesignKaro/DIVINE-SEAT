# Divine Seat — Design System & Visual Specification

Comprehensive design system, color palette proportions, typography guidelines, glassmorphism tokens, and motion specifications for a unified luxury digital experience.

---

## 1. Design System JSON Specification

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "brand": {
    "name": "Divine Seat",
    "aesthetic": "High-End Luxury, Architectural Minimalist, Frosted Glassmorphic Elegance",
    "version": "1.0.0"
  },
  "colorProportions": {
    "canvas": {
      "percentage": "60%",
      "hex": "#F6F3ED",
      "rgb": "246, 243, 237",
      "name": "Warm Alabaster / Primary Linen Canvas",
      "role": "Dominant background, primary canvas fill, breathable whitespace"
    },
    "secondaryCanvas": {
      "percentage": "15%",
      "hex": "#EDEFE0",
      "rgb": "237, 239, 224",
      "name": "Soft Sage Tint",
      "role": "Secondary surface panels, subtle background glows, soft card backdrops"
    },
    "surfaceBorders": {
      "percentage": "10%",
      "hex": "#D8CCBD",
      "rgb": "216, 204, 189",
      "name": "Secondary Crema / Sand",
      "role": "Glassmorphism borders, secondary outlines, delicate structural dividers"
    },
    "primaryAction": {
      "percentage": "7%",
      "hex": "#876540",
      "rgb": "135, 101, 64",
      "name": "Artisan Saddle Bronze",
      "role": "Primary CTA buttons, focal brand highlights, active state indicators"
    },
    "typographyAndContrast": {
      "percentage": "5%",
      "hex": "#402E1D",
      "rgb": "64, 46, 29",
      "name": "Dark Roasted Espresso",
      "role": "Primary typography, headlines, high-contrast text, dark luxury surfaces"
    },
    "accentCraft": {
      "percentage": "3%",
      "hex": "#7C7F66",
      "rgb": "124, 127, 102",
      "name": "Sage Olive Craft",
      "role": "Botanical accent badges, artisanal tags, eco/heritage indicators"
    }
  },
  "typography": {
    "primaryFont": {
      "family": "Glacier",
      "formats": ["otf", "ttf"],
      "style": "High-Contrast Luxury Display Serif",
      "fallbacks": ["Cormorant Garamond", "Playfair Display", "serif"],
      "usage": [
        "Hero Main Titles (H1)",
        "Section Headings (H2)",
        "Editorial Quotes & Brand Logo",
        "Luxury Price Display"
      ],
      "styles": {
        "h1": {
          "fontSize": "clamp(2.5rem, 4.4vw, 4rem)",
          "lineHeight": "1.08",
          "letterSpacing": "-0.012em",
          "fontWeight": "600"
        },
        "h2": {
          "fontSize": "clamp(1.8rem, 3vw, 2.75rem)",
          "lineHeight": "1.15",
          "letterSpacing": "-0.01em",
          "fontWeight": "500"
        }
      }
    },
    "secondaryFont": {
      "family": "Manrope",
      "formats": ["Google Fonts", "woff2", "ttf"],
      "style": "Geometric Neo-Grotesque Sans-Serif",
      "fallbacks": ["Inter", "-apple-system", "sans-serif"],
      "weights": [300, 400, 500, 600, 700],
      "usage": [
        "Navigation Links & Menus",
        "Body Text & Editorial Descriptions",
        "Buttons, Labels, Badges, and Form Controls",
        "Metadata, Captions, and Legal Footers"
      ],
      "styles": {
        "subheading": {
          "fontSize": "0.9rem",
          "lineHeight": "1.5",
          "letterSpacing": "normal",
          "textTransform": "uppercase",
          "fontWeight": "600"
        },
        "bodyRegular": {
          "fontSize": "1rem",
          "lineHeight": "1.7",
          "letterSpacing": "normal",
          "fontWeight": "400"
        },
        "button": {
          "fontSize": "0.85rem",
          "lineHeight": "1",
          "letterSpacing": "normal",
          "textTransform": "uppercase",
          "fontWeight": "600"
        },
        "caption": {
          "fontSize": "0.75rem",
          "lineHeight": "1.4",
          "letterSpacing": "normal",
          "fontWeight": "500"
        }
      }
    }
  },
  "glassmorphism": {
    "principles": [
      "Frosted depth using backdrop-filter blur",
      "Ultra-fine 1px champagne/sand border for refraction",
      "Soft ambient shadows with warm espresso undertones",
      "Strict proportion adherence"
    ],
    "cards": {
      "surfacePrimary": {
        "background": "rgba(246, 243, 237, 0.72)",
        "backdropFilter": "blur(20px) saturate(160%)",
        "border": "1px solid rgba(216, 204, 189, 0.55)",
        "boxShadow": "0 20px 40px -15px rgba(64, 46, 29, 0.07)"
      },
      "surfaceElevated": {
        "background": "rgba(255, 255, 255, 0.85)",
        "backdropFilter": "blur(28px) saturate(180%)",
        "border": "1px solid rgba(255, 255, 255, 0.85)",
        "boxShadow": "0 25px 50px -12px rgba(64, 46, 29, 0.12)"
      },
      "surfaceDark": {
        "background": "rgba(64, 46, 29, 0.85)",
        "backdropFilter": "blur(24px) saturate(150%)",
        "border": "1px solid rgba(216, 204, 189, 0.25)",
        "boxShadow": "0 30px 60px -15px rgba(0, 0, 0, 0.3)"
      }
    }
  }
}
```

---

## 2. Proportional Color Hierarchy (60-15-10-7-5-3 Rule)

| Proportion | Swatch | Color Name | Hex Code | Purpose & Application |
| :---: | :---: | :--- | :--- | :--- |
| **60%** | <span style="background-color:#F6F3ED; display:inline-block; width:22px; height:22px; border-radius:4px; border:1px solid #ddd;"></span> | **Primary Linen Canvas** | `#F6F3ED` | Main stage canvas, background body fill, whitespace |
| **15%** | <span style="background-color:#EDEFE0; display:inline-block; width:22px; height:22px; border-radius:4px; border:1px solid #ddd;"></span> | **Soft Sage Tint** | `#EDEFE0` | Sub-panels, secondary containers, highlight backdrops |
| **10%** | <span style="background-color:#D8CCBD; display:inline-block; width:22px; height:22px; border-radius:4px; border:1px solid #ddd;"></span> | **Secondary Sand / Crema** | `#D8CCBD` | Translucent glass borders, dividers, subtle outlines |
| **7%** | <span style="background-color:#876540; display:inline-block; width:22px; height:22px; border-radius:4px; border:1px solid #ddd;"></span> | **Artisan Saddle Bronze** | `#876540` | Primary action CTAs, key focal highlights, active swatches |
| **5%** | <span style="background-color:#402E1D; display:inline-block; width:22px; height:22px; border-radius:4px; border:1px solid #ddd;"></span> | **Roasted Espresso** | `#402E1D` | Primary typography, headlines, high-contrast elements |
| **3%** | <span style="background-color:#7C7F66; display:inline-block; width:22px; height:22px; border-radius:4px; border:1px solid #ddd;"></span> | **Sage Olive Craft** | `#7C7F66` | Artisanal badges, sustainability indicators, craft details |

---

## 3. CSS Variables & Tokens

```css
:root {
  /* 60-15-10-7-5-3 Proportional Palette Tokens */
  --color-canvas: #F6F3ED;          /* 60% Dominant */
  --color-tint: #EDEFE0;            /* 15% Secondary */
  --color-secondary: #D8CCBD;       /* 10% Borders & Surfaces */
  --color-primary: #876540;         /* 7% Primary CTAs & Accents */
  --color-espresso: #402E1D;        /* 5% Typography & Dark accents */
  --color-sage: #7C7F66;            /* 3% Craft & Badges */

  /* Typography */
  --font-display: 'Glacier', 'Cormorant Garamond', serif;
  --font-sans: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Glass Surfaces */
  --glass-surface: rgba(246, 243, 237, 0.72);
  --glass-elevated: rgba(255, 255, 255, 0.85);
  --glass-dark: rgba(64, 46, 29, 0.85);
  --glass-border: rgba(216, 204, 189, 0.55);

  /* Easing */
  --ease-lux: cubic-bezier(0.19, 1, 0.22, 1);
}
```
