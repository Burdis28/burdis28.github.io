# Step 06 — Experience Page

Build the Experience page (`/experience`) with a large editorial hero header, a border-left timeline of work experience, and a bento grid for education and certifications.

**Prerequisite:** Steps 01–04 complete.

**Reference design:** `rework/stitch_projects_skills(1)/stitch_projects_skills/experience_education_olive_garden/code.html`

---

## 6.1 `src/components/experience/TimelineItem.astro`

A single work experience entry. Uses a border-left timeline with a dot indicator and optional tech tag chips.

```astro
---
import type { ExperienceItem } from '../../types';

interface Props {
  item: ExperienceItem;
}
const { item } = Astro.props;
---

<div class="relative pl-8 md:pl-12 border-l-2 border-surface-container-highest">
  <!-- Timeline dot -->
  <div
    class={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ring-4 ring-surface
      ${item.isActive ? 'bg-primary' : 'bg-surface-container-highest'}`}
  ></div>

  <div class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
    <div>
      <h3 class="text-2xl font-headline font-bold text-on-surface">{item.role}</h3>
      <p class="text-lg font-label font-medium text-secondary">{item.company}</p>
    </div>
    <span
      class={`inline-block px-4 py-1.5 bg-surface-container-low font-label text-sm rounded-full border border-outline-variant/10 self-start
        ${item.isActive ? 'text-primary' : 'text-on-surface-variant'}`}
    >
      {item.period.start} — {item.period.end}
    </span>
  </div>

  <ul class="text-on-surface-variant mb-6 max-w-3xl leading-relaxed space-y-2">
    {item.bullets.map((bullet) => (
      <li class="flex gap-3">
        <span class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true"></span>
        <p>{bullet}</p>
      </li>
    ))}
  </ul>

  {item.tags && item.tags.length > 0 && (
    <div class="flex flex-wrap gap-2">
      {item.tags.map((tag) => (
        <span class="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold rounded-full uppercase tracking-tight">
          {tag}
        </span>
      ))}
    </div>
  )}
</div>
```

Notes:
- Active item (`isActive: true`) has a filled `bg-primary` dot and `text-primary` period badge
- Tech tags use `bg-secondary-fixed` chips — only rendered when `tags` array is non-empty
- Company name uses `text-secondary` (lighter olive) to distinguish from role

---

## 6.2 `src/components/experience/EducationItem.astro`

A compact education entry with a hover colour transition on the degree title.

```astro
---
import type { Degree } from '../../types';

interface Props {
  item: Degree;
}
const { item } = Astro.props;
---

<div class="group">
  <p class="text-sm font-label font-bold text-tertiary mb-1">{item.period}</p>
  <h4 class="text-xl font-headline font-bold text-on-surface group-hover:text-primary transition-colors">{item.degree}</h4>
  <p class="text-on-surface-variant font-label">{item.institution}</p>
  {item.note && (
    <p class="mt-2 text-sm text-on-surface-variant/70 italic">{item.note}</p>
  )}
</div>
```

The `period` label is `text-tertiary` (warm brown) and the optional `note` field renders as an italic sub-line.

---

## 6.3 `src/components/experience/CertificationItem.astro`

A minimal list item with a `bg-primary` dot bullet.

```astro
---
import type { Certification } from '../../types';

interface Props {
  item: Certification;
}
const { item } = Astro.props;
---

<li class="flex items-start gap-4">
  <div class="mt-1 w-2 h-2 rounded-full bg-primary shrink-0"></div>
  <div>
    <h5 class="font-headline font-bold text-sm text-on-surface">{item.name}</h5>
    <p class="text-xs text-on-surface-variant">{item.meta}</p>
  </div>
</li>
```

This component is rendered inside a `<ul>` in the page — hence it outputs a `<li>` element.

---

## 6.4 `src/pages/experience.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import TimelineItem from '../components/experience/TimelineItem.astro';
import EducationItem from '../components/experience/EducationItem.astro';
import CertificationItem from '../components/experience/CertificationItem.astro';
import experience from '../content/data/experience.json';
import educationData from '../content/data/education.json';
---

<BaseLayout
  title="Experience — Ondřej Burda"
  activeNav="experience"
  description="Career timeline, education, and professional certifications."
>

  <!-- Hero header -->
  <header class="mb-16">
    <p class="text-tertiary font-label font-semibold tracking-widest uppercase mb-4">Professional Journey</p>
    <h1 class="text-5xl lg:text-7xl font-headline font-bold text-on-surface leading-[1.1] mb-6">Experience &amp; Education</h1>
    <p class="text-lg lg:text-xl text-on-surface-variant max-w-2xl font-body leading-relaxed">
      A selective journey through my career as a builder of digital products and high-performance engineering systems.
    </p>
  </header>

  <!-- Experience Timeline -->
  <section class="mb-24">
    <div class="flex items-center gap-4 mb-12">
      <div class="h-px flex-grow bg-outline-variant opacity-20"></div>
      <h2 class="text-3xl font-headline font-semibold text-primary">Experience</h2>
      <div class="h-px w-24 bg-outline-variant opacity-20"></div>
    </div>

    <div class="space-y-12">
      {experience.map((item) => (
        <TimelineItem item={item} />
      ))}
    </div>
  </section>

  <!-- Bento grid: Education (7 cols) + Certifications+CTA (5 cols) -->
  <section class="grid grid-cols-1 lg:grid-cols-12 gap-6">

    <!-- Education -->
    <div class="lg:col-span-7 bg-surface-container-low rounded-xl p-8 lg:p-10">
      <div class="flex items-center gap-3 mb-8">
        <span class="material-symbols-outlined text-primary text-3xl">school</span>
        <h2 class="text-2xl font-headline font-bold text-on-surface">Education</h2>
      </div>
      <div class="space-y-8">
        {educationData.degrees.map((degree, i) => (
          <>
            <EducationItem item={degree} />
            {i < educationData.degrees.length - 1 && (
              <div class="h-px bg-outline-variant/20"></div>
            )}
          </>
        ))}
      </div>
    </div>

    <!-- Certifications + CTA -->
    <div class="lg:col-span-5 flex flex-col gap-6">

      <div class="bg-surface-container-highest rounded-xl p-8 flex-grow">
        <div class="flex items-center gap-3 mb-6">
          <span class="material-symbols-outlined text-primary text-3xl">verified</span>
          <h2 class="text-2xl font-headline font-bold text-on-surface">Certifications</h2>
        </div>
        <ul class="space-y-4">
          {educationData.certifications.map((cert) => (
            <CertificationItem item={cert} />
          ))}
        </ul>
      </div>

      <!-- Call to Action Card -->
      <div class="bg-primary-container rounded-xl p-8 relative overflow-hidden group">
        <div class="relative z-10">
          <h4 class="text-xl font-headline font-bold text-on-primary-container mb-2">Ready to Build?</h4>
          <p class="text-sm text-on-primary-container/80 mb-4 leading-relaxed">
            Let's discuss how my experience can help scale your next big idea.
          </p>
          <a
            href="/contact"
            class="inline-flex items-center gap-2 text-white font-label font-bold text-sm bg-primary px-6 py-2 rounded-lg hover:bg-primary-fixed hover:text-on-primary-fixed transition-all"
          >
            Hire Me
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div class="absolute -right-10 -bottom-10 opacity-20 transform group-hover:scale-110 transition-transform duration-700" aria-hidden="true">
          <span class="material-symbols-outlined text-[120px] text-white" style="font-variation-settings: 'FILL' 1">architecture</span>
        </div>
      </div>

    </div>
  </section>

</BaseLayout>
```

---

## 6.5 Visual Verification Checklist

Open `http://localhost:4321/experience`:

- [ ] "Professional Journey" label in `text-tertiary` above the H1
- [ ] H1: "Experience & Education" — large, `font-headline font-bold`
- [ ] Section divider: thin horizontal lines flanking "Experience" heading
- [ ] Timeline: left border visible (`border-l-2 border-surface-container-highest`)
- [ ] Active job: filled `bg-primary` dot, `text-primary` period badge
- [ ] Past jobs: unfilled dot, `text-on-surface-variant` period badge
- [ ] Tech tag chips rendered (`bg-secondary-fixed`, uppercase, rounded-full)
- [ ] Bullet points: tiny `bg-primary` circle dots, not `<ul>` default bullets
- [ ] Bento grid: Education card spans 7 cols, right column spans 5 cols on `lg:`
- [ ] Education: period in `text-tertiary`, degree hovers to `text-primary`
- [ ] Certifications: dot-bullet list style
- [ ] CTA card: `bg-primary-container`, "Hire Me" button, decorative `architecture` icon

---

## Commit Checkpoint

```bash
git add src/components/experience/ src/pages/experience.astro
git commit -m "feat: implement Experience page — timeline, bento grid for education and certifications"
```
