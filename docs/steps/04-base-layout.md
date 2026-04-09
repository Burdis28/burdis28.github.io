# Step 04 — Base Layout & Shell Components

Build the shared layout shell: `BaseLayout.astro`, `TopNavBar.astro`, `LeftSidebar.astro`, `Footer.astro`, and the mobile bottom navigation. Every page uses these.

**Prerequisite:** Steps 01–03 complete.

---

## 4.1 Layout Architecture

The layout uses a **fixed sidebar + fixed top nav** pattern, matching the Experience & Education design:

```
┌──────────────────────────────────────────────────────────┐
│  TOP NAV (fixed, h-20, full-width, bg-surface/70 blur)   │
├──────────┬───────────────────────────────────────────────┤
│          │                                               │
│ SIDEBAR  │  MAIN CONTENT (lg:ml-72 pt-20)               │
│ (fixed   │                                               │
│ w-72)    │  <slot />                                     │
│          │                                               │
├──────────┴───────────────────────────────────────────────┤
│  FOOTER (lg:ml-72)                                       │
└──────────────────────────────────────────────────────────┘
│  MOBILE BOTTOM NAV (md:hidden, fixed bottom-0)           │
└──────────────────────────────────────────────────────────┘
```

Key differences from a centered-container layout:
- Sidebar is `position: fixed`, not in-flow
- Main content uses `lg:ml-72` left margin to clear the sidebar
- No `max-w-7xl mx-auto` centering wrapper — content fills the remaining space
- Footer also has `lg:ml-72` to align with main content

---

## 4.2 `src/layouts/BaseLayout.astro`

```astro
---
import '../styles/global.css';
import TopNavBar from '../components/layout/TopNavBar.astro';
import LeftSidebar from '../components/layout/LeftSidebar.astro';
import Footer from '../components/layout/Footer.astro';

interface Props {
  title: string;
  activeNav: 'home' | 'experience' | 'projects' | 'blog' | 'contact';
  description?: string;
}

const {
  title,
  activeNav,
  description = 'Personal portfolio of Ondřej Burda — software developer.',
} = Astro.props;

const siteUrl = 'https://burdis28.github.io';
const canonicalUrl = new URL(Astro.url.pathname, siteUrl).href;
---

<!DOCTYPE html>
<html lang="en" class="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={`${siteUrl}/images/og-card.jpg`} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="sitemap" href="/sitemap-index.xml" />
</head>

<body class="bg-surface font-body text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">

  <TopNavBar activeNav={activeNav} />
  <LeftSidebar activeNav={activeNav} />

  <main class="pt-20 pb-12 px-6 lg:ml-72 lg:px-16 max-w-[1400px]">
    <slot />
  </main>

  <Footer />

  <!-- Mobile bottom navigation -->
  <nav class="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-low/90 backdrop-blur-lg flex justify-around items-center h-16 z-50 px-4 border-t border-outline-variant/10">
    <a href="/" class={`flex flex-col items-center gap-0.5 ${activeNav === 'home' ? 'text-primary' : 'text-on-surface-variant'}`}>
      <span class="material-symbols-outlined">home</span>
      <span class="text-[10px] font-label font-bold uppercase tracking-tighter">Home</span>
    </a>
    <!-- ... repeat for each nav item ... -->
  </nav>

</body>
</html>
```

---

## 4.3 `src/components/layout/TopNavBar.astro`

Fixed navigation bar with frosted glass effect. Highlights the active route.

Key structure:
- `fixed top-0 w-full z-50` — always on top
- `bg-surface/70 backdrop-blur-xl` — glassmorphism
- `h-20` — taller than typical (80px) for editorial weight
- Active link: `text-primary border-b-2 border-primary pb-1`
- Inactive link: `text-on-surface-variant hover:text-primary transition-colors duration-300`
- Links use `font-headline font-semibold tracking-tight`
- Mobile: shows hamburger button, dropdown below nav

---

## 4.4 `src/components/layout/LeftSidebar.astro`

Fixed sidebar visible only on `lg+` screens.

Key structure:
```
fixed left-0 top-20 h-[calc(100vh-5rem)] w-72
hidden lg:flex flex-col p-8 gap-6
bg-surface-container-low · custom-scrollbar
├── Profile section (items-center)
│   ├── Avatar: w-20 h-20 rounded-full
│   ├── Name: font-headline font-bold text-lg text-on-surface
│   └── Title: text-on-surface-variant font-label text-sm
├── Social links (flex-col gap-2)
│   └── Each: flex items-center gap-3 px-4 py-3
│             hover:bg-surface-container-highest/50 rounded-lg
│             material-symbols-outlined + font-label font-medium
└── Bottom actions (mt-auto flex-col gap-4)
    ├── Download Resume: bg-surface-container-highest text-primary
    └── Hire Me: bg-primary text-on-primary font-headline font-bold
```

The sidebar accepts `activeNav` prop but currently does not render nav links — navigation is exclusively in the top bar and mobile bottom nav.

---

## 4.5 `src/components/layout/Footer.astro`

Offset by `lg:ml-72` to align with main content:

```astro
<footer class="lg:ml-72 py-12 px-6 lg:px-16 text-center text-on-surface-variant font-label text-xs">
  <div class="flex flex-col md:flex-row justify-between items-center gap-4 max-w-[1400px]">
    <p class="uppercase tracking-widest">© {currentYear} Ondřej Burda. Built with Astro.</p>
    <div class="flex gap-8">
      <a href="/contact" class="uppercase tracking-widest hover:text-primary transition-colors">Contact</a>
      <a href="/blog" class="uppercase tracking-widest hover:text-primary transition-colors">Blog</a>
      <a href="https://github.com/Burdis28/burdis28.github.io" ...>Source</a>
    </div>
  </div>
</footer>
```

---

## 4.6 Verify

Open `http://localhost:4321` and check:

- [ ] Nav bar is fixed at top, height 80px, frosted glass visible
- [ ] Brand wordmark in `text-primary` (deep olive `#3e5219`)
- [ ] Nav links: active page is bold + bottom border, others are olive-grey
- [ ] Mobile: hamburger → dropdown menu appears
- [ ] Desktop: sidebar visible on left, `bg-surface-container-low` background
- [ ] Sidebar avatar, name, title, social links visible
- [ ] Download Resume and Hire Me buttons in sidebar
- [ ] Page background: `#f9f9f9` (not pure white)
- [ ] Mobile: bottom nav visible at bottom of viewport
- [ ] Footer aligned with main content (not under sidebar)

---

## Commit Checkpoint

```bash
git add src/layouts/ src/components/layout/ src/pages/index.astro
git commit -m "feat: add BaseLayout, TopNavBar, LeftSidebar, Footer and mobile bottom nav"
```
