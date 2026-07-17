# Ondřej Burda — Personal Portfolio

Personal portfolio website — online CV and blog.
Live at: **[www.burdis.cz](https://www.burdis.cz)**

---

## Stack

| | |
|---|---|
| Framework | [Astro](https://astro.build) (static SSG) |
| Styling | [Tailwind CSS](https://tailwindcss.com) v4 |
| Fonts | Manrope + Inter (Google Fonts) |
| Icons | Material Symbols Outlined |
| Content | JSON files + Markdown (Astro Content Collections) |
| Contact | E-mail (mailto) + social links |
| Deploy | Cloudflare Pages (build from GitHub repo) |

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, about, featured highlights, experience preview |
| `/experience` | Full career timeline, education, certifications |
| `/projects` | Project portfolio (bento grid) + technical skills |
| `/blog` | Article listing + individual articles |
| `/contact` | Contact info + social links |

---

## Project Structure

```
├── design-assets/          ← Figma-exported HTML prototypes + screenshots (read-only)
├── docs/                   ← Implementation documentation
│   ├── overview.md         ← Architecture and step map
│   ├── design-system.md    ← Full design token reference
│   ├── data-schema.md      ← JSON + Markdown content schemas
│   └── steps/              ← Step-by-step implementation guides (01–11)
├── public/                 ← Static files (images, fonts, favicon)
├── src/
│   ├── components/         ← Astro components by page
│   ├── content/
│   │   ├── data/           ← JSON content files (profile, experience, projects…)
│   │   └── blog/           ← Markdown blog articles
│   ├── layouts/            ← BaseLayout.astro
│   ├── pages/              ← File-based routing
│   └── styles/             ← global.css
├── astro.config.mjs
└── tailwind.config.mjs
```

---

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output → dist/
npm run preview   # preview built output
```

---

## Content

All personal data lives in `src/content/data/` (JSON) and `src/content/blog/` (Markdown). No component code needs to be touched when updating content.

| File | What to edit |
|---|---|
| `src/content/data/profile.json` | Name, title, bio, location, social links |
| `src/content/data/experience.json` | Work history |
| `src/content/data/education.json` | Education + certifications |
| `src/content/data/projects.json` | Project portfolio |
| `src/content/data/skills.json` | Tech stack categories |
| `src/content/blog/*.md` | Blog articles |

---

## Implementation Plan

Full step-by-step plan in `docs/`. Start at `docs/overview.md`.

| Step | Description |
|---|---|
| [01](docs/steps/01-scaffolding.md) | Astro init, dependencies, directory structure |
| [02](docs/steps/02-design-system.md) | Tailwind tokens, global CSS, fonts |
| [03](docs/steps/03-data-layer.md) | JSON data files + Markdown blog posts |
| [04](docs/steps/04-base-layout.md) | BaseLayout, TopNavBar, Sidebar, Footer |
| [05](docs/steps/05-home-page.md) | Home page |
| [06](docs/steps/06-experience-page.md) | Experience page |
| [07](docs/steps/07-projects-page.md) | Projects + Skills page |
| [08](docs/steps/08-blog.md) | Blog listing + article detail |
| [09](docs/steps/09-contact-page.md) | Contact page |
| [10](docs/steps/10-responsive.md) | Responsive design, a11y, SEO |
| [11](docs/steps/11-deploy.md) | GitHub Actions + GitHub Pages deploy |

---

## Design

Design system: **"The Curated Blueprint"** — an editorial-style portfolio inspired by LinkedIn's structure but executed in a bespoke, architectural style.

- Design brief: `design-assets/DESIGN.md`
- Token reference: `docs/design-system.md`
- Page prototypes: `design-assets/*/prototype.html`

---

## License

MIT
