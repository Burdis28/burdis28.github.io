# Design System Reference: The Curated Blueprint

The design philosophy is **"Intentional Asymmetry"** — a premium editorial approach that feels like a digital monograph, not a template. Inspired by LinkedIn's structure but executed in a bespoke, architectural style.

---

## 1. Color Tokens

All colors are defined as Tailwind custom tokens. The palette is a Material Design 3-style "Deep Blue" hierarchy.

### Brand & Primary

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#004e99` | Main brand color — CTAs, active nav state, headings |
| `primary-container` | `#0a66c2` | Header accents, hover state of primary button, bullet dots |
| `primary-fixed` | `#d6e3ff` | Selection highlight background, "Featured" badge bg |
| `primary-fixed-dim` | `#a8c8ff` | Timeline year watermarks (at `opacity-20`) |
| `on-primary` | `#ffffff` | Text on primary-colored backgrounds |
| `on-primary-container` | `#dbe6ff` | Text on `primary-container` backgrounds |
| `on-primary-fixed-variant` | `#00468a` | Dark card background (Speaker/Talk highlight card) |
| `inverse-primary` | `#a8c8ff` | Icon color on dark `on-primary-fixed-variant` backgrounds |
| `surface-tint` | `#005eb5` | Hover state tint for interactive elements |

### Surface Hierarchy (light → dark = deeper layer)

| Token | Hex | Layer role |
|---|---|---|
| `surface-container-lowest` | `#ffffff` | Cards, modals — top interactive layer |
| `surface-container-low` | `#f1f4f6` | Inner card sections, input field backgrounds |
| `surface` | `#f7fafc` | Base page background |
| `surface-container` | `#ebeef0` | Section-level backgrounds, icon containers |
| `surface-container-high` | `#e5e9eb` | Skill/tag chip backgrounds |
| `surface-container-highest` | `#e0e3e5` | Tooltips, hover-cards (at 60% opacity) |
| `surface-bright` | `#f7fafc` | Card hover background (same as surface — subtle shift) |
| `surface-dim` | `#d7dadc` | Dimmed / disabled surface |
| `surface-variant` | `#e0e3e5` | Alternative surface |
| `inverse-surface` | `#2d3133` | Dark mode surface |
| `inverse-on-surface` | `#eef1f3` | Text on dark surfaces |

### Text

| Token | Hex | Usage |
|---|---|---|
| `on-surface` | `#181c1e` | Primary body text (never pure black) |
| `on-surface-variant` | `#414752` | Secondary text, metadata, date labels |
| `on-background` | `#181c1e` | Alias for `on-surface` |

### Borders

| Token | Hex | Usage |
|---|---|---|
| `outline` | `#727783` | Standard visible borders (used sparingly) |
| `outline-variant` | `#c1c6d4` | Ghost borders at 10–15% opacity only |

### Secondary

| Token | Hex | Usage |
|---|---|---|
| `secondary` | `#466270` | Secondary brand color |
| `secondary-container` | `#c6e4f4` | Language badge backgrounds (JS badge) |
| `on-secondary` | `#ffffff` | Text on secondary |
| `on-secondary-container` | `#4a6774` | Text on secondary-container |
| `secondary-fixed` | `#c9e7f7` | Fixed secondary |
| `secondary-fixed-dim` | `#adcbda` | Dimmed secondary |

### Tertiary (Accent / Warning tone)

| Token | Hex | Usage |
|---|---|---|
| `tertiary` | `#833900` | Tertiary brand accent |
| `tertiary-container` | `#a94b00` | "Talk" badge background |
| `on-tertiary` | `#ffffff` | Text on tertiary |
| `on-tertiary-container` | `#ffe0d1` | Text on tertiary-container |
| `tertiary-fixed` | `#ffdbca` | Light orange — language badge (TS badge) |
| `tertiary-fixed-dim` | `#ffb68e` | Dimmed orange |

### Semantic

| Token | Hex | Usage |
|---|---|---|
| `error` | `#ba1a1a` | Error state |
| `error-container` | `#ffdad6` | Error container background |
| `on-error` | `#ffffff` | Text on error |
| `on-error-container` | `#93000a` | Text on error-container |

---

## 2. Typography

### Font Families

| Role | Font | Weights | Usage |
|---|---|---|---|
| `font-headline` | **Manrope** | 400, 700, 800 | All headings (h1–h4), nav brand wordmark, section titles |
| `font-body` | **Inter** | 400, 500, 600, 700 | Body copy, paragraphs, form fields |
| `font-label` | **Inter** | 400, 500, 600, 700 | Nav links, metadata, chips, badges, labels |

Google Fonts import URL:
```
https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600;700&display=swap
```

### Type Scale

| Role | Size | Weight | Letter spacing | Color | Usage |
|---|---|---|---|---|---|
| `display-lg` | `3.5rem` (56px) | 800 (extrabold) | `-0.02em` | `on-surface` | Page-level editorial entry point |
| `headline-xl` | `3rem` (48px) | 800 | `-0.02em` | `primary` | Projects page H1 |
| `headline-lg` | `2.25rem` (36px) | 700–800 | tight | `on-surface` | Section headings |
| `headline-md` | `1.75rem` (28px) | 700 | normal | `on-surface` | Sub-section headings |
| `headline-sm` | `1.25rem` (20px) | 700–800 | tight | `on-surface` | Card titles, nav brand |
| `body-lg` | `1rem` (16px) | 400–500 | normal | `on-surface-variant` | Long-form paragraphs |
| `body-sm` | `0.875rem` (14px) | 400–500 | normal | `on-surface-variant` | Secondary descriptions |
| `label-md` | `0.75rem` (12px) | 700 | `widest` | `on-surface-variant` | Metadata, dates, badge text |
| `label-sm` | `0.625rem` (10px) | 700 | `widest`, uppercase | `on-surface-variant` | Micro labels, chip text |

---

## 3. Border Radius

Custom scale — deliberately conservative to convey an "engineered" aesthetic:

| Token | Value | Usage |
|---|---|---|
| `DEFAULT` | `0.125rem` (2px) | Code blocks, technical/sharp elements |
| `lg` | `0.25rem` (4px) | Subtle rounding — rarely used |
| `xl` | `0.5rem` (8px) | Cards, containers — most common |
| `full` | `0.75rem` (12px) | Pill-shaped chips and tags |

> Note: `rounded-full` in this system = `0.75rem`, NOT the default Tailwind `9999px`. This is intentional — pills should look refined, not balloon-like.

Exceptions:
- Timeline dot: `rounded-full` standard (`w-4 h-4 rounded-full`) — uses 50% for perfect circle
- Avatar: `rounded-full` for circular avatar in nav
- Profile photo: `rounded-xl` (0.5rem)

---

## 4. Shadows & Elevation

### Principle
Depth is achieved through **color layering**, not shadows. Stack `surface-container-lowest` (white) cards on `surface-container-low` sections for natural lift.

### Editorial Shadow (`.editorial-shadow`)
Used for floating cards and the sidebar card:
```css
.editorial-shadow {
  box-shadow: 0 20px 40px rgba(24, 28, 30, 0.06);
}
```
High-diffusion, very soft — never harsh. Shadow tint is `on-surface` (#181c1e), never pure black.

### Glassmorphism Nav
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(12px); /* backdrop-blur-md */
border-bottom: 1px solid rgba(193, 198, 212, 0.15); /* outline-variant/15 */
```

### Ghost Border Fallback
When a border is needed for accessibility:
```css
border: 1px solid rgba(193, 198, 212, 0.10); /* border-outline-variant/10 */
/* or */
border: 1px solid rgba(193, 198, 212, 0.15); /* border-outline-variant/15 */
```

---

## 5. Layout

### Grid System
- Container: `max-w-7xl mx-auto px-6`
- Top offset for fixed nav: `pt-32` on `<main>`
- 12-column CSS grid: `grid grid-cols-1 lg:grid-cols-12 gap-12`
  - Left sidebar: `lg:col-span-3`
  - Main content: `lg:col-span-9`

### Section Spacing
Major section separators: `space-y-20` or `space-y-24` (5rem–6rem). No horizontal lines.

---

## 6. Component Patterns

### Top Navigation Bar
```
Fixed · z-50 · h-16 · frosted glass
├── Left:   Brand wordmark (Manrope, font-black, text-primary)
├── Center: Nav links (hidden md:flex, space-x-8)
│           Active: text-primary + border-b-2 border-primary
│           Inactive: text-on-surface-variant hover:text-primary
└── Right:  Icon buttons (notifications, message) + avatar circle
```

### Left Sidebar Card
```
bg-surface-container-lowest · rounded-xl · p-8 · editorial-shadow
├── Profile photo (128×128, rounded-xl, border-2 border-primary-container)
├── Name (font-headline font-bold text-2xl)
├── Title (text-sm text-on-surface-variant)
├── Social icon buttons (w-10 h-10, rounded-lg, hover: bg-primary text-on-primary)
├── Download Resume button (full-width, bg-primary, rounded-xl)
└── Tech Stack section
    └── Chips (bg-surface-container-high, rounded-lg, text-[10px], uppercase)
```

### Cards
```
bg-surface-container-lowest · rounded-xl · border border-outline-variant/10
On hover: bg-surface-bright + shadow-md
Internal padding: p-8 (2rem) — "expensive" breathing room
```

### Skill/Tag Chips (Technical Arsenal)
```
px-4 py-2 · bg-surface-container-low · rounded-full
border border-outline-variant/10 · hover:border-primary/50
font-label font-semibold · text-on-surface-variant
```

### Skill Chips (Sidebar "Tech Stack")
```
px-3 py-1.5 · bg-surface-container-high · rounded-lg
text-[10px] font-bold text-on-surface · uppercase tracking-wider
```

### Buttons
```
Primary:    bg-primary text-on-primary rounded-xl
            hover:bg-primary-container transition-all
Secondary:  border-2 border-primary text-primary rounded-full
            hover:bg-primary/5
Tertiary:   text-primary font-bold (no bg, no border)
            used for "Read More", "View Source" links
```

### Timeline Item (Experience page)
```
Relative container · pl-16
├── Year watermark:  absolute, text-7xl, text-primary-fixed-dim, opacity-20
│                   pointer-events-none, select-none, -left-4 top-0
├── Timeline dot:    absolute, left-[21px], top-1
│                   w-4 h-4 rounded-full border-4
│                   Active:  border-primary bg-white
│                   Past:    border-outline-variant bg-white
└── Content row:    flex gap-6
    ├── Company icon: w-16 h-16, bg-surface-container, rounded-xl
    └── Text block:   role, company (text-primary), period badge, bullet list
```

Timeline dashed line (`experience-timeline::before`):
```css
.experience-timeline::before {
  content: '';
  position: absolute;
  left: 28px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    transparent, transparent 4px,
    #c1c6d4 4px, #c1c6d4 8px
  );
  opacity: 0.3;
}
```

### Period Badge
```
text-sm font-label text-on-surface-variant
bg-surface-container-low px-3 py-1 rounded-full
uppercase tracking-widest font-bold
```

### Bullet Points (Experience list items)
```
<span class="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 shrink-0">
```

### Education Item
```
border-l-2 · pl-4
Active (current): border-primary-fixed
Older:            border-outline-variant/30
```

### Certification Item
```
flex items-center gap-4 · p-4 · rounded-lg
bg-surface-container-low · hover:bg-surface-container-high
Icon box: w-10 h-10 bg-white rounded border border-outline-variant/20
```

### Project Card (Bento)
```
bg-surface-container-lowest · p-8 · rounded-xl
border border-outline-variant/10 · editorial-shadow
group cursor-pointer
hover: bg-surface-bright · transition-all duration-300
Image: group-hover:scale-105 transition-transform duration-500
```
Featured project: `md:col-span-12` (full width)
Regular projects: `md:col-span-6` (half width)

### Newsletter CTA
```
bg-primary-container · rounded-2xl · p-12 · relative overflow-hidden
Decorative blob: absolute -right-20 -bottom-20 w-64 h-64
                 bg-primary rounded-full blur-3xl opacity-20
Input: bg-white/10 border border-white/20 text-white rounded-xl
       placeholder:text-white/60 focus:ring-2 focus:ring-white
Button: bg-white text-primary rounded-xl font-bold
```

### Footer
```
bg-surface (or bg-surface-container-low) · border-t border-outline-variant/15 · py-8
Copyright: font-body text-[10px] uppercase tracking-widest text-on-surface-variant
Links:     same style, hover:text-primary
```

---

## 7. Icons

**Material Symbols Outlined** — Google Fonts CDN:
```
https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap
```

Global style:
```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}
```

Filled variant (used for premium icon): `style='font-variation-settings: "FILL" 1;'`

Key icon names used:
- Nav: `notifications`, `message`
- Sidebar: `code` (GitHub), `share` (LinkedIn), `language` (website), `token` (tech stack label), `download`
- Experience: `developer_mode_tv`, `cloud_done`, `terminal`, `corporate_fare`, `developer_board`
- Education: `school`, `verified`, `cloud`, `security`, `workspace_premium`
- Skills: `palette` (frontend), `dns` (backend), `terminal` (DevOps)
- UI: `arrow_forward`, `open_in_new`, `add`, `location_on`, `link`

---

## 8. Design Rules (Do's and Don'ts)

### Always
- Use `on-surface` (#181c1e) for text — never `#000000`
- Define section boundaries via background color shifts, not borders
- Use `outline-variant` borders at maximum 15% opacity (`/10` or `/15`)
- Use `20`–`24` spacing (5–6rem) between major sections
- Use `primary-container` (#0a66c2) for small accents (bullet dots, "Active" state)
- Apply `editorial-shadow` to floating cards and the sidebar

### Never
- Use `1px solid` black/dark borders to separate list items
- Use standard `0.25rem` rounding on everything — differentiate cards, chips, code
- Apply heavy drop shadows — keep shadows ambient and diffuse
- Mix raw hex values and Tailwind tokens — always use the token
