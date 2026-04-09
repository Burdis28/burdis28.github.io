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

Run inside the repo root:

```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```

Flags:
- `.` — scaffold into current directory
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
npm install @astrojs/sitemap @tailwindcss/vite tailwindcss @tailwindcss/typography
npm install -D @types/node
```

Package purposes:
- `@astrojs/sitemap` — generates `sitemap.xml` automatically at build time
- `@tailwindcss/vite` — Tailwind CSS v4 Vite plugin (replaces the old `@astrojs/tailwind`)
- `tailwindcss` — Tailwind CSS v4 engine
- `@tailwindcss/typography` — optional plugin for blog article prose styling
- `@types/node` — Node.js type definitions for TypeScript

---

## 1.4 Configure `astro.config.mjs`

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://burdis28.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
});
```

Notes:
- `site` must be set for sitemap generation and correct canonical URLs
- Tailwind v4 uses a Vite plugin instead of an Astro integration
- `output: 'static'` — explicit static site output (required for GitHub Pages)

---

## 1.5 Configure `tsconfig.json`

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

---

## 1.6 Create Directory Structure

```bash
mkdir -p src/components/layout
mkdir -p src/components/home
mkdir -p src/components/experience
mkdir -p src/components/projects
mkdir -p src/components/blog
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

---

## 1.8 Verify

```bash
npm run dev
```

Expected: Astro dev server starts at `http://localhost:4321`. No styling yet — that's Step 02.

```bash
npm run build
```

Expected: Build completes without errors. `dist/` directory is created.

---

## Commit Checkpoint

```bash
git add .
git commit -m "feat: scaffold Astro project with Tailwind v4 and Sitemap integrations"
```
