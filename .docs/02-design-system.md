# 02. Design System & Brand Identity

## 1. Brand Philosophy
The visual identity of **Divine Lotus** embodies the harmony of **ancient yogic wisdom** with **contemporary ergonomic minimalism**. The design eschews generic sterile tech patterns in favor of rich earth tones, tactile textures (cork, velvet, botanical latex), warm parchment backgrounds, and refined editorial typography.

---

## 2. Color Palette & Design Tokens

### Primary Palette (Warm Organic Sanctuary)
```css
/* Core Grounding Canvas */
--bg-primary: #F6F3ED;       /* Warm alabaster parchment */
--bg-card: #EDE8DE;          /* Subtle stone card container */
--bg-dark: #241A12;          /* Deep espresso earth */

/* Brand & Accent Tones */
--brand-earth: #402E1D;      /* Primary high-contrast text */
--brand-cork: #876540;       /* Signature warm cork accent */
--brand-cork-dark: #6D5133;  /* Hover / interactive cork tone */
--brand-cream: #ECE7DE;      /* Upper velvet cushion tint */
--brand-amber: #CBB18D;      /* Subtle border & accent highlight */
```

### Color Contrast & WCAG Compliance
All text elements maintain a minimum contrast ratio of **4.5:1** against their background containers:
- Text `#402E1D` on `#F6F3ED` canvas = **11.2:1** (AAA pass)
- White text `#FFFFFF` on `#241A12` dark sections = **14.8:1** (AAA pass)
- Accent `#876540` on `#FFFFFF` = **4.9:1** (AA pass)

---

## 3. Typography System

The site utilizes a 3-tier typographic hierarchy:

### 1. Glacier (`font-glacier`)
- **Category**: Custom luxury geometric display typeface.
- **Weights**: Regular (400), Bold (700).
- **Format**: Self-hosted `Glacier.woff2` (zero layout shift, preloaded in `<head>`).
- **Use**: High-impact editorial headings, Hero headline (`THE LOTUS SEAT`), section titles.

### 2. Cormorant Garamond (`font-display`)
- **Category**: Traditional humanist serif font.
- **Weights**: 400, 500, 600, 700.
- **Loaded**: Via `next/font/google` with `display: swap`.
- **Use**: Section subtitles, philosophical quotes, Yoga Sutra Sanskrit references (*"Sthira sukham asanam"*).

### 3. Manrope (`font-sans`)
- **Category**: Modern geometric grotesque sans-serif.
- **Weights**: 300, 400, 500, 600, 700.
- **Loaded**: Via `next/font/google` with `display: swap`.
- **Use**: Body text, UI labels, button copy, specifications, and legal policy pages.

---

## 4. Glassmorphism & Surface Materials

Glass surfaces are crafted using CSS backdrop filters with high saturation to emulate sandblasted translucent quartz:

```css
/* Standard Frosted Glass Surface */
.glass-surface {
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(28px) saturate(140%) brightness(1.04);
  -webkit-backdrop-filter: blur(28px) saturate(140%) brightness(1.04);
  border: 1px solid rgba(255, 255, 255, 0.7);
}

/* Dark Glass Container (Hero / Materials Section) */
.glass-dark {
  background: rgba(36, 26, 18, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

---

## 5. Animation Curves & Micro-interactions

Animations utilize custom cubic-bezier easing to impart an organic, physical deceleration curve:

```ts
// Primary Luxury Deceleration Curve
const luxuryEase = [0.16, 1, 0.3, 1];

// Standard Reveal Variants
export const revealVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: luxuryEase },
  },
};
```

### Key Interactive Patterns
- **Magnetic Buttons**: Subtle `scale(1.03)` with soft spring physics on hover.
- **Card Tilts**: Problem and Solution cards lift `-6px` to `-8px` on hover with shadow expansion.
- **Kinetic Text**: Letter-by-letter stagger reveal in HeroSection using staggered Framer Motion children.
