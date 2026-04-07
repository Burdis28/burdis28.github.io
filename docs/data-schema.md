# Data Schema Reference

All structured content lives in `src/content/data/` (JSON) and `src/content/blog/` (Markdown). No component needs to be modified when updating personal data.

---

## JSON Files

### `profile.json`

```json
{
  "name": "Ondřej Burda",
  "title": "Software Developer",
  "tagline": "Full-stack developer focused on scalable systems and clean interfaces.",
  "location": "Prague, Czech Republic",
  "website": {
    "label": "burda.dev",
    "url": "https://burdis28.github.io"
  },
  "social": {
    "github": "https://github.com/Burdis28",
    "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN",
    "email": "your@email.com"
  },
  "about": "Multi-sentence bio paragraph. Appears in the About block on the Home page and in the sidebar.",
  "resumeUrl": "/files/ondrej-burda-cv.pdf",
  "avatarUrl": "/images/profile.jpg",
  "heroBannerUrl": "/images/hero-banner.jpg",
  "techStack": ["React.js", "TypeScript", "Go", "Kubernetes", "AWS"]
}
```

### `experience.json`

```json
[
  {
    "id": "job-1",
    "role": "Senior Software Engineer",
    "company": "Company Name",
    "type": "Full-time",
    "period": {
      "start": "Jan 2023",
      "end": "Present"
    },
    "location": "Prague, CZ (Hybrid)",
    "icon": "developer_mode_tv",
    "isActive": true,
    "year": "2023",
    "bullets": [
      "First achievement bullet point.",
      "Second achievement bullet point.",
      "Third achievement bullet point."
    ]
  }
]
```

Fields:
- `id` — unique string identifier
- `role` — job title
- `company` — company name (shown in `text-primary`)
- `type` — "Full-time" / "Contract" / "Remote" etc.
- `period.start` / `period.end` — displayed in period badge
- `location` — shown as metadata below period badge
- `icon` — Material Symbols icon name for the company icon box
- `isActive` — `true` = active timeline dot (border-primary), `false` = past (border-outline-variant)
- `year` — 4-digit string, shown as watermark background (e.g. `"2023"`)
- `bullets` — array of achievement strings

### `education.json`

```json
{
  "degrees": [
    {
      "id": "degree-1",
      "degree": "Bc. in Computer Science",
      "institution": "Czech Technical University",
      "period": "2014 – 2018",
      "isActive": true
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "meta": "Credential ID: AWS-XXXXX",
      "icon": "cloud"
    }
  ]
}
```

Degree fields:
- `isActive` — `true` = `border-primary-fixed` (highlighted), `false` = `border-outline-variant/30`

Certification fields:
- `icon` — Material Symbols icon name for the icon box

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
    "tags": ["React", "Node.js", "Redis", "AWS Lambda"],
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
- `tags` — shown as pill chips at the bottom of the card

### `skills.json`

```json
[
  {
    "id": "frontend",
    "category": "Frontend Engineering",
    "icon": "palette",
    "skills": ["React 18", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    "id": "backend",
    "category": "Backend & Core",
    "icon": "dns",
    "skills": ["Node.js", "PostgreSQL", "Go", "Redis"]
  },
  {
    "id": "devops",
    "category": "Architecture & DevOps",
    "icon": "terminal",
    "skills": ["AWS Cloud", "Docker", "Kubernetes", "CI/CD"]
  }
]
```

Fields:
- `icon` — Material Symbols icon name (shown in `bg-primary-container/20 rounded-lg` box)
- `skills` — array of skill strings, each rendered as a pill chip

---

## Markdown Blog Posts

Location: `src/content/blog/*.md`

### Frontmatter Schema

```yaml
---
title: "Article Title"
date: 2024-05-12
readTime: 12
category: "Frontend"
featured: true
excerpt: "Short 1–2 sentence summary shown in the card on the blog listing page."
coverImage: "/images/blog/react-performance.jpg"
coverImageAlt: "Description of the cover image for accessibility"
---
```

Fields:
- `title` — displayed as H1 on article page, H2/H3 on listing cards
- `date` — `YYYY-MM-DD` format; displayed as `Month DD, YYYY`
- `readTime` — integer, minutes; displayed as `X min read`
- `category` — single category string; displayed as a chip (e.g. "Frontend", "Architecture", "AI", "Backend", "Security")
- `featured` — `true` for exactly one post; renders as the large FeaturedPost component on listing page
- `excerpt` — shown in post card on listing page; not shown on article page
- `coverImage` — relative path from `public/`
- `coverImageAlt` — required for accessibility

### Naming Convention

Filename becomes the URL slug:
- `react-performance.md` → `/blog/react-performance`
- `ai-in-web-dev.md` → `/blog/ai-in-web-dev`

Use lowercase kebab-case.

---

## Content Collections Config (`src/content/config.ts`)

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

## TypeScript Interfaces

For use in Astro components when importing JSON data:

```typescript
// src/types.ts

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  website: { label: string; url: string };
  social: { github: string; linkedin: string; email: string };
  about: string;
  resumeUrl: string;
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
}

export interface Degree {
  id: string;
  degree: string;
  institution: string;
  period: string;
  isActive: boolean;
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
