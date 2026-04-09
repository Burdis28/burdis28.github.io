# Step 02 — Design System Setup

Transfer all design tokens from the Professional Olive palette into Tailwind v4 CSS-first configuration and establish global CSS utilities.

**Prerequisite:** Step 01 complete. `tailwindcss` and `@tailwindcss/vite` installed.

---

## 2.1 Create `src/styles/global.css`

This is the single source of truth for all design tokens. Tailwind v4 uses `@theme` in CSS instead of `tailwind.config.js`.

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* --- Primary (Deep Olive) --- */
  --color-primary:                    #3e5219;
  --color-primary-container:          #556b2f;
  --color-primary-fixed:              #d2eca2;
  --color-primary-fixed-dim:          #b6d088;
  --color-on-primary:                 #ffffff;
  --color-on-primary-container:       #d0eba1;
  --color-on-primary-fixed:           #131f00;
  --color-on-primary-fixed-variant:   #394d14;
  --color-inverse-primary:            #b6d088;
  --color-surface-tint:               #50652a;

  /* --- Surface hierarchy --- */
  --color-surface-container-lowest:   #ffffff;
  --color-surface-container-low:      #f3f3f4;
  --color-surface:                    #f9f9f9;
  --color-background:                 #f9f9f9;
  --color-surface-bright:             #f9f9f9;
  --color-surface-container:          #eeeeee;
  --color-surface-container-high:     #e8e8e8;
  --color-surface-container-highest:  #e2e2e2;
  --color-surface-variant:            #e2e2e2;
  --color-surface-dim:                #dadada;
  --color-inverse-surface:            #2f3131;
  --color-inverse-on-surface:         #f0f1f1;

  /* --- Text --- */
  --color-on-surface:                 #1a1c1c;
  --color-on-surface-variant:         #45483c;
  --color-on-background:              #1a1c1c;

  /* --- Borders --- */
  --color-outline:                    #75796b;
  --color-outline-variant:            #c5c8b8;

  /* --- Secondary (Sage) --- */
  --color-secondary:                  #586246;
  --color-secondary-container:        #dce7c3;
  --color-secondary-fixed:            #dce7c3;
  --color-secondary-fixed-dim:        #c0cba9;
  --color-on-secondary:               #ffffff;
  --color-on-secondary-container:     #5e684c;
  --color-on-secondary-fixed:         #161e08;
  --color-on-secondary-fixed-variant: #414a30;

  /* --- Tertiary (Honey / CTA) --- */
  --color-tertiary:                   #753d00;
  --color-tertiary-container:         #985100;
  --color-tertiary-fixed:             #ffdbca;
  --color-tertiary-fixed-dim:         #ffb68e;
  --color-on-tertiary:                #ffffff;
  --color-on-tertiary-container:      #ffd9bf;
  --color-on-tertiary-fixed:          #331200;
  --color-on-tertiary-fixed-variant:  #773300;

  /* --- Semantic --- */
  --color-error:                      #ba1a1a;
  --color-error-container:            #ffdad6;
  --color-on-error:                   #ffffff;
  --color-on-error-container:         #93000a;

  /* --- Typography --- */
  --font-headline: 'Manrope', sans-serif;
  --font-body:     'Inter', sans-serif;
  --font-label:    'Inter', sans-serif;

  /* --- Border radius --- */
  --radius-DEFAULT: 0.25rem;
  --radius-lg:      0.5rem;
  --radius-xl:      0.75rem;
  --radius-2xl:     1rem;
  --radius-full:    9999px;

  /* --- Shadows --- */
  --shadow-editorial: 0 12px 40px rgba(26, 28, 28, 0.04);
  --shadow-card:      0 20px 40px rgba(26, 28, 28, 0.06);
}

@layer base {
  html {
    font-family: 'Inter', sans-serif;
    color: #1a1c1c;
    background-color: #f9f9f9;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Manrope', sans-serif;
  }

  ::selection {
    background-color: #d2eca2;
    color: #131f00;
  }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  font-style: normal;
  vertical-align: middle;
  line-height: 1;
  user-select: none;
}

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e2e2;
  border-radius: 10px;
}
```

---

## 2.2 Import in `BaseLayout.astro`

When `BaseLayout.astro` is created in Step 04, add this import at the top of the frontmatter:

```astro
---
import '../styles/global.css';
---
```

This is the **only** place `global.css` is imported.

---

## 2.3 Verify Token Extraction

Cross-check that every color used in the design prototypes has a corresponding `@theme` variable. Critical tokens to verify:

| Token | Value | Used in |
|---|---|---|
| `--color-primary` | `#3e5219` | Nav active state, headings, timeline dots |
| `--color-primary-container` | `#556b2f` | CTA backgrounds, experience preview |
| `--color-surface-container-low` | `#f3f3f4` | Sidebar background, inner sections |
| `--color-secondary` | `#586246` | Company names in timeline |
| `--color-secondary-fixed` | `#dce7c3` | Tech tag chip backgrounds |
| `--color-on-secondary-fixed-variant` | `#414a30` | Tech tag chip text |
| `--color-tertiary` | `#753d00` | CTA buttons, section label text |
| `--color-outline-variant` | `#c5c8b8` | Ghost borders |

---

## 2.4 Verify Build

```bash
npm run dev
```

Expected: Page background is `#f9f9f9` (Professional Olive surface). Font is Inter. No build errors.

```bash
npm run build
```

Expected: Build completes without errors.

---

## Commit Checkpoint

```bash
git add src/styles/global.css
git commit -m "feat: add Professional Olive design tokens and global CSS utilities"
```
