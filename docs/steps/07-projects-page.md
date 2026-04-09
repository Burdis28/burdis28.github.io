# Step 07 — Projects Page

Build the Projects & Skills page (`/projects`) with an editorial hero header, a 12-column bento project grid, and the Technical Arsenal section.

**Prerequisite:** Steps 01–04 complete.

**Reference design:** `rework/stitch_projects_skills(1)/stitch_projects_skills/`

---

## 7.1 `src/components/projects/ProjectCard.astro`

A project card that spans either the full 12 columns (featured) or 6 columns (regular). Images start greyscale and transition to colour on hover.

```astro
---
import type { Project } from '../../types';

interface Props {
  project: Project;
}
const { project } = Astro.props;
---

<article
  class={`bg-surface-container-lowest rounded-xl group cursor-pointer hover:shadow-editorial transition-all duration-300
    ${project.featured ? 'md:col-span-12 p-8' : 'md:col-span-6 p-8 flex flex-col'}`}
>

  <!-- Project image -->
  <div class={`overflow-hidden rounded-lg bg-surface-container-low mb-6
    ${project.featured ? 'aspect-video' : 'aspect-square'}`}>
    <img
      src={project.imageUrl}
      alt={project.imageAlt}
      class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
      width={project.featured ? 900 : 400}
      height={project.featured ? 506 : 400}
      loading="lazy"
    />
  </div>

  <!-- Tag chips -->
  <div class="flex items-center gap-3 mb-4">
    {project.tags.slice(0, 3).map((tag) => (
      <span class="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-sm text-[0.6875rem] font-label font-bold tracking-widest uppercase">
        {tag}
      </span>
    ))}
  </div>

  <!-- Title + external links -->
  <div class="flex justify-between items-start mb-4">
    <h3 class={`font-headline font-bold text-on-surface group-hover:text-primary transition-colors ${project.featured ? 'text-2xl' : 'text-xl'}`}>
      {project.title}
    </h3>
    <div class="flex gap-3 flex-shrink-0 ml-4">
      {project.links.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          class="text-on-surface-variant hover:text-primary transition-colors"
          aria-label={`Live demo of ${project.title}`}
        >
          <span class="material-symbols-outlined" style="font-size:16px">open_in_new</span>
        </a>
      )}
      {project.links.source && (
        <a
          href={project.links.source}
          target="_blank"
          rel="noopener noreferrer"
          class="text-on-surface-variant hover:text-primary transition-colors"
          aria-label={`Source code for ${project.title}`}
        >
          <span class="material-symbols-outlined" style="font-size:16px">code</span>
        </a>
      )}
    </div>
  </div>

  <!-- Description -->
  <p class={`text-on-surface-variant leading-relaxed ${project.featured ? 'max-w-3xl' : 'text-sm flex-1'}`}>
    {project.description}
  </p>

  <!-- CTA row -->
  <div class="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest border-t border-surface-container-low pt-6 mt-6">
    <span>View Project</span>
    <span class="material-symbols-outlined text-sm">north_east</span>
  </div>

</article>
```

Notes:
- Tag chips use `rounded-sm` (not `rounded-full`) — square-ish editorial style
- Images: `grayscale group-hover:grayscale-0` transition on the parent `group`
- Max 3 tags shown (`project.tags.slice(0, 3)`)

---

## 7.2 `src/components/projects/SkillCategory.astro`

One skill category in the Technical Arsenal section.

```astro
---
import type { SkillCategory } from '../../types';

interface Props {
  category: SkillCategory;
}
const { category } = Astro.props;
---

<div class="space-y-6">

  <!-- Category header -->
  <div class="flex items-center gap-3">
    <span class="material-symbols-outlined text-primary" style="font-size:22px">
      {category.icon}
    </span>
    <h4 class="font-headline font-bold text-lg text-on-surface">{category.category}</h4>
  </div>

  <!-- Skill chips -->
  <div class="flex flex-wrap gap-2">
    {category.skills.map((skill) => (
      <span class="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed-variant font-label font-bold rounded-full text-xs uppercase tracking-tight">
        {skill}
      </span>
    ))}
  </div>

</div>
```

Skill chips use `bg-secondary-fixed` (light olive tint) with `rounded-full` — contrasting with the `rounded-sm` tag chips used on project cards.

---

## 7.3 `src/pages/projects.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '../components/projects/ProjectCard.astro';
import SkillCategory from '../components/projects/SkillCategory.astro';
import projects from '../content/data/projects.json';
import skills from '../content/data/skills.json';
---

<BaseLayout
  title="Projects — Ondřej Burda"
  activeNav="projects"
  description="Selected projects and technical skills — backend applications, distributed systems, and API engineering."
>

  <!-- Page header -->
  <header class="mb-16">
    <p class="text-tertiary font-label font-semibold tracking-widest uppercase mb-4">Portfolio</p>
    <h1 class="text-5xl lg:text-7xl font-headline font-bold text-on-surface leading-[1.1] mb-6">
      Selected Projects
    </h1>
    <p class="text-on-surface-variant text-lg lg:text-xl max-w-2xl leading-relaxed">
      An architectural showcase of backend applications, distributed systems, and API engineering.
    </p>
  </header>

  <!-- Projects bento grid -->
  <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
    {projects.map((project) => (
      <ProjectCard project={project} />
    ))}
  </div>

  <!-- Technical Arsenal -->
  <section class="mb-12">
    <div class="flex items-center gap-4 mb-12">
      <div class="h-px flex-grow bg-outline-variant opacity-20"></div>
      <h2 class="text-3xl font-headline font-semibold text-primary">Technical Arsenal</h2>
      <div class="h-px w-24 bg-outline-variant opacity-20"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {skills.map((category) => (
        <SkillCategory category={category} />
      ))}
    </div>
  </section>

</BaseLayout>
```

The Technical Arsenal heading uses the same flanking horizontal-line divider pattern as the Experience page (`h-px flex-grow` lines).

---

## 7.4 Visual Verification Checklist

Open `http://localhost:4321/projects`:

- [ ] "Portfolio" label in `text-tertiary` above the H1
- [ ] H1: "Selected Projects" — large, `font-headline font-bold text-on-surface`
- [ ] Featured project card: full-width (`col-span-12`), `aspect-video` image
- [ ] Regular project cards: half-width (`col-span-6`), `aspect-square` image
- [ ] Images: start greyscale, transition to colour + scale on hover
- [ ] Tag chips: `rounded-sm`, `bg-surface-container-highest`, uppercase
- [ ] Title hovers to `text-primary`
- [ ] External link icons (`open_in_new`, `code`): grey, turn primary on hover
- [ ] "View Project" CTA row with `north_east` icon at card bottom
- [ ] Technical Arsenal: section divider with flanking lines
- [ ] Skill chips: `bg-secondary-fixed`, `rounded-full`, uppercase

---

## Commit Checkpoint

```bash
git add src/components/projects/ src/pages/projects.astro
git commit -m "feat: implement Projects page — bento grid and Technical Arsenal"
```
