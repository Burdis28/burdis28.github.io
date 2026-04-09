# Ondřej Burda — Personal Portfolio: Implementation Overview

Personal portfolio website built as a static site (Astro + Tailwind CSS v4), deployed to GitHub Pages at `https://burdis28.github.io`.

## Stack

| Layer | Technology |
|---|---|
| Framework | Astro (static SSG) |
| Styling | Tailwind CSS v4 (CSS-first, `@theme` tokens) |
| Fonts | Manrope (headlines) + Inter (body/labels) — Google Fonts |
| Icons | Material Symbols Outlined — Google Fonts |
| Structured data | JSON files (`src/content/data/`) |
| Blog content | Markdown files (`src/content/blog/`) |
| Deploy | GitHub Pages — repository `burdis28.github.io` |
| CI/CD | GitHub Actions — push to `main` triggers build + deploy |

---

## Pages

| Route | File | Description |
|---|---|---|
| `/` | `src/pages/index.astro` | Home — hero narrative, featured blog posts, experience CTA |
| `/experience` | `src/pages/experience.astro` | Timeline, education bento grid, certifications, CTA card |
| `/projects` | `src/pages/projects.astro` | Bento projects grid + Technical Arsenal skills |
| `/blog` | `src/pages/blog/index.astro` | Blog listing — featured post, staggered grid, contact CTA |
| `/blog/[slug]` | `src/pages/blog/[slug].astro` | Blog article detail — dynamic route from Markdown |
| `/contact` | `src/pages/contact.astro` | Direct contact channels + availability card + consulting CTA |

---

## Repository Structure

```
burdis28.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── docs/
│   ├── overview.md
│   ├── design-system.md
│   ├── data-schema.md
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
│   │   │   ├── FeaturedHighlights.astro
│   │   │   └── ExperiencePreview.astro
│   │   ├── experience/
│   │   │   ├── TimelineItem.astro
│   │   │   ├── EducationItem.astro
│   │   │   └── CertificationItem.astro
│   │   ├── projects/
│   │   │   ├── ProjectCard.astro
│   │   │   └── SkillCategory.astro
│   │   └── blog/
│   │       ├── FeaturedPost.astro
│   │       ├── PostCard.astro
│   │       └── NewsletterCTA.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── content/
│   │   ├── content.config.ts
│   │   ├── data/
│   │   │   ├── profile.json
│   │   │   ├── experience.json
│   │   │   ├── education.json
│   │   │   ├── projects.json
│   │   │   └── skills.json
│   │   └── blog/
│   │       └── *.md
│   ├── pages/
│   │   ├── index.astro
│   │   ├── experience.astro
│   │   ├── projects.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── styles/
│   │   └── global.css
│   └── types.ts
├── astro.config.mjs
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
| 02 | `steps/02-design-system.md` | Tailwind v4 tokens, global CSS, fonts | Step 01 |
| 03 | `steps/03-data-layer.md` | JSON data files + Markdown blog posts + Content Collections schema | Step 01 |
| 04 | `steps/04-base-layout.md` | BaseLayout, TopNavBar, LeftSidebar, Footer, mobile bottom nav | Steps 02–03 |
| 05 | `steps/05-home-page.md` | Home page — hero, featured blog posts, experience CTA | Step 04 |
| 06 | `steps/06-experience-page.md` | Experience page — timeline, education bento, certs, CTA card | Step 04 |
| 07 | `steps/07-projects-page.md` | Projects page — bento grid + skills | Step 04 |
| 08 | `steps/08-blog.md` | Blog listing + blog detail | Step 04 |
| 09 | `steps/09-contact-page.md` | Contact page — channels, availability, consulting CTA | Step 04 |
| 10 | `steps/10-responsive.md` | Mobile/tablet breakpoints, a11y, SEO meta | Steps 05–09 |
| 11 | `steps/11-deploy.md` | GitHub Actions workflow, GitHub Pages config | Step 10 |

---

## Design Reference

All design decisions are documented in `docs/design-system.md`.

**Critical design rules (summary):**
- Never use `#000000` for text — always `on-surface` (`#1a1c1c`)
- Never use `1px solid` borders for section separators — use background color shifts
- Ghost borders only: `outline-variant` at 10–20% opacity
- Ambient shadow: `0 12px 40px rgba(26, 28, 28, 0.04)` — never heavy drop shadows
- Frosted glass nav: `bg-surface/70 backdrop-blur-xl`
- Sidebar: fixed left, `w-72`, `bg-surface-container-low`, offset main by `lg:ml-72`
- CTA color: `tertiary` (`#753d00` Honey) — used sparingly for the final conversion action

---

## Content Personalization

All content is stored in JSON/Markdown files under `src/content/`. To update with personal data, edit:

- `src/content/data/profile.json` — name, title, bio, location, social links, hero fields
- `src/content/data/experience.json` — work history with tags
- `src/content/data/education.json` — degrees + certifications
- `src/content/data/projects.json` — project portfolio
- `src/content/data/skills.json` — tech stack categories
- `src/content/blog/*.md` — blog articles

No component files need to be touched when updating content.
