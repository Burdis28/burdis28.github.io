# Ondřej Burda — Personal Portfolio

Personal portfolio website — online CV and blog for Ondřej Burda, a backend software engineer specialising in Java and Kotlin.

Live at: **[burdis28.github.io](https://burdis28.github.io)** · Custom domain: **[www.burdis.cz](https://www.burdis.cz)**

---

## Tech Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) v6 (static SSG, `output: 'static'`) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 (CSS-first, via `@tailwindcss/vite`) |
| Typography plugin | `@tailwindcss/typography` (blog prose rendering) |
| Fonts | Manrope (headlines) + Inter (body) — Google Fonts, loaded via `<link>` |
| Icons | Material Symbols Outlined (variable icon font) |
| Content | Astro Content Collections — JSON files + Markdown |
| Sitemap | `@astrojs/sitemap` (auto-generated) |
| RSS | `@astrojs/rss` — feed at `/rss.xml` |
| Structured data | JSON-LD (`Person` + `WebSite` / `BlogPosting` per page) |
| PWA | `site.webmanifest` + app icons (192 × 192, 512 × 512) |
| Language | TypeScript (strict mode, path aliases) |
| Node.js | ≥ 22.12.0 |
| Deploy | GitHub Pages via GitHub Actions |
| Alt. host config | Cloudflare Workers/Pages (`wrangler.jsonc` — `www.burdis.cz`) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero section with photo, about text, featured highlights, experience preview |
| `/experience` | Full career timeline, education degrees, certifications |
| `/projects` | Project portfolio (bento grid) + technical skills by category |
| `/blog` | Article listing (featured post + post cards) |
| `/blog/[slug]` | Individual blog articles rendered from Markdown |
| `/contact` | Contact methods (email, LinkedIn, GitHub) + availability status |
| `/rss.xml` | RSS feed of all blog posts |
| `/sitemap-index.xml` | Auto-generated sitemap |
| `/404` | Custom 404 page |

---

## Project Structure

```
├── .github/workflows/
│   └── deploy.yml          ← GitHub Actions: build → upload → deploy to GitHub Pages
├── design-assets/          ← HTML prototypes + screenshots per page (reference only)
│   ├── DESIGN.md           ← Design brief
│   └── {home,experience,projects,blog}/prototype.html
├── docs/                   ← Internal implementation documentation
│   ├── overview.md
│   ├── design-system.md    ← Design token reference
│   ├── data-schema.md      ← JSON + Markdown content schemas
│   └── steps/01–11.md      ← Step-by-step build guides
├── public/                 ← Static assets (copied verbatim to dist/)
│   ├── images/             ← Served images (blog, projects, profile, og-card)
│   ├── favicon.svg / .ico
│   ├── apple-touch-icon.png
│   ├── icon-192.png / icon-512.png
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   └── optimize-images.mjs ← One-off image optimiser (sharp): JPEG recompress, PNG→WebP, OG card, icons
├── src/
│   ├── assets/images/      ← Images processed by Astro's built-in image pipeline
│   ├── components/
│   │   ├── blog/           ← FeaturedPost, PostCard, NewsletterCTA
│   │   ├── experience/     ← TimelineItem, EducationItem, CertificationItem
│   │   ├── home/           ← FeaturedHighlights, ExperiencePreview
│   │   ├── layout/         ← TopNavBar, LeftSidebar, Footer
│   │   └── projects/       ← ProjectCard, SkillCategory
│   ├── content/
│   │   ├── blog/           ← Markdown blog posts (Astro Content Collection)
│   │   └── data/           ← JSON content files (profile, experience, education, projects, skills)
│   ├── layouts/
│   │   └── BaseLayout.astro ← HTML shell: meta/OG/JSON-LD, TopNavBar, LeftSidebar, mobile bottom nav, Footer
│   ├── pages/              ← File-based routing (index, experience, projects, blog/*, contact, 404, rss)
│   ├── styles/
│   │   └── global.css      ← Tailwind v4 CSS-first design tokens + base resets + blog carousel/lightbox CSS
│   ├── content.config.ts   ← Astro Content Collections schema (blog)
│   └── types.ts
├── astro.config.mjs        ← site: 'https://www.burdis.cz', output: 'static', sitemap, tailwind vite plugin
├── tsconfig.json           ← Astro strict preset + path aliases (@components, @layouts, @content, @styles)
├── wrangler.jsonc          ← Cloudflare Workers config for burdis.cz custom domain
└── package.json
```

---

## Local Development

**Prerequisites:** Node.js ≥ 22.12.0

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev
# → http://localhost:4321

# Build for production (static output → dist/)
npm run build

# Preview the production build locally
npm run preview
```

---

## Content

All personal data lives in `src/content/data/` (JSON) and `src/content/blog/` (Markdown). No component changes are needed to update content.

| File | What it controls |
|---|---|
| `src/content/data/profile.json` | Name, title, tagline, location, social links, hero text, years of experience, tech stack, availability status |
| `src/content/data/experience.json` | Work history entries (role, company, period, bullets, tags) |
| `src/content/data/education.json` | University degrees + certifications |
| `src/content/data/projects.json` | Project portfolio cards (title, description, tags, links, image) |
| `src/content/data/skills.json` | Tech skill categories shown on the Projects page |
| `src/content/blog/*.md` | Blog articles — frontmatter: `title`, `date`, `readTime`, `category`, `featured`, `excerpt`, `coverImage`, `coverImageAlt` |

### Adding a blog post

1. Create `src/content/blog/your-slug.md` with the required frontmatter fields above.
2. Place cover and body images in `src/assets/images/blog/your-slug/`.
3. The post appears automatically in the listing and RSS feed — no code changes needed.

---

## Image Optimisation (optional utility)

`scripts/optimize-images.mjs` uses [sharp](https://sharp.pixelplumbing.com/) to:

- Re-compress JPEGs > 250 KB (max width 1600 px, mozjpeg q78)
- Convert specific large PNGs to WebP
- Regenerate `public/images/og-card.jpg` (1200 × 630 crop of hero banner)
- Regenerate PWA icons from `public/favicon.svg`

```bash
node scripts/optimize-images.mjs
```

> Note: `sharp` is not listed in `package.json` — install it separately if needed (`npm install -D sharp`).

---

## Deployment

### GitHub Pages (primary)

Deployment is fully automated via `.github/workflows/deploy.yml`:

1. **Trigger:** push to `main` branch (or manual `workflow_dispatch`).
2. **Build job:** checkout → Node 22 → `npm ci` → `npm run build` → upload `./dist` as a Pages artifact.
3. **Deploy job:** `actions/deploy-pages@v4` publishes the artifact to GitHub Pages.

The site is published at `https://burdis28.github.io` (configured as `site` in the Astro config, but the canonical in `BaseLayout.astro` still points to `https://burdis28.github.io`).

### Cloudflare Workers (custom domain)

`wrangler.jsonc` configures a Cloudflare Workers static asset deployment for `burdis.cz` / `www.burdis.cz`:

```bash
npx wrangler deploy
```

This serves the same `./dist` directory under the custom domain.

---

## Design System

Design: **"The Editorial Professional"** — an editorial-style portfolio with a **Professional Olive** colour palette.

Key tokens (defined in `src/styles/global.css` via Tailwind v4 `@theme`):

| Token | Value |
|---|---|
| Primary | `#3e5219` (deep olive) |
| Tertiary / CTA | `#753d00` (honey-brown) |
| Surface | `#f9f9f9` |
| Headline font | Manrope (600–800) |
| Body font | Inter (400–600) |
| Theme colour | `#3e5219` (PWA/browser chrome) |

Full token reference: [`docs/design-system.md`](docs/design-system.md)  
Page prototypes: [`design-assets/*/prototype.html`](design-assets/)

---

## License

MIT © 2026 Ondřej Burda — see [LICENSE](LICENSE).
