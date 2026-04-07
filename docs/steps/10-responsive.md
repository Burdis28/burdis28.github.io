# Step 10 — Responsive Design, Accessibility & SEO

Polish the site for mobile/tablet layouts, ensure accessibility compliance, and finalize SEO metadata.

**Prerequisite:** Steps 05–09 complete. All pages render correctly on desktop.

---

## 10.1 Responsive Strategy

The design is desktop-first (12-column grid, persistent sidebar). The responsive strategy:

| Breakpoint | Layout |
|---|---|
| `< 768px` (mobile) | Single column, sidebar moves above main content, nav → hamburger |
| `768px–1024px` (tablet) | 2-column layouts where applicable, sidebar stacks or collapses |
| `≥ 1024px` (desktop) | Full 12-column grid with sticky sidebar |

---

## 10.2 Sidebar on Mobile

In `BaseLayout.astro`, the sidebar already stacks above the main content on mobile (`grid-cols-1 lg:grid-cols-12`). The sidebar card should be **horizontal** on mobile to save vertical space.

**Update `LeftSidebar.astro`** — add responsive flex direction:

The sidebar's inner `<div>` changes from `flex-col items-center text-center` to a horizontal layout on mobile:

```astro
<!-- Change the profile section to adapt -->
<div class="flex flex-row md:flex-col items-center md:text-center gap-6 md:gap-0">
  <!-- Photo: smaller on mobile -->
  <div class="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden border-2 border-primary-container p-1 bg-surface-container-low md:mb-6">
    ...
  </div>

  <!-- Name + title + social links in a row on mobile -->
  <div class="flex flex-col md:items-center md:text-center">
    <h2>...</h2>
    <p>...</p>
    <div class="flex items-center gap-3 mt-2 md:mt-6 md:mb-8">
      ...
    </div>
  </div>
</div>

<!-- Download button: full-width on both mobile and desktop -->
<!-- Tech stack: wrap fine on both -->
```

On mobile, the Tech Stack section and Download Resume button remain below.

---

## 10.3 Navigation on Mobile

The `TopNavBar.astro` already has the hamburger menu implementation from Step 04. Verify:

- [ ] Desktop (`md:` and above): horizontal nav links visible, hamburger hidden
- [ ] Mobile (below `md`): horizontal links hidden, hamburger visible
- [ ] Mobile menu opens/closes on click
- [ ] Icon changes from `menu` to `close` when open
- [ ] `aria-expanded` attribute toggles correctly

---

## 10.4 Home Page — Mobile Adjustments

In `src/pages/index.astro`:

- HeroCard: On mobile, the photo + button row stacks vertically:
  ```html
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
  ```
- FeaturedHighlights: Grid already collapses to 1-column on mobile (`grid-cols-1 md:grid-cols-2`)
- ExperiencePreview: Single column, works fine

---

## 10.5 Experience Page — Mobile Adjustments

The timeline on mobile:
- Timeline dashed line: still visible (absolute positioned, left: 28px)
- Year watermarks: may overflow on very small screens — add `overflow-hidden` to timeline container if needed
- The `pl-16` left padding preserves space for the watermark and dot on all screen sizes

---

## 10.6 Projects Page — Mobile Adjustments

- Bento grid: `grid-cols-1 md:grid-cols-12` already handles mobile (all cards stack)
- Page header: `text-5xl md:text-6xl` — shrinks on mobile
- Technical Arsenal: `grid-cols-1 lg:grid-cols-3` — stacks on mobile and tablet, 3-column on desktop

---

## 10.7 Blog Page — Mobile Adjustments

- FeaturedPost: `grid md:grid-cols-2` — on mobile, image stacks above content
- Post grid: `grid md:grid-cols-2` — single column on mobile
- Newsletter CTA: `flex flex-col md:flex-row` — input + button stack on mobile

---

## 10.8 Contact Page — Mobile Adjustments

- Main grid: `grid-cols-1 md:grid-cols-3` — stacks on mobile, form + sidebar in separate rows
- On mobile, the info sidebar renders below the form

---

## 10.9 Accessibility Checklist

### Semantic HTML
- [ ] One `<h1>` per page
- [ ] Navigation uses `<nav>` with descriptive `aria-label`
- [ ] Blog posts use `<article>`
- [ ] Main page content wrapped in `<main>` (done via BaseLayout)
- [ ] Footer uses `<footer>`

### Images
- [ ] All `<img>` tags have `alt` text
- [ ] Decorative images: `alt=""` (not missing, explicitly empty)
- [ ] Year watermarks: `aria-hidden="true"` (done in components)
- [ ] Decorative blobs/dividers: `aria-hidden="true"`

### Interactive Elements
- [ ] All `<a>` tags have visible text or `aria-label`
- [ ] Icon-only buttons have `aria-label` (e.g., mobile hamburger: `aria-label="Toggle navigation menu"`)
- [ ] External links have `target="_blank" rel="noopener noreferrer"`
- [ ] Form inputs have associated `<label>` elements (via `for`/`id` pairing)
- [ ] Form submit button has descriptive text

### Focus Management
Add to `global.css`:
```css
@layer base {
  /* Visible focus ring for keyboard navigation */
  :focus-visible {
    outline: 2px solid #004e99;  /* primary */
    outline-offset: 2px;
    border-radius: 0.25rem;
  }
}
```

### Color Contrast
Verify minimum WCAG AA ratios (4.5:1 for normal text, 3:1 for large text):
- `text-on-surface` (#181c1e) on `bg-surface` (#f7fafc): ✓ passes (high contrast)
- `text-on-surface-variant` (#414752) on `bg-surface-container-lowest` (#ffffff): ✓ passes
- `text-primary` (#004e99) on `bg-surface-container-lowest` (#ffffff): ✓ passes
- `text-on-primary` (#ffffff) on `bg-primary` (#004e99): ✓ passes
- Small text (`text-[10px]`) at `text-on-surface-variant` (#414752) on white: borderline — verify with a tool

---

## 10.10 SEO Finalization

### Per-page `<title>` convention
```
Home:        "Ondřej Burda — Software Developer"
Experience:  "Experience — Ondřej Burda"
Projects:    "Projects — Ondřej Burda"
Blog list:   "Blog — Ondřej Burda"
Blog post:   "{Post Title} — Ondřej Burda"
Contact:     "Contact — Ondřej Burda"
```

### Open Graph image
Create `public/images/og-card.jpg`:
- Dimensions: 1200×630px
- Should display name, title, and a minimal branded background
- Referenced in `BaseLayout.astro` as `og:image`

### Structured Data (optional but beneficial)
Add a `<script type="application/ld+json">` in `BaseLayout.astro`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ondřej Burda",
  "url": "https://burdis28.github.io",
  "sameAs": [
    "https://github.com/Burdis28",
    "https://linkedin.com/in/YOUR_LINKEDIN"
  ],
  "jobTitle": "Software Developer"
}
```

### Robots
Add `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://burdis28.github.io/sitemap-index.xml
```

---

## 10.11 Verify

```bash
npm run build
```

Check for:
- [ ] No TypeScript errors
- [ ] No Astro build warnings about missing `alt` on images
- [ ] `dist/sitemap-index.xml` generated
- [ ] All 6 routes generate static HTML files in `dist/`

Test responsive behavior:
```bash
npm run preview
```

Open Chrome DevTools → Toggle Device Toolbar → test at 375px (iPhone SE), 768px (tablet), 1280px (desktop).

---

## Commit Checkpoint

```bash
git add -A
git commit -m "feat: add responsive layouts, accessibility improvements, and SEO metadata"
```
