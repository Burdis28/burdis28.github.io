# Step 06 — Experience Page

Build the Experience page (`/experience`) with the full career timeline, education section, and certifications.

**Prerequisite:** Steps 01–04 complete.

**Reference:** `design-assets/experience/prototype.html`, `design-assets/experience/screen.png`

---

## 6.1 `src/components/experience/TimelineItem.astro`

Renders a single work experience entry. Uses the year-watermark + dashed-line pattern from the design system.

```astro
---
import type { ExperienceItem } from '../../types';

interface Props {
  item: ExperienceItem;
  isLast?: boolean;
}
const { item, isLast = false } = Astro.props;
---

<div class="relative pl-16 group">

  <!-- Year watermark (background decoration) -->
  <span
    class="absolute -left-4 top-0 text-7xl font-headline font-extrabold text-primary-fixed-dim opacity-20 pointer-events-none select-none"
    aria-hidden="true"
  >
    {item.year}
  </span>

  <!-- Timeline dot -->
  <div
    class={`absolute left-[21px] top-1 w-4 h-4 rounded-full border-4 bg-white z-10
      ${item.isActive ? 'border-primary' : 'border-outline-variant'}`}
  ></div>

  <!-- Content -->
  <div class="flex flex-col md:flex-row gap-6">

    <!-- Company icon -->
    <div class="flex-shrink-0">
      <div class="w-16 h-16 bg-surface-container flex items-center justify-center rounded-xl border border-outline-variant/20">
        <span class={`material-symbols-outlined text-3xl ${item.isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
          {item.icon}
        </span>
      </div>
    </div>

    <!-- Text block -->
    <div class="flex-grow">

      <!-- Role + period row -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 class="text-xl font-headline font-extrabold text-on-surface">{item.role}</h3>
          <p class="text-primary font-bold">{item.company}</p>
        </div>
        <div class="text-left md:text-right flex-shrink-0">
          <span class="text-sm font-label text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full uppercase tracking-widest font-bold">
            {item.period.start} – {item.period.end}
          </span>
          <p class="text-xs text-on-surface-variant mt-1">{item.location}</p>
        </div>
      </div>

      <!-- Bullet points -->
      <ul class="space-y-3">
        {item.bullets.map((bullet) => (
          <li class="flex gap-3 text-on-surface-variant">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-container mt-2 shrink-0" aria-hidden="true"></span>
            <p>{bullet}</p>
          </li>
        ))}
      </ul>

    </div>
  </div>
</div>
```

---

## 6.2 `src/components/experience/EducationItem.astro`

Renders a single education entry with a left border accent.

```astro
---
import type { Degree } from '../../types';

interface Props {
  item: Degree;
}
const { item } = Astro.props;
---

<div class={`relative pl-4 border-l-2 ${item.isActive ? 'border-primary-fixed' : 'border-outline-variant/30'}`}>
  <h4 class="font-headline font-bold text-on-surface">{item.degree}</h4>
  <p class="text-primary text-sm font-semibold">{item.institution}</p>
  <p class="text-on-surface-variant text-xs mt-1">{item.period}</p>
</div>
```

---

## 6.3 `src/components/experience/CertificationItem.astro`

Renders a single certification row.

```astro
---
import type { Certification } from '../../types';

interface Props {
  item: Certification;
}
const { item } = Astro.props;
---

<div class="flex items-center gap-4 p-4 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors">
  <div class="w-10 h-10 flex-shrink-0 bg-white rounded border border-outline-variant/20 flex items-center justify-center">
    <span class="material-symbols-outlined text-primary">{item.icon}</span>
  </div>
  <div>
    <h4 class="font-bold text-sm text-on-surface">{item.name}</h4>
    <p class="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{item.meta}</p>
  </div>
</div>
```

---

## 6.4 `src/pages/experience.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TimelineItem from '@components/experience/TimelineItem.astro';
import EducationItem from '@components/experience/EducationItem.astro';
import CertificationItem from '@components/experience/CertificationItem.astro';
import experience from '../content/data/experience.json';
import educationData from '../content/data/education.json';
---

<BaseLayout
  title="Experience — Ondřej Burda"
  activeNav="experience"
  description="Career timeline, education, and professional certifications."
>
  <div class="space-y-8">

    <!-- Experience Timeline -->
    <section class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-8">

      <header class="mb-12">
        <h1 class="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
          Professional Experience
        </h1>
        <p class="text-on-surface-variant max-w-2xl">
          A selective journey through my career as a builder of digital products and high-performance engineering systems.
        </p>
      </header>

      <!-- Timeline — the ::before dashed line is on this element -->
      <div class="experience-timeline relative space-y-16">
        {experience.map((item, index) => (
          <TimelineItem item={item} isLast={index === experience.length - 1} />
        ))}
      </div>

    </section>

    <!-- Education & Certifications — 2-column grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

      <!-- Education -->
      <section class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-8">
        <div class="flex items-center gap-3 mb-8">
          <span class="material-symbols-outlined text-primary text-3xl">school</span>
          <h2 class="text-2xl font-headline font-extrabold text-on-surface">Education</h2>
        </div>
        <div class="space-y-8">
          {educationData.degrees.map((degree) => (
            <EducationItem item={degree} />
          ))}
        </div>
      </section>

      <!-- Certifications -->
      <section class="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 p-8">
        <div class="flex items-center gap-3 mb-8">
          <span class="material-symbols-outlined text-primary text-3xl">verified</span>
          <h2 class="text-2xl font-headline font-extrabold text-on-surface">Certifications</h2>
        </div>
        <div class="grid grid-cols-1 gap-4">
          {educationData.certifications.map((cert) => (
            <CertificationItem item={cert} />
          ))}
        </div>
      </section>

    </div>

  </div>
</BaseLayout>
```

---

## 6.5 Visual Verification Checklist

Open `http://localhost:4321/experience` and compare against `design-assets/experience/screen.png`:

- [ ] Page H1: "Professional Experience" in `font-headline font-extrabold`
- [ ] Timeline: dashed vertical line visible on the left (via `.experience-timeline::before`)
- [ ] First item: timeline dot uses `border-primary` (active), others use `border-outline-variant`
- [ ] Year watermarks: very faint large numbers in the background (2023, 2021, 2019)
- [ ] Company icon box: `bg-surface-container`, `rounded-xl`
- [ ] Period badge: pill shape, uppercase, `bg-surface-container-low`
- [ ] Company name in `text-primary` (dark blue)
- [ ] Bullet points: small `bg-primary-container` dots (not standard `ul` bullets)
- [ ] Education section: active degree has `border-primary-fixed` (light blue), older has `border-outline-variant/30`
- [ ] Certifications: hover effect changes background to `bg-surface-container-high`

---

## Commit Checkpoint

```bash
git add src/components/experience/ src/pages/experience.astro
git commit -m "feat: implement Experience page — timeline, education, certifications"
```
