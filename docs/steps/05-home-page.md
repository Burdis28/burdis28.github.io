# Step 05 — Home Page

Build the Home page (`/`) with all four sections: HeroCard, AboutBlock, FeaturedHighlights, and ExperiencePreview.

**Prerequisite:** Steps 01–04 complete. `BaseLayout` renders correctly.

**Reference:** `design-assets/home/prototype.html`, `design-assets/home/screen.png`

---

## 5.1 `src/components/home/HeroCard.astro`

The main profile card with banner image, overlapping profile photo, name, and Connect/Message buttons.

```astro
---
import profile from '../../content/data/profile.json';

interface Props {
  name: string;
  title: string;
  location: string;
  website: { label: string; url: string };
  avatarUrl: string;
  heroBannerUrl: string;
}
const { name, title, location, website, avatarUrl, heroBannerUrl } = Astro.props;
---

<section class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/15">

  <!-- Banner image -->
  <div class="h-48 relative overflow-hidden">
    <img
      src={heroBannerUrl}
      alt="Profile banner"
      class="w-full h-full object-cover"
      width="900"
      height="192"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
  </div>

  <!-- Profile content — overlaps the banner -->
  <div class="px-8 pb-8 -mt-16 relative z-10">

    <!-- Photo + action buttons row -->
    <div class="flex justify-between items-end mb-6">
      <img
        src={avatarUrl}
        alt={`${name} — profile photo`}
        class="w-32 h-32 rounded-xl border-4 border-surface-container-lowest object-cover shadow-lg"
        width="128"
        height="128"
      />
      <div class="flex gap-2 mb-2">
        <a
          href="/contact"
          class="px-6 py-2 bg-primary text-on-primary rounded-full font-bold text-sm transition-all hover:bg-surface-tint active:scale-95"
        >
          Connect
        </a>
        <a
          href={`mailto:${profile.social.email}`}
          class="px-6 py-2 border-2 border-primary text-primary rounded-full font-bold text-sm transition-all hover:bg-primary/5 active:scale-95"
        >
          Message
        </a>
      </div>
    </div>

    <!-- Name & title -->
    <h1 class="text-3xl font-black font-headline text-on-surface tracking-tight leading-none mb-1">
      {name}
    </h1>
    <p class="text-xl text-on-surface-variant font-medium mb-4">{title}</p>

    <!-- Meta row: location + website -->
    <div class="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant mb-6">
      <div class="flex items-center gap-1">
        <span class="material-symbols-outlined text-base">location_on</span>
        <span>{location}</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="material-symbols-outlined text-base">link</span>
        <a href={website.url} class="text-primary font-bold hover:underline" target="_blank" rel="noopener noreferrer">
          {website.label}
        </a>
      </div>
    </div>

  </div>
</section>
```

---

## 5.2 `src/components/home/AboutBlock.astro`

Simple about section that renders inside the HeroCard or as a standalone card below it.

> Place this **inside** the HeroCard's bottom section (within `px-8 pb-8` div), after the meta row.

```astro
---
interface Props {
  text: string;
}
const { text } = Astro.props;
---

<div class="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
  <h3 class="font-headline font-bold text-on-surface mb-2">About</h3>
  <p class="text-on-surface-variant leading-relaxed font-body">{text}</p>
</div>
```

---

## 5.3 `src/components/home/FeaturedHighlights.astro`

The 2-column bento grid featuring the top project and a "Talk/Achievement" card.

```astro
---
import type { Project } from '../../types';
import projects from '../../content/data/projects.json';

// Featured project — the one with featured: true
const featuredProject = projects.find((p) => p.featured);
---

<section class="space-y-4">

  <!-- Section header -->
  <div class="flex justify-between items-center px-2">
    <h2 class="text-xl font-black font-headline text-on-surface tracking-tight">Featured Highlights</h2>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

    <!-- Card 1: Featured Project -->
    {featuredProject && (
      <div class="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/15 shadow-sm transition-all hover:shadow-md hover:bg-surface-bright">
        <div class="h-40 overflow-hidden relative">
          <img
            src={featuredProject.imageUrl}
            alt={featuredProject.imageAlt}
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            width="400"
            height="160"
          />
          <div class="absolute top-3 right-3 bg-primary-container px-3 py-1 rounded-full">
            <span class="text-[10px] font-bold text-on-primary-container uppercase tracking-widest">Project</span>
          </div>
        </div>
        <div class="p-6">
          <h3 class="font-headline font-bold text-lg mb-2">{featuredProject.title}</h3>
          <p class="text-sm text-on-surface-variant mb-4 line-clamp-2">{featuredProject.description}</p>
          <div class="flex items-center justify-between">
            <div class="flex flex-wrap gap-1">
              {featuredProject.tags.slice(0, 2).map((tag) => (
                <div class="w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center text-[10px] font-bold border-2 border-surface-container-lowest text-on-secondary-container">
                  {tag.slice(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
            <a href="/projects" class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
              arrow_forward
            </a>
          </div>
        </div>
      </div>
    )}

    <!-- Card 2: Achievement / Talk (static — update with real data when available) -->
    <div class="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/15 shadow-sm transition-all hover:shadow-md hover:bg-surface-bright">
      <div class="h-40 bg-on-primary-fixed-variant flex items-center justify-center p-8 relative">
        <div class="text-center">
          <span
            class="material-symbols-outlined text-5xl text-inverse-primary mb-2"
            style="font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          >
            workspace_premium
          </span>
          <h4 class="text-on-primary font-headline font-black text-xl leading-tight">Open to Opportunities</h4>
        </div>
        <div class="absolute top-3 right-3 bg-tertiary-container px-3 py-1 rounded-full">
          <span class="text-[10px] font-bold text-on-tertiary-container uppercase tracking-widest">Status</span>
        </div>
      </div>
      <div class="p-6">
        <h3 class="font-headline font-bold text-lg mb-2">Available for New Projects</h3>
        <p class="text-sm text-on-surface-variant mb-4 line-clamp-2">
          Looking for interesting engineering challenges. Let's build something great together.
        </p>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-on-surface-variant">Full-time or Contract</span>
          <a href="/contact" class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
            arrow_forward
          </a>
        </div>
      </div>
    </div>

  </div>
</section>
```

---

## 5.4 `src/components/home/ExperiencePreview.astro`

Shows the two most recent experience items, with a "Show all" link to `/experience`.

```astro
---
import type { ExperienceItem } from '../../types';
import experience from '../../content/data/experience.json';

// Show only the 2 most recent (first 2 items in the array)
const previewItems = experience.slice(0, 2);
---

<section class="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 shadow-sm">

  <div class="flex justify-between items-center mb-8">
    <h2 class="text-xl font-black font-headline text-on-surface tracking-tight">Experience</h2>
  </div>

  <div class="space-y-12 relative">
    {previewItems.map((item) => (
      <div class="relative flex gap-6">
        <!-- Year watermark -->
        <div
          class="absolute -top-10 -left-4 text-6xl font-black text-primary/5 pointer-events-none select-none font-headline"
          aria-hidden="true"
        >
          {item.year}
        </div>

        <!-- Company icon -->
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center">
            <span class="material-symbols-outlined text-primary">{item.icon}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-grow border-b border-outline-variant/10 pb-8">
          <h4 class="font-bold text-on-surface text-lg">{item.role}</h4>
          <p class="text-on-surface-variant text-sm mb-1">{item.company} · {item.type}</p>
          <p class="text-on-surface-variant text-xs mb-4">{item.period.start} – {item.period.end}</p>
          <p class="text-sm text-on-surface-variant/80 max-w-2xl">{item.bullets[0]}</p>
        </div>
      </div>
    ))}
  </div>

  <a
    href="/experience"
    class="block w-full mt-6 py-2 text-center text-on-surface-variant font-bold text-sm hover:bg-surface-container-low rounded-lg transition-colors"
  >
    Show all {experience.length} experiences →
  </a>

</section>
```

---

## 5.5 `src/pages/index.astro`

Compose the full Home page:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroCard from '@components/home/HeroCard.astro';
import FeaturedHighlights from '@components/home/FeaturedHighlights.astro';
import ExperiencePreview from '@components/home/ExperiencePreview.astro';
import profile from '../content/data/profile.json';
---

<BaseLayout
  title="Ondřej Burda — Software Developer"
  activeNav="home"
  description={profile.tagline}
>
  <div class="space-y-6">

    <!-- Hero + About -->
    <div class="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/15">
      <!-- Banner -->
      <div class="h-48 relative overflow-hidden">
        <img
          src={profile.heroBannerUrl}
          alt="Profile banner"
          class="w-full h-full object-cover"
          width="900" height="192"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
      </div>

      <!-- Overlapping content -->
      <div class="px-8 pb-8 -mt-16 relative z-10">
        <div class="flex justify-between items-end mb-6">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            class="w-32 h-32 rounded-xl border-4 border-surface-container-lowest object-cover shadow-lg"
            width="128" height="128"
          />
          <div class="flex gap-2 mb-2">
            <a href="/contact" class="px-6 py-2 bg-primary text-on-primary rounded-full font-bold text-sm transition-all hover:bg-surface-tint active:scale-95">
              Connect
            </a>
            <a href={`mailto:${profile.social.email}`} class="px-6 py-2 border-2 border-primary text-primary rounded-full font-bold text-sm transition-all hover:bg-primary/5 active:scale-95">
              Message
            </a>
          </div>
        </div>

        <h1 class="text-3xl font-black font-headline text-on-surface tracking-tight leading-none mb-1">
          {profile.name}
        </h1>
        <p class="text-xl text-on-surface-variant font-medium mb-4">{profile.title}</p>

        <div class="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant mb-6">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-base">location_on</span>
            <span>{profile.location}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-base">link</span>
            <a href={profile.website.url} class="text-primary font-bold hover:underline">
              {profile.website.label}
            </a>
          </div>
        </div>

        <!-- About block -->
        <div class="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15">
          <h3 class="font-headline font-bold mb-2">About</h3>
          <p class="text-on-surface-variant leading-relaxed">{profile.about}</p>
        </div>
      </div>
    </div>

    <FeaturedHighlights />
    <ExperiencePreview />

  </div>
</BaseLayout>
```

---

## 5.6 Visual Verification Checklist

Open `http://localhost:4321` and compare against `design-assets/home/screen.png`:

- [ ] Banner image fills the top area, gradient fades to white at bottom
- [ ] Profile photo overlaps the banner (via `-mt-16`)
- [ ] "Connect" button is `bg-primary` (dark blue), rounded-full
- [ ] "Message" button is outlined, rounded-full
- [ ] Name in `font-headline font-black`, large and tight
- [ ] About block has `bg-surface-container-low` background (slightly grey)
- [ ] Featured Highlights: 2-column grid, project card has image, achievement card has dark `#00468a` background
- [ ] Experience Preview: year watermarks visible (very faint blue numbers)
- [ ] "Show all X experiences" link at bottom

---

## Commit Checkpoint

```bash
git add src/components/home/ src/pages/index.astro
git commit -m "feat: implement Home page — hero, about, featured highlights, experience preview"
```
