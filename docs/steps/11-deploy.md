# Step 11 — Deploy to GitHub Pages

Set up GitHub Actions for automated builds and deploy the static site to GitHub Pages.

**Prerequisite:** All previous steps complete. Repository renamed to `burdis28.github.io` on GitHub.

---

## 11.1 Repository Setup (GitHub)

1. Confirm repository name is `burdis28.github.io` at `https://github.com/Burdis28/burdis28.github.io`
2. Go to **Settings → Pages**
3. Set **Source** to: `GitHub Actions` (not "Deploy from a branch")

This tells GitHub to use a custom workflow instead of auto-detecting Jekyll.

---

## 11.2 GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  # Trigger on every push to main
  push:
    branches:
      - main

  # Allow manual triggering from the Actions tab
  workflow_dispatch:

# Set permissions for GitHub Pages deployment
permissions:
  contents: read
  pages: write
  id-token: write

# Prevent concurrent deployments
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build with Astro
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Explanation:
- `npm ci` — clean install from `package-lock.json` (faster and deterministic in CI)
- `npm run build` — Astro's build command, outputs to `./dist`
- `actions/upload-pages-artifact@v3` — packages the `dist/` folder for deployment
- `actions/deploy-pages@v4` — uploads the artifact to GitHub Pages

---

## 11.3 Verify `astro.config.mjs`

Double-check these values are correct for root domain deployment:

```javascript
export default defineConfig({
  site: 'https://burdis28.github.io',
  // No 'base' property needed for root domain deployment
  // (base would be needed if deploying to burdis28.github.io/subpath)
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  output: 'static',
});
```

---

## 11.4 Push and Verify Deployment

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for GitHub Pages deployment"
git push origin main
```

Then:
1. Go to `https://github.com/Burdis28/burdis28.github.io/actions`
2. Watch the "Deploy to GitHub Pages" workflow run
3. Both `build` and `deploy` jobs should turn green
4. Click the deployment URL shown in the `deploy` job output

Expected URL: `https://burdis28.github.io`

---

## 11.5 Troubleshooting

### Build fails: "Cannot find module '@astrojs/tailwind'"
```bash
npm ci
# Ensure package-lock.json is committed
git add package-lock.json
git commit -m "chore: add package-lock.json"
```

### Pages shows "404 — File not found"
- Verify GitHub Pages source is set to **"GitHub Actions"** (not a branch)
- Check that `dist/` is being built and uploaded (check Actions logs)

### CSS not loading on the live site
- Verify `site` in `astro.config.mjs` matches the exact GitHub Pages URL
- No trailing slash in `site` value

### Images not loading
- All image paths must start from `public/` and reference as `/images/...`
- Absolute paths like `/images/profile.jpg` resolve correctly on GitHub Pages root domain

### Formspree not working on the live site
- Formspree restricts forms to registered domains on the free plan
- Go to formspree.io → your form settings → add `burdis28.github.io` to allowed domains

---

## 11.6 Post-Deploy Content Personalization

After the site is live, update with real data:

1. **`src/content/data/profile.json`**
   - Replace `"Ondřej Burda"` placeholder bio with real text
   - Update `linkedin`, `email` values
   - Replace `resumeUrl` with actual CV file path (upload CV to `public/files/`)

2. **`src/content/data/experience.json`** — Replace with real work history

3. **`src/content/data/education.json`** — Replace with real education/certifications

4. **`src/content/data/projects.json`** — Replace with real projects and real image paths

5. **`public/images/profile.jpg`** — Add your actual profile photo (recommended: 512×512px, face centered)

6. **`public/images/hero-banner.jpg`** — Add banner image for hero section (recommended: 1440×400px)

7. **`src/content/blog/*.md`** — Replace placeholder content with real articles

8. **Formspree endpoint** — Replace `XXXXXXXX` in `ContactForm.astro` and `NewsletterCTA.astro`

Every content change triggers a new deployment automatically via GitHub Actions on push to `main`.

---

## 11.7 Custom Domain (Optional)

If you want to use a custom domain (e.g., `ondrejburda.dev`) instead of `burdis28.github.io`:

1. Purchase the domain from a registrar (Namecheap, Google Domains, etc.)
2. Add DNS records:
   ```
   Type: A, Name: @, Values: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   Type: CNAME, Name: www, Value: burdis28.github.io
   ```
3. GitHub → Settings → Pages → Custom domain → enter your domain
4. Check "Enforce HTTPS"
5. Update `astro.config.mjs`:
   ```javascript
   site: 'https://ondrejburda.dev',
   ```
6. Create `public/CNAME` file with content: `ondrejburda.dev`

---

## Final Deployment Checklist

- [ ] Repository renamed to `burdis28.github.io`
- [ ] GitHub Pages source set to "GitHub Actions"
- [ ] `astro.config.mjs` has correct `site` URL
- [ ] `.github/workflows/deploy.yml` created and pushed
- [ ] GitHub Actions workflow completes without errors
- [ ] Site accessible at `https://burdis28.github.io`
- [ ] All 6 routes accessible (`/`, `/experience`, `/projects`, `/blog`, `/blog/[slug]`, `/contact`)
- [ ] Profile photo displays correctly
- [ ] Contact form works (Formspree domain registered)
- [ ] No broken links or 404s
- [ ] Mobile layout renders correctly
- [ ] Lighthouse score: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 90
