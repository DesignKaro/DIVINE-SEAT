# Divine Seat / The Lotus Seat — Feel & Sensory Experience Specification

Comprehensive tactile guidelines, motion physics, micro-interactions, scroll choreography, and emotional resonance tokens for a world-class luxury digital presence.

---

## 1. Sensory Philosophy & Emotional Resonance

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE MEDITATIVE SENSORY AXIS                      │
│                                                                        │
│   Stillness (Canvas)      ⇄      Groundedness (Cork)    ⇄    Elevation │
│   Warm Alabaster Whites          Artisan Bronze Tones        Frosted   │
│   #F6F3ED                        #876540                     Glass     │
└────────────────────────────────────────────────────────────────────────┘
```

The digital interface must evoke the exact sensation of entering a serene Japanese tea house or an architectural meditation sanctuary. Every interaction, transition, and hover state must feel **weighted, deliberate, whisper-quiet, and buttery-smooth**—never flashy, abrupt, or jarring.

### Core Emotional Tenets:
1. **Unrushed Poise**: Transitions do not snap; they glide with custom luxury Bézier curves (`cubic-bezier(0.19, 1, 0.22, 1)`).
2. **Tactile Warmth**: Frosted glass surfaces diffuse light naturally without harsh neon highlights or sterile plastic look.
3. **Flat Architectural Elegance**: Strict avoidance of gimmicky 3D card tilts or chaotic cursor trails. Cards remain grounded in 2D space with subtle vertical elevation.
4. **Organic Weight**: Elements move with simulated physical mass, subtle damping, and zero overshoot oscillations.

---

## 2. Motion & Physics Specifications

### 2.1 Easing Curves & Timing Tokens

```css
:root {
  /* Motion Duration Tokens */
  --duration-micro: 180ms;    /* Subtle icon & button hover */
  --duration-short: 320ms;    /* Tooltips, badges, dropdowns */
  --duration-medium: 650ms;   /* Card entries, modal fades */
  --duration-long: 1100ms;    /* Page hero reveals, section entrances */
  --duration-hero: 1400ms;    /* Initial load brand typography */

  /* Easing Curves */
  --ease-lux: cubic-bezier(0.19, 1, 0.22, 1);       /* Exponential deceleration */
  --ease-fluid: cubic-bezier(0.16, 1, 0.3, 1);      /* Smooth fluid response */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);    /* Symmetrical smooth shift */
}
```

### 2.2 Micro-Interactions

#### A. Primary Action Buttons (`.btn-primary`)
- **Idle State**: Solid Saddle Bronze background (`#876540`), high-contrast cream typography (`#F6F3ED`), rounded-full pill shape.
- **Hover State**:
  - Background warms slightly to `#735433`.
  - Arrow icon translates right by `+4px` (`transform: translateX(4px)` with `--ease-fluid`).
  - A subtle 120° metallic liquid shimmer light-sweep traverses horizontally across the button surface (`transition: background-position 0.75s ease`).
- **Active / Press State**: Scales down gently to `0.985` (`transform: scale(0.985)`) to simulate mechanical tactile depression.

#### B. Luxury Glass Cards (`.lux-card`)
- **Idle State**: Frosted semi-translucent backdrop (`rgba(246, 243, 237, 0.72)`), 1px delicate sand border (`rgba(216, 204, 189, 0.55)`), soft ambient shadow (`0 20px 40px -15px rgba(64, 46, 29, 0.07)`).
- **Hover State**:
  - Translates vertically by `-4px` (`transform: translateY(-4px)` with `--ease-lux`).
  - Subtle shadow expansion (`0 28px 50px -12px rgba(64, 46, 29, 0.12)`).
  - *Strict Rule*: No 3D cursor-tracking rotation or perspective tilt (`rotateX/rotateY: 0deg`).

#### C. Colorway Swatches
- **Idle State**: Smooth circular disc (36px diameter) with subtle inset ring.
- **Active / Selected State**: Smooth radial pulse with 2px offset border in Saddle Bronze (`#876540`), scaling to `1.08`.

---

## 3. Scroll Choreography & Editorial Typography Reveals

### 3.1 Smooth Inertia Scrolling
- Driven by **Lenis** smooth momentum scrolling:
  ```javascript
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });
  ```

### 3.2 Word-by-Word Masked Headline Reveals
Headlines (`font-family: 'Glacier'`) enter the viewport using masked overflow containers:
- **Initial State**: Wrapped in `<span class="overflow-hidden inline-block"><span class="word inline-block">...</span></span>`. `translateY: 110%`, `rotate: 2.5deg`, `opacity: 0`.
- **Trigger**: GSAP ScrollTrigger at `top 85%` of viewport.
- **Animation**: `translateY: 0%`, `rotate: 0deg`, `opacity: 1`, staggered by `0.04s` per word over `1.1s` with `--ease-lux`.

---

## 4. 3D WebGL Interaction & Stage Physics

```
┌─────────────────────────────────────────────────────────────┐
│                    3D WEBGL INTERACTION MATRIX              │
├───────────────────┬─────────────────────────────────────────┤
│ Orbit Controls    │ Damping enabled (dampingFactor: 0.05)   │
│ Min / Max Pitch   │ Polar angle clamped: 15° to 85°         │
│ Auto-Rotation     │ 0.6 RPM gentle idle spin                │
│ Zoom Constraint   │ Min Distance: 2.2m | Max Distance: 5.5m │
│ Exploded Layers   │ Y-axis spring animation (duration: 1s)  │
└───────────────────┴─────────────────────────────────────────┘
```

1. **Inertial Orbit Drag**: Dragging the 3D seat provides physical feedback with smooth rotational inertia. Releasing lets the model glide to a gradual halt.
2. **Exploded Anatomy Transition**: When clicking `"Exploded View"`, the 3 layers smoothly separate along the Y-axis:
   - Outer Cover: `+0.45m` (upward)
   - Latex Core: `0.00m` (center)
   - Cork Base: `-0.45m` (downward)
3. **PBR Material Response**: Lighting responds to realistic studio key/fill lights with subtle warm rim illumination highlighting the natural texture of Portuguese cork and organic linen weave.

---

## 5. Frosted Glass Depth Hierarchy

| Level | Blur Radius | Saturation | Surface Fill | Border Refraction | Shadow Tint |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Header (Sticky)** | `48px` | `180%` | `rgba(246, 243, 237, 0.45)` | `None (Borderless)` | `0 10px 30px rgba(64,46,29,0.04)` |
| **Standard Card** | `20px` | `160%` | `rgba(246, 243, 237, 0.72)` | `1px solid rgba(216,204,189,0.55)` | `0 20px 40px rgba(64,46,29,0.07)` |
| **Elevated Modal** | `28px` | `180%` | `rgba(255, 255, 255, 0.85)` | `1px solid rgba(255,255,255,0.85)` | `0 30px 60px rgba(64,46,29,0.14)` |
| **Dark Accents** | `24px` | `150%` | `rgba(64, 46, 29, 0.85)` | `1px solid rgba(216,204,189,0.25)` | `0 35px 70px rgba(0,0,0,0.30)` |
