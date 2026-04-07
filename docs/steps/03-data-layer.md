# Step 03 — Data Layer

Create all JSON content files and Markdown blog posts. Set up Astro Content Collections with TypeScript schemas.

**Prerequisite:** Steps 01–02 complete. Directories `src/content/data/` and `src/content/blog/` exist.

---

## 3.1 `src/content/config.ts`

Defines the Content Collections schema for blog posts. Astro uses this for type-safe frontmatter access and build-time validation.

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

Full TypeScript interfaces for all JSON data files. Import these in components:

```typescript
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

---

## 3.3 `src/content/data/profile.json`

```json
{
  "name": "Ondřej Burda",
  "title": "Software Developer",
  "tagline": "Building scalable systems and clean interfaces.",
  "location": "Prague, Czech Republic",
  "website": {
    "label": "burdis28.github.io",
    "url": "https://burdis28.github.io"
  },
  "social": {
    "github": "https://github.com/Burdis28",
    "linkedin": "https://linkedin.com/in/YOUR_LINKEDIN",
    "email": "YOUR_EMAIL@example.com"
  },
  "about": "Passionate about building scalable digital systems and crafting clean user experiences. Experienced in full-stack development with a focus on modern frontend frameworks, distributed backend architecture, and cloud infrastructure. Always exploring the intersection of engineering quality and developer productivity.",
  "resumeUrl": "/files/ondrej-burda-cv.pdf",
  "avatarUrl": "/images/profile.jpg",
  "heroBannerUrl": "/images/hero-banner.jpg",
  "techStack": ["React.js", "TypeScript", "Go", "Kubernetes", "AWS"]
}
```

**Update before deploying:** Replace `YOUR_LINKEDIN`, `YOUR_EMAIL`, and the `about` text with real data.

---

## 3.4 `src/content/data/experience.json`

Placeholder data — replace with real work history.

```json
[
  {
    "id": "job-1",
    "role": "Senior Full Stack Architect",
    "company": "Technovate Systems Inc.",
    "type": "Full-time",
    "period": { "start": "Jan 2023", "end": "Present" },
    "location": "San Francisco, CA (Hybrid)",
    "icon": "developer_mode_tv",
    "isActive": true,
    "year": "2023",
    "bullets": [
      "Leading the architectural redesign of the core SaaS platform, resulting in a 40% improvement in load times and a 25% reduction in server costs.",
      "Mentoring a cross-functional team of 12 developers, implementing modern CI/CD pipelines and rigorous code review standards.",
      "Pioneered the integration of AI-driven analytics, enabling real-time predictive insights for over 500 enterprise clients."
    ]
  },
  {
    "id": "job-2",
    "role": "Software Engineer II",
    "company": "CloudStream Labs",
    "type": "Remote",
    "period": { "start": "Aug 2021", "end": "Dec 2022" },
    "location": "Austin, TX (Remote)",
    "icon": "cloud_done",
    "isActive": false,
    "year": "2021",
    "bullets": [
      "Developed and maintained high-traffic microservices using Node.js and Go, handling over 2 million daily active requests.",
      "Optimized database queries in PostgreSQL, reducing average API response time by 150ms.",
      "Successfully migrated 10+ legacy modules to a modern React-based micro-frontend architecture."
    ]
  },
  {
    "id": "job-3",
    "role": "Junior Web Developer",
    "company": "PixelPerfect Creative Agency",
    "type": "Full-time",
    "period": { "start": "May 2019", "end": "Jul 2021" },
    "location": "New York, NY",
    "icon": "terminal",
    "isActive": false,
    "year": "2019",
    "bullets": [
      "Built 20+ responsive custom themes for high-profile fashion and lifestyle brands.",
      "Collaborated with design teams to translate Figma prototypes into pixel-perfect CSS and JavaScript."
    ]
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
      "degree": "M.S. in Computer Science",
      "institution": "Stanford University",
      "period": "2017 – 2019",
      "isActive": true
    },
    {
      "id": "degree-2",
      "degree": "B.S. in Software Engineering",
      "institution": "Georgia Institute of Technology",
      "period": "2013 – 2017",
      "isActive": false
    }
  ],
  "certifications": [
    {
      "id": "cert-1",
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "meta": "Credential ID: AWS-88291",
      "icon": "cloud"
    },
    {
      "id": "cert-2",
      "name": "Google Professional Cloud Security Engineer",
      "issuer": "Google Cloud",
      "meta": "Issued: Oct 2022",
      "icon": "security"
    },
    {
      "id": "cert-3",
      "name": "Meta Front-End Developer Professional Certificate",
      "issuer": "Meta / Coursera",
      "meta": "Coursera Specialization",
      "icon": "workspace_premium"
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
    "title": "CloudCore Analytics Platform",
    "description": "A real-time data processing engine for enterprise SaaS metrics. Built to handle 10k+ events per second with sub-second latency for visualization. Features custom-built D3.js charting and a multi-tenant PostgreSQL architecture.",
    "featured": true,
    "imageUrl": "/images/projects/cloudcore.jpg",
    "imageAlt": "CloudCore Analytics dashboard showing real-time metrics",
    "tags": ["React", "Node.js", "Redis", "AWS Lambda"],
    "links": {
      "demo": null,
      "source": "https://github.com/Burdis28/cloudcore"
    }
  },
  {
    "id": "project-2",
    "title": "VeloHealth Mobile",
    "description": "End-to-end encrypted health tracking app focusing on biometric data privacy and offline-first synchronization.",
    "featured": false,
    "imageUrl": "/images/projects/velohealth.jpg",
    "imageAlt": "VeloHealth mobile app interface",
    "tags": ["React Native", "GraphQL"],
    "links": {
      "demo": null,
      "source": null
    }
  },
  {
    "id": "project-3",
    "title": "InfraGuard Bot",
    "description": "Automated security auditing tool for AWS IAM policies and VPC configurations. Reduces manual security review time by 80%.",
    "featured": false,
    "imageUrl": "/images/projects/infraguard.jpg",
    "imageAlt": "InfraGuard server infrastructure visualization",
    "tags": ["Python", "Terraform"],
    "links": {
      "demo": null,
      "source": "https://github.com/Burdis28/infraguard"
    }
  }
]
```

---

## 3.7 `src/content/data/skills.json`

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

---

## 3.8 Blog Posts (`src/content/blog/`)

Create 5 Markdown files. The frontmatter must match the schema in `config.ts`. Exactly one file should have `featured: true`.

### `react-performance.md`
```markdown
---
title: "Mastering React Performance: From Render-Cycles to Web Workers"
date: 2024-05-12
readTime: 12
category: "Frontend"
featured: true
excerpt: "Deep dive into React reconciliation internals and how to leverage off-main-thread computation for truly fluid user experiences."
coverImage: "/images/blog/react-performance.jpg"
coverImageAlt: "Complex source code on a monitor with blue neon lighting"
---

## Introduction

React's rendering model is deceptively simple on the surface...

[Article body content]
```

### `ai-in-web-dev.md`
```markdown
---
title: "The Future of AI in Web Dev: Beyond Copilot"
date: 2024-04-28
readTime: 8
category: "AI"
featured: false
excerpt: "How generative models are shifting from autocomplete to architectural advisors and the impact on full-stack workflows."
coverImage: "/images/blog/ai-web-dev.jpg"
coverImageAlt: "Abstract digital representation of neural networks"
---
```

### `microservices-go-k8s.md`
```markdown
---
title: "Building Scalable Microservices with Go and K8s"
date: 2024-04-15
readTime: 15
category: "Architecture"
featured: false
excerpt: "A practical guide to implementing gRPC patterns and service mesh for high-availability enterprise systems."
coverImage: "/images/blog/microservices.jpg"
coverImageAlt: "Data center server racks with blue LED lights"
---
```

### `postgres-vs-nosql.md`
```markdown
---
title: "PostgreSQL vs NoSQL: Choosing the Right Data Model"
date: 2024-03-30
readTime: 6
category: "Backend"
featured: false
excerpt: "Evaluating consistency vs. flexibility in the era of serverless databases and edge computing."
coverImage: "/images/blog/database.jpg"
coverImageAlt: "Minimalist workstation with database schema on laptop"
---
```

### `web-security-checklist.md`
```markdown
---
title: "The Modern Web Security Checklist"
date: 2024-03-12
readTime: 10
category: "Security"
featured: false
excerpt: "Essential practices for OAuth2, JWT hardening, and preventing CSRF in modern single-page applications."
coverImage: "/images/blog/security.jpg"
coverImageAlt: "Glass prism reflecting rainbow light representing encryption"
---
```

---

## 3.9 Verify

Run the build to confirm Content Collections schema validation:

```bash
npm run build
```

Expected: Build completes. Astro validates all blog frontmatter against the Zod schema in `config.ts`. Type errors will surface here if frontmatter is missing fields.

In a component, test JSON import:

```astro
---
import profile from '../content/data/profile.json';
console.log(profile.name); // "Ondřej Burda"
---
```

---

## Commit Checkpoint

```bash
git add src/content/ src/types.ts
git commit -m "feat: add content data layer — JSON files, blog posts, Content Collections schema"
```
