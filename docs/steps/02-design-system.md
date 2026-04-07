# Step 02 — Design System Setup

Transfer all design tokens from the HTML prototypes into Tailwind configuration and establish global CSS utilities.

**Prerequisite:** Step 01 complete. `tailwindcss` and `@astrojs/tailwind` installed.

---

## 2.1 Create `tailwind.config.mjs`

Create this file in the project root. It is the single source of truth for all design tokens.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // --- Primary ---
        'primary':                    '#004e99',
        'primary-container':          '#0a66c2',
        'primary-fixed':              '#d6e3ff',
        'primary-fixed-dim':          '#a8c8ff',
        'on-primary':                 '#ffffff',
        'on-primary-container':       '#dbe6ff',
        'on-primary-fixed':           '#001b3d',
        'on-primary-fixed-variant':   '#00468a',
        'inverse-primary':            '#a8c8ff',
        'surface-tint':               '#005eb5',

        // --- Surface hierarchy (lightest → darkest) ---
        'surface-container-lowest':   '#ffffff',
        'surface-container-low':      '#f1f4f6',
        'surface':                    '#f7fafc',
        'background':                 '#f7fafc',
        'surface-bright':             '#f7fafc',
        'surface-container':          '#ebeef0',
        'surface-container-high':     '#e5e9eb',
        'surface-container-highest':  '#e0e3e5',
        'surface-variant':            '#e0e3e5',
        'surface-dim':                '#d7dadc',
        'inverse-surface':            '#2d3133',
        'inverse-on-surface':         '#eef1f3',

        // --- Text ---
        'on-surface':                 '#181c1e',
        'on-surface-variant':         '#414752',
        'on-background':              '#181c1e',

        // --- Borders ---
        'outline':                    '#727783',
        'outline-variant':            '#c1c6d4',

        // --- Secondary ---
        'secondary':                  '#466270',
        'secondary-container':        '#c6e4f4',
        'secondary-fixed':            '#c9e7f7',
        'secondary-fixed-dim':        '#adcbda',
        'on-secondary':               '#ffffff',
        'on-secondary-container':     '#4a6774',
        'on-secondary-fixed':         '#001f2a',
        'on-secondary-fixed-variant': '#2e4b57',

        // --- Tertiary ---
        'tertiary':                   '#833900',
        'tertiary-container':         '#a94b00',
        'tertiary-fixed':             '#ffdbca',
        'tertiary-fixed-dim':         '#ffb68e',
        'on-tertiary':                '#ffffff',
        'on-tertiary-container':      '#ffe0d1',
        'on-tertiary-fixed':          '#331200',
        'on-tertiary-fixed-variant':  '#773300',

        // --- Semantic ---
        'error':                      '#ba1a1a',
        'error-container':            '#ffdad6',
        'on-error':                   '#ffffff',
        'on-error-container':         '#93000a',
      },

      fontFamily: {
        'headline': ['Manrope', 'sans-serif'],
        'body':     ['Inter', 'sans-serif'],
        'label':    ['Inter', 'sans-serif'],
      },

      // Custom border-radius scale — conservative, "engineered" aesthetic
      borderRadius: {
        'DEFAULT': '0.125rem',   // 2px  — code/sharp elements
        'lg':      '0.25rem',    // 4px  — subtle
        'xl':      '0.5rem',     // 8px  — cards, containers (most used)
        'full':    '0.75rem',    // 12px — pill chips
        // For perfect circles use rounded-[50%] or the component's own logic
      },

      boxShadow: {
        'editorial': '0 20px 40px rgba(24, 28, 30, 0.06)',
      },
    },
  },
  plugins: [],
};
```

---

## 2.2 Create `src/styles/global.css`

```css
/* Import Tailwind layers */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ─────────────────────────────────────────────
   Google Fonts
───────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

/* ─────────────────────────────────────────────
   Base resets
───────────────────────────────────────────── */
@layer base {
  html {
    font-family: 'Inter', sans-serif;
    color: #181c1e;  /* on-surface */
    background-color: #f7fafc;  /* surface */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Manrope', sans-serif;
  }

  /* Selection highlight using design tokens */
  ::selection {
    background-color: #d6e3ff;  /* primary-fixed */
    color: #001b3d;             /* on-primary-fixed */
  }
}

/* ─────────────────────────────────────────────
   Material Symbols configuration
───────────────────────────────────────────── */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
  line-height: 1;
  /* Prevent icon font from causing layout shifts */
  font-size: inherit;
}

/* Filled variant — used for premium/highlight icons */
.material-symbols-filled {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
  line-height: 1;
}

/* ─────────────────────────────────────────────
   Editorial shadow utility
   (also available as shadow-editorial via Tailwind config)
───────────────────────────────────────────── */
@layer utilities {
  .editorial-shadow {
    box-shadow: 0 20px 40px rgba(24, 28, 30, 0.06);
  }
}

/* ─────────────────────────────────────────────
   Experience timeline — dashed vertical line
───────────────────────────────────────────── */
.experience-timeline {
  position: relative;
}

.experience-timeline::before {
  content: '';
  position: absolute;
  left: 28px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 4px,
    #c1c6d4 4px,
    #c1c6d4 8px
  );
  opacity: 0.3;
  pointer-events: none;
}
```

---

## 2.3 Add global.css to `BaseLayout.astro`

When `BaseLayout.astro` is created in Step 04, it must import this stylesheet:

```astro
---
import '../styles/global.css';
---
```

This is the **only** place global.css is imported. All other components rely on Tailwind utility classes.

---

## 2.4 Verify Token Extraction

Cross-check: open `design-assets/home/prototype.html` and verify that every color class used in the HTML (e.g. `bg-surface-container-lowest`, `text-on-surface-variant`, `border-outline-variant/15`) has a corresponding entry in `tailwind.config.mjs`.

Critical classes to verify are present:
- `bg-surface-container-lowest` → `#ffffff`
- `text-on-surface` → `#181c1e`
- `text-on-surface-variant` → `#414752`
- `border-outline-variant` → `#c1c6d4` (used with `/10`, `/15` opacity modifiers)
- `text-primary-fixed-dim` → `#a8c8ff` (timeline watermarks)
- `bg-on-primary-fixed-variant` → `#00468a` (Talk highlight card background)
- `text-inverse-primary` → `#a8c8ff` (icon on dark card)

---

## 2.5 Verify Build

```bash
npm run build
```

Expected: Build completes. No Tailwind warnings about unknown tokens.

```bash
npm run dev
```

Open `http://localhost:4321`. Page background should be `#f7fafc` (surface), not white. Font should be Inter.

---

## Commit Checkpoint

```bash
git add tailwind.config.mjs src/styles/global.css
git commit -m "feat: add Tailwind design tokens and global CSS utilities"
```
