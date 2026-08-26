# The Lotus Seat — Comprehensive Design Guidelines & System

A complete design system, token specification, component architecture, and UI/UX blueprint for building all current and future pages with consistent luxury, precision, and tactile warmth.

---

## 1. Brand Philosophy & Visual Aesthetic

- **Core Identity:** *The Lotus Seat* — Where ancient wisdom meets modern ergonomics and quiet luxury.
- **Visual Aesthetic:** High-end architectural minimalism, warm mineral tones, tactile ceramic surfaces, and serene, breathable whitespace.
- **Aesthetic Principles:**
  1. **Quiet Luxury:** No garish gradients or generic tech UI. Natural earth tones, linen, saddle bronze, and dark espresso ink.
  2. **Tactile Precision:** Clean mathematical geometry (pure horizontal bi-color split discs, ceramic capsule controls, crisp SVG pinched-neck buttons).
  3. **Generous Breathing Room:** Expansive padding, relaxed typography line-heights, and spacious modal structures.
  4. **Intentional Casing:** Uppercase is reserved strictly for `/CATEGORY` eyebrow tags; all headlines, navigation, buttons, and form labels use natural Title Case or Sentence Case.

---

## 2. Color System & Section Rhythm

### 2.1 Rhythmic Alternating Canvas Rhythm
Pages alternate between two warm mineral tones down the vertical stack. **Dividers and border lines between sections are completely removed** (`border-0`), creating seamless color-block transitions.

| Token | Hex | Name | Role & Application |
| :--- | :--- | :--- | :--- |
| `canvas-primary` | `#E6DFD4` | Warm Stone | Odd sections (`Hero`, `Solution`, `Biomechanical Benefits`, `Ancient Wisdom`, `FAQs`) |
| `canvas-secondary` | `#ECE7DE` | Linen Sand | Even sections (`The Problem`, `Pricing / Choose Seat`, `Biomechanical Chain`, `Comparison`) |
| `surface-well` | `#EFECE5` | Recessed Mineral | Input wells, stepper tracks, switcher containers, button wells |
| `surface-card-light` | `#FAF7F2` | Porcelain White | Active segmented tabs, modal backgrounds, fused pill CTA gradient start |
| `surface-card-sand` | `#F3EFE8` | Soft Crema | Fused pill CTA gradient middle |

### 2.2 Accent, Ink & Contrast Colors

| Token | Hex | Name | Role & Application |
| :--- | :--- | :--- | :--- |
| `text-primary` | `#1E140D` | Dark Roasted Espresso | Primary headings, active step titles, high-contrast text |
| `text-secondary` | `#402E1D` | Rich Mocha (65-80%) | Body paragraphs, descriptions, secondary copy |
| `text-muted` | `#402E1D`/50 | Muted Mineral | Placeholder text, disabled steps, inactive state icons |
| `brand-bronze` | `#876540` | Saddle Artisan Bronze | Eyebrow tags, circular action discs, active step rings, price highlights |
| `brand-bronze-dark` | `#6D5133` | Deep Bronze | Hover state for bronze buttons and interactive discs |
| `border-subtle` | `#402E1D`/10 | Hairline Sand | Subtle card outlines, modal borders, soft separation rings |

---

## 3. Typography Hierarchy & Rules

### 3.1 Font Families
- **Display Serif (`font-display`):** `Glacier`, `Playfair Display`, `Cormorant Garamond`, `serif`
  - *Usage:* Page titles (H1), section headlines (H2), modal titles, price numbers.
- **Sans-Serif (`font-sans`):** `Manrope`, `Inter`, `sans-serif`
  - *Usage:* Body text, navigation links, buttons, inputs, tabs, sub-labels, metadata.

### 3.2 Typography Scale & Specs

| Hierarchy | Font Family | Size (Mobile $\to$ Desktop) | Line Height | Tracking | Weight / Style |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Eyebrow Tag** | `font-sans` | `10.5px` – `11.5px` | `1.0` | `0.18em` | Bold, **UPPERCASE**, `/TAG_NAME` |
| **Hero Title (H1)** | `font-display` | `clamp(2.5rem, 5vw, 4.2rem)` | `1.08` | `-0.02em` | SemiBold / Bold |
| **Section Title (H2)**| `font-display` | `clamp(1.8rem, 3.2vw, 2.75rem)` | `1.15` | `-0.015em`| SemiBold / Medium |
| **Card Title (H3)** | `font-sans` / `display` | `18px` – `22px` | `1.25` | `-0.01em` | Bold |
| **Subheadings (H4)** | `font-sans` | `13.5px` – `15px` | `1.3` | Normal | Bold |
| **Body Large** | `font-sans` | `15px` – `16.5px` | `1.65` | Normal | Regular / Medium |
| **Body Regular** | `font-sans` | `13px` – `14px` | `1.6` | Normal | Medium |
| **Caption / Notes** | `font-sans` | `11px` – `12px` | `1.4` | Normal | Medium / SemiBold |

### 3.3 Strict Casing Standard
- **Eyebrow Tags:** MUST be prefixed with `/` and uppercase (e.g., `/THE PROBLEM`, `/THE SOLUTION`, `/CHOOSE YOUR SEAT`, `/BIOMECHANICAL BENEFITS`).
- **All other text:** MUST use natural Title Case or Sentence Case. NEVER apply forced uppercase to buttons, tabs, input placeholders, card labels, or paragraph text.

---

## 4. Signature Component Specifications

### 4.1 Signature Fused Pill CTA Button
The brand's hallmark call-to-action is a fused pill with a pinched-neck SVG body on the left and a bronze circular arrow disc on the right.

```tsx
<button
  type="button"
  className="group relative inline-flex items-center select-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer font-sans"
>
  {/* Pinched Neck Fused SVG Body */}
  <svg className="w-[236px] h-[46px]" viewBox="0 0 236 46" fill="none">
    <defs>
      <linearGradient id="btn-fill" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FAF7F2" />
        <stop offset="50%" stopColor="#F3EFE8" />
        <stop offset="100%" stopColor="#FAF7F2" />
      </linearGradient>
      <linearGradient id="btn-border" x1="0" y1="0" x2="236" y2="46" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(64, 46, 29, 0.25)" />
        <stop offset="50%" stopColor="rgba(135, 101, 64, 0.5)" />
        <stop offset="100%" stopColor="rgba(64, 46, 29, 0.2)" />
      </linearGradient>
    </defs>
    <path
      d="M 23 0 L 173 0 C 180 0 185 7 190 7 C 195 7 200 0 213 0 A 23 23 0 1 1 213 46 C 200 46 195 39 190 39 C 185 39 180 46 173 46 L 23 46 A 23 23 0 0 1 23 0 Z"
      fill="url(#btn-fill)"
      stroke="url(#btn-border)"
      strokeWidth="1.4"
    />
  </svg>

  {/* Label */}
  <div className="absolute left-0 top-0 bottom-0 w-[184px] flex items-center justify-center pointer-events-none px-3 font-sans">
    <span className="font-sans text-[12px] font-bold text-[#1E140D] whitespace-nowrap">
      Action Label
    </span>
  </div>

  {/* Bronze Circular Disc */}
  <div className="absolute right-[4px] top-[4px] w-[38px] h-[38px] rounded-full bg-[#876540] flex items-center justify-center group-hover:bg-[#6D5133] transition-colors duration-300 shadow-sm">
    <ArrowRight className="w-[16px] h-[16px] text-white stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5" />
  </div>
</button>
```

---

### 4.2 Segmented Ceramic Stepper & Mode Switcher
For multi-step wizards, tab switchers, and filter pills:

```tsx
<div className="bg-[#EFECE5] p-1.5 rounded-2xl flex items-center gap-1.5 select-none font-sans">
  {/* Active Item */}
  <button className="relative flex-1 py-2.5 px-3.5 rounded-xl bg-white shadow-[0_2px_8px_rgba(64,46,29,0.06)] text-[#1E140D] ring-1 ring-black/5 font-bold flex items-center gap-2">
    <div className="w-5.5 h-5.5 rounded-full bg-[#876540] text-white text-[11px] font-bold flex items-center justify-center">
      1
    </div>
    <span>Active Tab</span>
  </button>

  {/* Inactive Item */}
  <button className="relative flex-1 py-2.5 px-3.5 rounded-xl text-[#402E1D]/55 hover:text-[#1E140D] font-semibold flex items-center gap-2 transition-colors">
    <div className="w-5.5 h-5.5 rounded-full bg-[#402E1D]/10 text-[#402E1D]/60 text-[11px] font-bold flex items-center justify-center">
      2
    </div>
    <span>Next Tab</span>
  </button>
</div>
```

---

### 4.3 Razor-Sharp Bi-Color Swatch Discs
Dual-tone discs must use mathematical horizontal bisections (no diagonal artifact lines or fuzzy subpixels):

```tsx
<div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-xs relative">
  <svg className="w-full h-full block" viewBox="0 0 36 36" fill="none">
    {/* Upper Cushion Fabric (Top Half) */}
    <circle cx="18" cy="18" r="18" fill={upperColor} />
    {/* Lower Cork Base (Bottom Half) */}
    <path d="M 0 18 A 18 18 0 0 0 36 18 Z" fill={baseColor} />
  </svg>
</div>
```

---

### 4.4 Form Controls & Input Wells
- **Container Styling:** Borderless, warm sand background (`bg-[#EFECE5] border-0 rounded-2xl`).
- **Dimensions:** Comfortable padding (`px-4 py-3.5`) and smooth typography (`text-[13.5px] font-medium text-[#1E140D]`).
- **Focus State:** Soft bronze focus ring (`focus:outline-none focus:ring-2 focus:ring-[#876540]/30`).
- **Placeholder:** `placeholder:text-[#402E1D]/50 placeholder:font-medium`.

---

### 4.5 Modal & Overlay Architecture
- **Backdrop:** Rich roasted espresso with frosted glass blur (`bg-[#1E140D]/45 backdrop-blur-md`).
- **Modal Window:** Ceramic white surface, expansive width (`max-w-[720px]`), generous rounded corners (`rounded-[32px] sm:rounded-[36px]`), soft layered shadow (`shadow-[0_24px_70px_-15px_rgba(30,20,13,0.18)]`), and spacious padding (`px-8 sm:px-10 lg:px-12 pt-8 pb-10`).
- **Close Button:** Subtle circular hover disc with clean icon (`w-9 h-9 rounded-full hover:bg-[#402E1D]/8 text-[#402E1D]/70`).

---

## 5. Grid, Layout & Spacing Tokens

- **Max Container Width:** `max-w-7xl` (`1280px`) or `max-w-6xl` (`1152px`) centered with `mx-auto`.
- **Page Horizontal Padding:** `px-6 sm:px-12 lg:px-20`.
- **Section Vertical Padding:**
  - Standard Section: `py-16 sm:py-24 lg:py-32`.
  - Compact Banner: `py-12 sm:py-16`.
  - Hero: `pt-28 sm:pt-36 pb-16 sm:pb-24`.
- **Corner Radii Tokens:**
  - Badges / Micro Pills: `rounded-full` (`9999px`)
  - Swatch Cards / Inputs / Tabs: `rounded-2xl` (`16px`)
  - Feature Cards / Panels: `rounded-[28px]` – `rounded-[32px]`
  - Modal Containers: `rounded-[32px]` – `rounded-[36px]`

---

## 6. Page Construction Checklist (For New Pages)

When creating additional pages (e.g., Product Details, Story, Cart, FAQ, Checkout, Legal):

1. [ ] **Background Harmony:** Alternate sections between `#E6DFD4` and `#ECE7DE`.
2. [ ] **No Border Dividers:** Ensure section wrapper elements do not have top or bottom border lines.
3. [ ] **Casing Check:** Ensure only `/CATEGORY` tags are uppercase; verify that buttons and headings use Title/Sentence Case.
4. [ ] **Buttons:** Use the signature fused pill CTA for primary actions (`#btn-fill` / `#btn-border` + bronze disc).
5. [ ] **Inputs:** Use borderless `#EFECE5` wells with `rounded-2xl` and `focus:ring-[#876540]/30`.
6. [ ] **Breathing Space:** Verify generous padding and no cramped cards or stacked elements.
7. [ ] **Motion & Polish:** Use smooth hover transitions (`transition-all duration-300 hover:scale-[1.02]`) and Framer Motion for enters/exits.
