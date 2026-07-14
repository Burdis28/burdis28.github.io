# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev       # Start development server at http://localhost:4321
npm run build     # Build static site to dist/ directory  
npm run preview   # Preview production build locally
```

### Deployment
The site auto-deploys to Cloudflare Pages when pushing to the `main` branch. The site is live at [www.burdis.cz](https://www.burdis.cz).

## Architecture

This is an Astro static site (SSG) for a personal portfolio/blog, using:
- **Astro** - Static site generator with file-based routing
- **Tailwind CSS v4** - CSS-first design tokens defined in `@theme` blocks in global.css
- **Content Collections** - Type-safe content management for blog posts
- **JSON data files** - Structured data for profile, experience, projects, skills

### Key Design Patterns

1. **Component Structure**: Components are organized by page/feature in `src/components/`:
   - `layout/` - Shared layout components (TopNavBar, LeftSidebar, Footer)
   - `home/`, `experience/`, `projects/`, `blog/` - Page-specific components

2. **Data Layer**: All content lives in `src/content/`:
   - `data/*.json` - Structured data (profile, experience, education, projects, skills)
   - `blog/*.md` - Markdown blog posts with frontmatter

3. **Styling Approach**:
   - Tailwind v4 with CSS-first tokens in `src/styles/global.css`
   - Design tokens follow Material Design 3 naming (surface, on-surface, etc.)
   - Professional Olive color palette with tertiary (honey) for CTAs
   - No heavy drop shadows - use ambient shadows only
   - Ghost borders with `outline-variant` at low opacity

4. **Layout System**:
   - Fixed left sidebar (desktop): 288px width, offset main content with `lg:ml-72`
   - Frosted glass top navigation: `bg-surface/70 backdrop-blur-xl`
   - Mobile bottom navigation for small screens

### Critical Design Rules

- **Text colors**: Never use pure black (#000) - always use `on-surface` (#1a1c1c)
- **Section separators**: Use background color shifts, not 1px borders
- **Border radius**: Consistent use of `rounded-lg` (8px) for cards
- **Typography**: Manrope for headlines, Inter for body/labels
- **Icons**: Material Symbols Outlined from Google Fonts

### Content Updates

To update personal content, edit these JSON/Markdown files only:
- `src/content/data/profile.json` - Name, bio, social links
- `src/content/data/experience.json` - Work history  
- `src/content/data/education.json` - Education and certifications
- `src/content/data/projects.json` - Portfolio projects
- `src/content/data/skills.json` - Technical skills by category
- `src/content/blog/*.md` - Blog articles with frontmatter

No component code modifications needed for content updates.