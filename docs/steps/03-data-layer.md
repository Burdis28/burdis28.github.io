# Step 03 — Data Layer

Create all JSON content files and Markdown blog posts. Set up Astro Content Collections with TypeScript schemas.

**Prerequisite:** Steps 01–02 complete. Directories `src/content/data/` and `src/content/blog/` exist.

---

## 3.1 `src/content/content.config.ts`

Defines the Content Collections schema for blog posts.

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

## 3.2 `src/types.ts`

Full TypeScript interfaces — see `docs/data-schema.md` TypeScript Interfaces section for the complete file.

Key additions over a basic schema:
- `ExperienceItem.tags?: string[]` — optional tech tag chips on timeline items
- `Degree.note?: string` — optional note under institution name
- `Profile.heroHeadline?`, `Profile.heroAccent?` — home page h1 customization
- `Profile.aboutQuote?` — optional blockquote on home page
- `Profile.yearsExperience?` — stat shown in hero overlay card

---

## 3.3 `src/content/data/profile.json`

```json
{
  "name": "Ondřej Burda",
  "title": "Java & Kotlin Software Engineer",
  "tagline": "Backend developer focused on Kotlin, Java, and modern distributed systems.",
  "location": "Prague, Czech Republic",
  "website": {
    "label": "burdis28.github.io",
    "url": "https://burdis28.github.io"
  },
  "social": {
    "github": "https://github.com/Burdis28",
    "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN",
    "email": "ondra.burda@seznam.cz"
  },
  "heroHeadline": "Engineering with",
  "heroAccent": "Precision.",
  "about": "Your full bio paragraph here.",
  "aboutQuote": "Optional memorable quote.",
  "yearsExperience": "5",
  "resumeUrl": "/files/ondrej-burda-cv.pdf",
  "avatarUrl": "/images/profile.jpg",
  "heroBannerUrl": "/images/hero-banner.jpg",
  "techStack": ["Java", "Kotlin", "MongoDB", "SQL", "Spring Boot"]
}
```

**Update before deploying:** Replace `YOUR_LINKEDIN`, `YOUR_EMAIL`, and fill in `about`.

---

## 3.4 `src/content/data/experience.json`

```json
[
  {
    "id": "job-1",
    "role": "Java & Kotlin Software Engineer",
    "company": "Etnetera Core",
    "type": "Full-time",
    "period": { "start": "Nov 2021", "end": "Present" },
    "location": "Prague, Czech Republic",
    "icon": "developer_mode_tv",
    "isActive": true,
    "year": "2021",
    "bullets": [
      "First bullet describing your impact.",
      "Second bullet.",
      "Third bullet."
    ],
    "tags": ["Kotlin", "Java", "Spring Boot", "MongoDB", "REST API"]
  }
]
```

---

## 3.5 `src/content/data/education.json`

```json
{
  "degrees": [
    {
      "id": "degree-1",
      "degree": "Ing. in Information Technology",
      "institution": "University of Pardubice",
      "period": "2018 – 2021",
      "isActive": true,
      "note": "Optional note, e.g. specialization or distinction."
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

---

## 3.6 `src/content/data/projects.json`

```json
[
  {
    "id": "project-1",
    "title": "Project Title",
    "description": "Full description. Can be 2–3 sentences.",
    "featured": true,
    "imageUrl": "/images/projects/project-1.jpg",
    "imageAlt": "Screenshot description",
    "tags": ["Kotlin", "Spring Boot"],
    "links": {
      "demo": null,
      "source": "https://github.com/Burdis28/project"
    }
  }
]
```

Only one project should have `featured: true`.

---

## 3.7 `src/content/data/skills.json`

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
    "skills": ["Docker", "Git", "CI/CD", "Kubernetes"]
  }
]
```

---

## 3.8 Blog Posts (`src/content/blog/`)

Create Markdown files. Exactly one file should have `featured: true`.

```markdown
---
title: "Article Title"
date: 2024-05-12
readTime: 12
category: "Backend"
featured: true
excerpt: "Short 1–2 sentence summary shown in the blog card."
coverImage: "/images/blog/article.jpg"
coverImageAlt: "Cover image description for accessibility"
---

## Introduction

Article body content here...
```

---

## 3.9 Verify

```bash
npm run build
```

Expected: Build completes. Astro validates all blog frontmatter against the Zod schema. Type errors surface here if frontmatter is missing fields.

---

## Commit Checkpoint

```bash
git add src/content/ src/types.ts
git commit -m "feat: add content data layer — JSON files, blog posts, Content Collections schema"
```
