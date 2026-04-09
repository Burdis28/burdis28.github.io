# Step 10 — Responsive Design, Accessibility & SEO

Polish the site for mobile/tablet layouts, verify accessibility compliance, and confirm SEO metadata.

**Prerequisite:** Steps 05–09 complete. All pages render correctly on desktop.

---

## 10.1 Layout Strategy

The design uses a **fixed sidebar pattern** — not a CSS grid layout. The key classes that control responsiveness are on `BaseLayout.astro`:

| Element | Mobile | Desktop (`lg:`) |
|---|---|---|
| `LeftSidebar` | `hidden` (not rendered) | `lg:flex` — fixed, `w-72`, left |
| `<main>` | Full-width, `px-6` | `lg:ml-72 lg:px-16` — offset by sidebar |
| `Footer` | Full-width | `lg:ml-72` — offset by sidebar |
| Mobile bottom nav | `md:hidden fixed bottom-0` | Hidden |

---

## 10.2 Mobile Navigation

The `TopNavBar.astro` is visible on all screen sizes (`h-20`, `fixed top-0`). On mobile, the `LeftSidebar` is hidden — instead, a **bottom tab bar** is rendered in `BaseLayout.astro`:

```astro
<nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low/90 backdrop-blur-lg flex justify-around items-center h-16 z-50 px-4 border-t border-outline-variant/10">
  <!-- 5 icon+label tabs: home, experience, projects, blog, contact -->
</nav>
```

Each tab uses `font-variation-settings: "FILL" 1` on the active icon to show the filled variant.

**Verify:**
- [ ] Desktop: left sidebar visible, bottom nav hidden
- [ ] Mobile: left sidebar hidden, bottom nav visible (5 tabs)
- [ ] Active tab: `text-primary`, filled icon
- [ ] Inactive tabs: `text-on-surface-variant`, outline icon

---

## 10.3 TopNavBar on Mobile

The `TopNavBar` renders on all screen sizes. On mobile it shows the site name/logo and a hamburger (if implemented). The primary mobile navigation is the bottom tab bar — the top bar on mobile mainly provides the back-context / branding stripe.

---

## 10.4 Home Page — Mobile

In `src/pages/index.astro`, the hero uses `grid-cols-1 lg:grid-cols-12` — on mobile the portrait card stacks below the text:

- Portrait column: `mt-12 lg:mt-0` removes extra top margin on desktop
- `FeaturedHighlights`: `grid-cols-1 md:grid-cols-2` — 1-column on mobile
- `ExperiencePreview`: `grid-cols-1 lg:grid-cols-2` — 1-column on mobile, stats row stacks

---

## 10.5 Experience Page — Mobile

- Timeline: `border-l-2` left border still visible on mobile (not removed)
- `TimelineItem`: `md:flex-row` — role+company stack vertically on mobile, period badge moves below
- Bento grid (`lg:grid-cols-12`): stacks to 1-column on mobile and tablet

---

## 10.6 Projects Page — Mobile

- Project grid (`md:grid-cols-12`): all cards stack to 1-column on mobile
- Technical Arsenal (`lg:grid-cols-3`): stacks to 1-column on mobile/tablet

---

## 10.7 Blog Page — Mobile

- `FeaturedPost`: `grid-cols-1 lg:grid-cols-2` — image stacks above content on mobile
- Post grid (`md:grid-cols-12`): all cards stack to 1-column on mobile, stagger disabled
- `NewsletterCTA`: `flex-col sm:flex-row` — buttons stack on mobile

---

## 10.8 Contact Page — Mobile

- Main grid (`lg:grid-cols-12`): contact channels (7 cols) and aside (5 cols) stack on mobile
- CTA banner: `flex-col md:flex-row` — button stacks below text on mobile

---

## 10.9 Accessibility Checklist

### Semantic HTML
- [ ] One `<h1>` per page
- [ ] `LeftSidebar` uses `<aside>` element
- [ ] Bottom navigation uses `<nav>`
- [ ] Blog post detail uses `<article>`
- [ ] `<main>` element wraps all page content (in `BaseLayout`)
- [ ] `<footer>` element used in `Footer.astro`

### Images
- [ ] All `<img>` tags have `alt` text
- [ ] Profile photo: descriptive alt (profile name)
- [ ] Decorative elements (blobs, watermarks): `aria-hidden="true"` where appropriate
- [ ] Blog cover images: descriptive alt from `coverImageAlt` field

### Interactive Elements
- [ ] All `<a>` tags have visible text or `aria-label`
- [ ] External link icons with `aria-label` (e.g. project `open_in_new` buttons)
- [ ] External links have `target="_blank" rel="noopener noreferrer"`
- [ ] Bottom nav tabs have label text below icons

### Focus Styles

The `global.css` includes a focus-visible ring for keyboard navigation:

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 0.25rem;
}
```

### Color Contrast (Professional Olive palette)

Key ratios to verify (WCAG AA — 4.5:1 for normal text, 3:1 for large text):

| Foreground | Background | Status |
|---|---|---|
| `text-on-surface` (`#1a1c18`) | `bg-surface` (`#f8faf4`) | ✓ Very high contrast |
| `text-primary` (`#3e5219`) | `bg-surface-container-lowest` (`#ffffff`) | ✓ Passes |
| `text-on-primary` (`#ffffff`) | `bg-primary` (`#3e5219`) | ✓ Passes |
| `text-on-tertiary` | `bg-tertiary` (`#753d00`) | ✓ Passes |
| `text-on-surface-variant` | `bg-surface-container-low` | Verify with tool |

---

## 10.10 SEO

### Page title convention (implemented in all pages)

```
Home:       "Ondřej Burda — Software Developer"
Experience: "Experience — Ondřej Burda"
Projects:   "Projects — Ondřej Burda"
Blog list:  "Blog — Ondřej Burda"
Blog post:  "{Post Title} — Ondřej Burda"
Contact:    "Contact — Ondřej Burda"
```

### Meta tags (in `BaseLayout.astro`)

- `<meta name="description">` — per-page description via `description` prop
- `<link rel="canonical">` — built from `siteUrl + Astro.url.pathname`
- Open Graph: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`
- `og:image` references `/images/og-card.jpg` — create a 1200×630px branded image in `public/images/`

### Sitemap

`@astrojs/sitemap` generates `dist/sitemap-index.xml` automatically. Confirm in `astro.config.mjs`:

```javascript
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://burdis28.github.io',
  integrations: [sitemap()],
});
```

---

## 10.11 Build Verification

```bash
npm run build
```

Check for:
- [ ] No TypeScript errors
- [ ] No Astro build warnings about missing image `alt` attributes
- [ ] `dist/sitemap-index.xml` generated
- [ ] All 6 route groups generate HTML: `/`, `/experience`, `/projects`, `/blog`, `/blog/[slug]`, `/contact`

Test on local preview:
```bash
npm run preview
```

Open Chrome DevTools → Toggle Device Toolbar → test at:
- 375px (iPhone SE) — bottom nav, stacked layouts
- 768px (tablet) — 2-column grids, no sidebar, no bottom nav
- 1280px (desktop) — fixed sidebar visible, full layout

---

## Commit Checkpoint

```bash
git add -A
git commit -m "feat: verify responsive layouts, accessibility, and SEO metadata"
```
