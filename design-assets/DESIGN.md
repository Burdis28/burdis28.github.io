# Design System Strategy: The Architectural Portfolio

## 1. Overview & Creative North Star
**The Creative North Star: "The Curated Blueprint"**

This design system moves away from the "template" feel of standard professional networks by embracing a high-end editorial approach. We are not just listing data; we are architecting a narrative. While the inspiration is LinkedIn, the execution is bespoke. We achieve this through **Intentional Asymmetry** and **Tonal Depth**. Instead of a rigid, centered grid, we use expansive white space and off-axis layouts to draw the eye toward key achievements. The system feels like a premium digital monograph—authoritative, clean, and meticulously organized.

---

## 2. Colors
Our palette is rooted in a professional "Deep Blue" foundation, but it is elevated through a sophisticated hierarchy of neutral tones that provide "soul" to the interface.

- **Primary & Tonal Brand:** Use `primary` (#004e99) for high-impact actions and `primary_container` (#0a66c2) for signature headers. To avoid a flat look, utilize `surface_tint` (#005eb5) for subtle interactive states.
- **The "No-Line" Rule:** We strictly prohibit the use of 1px solid `#000` or high-contrast borders for sectioning. Boundaries must be defined through **Background Color Shifts**. For example, a `surface_container_low` (#f1f4f6) section should sit directly against a `surface` (#f7fafc) background to create a "ghost" boundary.
- **Surface Hierarchy & Nesting:** Treat the UI as physical layers. 
    - **Base Layer:** `surface` (#f7fafc)
    - **Section Layer:** `surface_container` (#ebeef0)
    - **Interactive Card Layer:** `surface_container_lowest` (#ffffff)
- **The Glass & Gradient Rule:** For hero sections or floating navigation, use a "Frosted Glass" effect: `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur. Use a subtle linear gradient from `primary` to `primary_container` for primary CTAs to add a premium, tactile feel.

---

## 3. Typography
The typography system pairs **Manrope** (Display/Headline) for a geometric, modern authority with **Inter** (Body/Label) for world-class legibility.

- **Display & Headline (Manrope):** Use `display-lg` (3.5rem) and `headline-md` (1.75rem) to create an editorial "Entry Point." These should be bold and carry a tighter letter-spacing (-0.02em) to look "locked-in" and professional.
- **Body & Labels (Inter):** All long-form content uses `body-lg` (1rem). The contrast between the architectural Manrope and the neutral Inter creates a "Designer-as-Developer" persona.
- **Hierarchy through Scale:** Use `label-md` (0.75rem) in `on_surface_variant` (#414752) for metadata (e.g., dates of employment). This ensures that secondary information stays secondary without the need for intrusive lines or boxes.

---

## 4. Elevation & Depth
In this design system, depth is a function of color, not just shadow.

- **The Layering Principle:** Avoid standard drop shadows. Instead, "stack" your tokens. Place a `surface_container_lowest` (Pure White) card on top of a `surface_container_low` section. The contrast between `#ffffff` and `#f1f4f6` creates a sophisticated, "natural" lift.
- **Ambient Shadows:** For floating elements (like a contact modal), use a high-diffusion shadow: `0 20px 40px rgba(24, 28, 30, 0.06)`. Note the use of `on_surface` (#181c1e) as the shadow tint rather than pure black.
- **The "Ghost Border" Fallback:** If a layout requires a border (e.g., for accessibility in high-glare environments), use `outline_variant` (#c1c6d4) at **15% opacity**. It should be felt, not seen.
- **Glassmorphism:** Use `surface_container_highest` (#e0e3e5) with 60% opacity for tooltips and hover-cards to maintain a sense of environmental continuity.

---

## 5. Components

### Cards (The "Project Module")
*   **Style:** No borders. Use `surface_container_lowest` background.
*   **Padding:** Use Spacing `8` (2rem) for internal gutters to provide an "expensive" amount of breathing room.
*   **Interaction:** On hover, shift background to `surface_bright` and apply the Ambient Shadow.

### Buttons
*   **Primary:** `primary` background with `on_primary` text. Use Roundedness `md` (0.375rem).
*   **Secondary:** `secondary_container` background with `on_secondary_container` text. No border.
*   **Tertiary:** Transparent background with `primary` text. Use for "View Source" or "Read More" links.

### Chips (Skill Tags)
*   **Style:** `surface_container_high` (#e5e9eb) background. 
*   **Typography:** `label-md` bold. 
*   **Rounding:** `full` (9999px) for a "pill" look that contrasts with the architectural cards.

### Input Fields
*   **Style:** `surface_container_low` background with a `2px` bottom-only highlight in `outline_variant`. 
*   **Focus State:** Transition the bottom highlight to `primary` (#004e99).

### Additional Component: The "Timeline Node"
*   For the Experience section, avoid the standard vertical line. Instead, use a large `headline-lg` year (e.g., '2023') in `primary_fixed_dim` (#a8c8ff) as a watermark background, with the job details layered on top.

---

## 6. Do's and Don'ts

### Do:
- **Do** use `20` (5rem) or `24` (6rem) spacing between major sections to emphasize the editorial feel.
- **Do** use `primary_container` (#0a66c2) for small accents, like bullet points or "Active" status indicators.
- **Do** nest a `surface_container_highest` element inside a `surface_container` to highlight a specific feature within a card.

### Don't:
- **Don't** use 1px solid lines to separate list items. Use Spacing `4` (1rem) of vertical white space instead.
- **Don't** use pure black (#000000) for text. Always use `on_surface` (#181c1e) to keep the contrast professional and soft on the eyes.
- **Don't** use standard `0.25rem` (default) rounding for everything. Use `none` or `sm` for a sharper, more "engineered" aesthetic when showcasing technical code snippets.