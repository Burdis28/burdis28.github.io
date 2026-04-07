# Step 07 — Projects Page

Build the Projects & Skills page (`/projects`) with the bento-style project grid and the Technical Arsenal section.

**Prerequisite:** Steps 01–04 complete.

**Reference:** `design-assets/projects/prototype.html`, `design-assets/projects/screen.png`

---

## 7.1 `src/components/projects/ProjectCard.astro`

Renders a single project. The `featured` flag controls whether it spans full width or half width in the grid.

```astro
---
import type { Project } from '../../types';

interface Props {
  project: Project;
}
const { project } = Astro.props;
---

<article
  class={`bg-surface-container-lowest rounded-xl border border-outline-variant/10 editorial-shadow
    group cursor-pointer hover:bg-surface-bright transition-all duration-300
    ${project.featured ? 'md:col-span-12 p-8' : 'md:col-span-6 p-8 flex flex-col'}`}
>

  <!-- Project image -->
  <div class={`overflow-hidden rounded-lg bg-surface-container-low mb-6
    ${project.featured ? 'aspect-video' : 'aspect-square'}`}>
    <img
      src={project.imageUrl}
      alt={project.imageAlt}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      width={project.featured ? 900 : 400}
      height={project.featured ? 506 : 400}
      loading="lazy"
    />
  </div>

  <!-- Title + external links -->
  <div class="flex justify-between items-start mb-4">
    <h3 class={`font-headline font-bold text-on-surface ${project.featured ? 'text-2xl' : 'text-xl'}`}>
      {project.title}
    </h3>
    <div class="flex gap-2 flex-shrink-0 ml-4">
      {project.links.demo && (
        <a
          href={project.links.demo}
          target="_blank"
          rel="noopener noreferrer"
          class="material-symbols-outlined text-outline hover:text-primary transition-colors"
          aria-label={`Live demo of ${project.title}`}
        >
          open_in_new
        </a>
      )}
      {project.links.source && (
        <a
          href={project.links.source}
          target="_blank"
          rel="noopener noreferrer"
          class="material-symbols-outlined text-outline hover:text-primary transition-colors"
          aria-label={`Source code for ${project.title}`}
        >
          code
        </a>
      )}
    </div>
  </div>

  <!-- Description -->
  <p class={`text-on-surface-variant leading-relaxed mb-6 ${project.featured ? 'max-w-3xl' : 'text-sm flex-1'}`}>
    {project.description}
  </p>

  <!-- Tech tags -->
  <div class="flex flex-wrap gap-2 mt-auto">
    {project.tags.map((tag) => (
      <span class="px-3 py-1 bg-surface-container-high text-on-surface-variant font-label font-bold text-xs rounded-full uppercase tracking-wider">
        {tag}
      </span>
    ))}
  </div>

</article>
```

---

## 7.2 `src/components/projects/SkillCategory.astro`

Renders one skill category column in the Technical Arsenal grid.

```astro
---
import type { SkillCategory } from '../../types';

interface Props {
  category: SkillCategory;
}
const { category } = Astro.props;
---

<div class="space-y-8">

  <!-- Category header -->
  <div class="flex items-center gap-3">
    <span class="material-symbols-outlined text-primary p-2 bg-primary-container/20 rounded-lg">
      {category.icon}
    </span>
    <h4 class="font-headline font-bold text-xl text-on-surface">{category.category}</h4>
  </div>

  <!-- Skill chips -->
  <div class="flex flex-wrap gap-3">
    {category.skills.map((skill) => (
      <span class="px-4 py-2 bg-surface-container-low text-on-surface-variant font-label font-semibold rounded-full border border-outline-variant/10 hover:border-primary/50 transition-colors text-sm">
        {skill}
      </span>
    ))}
  </div>

</div>
```

---

## 7.3 `src/pages/projects.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ProjectCard from '@components/projects/ProjectCard.astro';
import SkillCategory from '@components/projects/SkillCategory.astro';
import projects from '../content/data/projects.json';
import skills from '../content/data/skills.json';
---

<BaseLayout
  title="Projects — Ondřej Burda"
  activeNav="projects"
  description="Selected projects and technical skills — full-stack applications, distributed systems, and modern UI engineering."
>
  <div>

    <!-- Page header -->
    <header class="mb-20">
      <h1 class="font-headline font-extrabold text-5xl md:text-6xl text-primary mb-4 tracking-tight">
        Selected Projects
      </h1>
      <p class="text-on-surface-variant text-xl max-w-2xl leading-relaxed">
        An architectural showcase of full-stack applications, distributed systems, and modern UI engineering.
      </p>
    </header>

    <!-- Projects bento grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </div>

    <!-- Technical Arsenal -->
    <section>
      <div class="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-outline-variant/10 pb-6">
        <h2 class="font-headline font-extrabold text-4xl text-on-surface tracking-tight">
          Technical Arsenal
        </h2>
        <span class="text-primary font-bold tracking-widest text-xs uppercase mt-4 md:mt-0">
          Stacks & Proficiencies
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {skills.map((category) => (
          <SkillCategory category={category} />
        ))}
      </div>
    </section>

  </div>
</BaseLayout>
```

---

## 7.4 Visual Verification Checklist

Open `http://localhost:4321/projects` and compare against `design-assets/projects/screen.png`:

- [ ] Page H1: "Selected Projects" in `text-primary` (dark blue), `text-5xl/6xl`, extrabold
- [ ] Featured project: full-width card (`col-span-12`), `aspect-video` image
- [ ] Regular projects: half-width cards (`col-span-6`), `aspect-square` image
- [ ] All cards: no visible border in normal state, `editorial-shadow` ambient glow
- [ ] Project images: scale up on hover (`scale-105`)
- [ ] Tech tags: pill chips, `bg-surface-container-high`, uppercase, small
- [ ] External link icons (`open_in_new`, `code`): grey, turn blue on hover
- [ ] Technical Arsenal section: separated by a faint `border-b border-outline-variant/10`
- [ ] Each skill category: icon in `bg-primary-container/20` box, skills as rounded-full chips
- [ ] Skill chips: hover changes border from ghost to `primary/50`

---

## Commit Checkpoint

```bash
git add src/components/projects/ src/pages/projects.astro
git commit -m "feat: implement Projects page — bento grid and Technical Arsenal"
```
