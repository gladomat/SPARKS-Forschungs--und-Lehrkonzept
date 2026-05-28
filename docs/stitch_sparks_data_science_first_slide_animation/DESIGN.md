---
name: Sparks Academic Tech
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#5c4038'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#916f66'
  outline-variant: '#e6beb2'
  surface-tint: '#ae3100'
  primary: '#aa3000'
  on-primary: '#ffffff'
  primary-container: '#d53e00'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59f'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#5b5c5c'
  on-tertiary: '#ffffff'
  tertiary-container: '#737575'
  on-tertiary-container: '#fcfcfc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59f'
  on-primary-fixed: '#3a0a00'
  on-primary-fixed-variant: '#852300'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  action-orange: '#FF4E07'
  deep-onyx: '#0B0B0B'
  data-gray: '#666666'
typography:
  display-lg:
    fontFamily: geist
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: hankenGrotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: hankenGrotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: jetbrainsMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: hankenGrotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is engineered for **Sparks University of Applied Sciences**, blending high-intensity academic rigor with forward-thinking technology. The brand personality is energetic yet precise, reflecting the "spark" of innovation within a structured scientific framework. 

The visual style follows a **Modern Tech-Minimalism** approach. It utilizes expansive white space, aggressive typography, and a "Data-First" aesthetic. While the core is minimalist, it incorporates subtle technical cues—such as monospaced accents and rigid grid alignments—to evoke the precision of Data Science and Applied Engineering. The result is a high-contrast, authoritative environment that feels more like a cutting-edge research lab than a traditional lecture hall.

## Colors

The palette is built on a high-contrast triad of **Action Orange**, **Deep Onyx**, and **Neutral White**. 

- **Primary (Action Orange):** Used sparingly but decisively for primary calls to action, active states, and critical brand highlights. It represents the "Spark."
- **Secondary (Deep Onyx):** Provides the academic weight. Used for headings, primary text, and heavy structural blocks.
- **Tertiary (Data Gray):** A range of cool grays used for secondary information, borders, and subtle backgrounds to prevent visual fatigue.

The design system defaults to a **light mode** to ensure maximum legibility for long-form educational content, though dark "tech-blocks" may be used to highlight code or data visualizations.

## Typography

The typography strategy leverages three distinct typefaces to separate content types:

1.  **Geist (Headlines):** A technical, precise sans-serif used for all major headings. Its geometric construction reinforces the "Applied Science" and "Tech" narrative.
2.  **Hanken Grotesk (Body):** A highly legible, modern grotesque used for all long-form reading and interface text. It offers a professional, neutral tone.
3.  **JetBrains Mono (Data/Labels):** Used for technical metadata, code snippets, and small labels. This monospaced font signals precision and computational thinking.

**Scaling:** On mobile, display sizes are aggressively reduced while maintaining the heavy weight to preserve the brand's authoritative impact.

## Layout & Spacing

This design system employs a **Fixed-Fluid Hybrid Grid**. Content is constrained to a 12-column grid with a 1280px maximum width for readability in academic presentations, while background elements stretch to fill the viewport.

- **The 8px Rhythm:** All spacing (padding, margins, gap) must be multiples of 8px to ensure a structured, scientific appearance.
- **Vertical Rhythm:** Large vertical gaps (96px+) are used between major content sections to provide breathing room and emphasize the focus on individual data points.
- **Desktop:** 12-column grid, 24px gutters, 64px outer margins.
- **Tablet:** 6-column grid, 16px gutters, 32px outer margins.
- **Mobile:** 2-column grid, 16px gutters, 20px outer margins.

## Elevation & Depth

To maintain a clean, academic feel, this design system avoids heavy shadows. Instead, it uses **Tonal Layering and Low-Contrast Outlines**.

- **Surface Tiers:** Depth is communicated by shifting background colors. The base is White (`#FFFFFF`), while elevated containers or sidebars use Data Gray (`#F2F2F2`).
- **Technical Borders:** 1px solid borders in a light gray or deep onyx are used to define boundaries for cards and input fields, mimicking the aesthetic of technical diagrams.
- **Ghost Shadows:** If elevation is strictly required for floating elements (like dropdowns), use a 0px offset, 20px blur shadow with 5% opacity to avoid a "heavy" look.

## Shapes

The shape language is primarily **Soft (0.25rem)**. 

While the overall vibe is sharp and professional, the slight rounding of buttons and containers prevents the UI from feeling hostile or overly "brutalist." 

- **Standard Elements:** 4px (0.25rem) radius for buttons, inputs, and small cards.
- **Large Sections:** 8px (0.5rem) for large content blocks or image containers.
- **Interactive Elements:** Active chips or toggle switches may use a pill-shape to distinguish them from structural content.

## Components

- **Buttons:** Primary buttons use the Action Orange (`#FF4E07`) with white text and a 4px radius. Secondary buttons use a Deep Onyx outline. Interaction states involve a subtle darken on hover, never a drop shadow.
- **Cards:** Cards should be flat with a 1px `#E0E0E0` border. Use the `label-mono` type for any metadata (e.g., "MODULE 04").
- **Inputs:** Text fields use a 1px border that turns Action Orange on focus. Labels use the `label-mono` style for a technical feel.
- **Data Visualization:** Charts must use a palette of Action Orange, Deep Onyx, and varying shades of gray. Avoid "rainbow" color schemes to maintain professional integrity.
- **Lists:** Unordered lists use a small orange square instead of a standard bullet point to tie back to the brand "spark."
- **Code Blocks:** Use a Deep Onyx background with `jetbrainsMono` text in white or light gray for any technical demonstrations or formulas.