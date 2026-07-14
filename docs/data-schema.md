# Data Schema Reference

All structured content lives in `src/content/data/` (JSON) and `src/content/blog/` (Markdown). No component needs to be modified when updating personal data.

---

## JSON Files

### `profile.json`

```json
{
  "name": "Ondřej Burda",
  "title": "Java & Kotlin Software Engineer",
  "tagline": "Backend developer focused on Kotlin, Java, and modern distributed systems.",
  "location": "Prague, Czech Republic",
  "website": {
    "label": "burdis.cz",
    "url": "https://www.burdis.cz"
  },
  "social": {
    "github": "https://github.com/Burdis28",
    "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN",
    "email": "your@email.com"
  },
  "heroHeadline": "Engineering with",
  "heroAccent": "Precision.",
  "about": "Multi-sentence bio paragraph shown on the Home page hero section.",
  "aboutQuote": "Optional single-sentence quote shown in an italic blockquote style.",
  "yearsExperience": "5",
  "avatarUrl": "/images/profile.jpg",
  "heroBannerUrl": "/images/hero-banner.jpg",
  "techStack": ["Java", "Kotlin", "MongoDB", "SQL", "Spring Boot"]
}
```

Fields:
- `heroHeadline` — first line of the home page h1 (e.g. "Engineering with")
- `heroAccent` — second line of the home page h1, rendered in `text-tertiary` (e.g. "Precision.")
- `aboutQuote` — optional; if present, shown as an italic border-left styled quote
- `yearsExperience` — shown in the hero stat card overlay (e.g. "5")
- `techStack` — array shown in the sidebar (currently unused — sidebar shows social links instead)

### `experience.json`

```json
[
  {
    "id": "job-1",
    "role": "Java & Kotlin Software Engineer",
    "company": "Company Name",
    "type": "Full-time",
    "period": {
      "start": "Nov 2021",
      "end": "Present"
    },
    "location": "Prague, Czech Republic",
    "icon": "developer_mode_tv",
    "isActive": true,
    "year": "2021",
    "bullets": [
      "First achievement bullet point.",
      "Second achievement bullet point."
    ],
    "tags": ["Kotlin", "Spring Boot", "MongoDB"]
  }
]
```

Fields:
- `id` — unique string identifier
- `role` — job title (shown as `text-2xl font-headline font-bold text-on-surface`)
- `company` — company name (shown as `text-secondary`)
- `type` — "Full-time" / "Part-time" / "Contract" etc. (currently not displayed, kept for reference)
- `period.start` / `period.end` — displayed in the period badge
- `location` — kept for reference (not currently displayed in the timeline)
- `icon` — Material Symbols icon name (kept for reference — timeline uses dot instead of icon)
- `isActive` — `true` = primary-colored dot, `false` = surface-colored dot
- `year` — 4-digit string (kept for reference)
- `bullets` — array of achievement strings, each shown with a small olive dot
- `tags` — optional array of tech/skill strings; shown as `secondary-fixed` chips

### `education.json`

```json
{
  "degrees": [
    {
      "id": "degree-1",
      "degree": "Ing. in Information Technology",
      "institution": "University of Pardubice",
      "period": "2018 – 2021",
      "isActive": true,
      "note": "Optional note, e.g. specialization or honors."
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "Kotlin Academy",
      "issuer": "Kotlin Academy",
      "meta": "Kotlin Course",
      "icon": "code"
    }
  ]
}
```

Degree fields:
- `period` — displayed as `text-tertiary` label above the degree title
- `note` — optional; shown as italic text below institution
- `isActive` — kept for reference (not currently used in the new EducationItem style)

Certification fields:
- `name` — shown as `font-headline font-bold text-sm text-on-surface`
- `meta` — shown as `text-xs text-on-surface-variant`
- `icon` — kept for reference (new CertificationItem uses a dot instead of icon box)

### `projects.json`

```json
[
  {
    "id": "project-1",
    "title": "Project Title",
    "description": "Full description shown in the project card. Can be 2–3 sentences.",
    "featured": true,
    "imageUrl": "/images/projects/project-1.jpg",
    "imageAlt": "Description of the project screenshot",
    "tags": ["Kotlin", "Spring Boot", "MongoDB"],
    "links": {
      "demo": "https://example.com",
      "source": "https://github.com/Burdis28/project"
    }
  }
]
```

Fields:
- `featured` — `true` = `md:col-span-12` (full-width bento card), `false` = `md:col-span-6`
- Only one project should have `featured: true`
- `links.demo` and `links.source` can be `null` if not applicable
- `tags` — shown as `surface-container-highest` chips (max 3 displayed)
- Image is shown in grayscale by default, color on hover

### `skills.json`

```json
[
  {
    "id": "backend",
    "category": "Backend & Core",
    "icon": "dns",
    "skills": ["Java", "Kotlin", "Spring Boot", "MongoDB", "SQL"]
  },
  {
    "id": "tools",
    "category": "Tools & DevOps",
    "icon": "terminal",
    "skills": ["Docker", "Git", "CI/CD", "Linux"]
  }
]
```

Fields:
- `icon` — Material Symbols icon name (shown `text-primary` next to category name)
- `skills` — array of skill strings, each rendered as `secondary-fixed` chip

---

## Markdown Blog Posts

Location: `src/content/blog/*.md`

### Frontmatter Schema

```yaml
---
title: "Article Title"
date: 2024-05-12
readTime: 12
category: "Backend"
featured: true
excerpt: "Short 1–2 sentence summary shown in the card on the blog listing page."
coverImage: "/images/blog/article-name.jpg"
coverImageAlt: "Description of the cover image for accessibility"
---
```

Fields:
- `title` — displayed as H1 on article page, H2/H3 on listing cards
- `date` — `YYYY-MM-DD` format; displayed as `Month DD, YYYY`
- `readTime` — integer, minutes; displayed as `X Min Read`
- `category` — single category string; displayed as a chip (e.g. "Backend", "Architecture", "Kotlin")
- `featured` — `true` for exactly one post; renders as the large FeaturedPost component (full-width grid card)
- `excerpt` — shown in post card on listing page; not shown on article page
- `coverImage` — relative path from `public/`; shown in grayscale with color-on-hover on listing page
- `coverImageAlt` — required for accessibility

### Naming Convention

Filename becomes the URL slug:
- `kotlin-coroutines.md` → `/blog/kotlin-coroutines`
- `spring-boot-patterns.md` → `/blog/spring-boot-patterns`

Use lowercase kebab-case.

---

## Content Collections Config (`src/content/content.config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    readTime: z.number(),
    category: z.string(),
    featured: z.boolean().default(false),
    excerpt: z.string(),
    coverImage: z.string(),
    coverImageAlt: z.string(),
  }),
});

export const collections = { blog };
```

---

## TypeScript Interfaces (`src/types.ts`)

```typescript
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  website: { label: string; url: string };
  social: { github: string; linkedin: string; email: string };
  heroHeadline?: string;
  heroAccent?: string;
  about: string;
  aboutQuote?: string;
  yearsExperience?: string;
  avatarUrl: string;
  heroBannerUrl: string;
  techStack: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  period: { start: string; end: string };
  location: string;
  icon: string;
  isActive: boolean;
  year: string;
  bullets: string[];
  tags?: string[];
}

export interface Degree {
  id: string;
  degree: string;
  institution: string;
  period: string;
  isActive: boolean;
  note?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  meta: string;
  icon: string;
}

export interface Education {
  degrees: Degree[];
  certifications: Certification[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  links: { demo: string | null; source: string | null };
}

export interface SkillCategory {
  id: string;
  category: string;
  icon: string;
  skills: string[];
}
```
