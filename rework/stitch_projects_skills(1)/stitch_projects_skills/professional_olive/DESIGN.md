# Design System Specification: The Editorial Professional

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Architect"**

This design system moves away from the generic "template" portfolio. Instead, it draws inspiration from high-end architectural journals and premium editorial layouts. The goal is to present a developer’s work not just as code, but as a curated collection of engineered solutions.

We achieve this through **Intentional Asymmetry**—breaking the rigid 12-column grid with staggered content blocks—and **Tonal Depth**. By utilizing a high-contrast palette of Deep Olive and Honey against a pristine white canvas, the system feels authoritative (corporate) yet deeply personal (bespoke). The interface should feel like a physical stack of fine stationery: layered, tactile, and premium.

---

## 2. Colors & Surface Philosophy
The palette is rooted in organic, sophisticated tones that signal maturity and stability.

### Primary Palette
- **Primary (`#3e5219`):** Our foundational weight. Used for high-emphasis text and branding.
- **Primary Container (`#556b2f`):** The "Professional Olive." Use this for hero sections and large interaction blocks.
- **Tertiary/Accent (`#753d00` / Honey):** Use sparingly to guide the eye. This is your "Call to Action" color, providing warmth to the cooler olive tones.

### The "No-Line" Rule
To maintain an editorial feel, **1px solid borders are strictly prohibited** for sectioning or containment. 
- **Definition through Tone:** Separate sections by shifting from `surface` (#f9f9f9) to `surface_container_low` (#f3f3f4). 
- **Surface Nesting:** Create depth by stacking. A card (`surface_container_lowest` / #ffffff) should sit on a section background (`surface_container_low`). This creates a soft, natural "lift" without visual clutter.

### The Glass & Gradient Rule
Avoid flat, "dead" blocks of color. 
- **Signature Gradients:** For main Hero backgrounds or primary buttons, use a subtle linear gradient from `primary` to `primary_container`. This adds a "soul" to the color that feels custom-coded rather than default.
- **Glassmorphism:** Navigation bars and floating menus must use `surface` at 80% opacity with a `backdrop-blur` of 12px. This ensures the portfolio feels integrated and modern.

---

## 3. Typography
The typographic hierarchy is designed to mimic a high-end magazine.

- **Display & Headlines (Manrope):** These are your "Statement" pieces. Headlines should use `tight` letter-spacing (-0.02em) to feel authoritative.
    - *Display-Lg (3.5rem):* Reserved for Hero statements.
    - *Headline-Sm (1.5rem):* Used for project titles.
- **Body & Labels (Inter):** Inter provides the functional "engine" of the site. It is highly legible and neutral, allowing the olive accents to take center stage.
    - *Body-Md (0.875rem):* The standard for project descriptions.
    - *Label-Sm (0.6875rem):* Used for metadata, tech stacks, and dates. Always uppercase with +0.05em letter-spacing for a "label-maker" aesthetic.

---

## 4. Elevation & Depth
Depth is a psychological cue for importance. In this system, we use light and layering rather than heavy shadows.

- **The Layering Principle:** 
    - **Base:** `surface` (#f9f9f9)
    - **Sectioning:** `surface_container_low` (#f3f3f4)
    - **Elevated Cards:** `surface_container_lowest` (#ffffff)
- **Ambient Shadows:** When a card requires a "hover" lift, use an extra-diffused shadow: `box-shadow: 0 12px 40px rgba(26, 28, 28, 0.04)`. The shadow color is derived from `on_surface`, making it feel like a natural occlusion of light.
- **The "Ghost Border":** If a container needs more definition (e.g., in high-glare environments), use the `outline_variant` token at 15% opacity. It should be felt, not seen.

---

## 5. Components

### Buttons
- **Primary:** Background `primary_container`, Text `on_primary`. Rounded at `0.25rem` (ROUND_FOUR). 
- **Secondary:** Background `transparent`, "Ghost Border" (outline_variant @ 20%).
- **Tertiary (The "Honey" CTA):** Background `tertiary`, Text `on_tertiary`. Use exclusively for the final conversion point (e.g., "Hire Me" or "Contact").

### Cards (Project Showcases)
- **Rules:** No borders. No dividers.
- **Structure:** Use `surface_container_lowest` for the card body. Use 40px of internal padding to give the content "room to breathe." Project images should have a subtle 4px corner radius to match the system's `ROUND_FOUR` logic.

### Inputs & Fields
- **Styling:** Use `surface_container_high` for the input fill. 
- **Interaction:** On focus, the background shifts to `surface_container_lowest` with a 1px `primary` ghost border. This provides a "lighting up" effect.

### Chips (Tech Stack)
- **Action Chips:** Use `secondary_container` with `on_secondary_container` text. These should be small, uppercase Inter (label-sm) to indicate technical tags without distracting from project titles.

---

## 6. Do's and Don'ts

### Do:
- **Do use whitespace as a separator.** If you feel the need to add a line, add 24px of padding instead.
- **Do use "Honey" (`tertiary`) for small accents.** A single 4px orange dot next to a "Live Demo" link is more powerful than an entirely orange button.
- **Do employ asymmetric margins.** Align your headline to the left, but push your body text 2 columns to the right to create a sophisticated, editorial rhythm.

### Don't:
- **Don't use pure black (#000000).** Always use `on_surface` (#1a1c1c) for text to maintain the organic olive-toned atmosphere.
- **Don't use standard shadows.** If a shadow looks like a "drop shadow," it is too heavy. It should look like a "glow" or "mist."
- **Don't use full-width sections for everything.** Allow the background `surface` to wrap around containers to create a "boxed editorial" look.