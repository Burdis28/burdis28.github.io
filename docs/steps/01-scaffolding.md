# Step 01 — Project Scaffolding

Initialize the Astro project, install all dependencies, and configure the base project settings.

**Prerequisite:** Node.js ≥ 18, npm ≥ 9. Git remote already exists at `https://github.com/Burdis28/burdis28.github.io`.

---

## 1.1 Rename Repository on GitHub

Before running any commands, rename the GitHub repository from `burdasganz` to `burdis28.github.io`:

1. Go to `https://github.com/Burdis28/burdasganz` → Settings → General
2. Repository name → `burdis28.github.io` → Rename
3. Update local remote:

```bash
git remote set-url origin https://github.com/Burdis28/burdis28.github.io.git
```

---

## 1.2 Initialize Astro

Run inside the repo root (`D:\UserData\programming\personal-page\burdasganz`):

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```

Flags:
- `.` — scaffold into current directory (files go here, not into a subdirectory)
- `--template minimal` — bare minimum, no example pages
- `--typescript strict` — TypeScript with strict mode
- `--no-install` — we'll install manually in next step
- `--no-git` — repo already initialized

This generates:
```
astro.config.mjs
tsconfig.json
package.json
src/
  pages/
    index.astro
  env.d.ts
```

---

## 1.3 Install Dependencies

```bash
npm install
npm install @astrojs/tailwind tailwindcss @astrojs/sitemap
npm install -D @types/node
```

Package purposes:
- `@astrojs/tailwind` — Astro integration that wires Tailwind into the build
- `tailwindcss` — Tailwind CSS engine
- `@astrojs/sitemap` — generates `sitemap.xml` automatically at build time
- `@types/node` — Node.js type definitions for TypeScript

---

## 1.4 Configure `astro.config.mjs`

Replace the generated file with:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://burdis28.github.io',
  integrations: [
    tailwind({
      applyBaseStyles: false,  // we manage base styles ourselves in global.css
    }),
    sitemap(),
  ],
  output: 'static',
});
```

Notes:
- `site` must be set for sitemap generation and correct canonical URLs
- `applyBaseStyles: false` prevents Tailwind from injecting its own `@base` reset globally — we control this in `global.css`
- `output: 'static'` — explicit static site output (required for GitHub Pages)

---

## 1.5 Configure `tsconfig.json`

Replace or confirm these settings in `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@content/*": ["src/content/*"],
      "@styles/*": ["src/styles/*"],
      "@types": ["src/types.ts"]
    }
  }
}
```

Path aliases allow clean imports:
```typescript
import TopNavBar from '@components/layout/TopNavBar.astro';
// instead of:
import TopNavBar from '../../components/layout/TopNavBar.astro';
```

---

## 1.6 Create Directory Structure

Create all directories upfront so subsequent steps can place files without friction:

```bash
mkdir -p src/components/layout
mkdir -p src/components/home
mkdir -p src/components/experience
mkdir -p src/components/projects
mkdir -p src/components/blog
mkdir -p src/components/contact
mkdir -p src/layouts
mkdir -p src/content/data
mkdir -p src/content/blog
mkdir -p src/pages/blog
mkdir -p src/styles
mkdir -p public/images/projects
mkdir -p public/images/blog
mkdir -p .github/workflows
```

---

## 1.7 Create `src/types.ts`

Create the TypeScript interfaces file (full content in `docs/data-schema.md` — TypeScript Interfaces section).

This file exports all shared types used across components when importing JSON data.

---

## 1.8 Verify

```bash
npm run dev
```

Expected: Astro dev server starts at `http://localhost:4321`. The index page will be the default Astro minimal template. No styling yet — that's Step 02.

```bash
npm run build
```

Expected: Build completes without errors. `dist/` directory is created.

---

## Commit Checkpoint

```bash
git add .
git commit -m "feat: scaffold Astro project with Tailwind and Sitemap integrations"
```
