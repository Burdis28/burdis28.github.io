# Design System Reference: The Editorial Professional

The design philosophy is **"The Digital Architect"** — a premium editorial approach inspired by high-end architectural journals. It feels like a curated collection of engineered solutions, not a template.

---

## 1. Color Tokens

All colors are defined as Tailwind custom tokens in `src/styles/global.css`. The palette is **Professional Olive** — a Material Design 3-style hierarchy rooted in deep olive and honey tones.

### Brand & Primary

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#3e5219` | Main brand color — headings, active nav state, key UI elements |
| `primary-container` | `#556b2f` | Hero sections, large interaction blocks, CTA backgrounds |
| `primary-fixed` | `#d2eca2` | Selection highlight background |
| `primary-fixed-dim` | `#b6d088` | Dimmed primary accent |
| `on-primary` | `#ffffff` | Text on primary-colored backgrounds |
| `on-primary-container` | `#d0eba1` | Text on `primary-container` backgrounds |
| `on-primary-fixed` | `#131f00` | Text on primary-fixed backgrounds (selection text) |
| `on-primary-fixed-variant` | `#394d14` | Variant text on primary-fixed |
| `inverse-primary` | `#b6d088` | Icon color on dark backgrounds |
| `surface-tint` | `#50652a` | Hover state tint for interactive elements |

### Surface Hierarchy (light → dark = deeper layer)

| Token | Hex | Layer role |
|---|---|---|
| `surface-container-lowest` | `#ffffff` | Cards, modals — top interactive layer |
| `surface-container-low` | `#f3f3f4` | Inner card sections, sidebar background |
| `surface` | `#f9f9f9` | Base page background |
| `surface-container` | `#eeeeee` | Section-level backgrounds, icon containers |
| `surface-container-high` | `#e8e8e8` | Skill/tag chip backgrounds, inputs |
| `surface-container-highest` | `#e2e2e2` | Tooltips, hover-cards, certifications block |
| `surface-bright` | `#f9f9f9` | Card hover background |
| `surface-dim` | `#dadada` | Dimmed / disabled surface |
| `surface-variant` | `#e2e2e2` | Alternative surface |
| `inverse-surface` | `#2f3131` | Dark mode surface |
| `inverse-on-surface` | `#f0f1f1` | Text on dark surfaces |

### Text

| Token | Hex | Usage |
|---|---|---|
| `on-surface` | `#1a1c1c` | Primary body text (never pure black) |
| `on-surface-variant` | `#45483c` | Secondary text, metadata, date labels |
| `on-background` | `#1a1c1c` | Alias for `on-surface` |

### Borders

| Token | Hex | Usage |
|---|---|---|
| `outline` | `#75796b` | Standard visible borders (used sparingly) |
| `outline-variant` | `#c5c8b8` | Ghost borders at 10–20% opacity only |

### Secondary (Sage)

| Token | Hex | Usage |
|---|---|---|
| `secondary` | `#586246` | Secondary brand — company names in experience timeline |
| `secondary-container` | `#dce7c3` | "The Narrative" badge background |
| `secondary-fixed` | `#dce7c3` | Tech tag chip backgrounds |
| `secondary-fixed-dim` | `#c0cba9` | Dimmed secondary |
| `on-secondary` | `#ffffff` | Text on secondary |
| `on-secondary-container` | `#5e684c` | Text on secondary-container |
| `on-secondary-fixed` | `#161e08` | Text on secondary-fixed |
| `on-secondary-fixed-variant` | `#414a30` | Variant text on secondary-fixed (tech tag text) |

### Tertiary (Honey / CTA)

Use sparingly to guide the eye. The "Call to Action" color.

| Token | Hex | Usage |
|---|---|---|
| `tertiary` | `#753d00` | CTA buttons ("Hire Me"), section labels, accents |
| `tertiary-container` | `#985100` | Tertiary container backgrounds |
| `on-tertiary` | `#ffffff` | Text on tertiary |
| `on-tertiary-container` | `#ffd9bf` | Text on tertiary-container |
| `tertiary-fixed` | `#ffdbca` | Light honey |
| `tertiary-fixed-dim` | `#ffb68e` | Dimmed honey |

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
| `font-headline` | **Manrope** | 600, 700, 800 | All headings (h1–h4), nav brand wordmark, section titles |
| `font-body` | **Inter** | 400, 500, 600 | Body copy, paragraphs |
| `font-label` | **Inter** | 400, 500, 600 | Nav links, metadata, chips, badges, labels |

Google Fonts import URL:
```
https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600&display=swap
```

### Type Scale

| Role | Size | Weight | Letter spacing | Usage |
|---|---|---|---|---|
| `display-lg` | `4.375rem` (70px) | 800 | `-0.02em` | Page hero h1 (large screens) |
| `display-md` | `3.75rem` (60px) | 800 | tight | Contact page h1 |
| `headline-lg` | `3rem` (48px) | 700–800 | tight | Section h1s |
| `headline-md` | `1.875rem` (30px) | 700 | tight | Section h2s |
| `headline-sm` | `1.5rem` (24px) | 700 | normal | Timeline role names, card titles |
| `body-lg` | `1.125rem` (18px) | 400 | normal | Hero paragraph text |
| `body-md` | `1rem` (16px) | 400 | normal | General body copy |
| `label-md` | `0.75rem` (12px) | 700 | `widest` | Section category labels |
| `label-sm` | `0.6875rem` (11px) | 700 | `widest`, uppercase | Metadata, chips, micro labels |
| `micro` | `0.625rem` (10px) | 700 | `widest`, uppercase | Footer, nav sub-labels |

---

## 3. Border Radius

Custom scale aligned with the editorial aesthetic — sharp enough to feel "engineered":

| Token | Value | Usage |
|---|---|---|
| `DEFAULT` | `0.25rem` (4px) | Input fields, sharp elements |
| `lg` | `0.5rem` (8px) | Inline elements, small chips |
| `xl` | `0.75rem` (12px) | Cards, containers |
| `full` | `9999px` | True pill-shaped chips and tags |

---

## 4. Shadows & Elevation

### Principle: "The No-Line Rule"
Depth is achieved through **tonal layering**, not borders or heavy shadows.
- Stack `surface-container-lowest` (white) cards on `surface-container-low` sections for natural lift
- Never use `1px solid` borders for section separators — use background color shifts instead

### Ambient Shadow (editorial)
Used for floating cards:
```css
box-shadow: 0 12px 40px rgba(26, 28, 28, 0.04);
```

### Glassmorphism Nav
```css
background: rgba(249, 249, 249, 0.7); /* bg-surface/70 */
backdrop-filter: blur(20px); /* backdrop-blur-xl */
```

### Ghost Border (accessibility fallback)
When a border is needed for visual definition:
```css
border: 1px solid rgba(197, 200, 184, 0.20); /* border-outline-variant/20 */
```

---

## 5. Layout

### Grid System
- Sidebar: fixed, `w-72` (288px), `left-0 top-20 h-[calc(100vh-5rem)]`
- Main content: `lg:ml-72 pt-20 pb-12 px-6 lg:px-16`
- No centered container — content flows full-width within the offset region
- Max width: `max-w-[1400px]`

### Section Spacing
Major section separators: `mb-24` (6rem). No horizontal lines — use the "No-Line Rule".

---

## 6. Component Patterns

### Top Navigation Bar
```
Fixed · z-50 · h-20 · frosted glass (bg-surface/70 backdrop-blur-xl)
├── Left:   Brand wordmark (Manrope, font-bold, text-primary)
├── Center: Nav links (hidden md:flex, gap-8, font-headline font-semibold)
│           Active: text-primary + border-b-2 border-primary
│           Inactive: text-on-surface-variant hover:text-primary transition-colors
└── Right:  Hamburger (mobile only)
```

### Left Sidebar
```
Fixed · left-0 top-20 · h-[calc(100vh-5rem)] · w-72
bg-surface-container-low · hidden lg:flex flex-col
├── Profile section:
│   ├── Avatar (w-20 h-20, rounded-full)
│   ├── Name (font-headline font-bold text-lg)
│   └── Title (text-on-surface-variant font-label text-sm)
├── Social links:
│   └── Each: flex items-center gap-3 px-4 py-3 · hover:bg-surface-container-highest/50
│             material-symbols-outlined + font-label text
├── Bottom actions (mt-auto):
│   ├── Download Resume: bg-surface-container-highest text-primary rounded-lg
│   └── Hire Me: bg-primary text-on-primary font-headline font-bold rounded-lg
```

### Footer
```
lg:ml-72 · py-12 · text-center
font-label text-xs text-on-surface-variant · uppercase tracking-widest
Flex: justify-between on md+
```

### Mobile Bottom Nav
```
md:hidden · fixed bottom-0 · h-16 · bg-surface-container-low/90 backdrop-blur-lg
5 items: Home, Experience, Projects, Blog, Contact
Each: flex-col items-center · material-symbols-outlined + text-[10px] uppercase
Active: text-primary (filled icon variant)
```

### Experience Timeline Item
```
relative pl-8 md:pl-12 · border-l-2 border-surface-container-highest
├── Timeline dot:  absolute -left-[9px] top-0 · w-4 h-4 rounded-full ring-4 ring-surface
│                  Active: bg-primary · Past: bg-surface-container-highest
├── Header row:    flex-col md:flex-row justify-between gap-4
│   ├── Role:       text-2xl font-headline font-bold text-on-surface
│   ├── Company:    text-lg font-label font-medium text-secondary
│   └── Period badge: px-4 py-1.5 bg-surface-container-low rounded-full border-outline-variant/10
│                     Active: text-primary · Past: text-on-surface-variant
├── Bullets:       space-y-2 · each with w-1.5 h-1.5 rounded-full bg-primary dot
└── Tags:          flex flex-wrap gap-2
                   px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant
                   text-xs font-bold rounded-full uppercase tracking-tight
```

### Education Item (Bento grid card)
```
.group
├── Period:      text-sm font-label font-bold text-tertiary
├── Degree:      text-xl font-headline font-bold · group-hover:text-primary
├── Institution: text-on-surface-variant font-label
└── Note:        text-sm italic text-on-surface-variant/70 (optional)
```

### Certification Item
```
li flex items-start gap-4
├── Dot:  w-2 h-2 rounded-full bg-primary mt-1 shrink-0
└── Text:
    ├── Name: font-headline font-bold text-sm text-on-surface
    └── Meta: text-xs text-on-surface-variant
```

### Project Card (Bento)
```
bg-surface-container-lowest · rounded-xl
group cursor-pointer · hover:shadow-editorial transition-all
├── Image:    grayscale → grayscale-0 on hover · scale-105 on hover
│             rounded-lg · overflow-hidden
├── Tag chips: bg-surface-container-highest text-on-surface-variant
│              px-3 py-1 rounded-sm text-[0.6875rem] font-label font-bold uppercase
├── Title:    font-headline font-bold · group-hover:text-primary transition-colors
├── Links:    material-symbols-outlined (open_in_new, code)
├── Description: text-on-surface-variant leading-relaxed
└── CTA row:  "View Project" + north_east icon · border-t border-surface-container-low pt-6
```
Featured: `md:col-span-12` (full width) — Regular: `md:col-span-6`

### Skill Category (Technical Arsenal)
```
space-y-6
├── Header: material-symbols-outlined text-primary + font-headline font-bold text-lg
└── Chips:  px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant
            font-label font-bold rounded-full text-xs uppercase tracking-tight
```

### Blog FeaturedPost
```
md:col-span-12 · bg-surface-container-low rounded-lg p-6 lg:p-12
grid grid-cols-1 lg:grid-cols-2 gap-8
├── Image:   aspect-video lg:aspect-square rounded-md · scale on hover
├── Tags:    bg-surface-container-highest rounded-sm text-[0.6875rem]
├── Title:   text-3xl md:text-4xl font-black font-headline · group-hover:text-primary
└── Meta:    text-xs font-label uppercase tracking-widest text-on-surface-variant/60
```

### Blog PostCard
```
md:col-span-6 · offset alternate posts by mt-24 (staggered editorial layout)
├── Image:   aspect-video rounded-md · scale on hover
├── Tag:     bg-surface-container-highest rounded-sm text-[0.6rem]
├── Title:   text-2xl font-black font-headline · group-hover:text-primary
└── Meta:    text-[0.6875rem] font-label uppercase tracking-widest
```

### Contact CTA Banner
```
bg-primary text-on-primary · p-12 rounded-2xl
Decorative blur blob: bg-secondary/10 rounded-full blur-3xl (top right)
Button: bg-tertiary text-on-tertiary (Honey CTA)
```

### Newsletter / Blog CTA Section
```
bg-primary · p-12 lg:p-24 rounded-lg · relative overflow-hidden
Decorative triangle: SVG fill-white opacity-10
Buttons:
  Primary: bg-white text-primary (Email)
  Ghost:   bg-white/10 border-white/20 text-white (All Contacts)
```

---

## 7. Icons

**Material Symbols Outlined** — Google Fonts CDN:
```
https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap
```

Global style in `global.css`:
```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}
```

Filled variant (hero decorative icons): `style='font-variation-settings: "FILL" 1;'`

Key icon names used:
- Nav/Sidebar: `code` (GitHub), `share` (LinkedIn), `language` (website), `download`
- Experience: `school`, `verified`, `architecture`, `work`
- Skills: `palette`, `dns`, `terminal`
- UI: `arrow_forward`, `north_east`, `open_in_new`, `mail`, `location_on`, `menu_book`
- Mobile nav: `home`, `work`, `terminal`, `menu_book`, `mail`

---

## 8. Design Rules (Do's and Don'ts)

### Always
- Use `on-surface` (`#1a1c1c`) for text — never `#000000`
- Define section boundaries via background color shifts, not border lines
- Use `outline-variant` borders at maximum 20% opacity
- Use `mb-24` (6rem) between major sections — whitespace is a separator
- Use `tertiary` (`#753d00`) sparingly — only for primary CTA action points
- Apply glassmorphism to the top nav: `bg-surface/70 backdrop-blur-xl`
- Use ambient shadows only: `0 12px 40px rgba(26, 28, 28, 0.04)`

### Never
- Use `1px solid` dark borders to separate sections or list items
- Use pure `#000000` for any text
- Apply heavy drop shadows — shadows should look like "mist", not a hard edge
- Mix raw hex values and Tailwind tokens — always use the token name
- Use `rounded-full` for cards — reserve it for pill chips only
