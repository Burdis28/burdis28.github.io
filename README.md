# Ondřej Burda — Personal Portfolio

Personal portfolio website — online CV and blog of Ondřej Burda, a backend software engineer
specialising in Kotlin and Java, based in Prague, Czech Republic.

Live at: **[burdis28.github.io](https://burdis28.github.io)** · custom domain **[burdis.cz](https://www.burdis.cz)**

---

## Tech Stack

| | |
|---|---|
| **Framework** | [Astro](https://astro.build) v6 — static output (`output: 'static'`) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) v4 via `@tailwindcss/vite` (CSS-first `@theme` tokens, no config file) |
| **Typography plugin** | `@tailwindcss/typography` (blog prose styles) |
| **Fonts** | Manrope (headlines) + Inter (body) — loaded via Google Fonts `<link>` preconnect |
| **Icons** | Google Material Symbols Outlined (variable font) |
| **Content** | JSON files (`src/content/data/`) + Markdown (Astro Content Collections — `src/content/blog/`) |
| **RSS feed** | `@astrojs/rss` — served at `/rss.xml` |
| **Sitemap** | `@astrojs/sitemap` — auto-generated at build time |
| **SEO** | JSON-LD structured data (`Person` / `BlogPosting`), Open Graph, Twitter Card, canonical URLs |
| **PWA** | `site.webmanifest` + PNG icons at 192 px and 512 px |
| **Language** | Czech (`lang="cs"`) |
| **TypeScript** | Strict mode (`astro/tsconfigs/strict`), path aliases (`@components/*`, `@layouts/*`, etc.) |
| **Node** | ≥ 22.12.0 (see `engines` in `package.json`) |

### Deployment targets

| Target | How |
|---|---|
| **GitHub Pages** | GitHub Actions workflow (`.github/workflows/deploy.yml`) — builds on every push to `main`, uploads `dist/` as a Pages artifact |
| **Cloudflare Workers** | `wrangler.jsonc` — serves the same `dist/` folder on the custom domains `burdis.cz` and `www.burdis.cz` |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero section, about text, featured highlights (blog posts / projects), experience preview |
| `/experience` | Full career timeline (JSON-driven), education, certifications |
| `/projects` | Project portfolio cards + technical skills categories |
| `/blog` | Article listing (featured post + post cards) |
| `/blog/[slug]` | Individual blog article (Markdown via Astro Content Collections) |
| `/contact` | Contact methods (email, LinkedIn, GitHub, location) + availability status card |
| `/rss.xml` | RSS feed for blog posts |
| `/404` | Custom 404 page |

---

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions: build + deploy to GitHub Pages
├── design-assets/              ← Figma-exported HTML prototypes + screenshots (read-only reference)
│   ├── DESIGN.md               ← Design brief ("The Curated Blueprint")
│   ├── blog/
│   ├── experience/
│   ├── home/
│   └── projects/
├── docs/                       ← Developer documentation
│   ├── overview.md             ← Architecture overview
│   ├── design-system.md        ← Design token reference
│   ├── data-schema.md          ← JSON + Markdown content schemas
│   └── steps/                  ← Step-by-step implementation guides (01–11)
├── public/                     ← Static assets (served as-is)
│   ├── favicon.svg / favicon.ico / apple-touch-icon.png
│   ├── icon-192.png / icon-512.png
│   ├── site.webmanifest
│   ├── robots.txt
│   └── images/                 ← Profile photos, blog covers, project covers, OG card
├── scripts/
│   └── optimize-images.mjs     ← One-off Sharp-based image optimizer (JPEG recompress, PNG→WebP, icon generation)
├── src/
│   ├── assets/
│   │   └── images/             ← Source images processed by Astro's built-in image pipeline
│   ├── components/
│   │   ├── blog/               ← FeaturedPost.astro, PostCard.astro, NewsletterCTA.astro
│   │   ├── experience/         ← TimelineItem.astro, EducationItem.astro, CertificationItem.astro
│   │   ├── home/               ← FeaturedHighlights.astro, ExperiencePreview.astro
│   │   ├── layout/             ← TopNavBar.astro, LeftSidebar.astro, Footer.astro
│   │   └── projects/           ← ProjectCard.astro, SkillCategory.astro
│   ├── content/
│   │   ├── data/               ← JSON content files
│   │   │   ├── profile.json
│   │   │   ├── experience.json
│   │   │   ├── education.json
│   │   │   ├── projects.json
│   │   │   └── skills.json
│   │   └── blog/               ← Markdown blog articles (*.md)
│   ├── layouts/
│   │   └── BaseLayout.astro    ← Shared HTML shell: SEO tags, fonts, nav, sidebar, footer, mobile nav
│   ├── pages/
│   │   ├── index.astro
│   │   ├── experience.astro
│   │   ├── projects.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   ├── rss.xml.js
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── styles/
│   │   └── global.css          ← Tailwind v4 @theme tokens + base resets + component CSS
│   ├── content.config.ts       ← Astro Content Collections schema (blog)
│   └── types.ts                ← TypeScript interfaces for all JSON data shapes
├── astro.config.mjs            ← Astro config: site URL, sitemap integration, Tailwind via Vite
├── tsconfig.json               ← TypeScript strict config + path aliases
├── wrangler.jsonc              ← Cloudflare Workers config for burdis.cz custom domain
└── package.json
```

---

## Local Development

**Prerequisites:** Node.js ≥ 22.12.0, npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot-reload)
npm run dev
# → http://localhost:4321

# 3. Build the static site
npm run build
# → output in dist/

# 4. Preview the built output locally
npm run preview
```

---

## Content Editing

All personal data lives in `src/content/data/` (JSON) and `src/content/blog/` (Markdown).
No component code needs to change when updating content.

| File | What it controls |
|---|---|
| `src/content/data/profile.json` | Name, title, bio, hero text, location, social links, tech stack, availability |
| `src/content/data/experience.json` | Work history entries (role, company, bullets, tags, period) |
| `src/content/data/education.json` | Degrees + certifications |
| `src/content/data/projects.json` | Project cards (title, description, image, links, tags) |
| `src/content/data/skills.json` | Technical skill categories and skill lists |
| `src/content/blog/*.md` | Blog articles (frontmatter: `title`, `date`, `readTime`, `category`, `featured`, `excerpt`, `coverImage`, `coverImageAlt`) |

### Adding a blog post

1. Create `src/content/blog/your-slug.md`.
2. Add the required frontmatter fields (see `src/content.config.ts` for the Zod schema).
3. Place cover and body images under `src/assets/images/blog/your-slug/` (Astro optimises them at build time).

---

## Image Optimisation

`scripts/optimize-images.mjs` is a one-off Node script (using [Sharp](https://sharp.pixelplumbing.com)) that:

- Re-encodes JPEGs > 250 KB (max 1600 px wide, MozJPEG quality 78) in-place under `public/images/`.
- Converts specific large PNGs to WebP.
- Generates the OG card (`public/images/og-card.jpg` at 1200×630).
- Generates PWA / touch icons from `public/favicon.svg`.

Run it manually when adding new large images:

```bash
node scripts/optimize-images.mjs
```

---

## Deployment

### GitHub Pages (automated)

Pushes to the `main` branch automatically trigger `.github/workflows/deploy.yml`:

1. Checks out the repo.
2. Sets up Node 22 with npm cache.
3. Runs `npm ci && npm run build`.
4. Uploads `dist/` as a GitHub Pages artifact and deploys it.

The `pages` GitHub Actions environment handles permissions; no secrets are needed.

### Cloudflare Workers (custom domain)

`wrangler.jsonc` configures the same `dist/` directory to be served on `burdis.cz` and `www.burdis.cz`
via Cloudflare Workers static assets. Deploy manually with:

```bash
npx wrangler deploy
```

---

## Design System

Design name: **"The Editorial Professional"** — an editorial-style portfolio with an olive-green
primary palette, clean typographic hierarchy, and a sidebar + top-nav layout.

- Design brief: `design-assets/DESIGN.md`
- Full token reference: `docs/design-system.md`
- Page prototypes: `design-assets/*/prototype.html`

Key CSS tokens (defined in `src/styles/global.css` via Tailwind v4 `@theme`):

| Token | Value |
|---|---|
| `--color-primary` | `#3e5219` (deep olive) |
| `--color-tertiary` | `#753d00` (honey / CTA) |
| `--font-headline` | Manrope |
| `--font-body` | Inter |
| `--color-surface` | `#f9f9f9` |

---

## License

MIT — see [LICENSE](LICENSE).  
Copyright © 2026 Ondřej Burda.
