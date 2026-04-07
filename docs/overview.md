# Ondřej Burda — Personal Portfolio: Implementation Overview

Personal portfolio website built as a static site (Astro + Tailwind CSS), deployed to GitHub Pages at `https://burdis28.github.io`.

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro (static SSG) |
| Styling | Tailwind CSS v4 |
| Fonts | Manrope (headlines) + Inter (body) — Google Fonts |
| Icons | Material Symbols Outlined — Google Fonts |
| Structured data | JSON files (`src/content/data/`) |
| Blog content | Markdown files (`src/content/blog/`) |
| Contact form | Formspree (no backend required) |
| Deploy | GitHub Pages — repository `burdis28.github.io` |
| CI/CD | GitHub Actions — push to `main` triggers build + deploy |

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Home — hero card, about, featured highlights, experience preview |
| `/experience` | `src/pages/experience.astro` | Full career timeline, education, certifications |
| `/projects` | `src/pages/projects.astro` | Bento projects grid + Technical Arsenal skills |
| `/blog` | `src/pages/blog/index.astro` | Blog listing — featured post, grid, newsletter CTA |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Blog article detail — dynamic route from Markdown |
| `/contact` | `src/pages/contact.astro` | Formspree contact form + social links |

---

## Repository Structure (target)

```
burdis28.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml             ← GitHub Actions: build + deploy to gh-pages
├── docs/                          ← Implementation documentation (this folder)
│   ├── overview.md                ← This file
│   ├── design-system.md           ← Full design system reference
│   ├── data-schema.md             ← JSON + Markdown content schemas
│   └── steps/
│       ├── 01-scaffolding.md
│       ├── 02-design-system.md
│       ├── 03-data-layer.md
│       ├── 04-base-layout.md
│       ├── 05-home-page.md
│       ├── 06-experience-page.md
│       ├── 07-projects-page.md
│       ├── 08-blog.md
│       ├── 09-contact-page.md
│       ├── 10-responsive.md
│       └── 11-deploy.md
├── design-assets/                 ← Original Figma exports (HTML prototypes + screenshots)
│   ├── DESIGN.md                  ← Design system specification
│   ├── home/
│   │   ├── prototype.html
│   │   └── screen.png
│   ├── experience/
│   │   ├── prototype.html
│   │   └── screen.png
│   ├── projects/
│   │   ├── prototype.html
│   │   └── screen.png
│   └── blog/
│       ├── prototype.html
│       └── screen.png
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── profile.jpg
│       ├── hero-banner.jpg
│       ├── projects/
│       └── blog/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopNavBar.astro
│   │   │   ├── LeftSidebar.astro
│   │   │   └── Footer.astro
│   │   ├── home/
│   │   │   ├── HeroCard.astro
│   │   │   ├── AboutBlock.astro
│   │   │   ├── FeaturedHighlights.astro
│   │   │   └── ExperiencePreview.astro
│   │   ├── experience/
│   │   │   ├── TimelineItem.astro
│   │   │   ├── EducationItem.astro
│   │   │   └── CertificationItem.astro
│   │   ├── projects/
│   │   │   ├── ProjectCard.astro
│   │   │   └── SkillCategory.astro
│   │   ├── blog/
│   │   │   ├── FeaturedPost.astro
│   │   │   ├── PostCard.astro
│   │   │   └── NewsletterCTA.astro
│   │   └── contact/
│   │       └── ContactForm.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── data/
│   │   │   ├── profile.json
│   │   │   ├── experience.json
│   │   │   ├── education.json
│   │   │   ├── projects.json
│   │   │   └── skills.json
│   │   └── blog/
│   │       ├── react-performance.md
│   │       ├── ai-in-web-dev.md
│   │       ├── microservices-go-k8s.md
│   │       ├── postgres-vs-nosql.md
│   │       └── web-security-checklist.md
│   ├── pages/
│   │   ├── index.astro
│   │   ├── experience.astro
│   │   ├── projects.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## Implementation Steps

Steps are documented individually in `docs/steps/`. They are designed to be executed sequentially — each step produces a working, committable state.

| Step | File | Description | Prerequisite |
|---|---|---|---|
| 01 | `steps/01-scaffolding.md` | Init Astro project, install deps, base config | — |
| 02 | `steps/02-design-system.md` | Tailwind tokens, global CSS, fonts | Step 01 |
| 03 | `steps/03-data-layer.md` | JSON data files + Markdown blog posts + Content Collections schema | Step 01 |
| 04 | `steps/04-base-layout.md` | BaseLayout, TopNavBar, LeftSidebar, Footer | Steps 02–03 |
| 05 | `steps/05-home-page.md` | Home page — all sections | Step 04 |
| 06 | `steps/06-experience-page.md` | Experience page — timeline, education, certs | Step 04 |
| 07 | `steps/07-projects-page.md` | Projects page — bento grid + skills | Step 04 |
| 08 | `steps/08-blog.md` | Blog listing + blog detail | Step 04 |
| 09 | `steps/09-contact-page.md` | Contact page — Formspree form | Step 04 |
| 10 | `steps/10-responsive.md` | Mobile/tablet breakpoints, a11y, SEO meta | Steps 05–09 |
| 11 | `steps/11-deploy.md` | GitHub Actions workflow, GitHub Pages config | Step 10 |

---

## Design Reference

All design decisions are documented in:
- `docs/design-system.md` — colors, typography, elevation, components, rules
- `design-assets/DESIGN.md` — original design brief (The Curated Blueprint)
- `design-assets/*/screen.png` — rendered prototype screenshots per page

**Critical design rules (summary):**
- Never use `#000000` for text — always `on-surface` (`#181c1e`)
- Never use `1px solid` borders for section separators — use background color shifts
- Ghost borders only: `outline-variant` at 10–15% opacity
- Editorial shadow: `0 20px 40px rgba(24, 28, 30, 0.06)`
- Frosted glass nav: `bg-white/80 backdrop-blur-md`
- Timeline years: `text-7xl font-extrabold text-primary-fixed-dim opacity-20` as watermarks

---

## Content Personalization

All placeholder content ("Alex Dev" persona) is stored in JSON/Markdown files under `src/content/`. To update with real data, edit:

- `src/content/data/profile.json` — name, title, bio, location, social links
- `src/content/data/experience.json` — work history
- `src/content/data/education.json` — degrees + certifications
- `src/content/data/projects.json` — project portfolio
- `src/content/data/skills.json` — tech stack categories
- `src/content/blog/*.md` — blog articles

No component files need to be touched when updating content.
