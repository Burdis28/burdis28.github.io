# Step 05 — Home Page

Build the Home page (`/`) with a narrative hero section, featured blog insights, and an experience preview CTA.

**Prerequisite:** Steps 01–04 complete. `BaseLayout` renders correctly with fixed sidebar.

**Reference design:** `rework/stitch_projects_skills(1)/stitch_projects_skills/home_summary_updated_structure/code.html`

---

## 5.1 `src/components/home/FeaturedHighlights.astro`

Fetches the two most recent blog posts from the Content Collection and renders them as editorial cards with a grayscale-to-color hover effect.

```astro
---
import { getCollection } from 'astro:content';

const allPosts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
).slice(0, 2);
---

<section class="mb-24">
  <div class="flex justify-between items-end mb-12">
    <div>
      <p class="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold mb-2">Knowledge Base</p>
      <h2 class="text-3xl font-bold font-headline text-primary tracking-tight">Latest Insights</h2>
    </div>
    <a href="/blog" class="text-primary font-bold text-sm flex items-center group">
      View All Articles
      <span class="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
    </a>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {allPosts.length > 0 ? allPosts.map((post) => {
      const formattedDate = post.data.date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
      return (
        <article class="bg-surface-container-lowest p-10 group hover:shadow-editorial transition-all flex flex-col h-full rounded-xl">
          <div class="aspect-[16/9] mb-8 overflow-hidden rounded-lg bg-surface-container-low">
            <img
              src={post.data.coverImage}
              alt={post.data.coverImageAlt}
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              width="600"
              height="337"
              loading="lazy"
            />
          </div>
          <div class="flex items-center space-x-3 mb-4">
            <span class="font-label text-[9px] uppercase tracking-widest text-on-surface-variant px-2 py-1 bg-surface-container-high rounded-sm">{post.data.category}</span>
            <span class="text-on-surface-variant text-[11px]">{post.data.readTime} min read</span>
          </div>
          <h3 class="text-2xl font-bold font-headline text-primary mb-4 leading-tight group-hover:text-tertiary transition-colors">{post.data.title}</h3>
          <p class="text-on-surface-variant text-sm mb-8 flex-grow leading-relaxed">{post.data.excerpt}</p>
          <a
            href={`/blog/${post.id}`}
            class="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest border-t border-surface-container-low pt-6"
          >
            <span>Read Full Insight</span>
            <span class="material-symbols-outlined text-sm">north_east</span>
          </a>
        </article>
      );
    }) : (
      <div class="md:col-span-2 bg-surface-container-lowest p-10 rounded-xl text-center text-on-surface-variant">
        <span class="material-symbols-outlined text-4xl text-primary/20 block mb-4">edit_note</span>
        <p class="font-label text-sm">Articles coming soon.</p>
      </div>
    )}
  </div>
</section>
```

Key details:
- Uses `post.id` (not `post.slug`) for the blog link — required in Astro Content Collections v2
- Images start grayscale and transition to colour on card hover (`grayscale group-hover:grayscale-0`)
- Fallback block renders when no blog posts exist yet

---

## 5.2 `src/components/home/ExperiencePreview.astro`

Renders the most recent experience entry inside a `bg-primary-container` CTA block with a honey `bg-tertiary` button and stats row.

```astro
---
import experience from '../../content/data/experience.json';

const latestJob = experience[0];
---

<section class="bg-primary-container p-12 lg:p-20 rounded-lg relative overflow-hidden mb-12">
  <div class="absolute -right-20 -bottom-20 opacity-10" aria-hidden="true">
    <span class="material-symbols-outlined text-[300px] text-on-primary-container" style="font-variation-settings: 'FILL' 1">architecture</span>
  </div>

  <div class="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div>
      <p class="font-label text-[10px] uppercase tracking-[0.3em] text-on-primary-container font-bold mb-6">Currently Engaged</p>
      {latestJob && (
        <>
          <h2 class="text-4xl lg:text-5xl font-extrabold font-headline text-white mb-6 tracking-tight leading-tight">
            {latestJob.role} <br/>
            <span class="text-on-primary-container">@ {latestJob.company}</span>
          </h2>
          <p class="text-on-primary-container/80 text-lg max-w-md leading-relaxed mb-8">
            {latestJob.bullets[0]}
          </p>
        </>
      )}
    </div>

    <div class="flex flex-col space-y-6 lg:items-end">
      <a
        href="/experience"
        class="bg-tertiary text-on-tertiary px-10 py-5 rounded-lg text-sm font-bold uppercase tracking-widest shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all w-full lg:w-auto text-center"
      >
        View Full Experience
      </a>
      <div class="flex space-x-4">
        <div class="flex flex-col items-center">
          <span class="text-white font-bold text-xl">{experience.length}</span>
          <span class="text-on-primary-container/60 text-[9px] uppercase tracking-widest">Positions</span>
        </div>
        <div class="w-px h-10 bg-on-primary-container/20"></div>
        <div class="flex flex-col items-center">
          <span class="text-white font-bold text-xl">5+</span>
          <span class="text-on-primary-container/60 text-[9px] uppercase tracking-widest">Years</span>
        </div>
        <div class="w-px h-10 bg-on-primary-container/20"></div>
        <div class="flex flex-col items-center">
          <span class="text-white font-bold text-xl">BE</span>
          <span class="text-on-primary-container/60 text-[9px] uppercase tracking-widest">Speciality</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

The honey CTA button uses `bg-tertiary text-on-tertiary` — the Professional Olive accent colour (`#753d00`).

---

## 5.3 `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import FeaturedHighlights from '../components/home/FeaturedHighlights.astro';
import ExperiencePreview from '../components/home/ExperiencePreview.astro';
import profile from '../content/data/profile.json';
---

<BaseLayout
  title="Ondřej Burda — Software Developer"
  activeNav="home"
  description={profile.tagline}
>
  <!-- Narrative hero -->
  <section class="mb-24">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

      <!-- Left: headline + about text -->
      <div class="lg:col-span-7">
        <div class="mb-4 inline-block bg-secondary-container px-3 py-1 rounded-full">
          <span class="text-on-secondary-container font-label text-[10px] uppercase tracking-widest font-bold">The Narrative</span>
        </div>
        <h1 class="text-5xl lg:text-7xl font-extrabold font-headline text-primary mb-8 tracking-tight leading-none">
          {profile.heroHeadline ?? 'Engineering with'} <br/>
          <span class="text-tertiary">{profile.heroAccent ?? 'Precision.'}</span>
        </h1>
        <div class="space-y-6 text-on-surface text-lg max-w-2xl leading-relaxed">
          <p>{profile.about}</p>
          {profile.aboutQuote && (
            <p class="text-on-surface-variant italic border-l-4 border-tertiary/30 pl-6">
              "{profile.aboutQuote}"
            </p>
          )}
        </div>
      </div>

      <!-- Right: portrait card + years badge -->
      <div class="lg:col-span-5 relative mt-12 lg:mt-0">
        <div class="aspect-square bg-surface-container-low rounded-lg relative overflow-hidden group">
          <img
            src={profile.heroBannerUrl}
            alt="Profile"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            width="500"
            height="500"
            onerror="this.style.display='none'"
          />
          <div class="absolute bottom-6 -left-6 bg-surface-container-lowest p-6 shadow-xl max-w-[240px]">
            <p class="font-headline font-bold text-primary text-xl mb-1">{profile.yearsExperience ?? '5'}+</p>
            <p class="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Years of Experience</p>
          </div>
        </div>
      </div>

    </div>
  </section>

  <FeaturedHighlights />
  <ExperiencePreview />
</BaseLayout>
```

Required `profile.json` fields (added in Step 03):
- `heroHeadline` — first line of the H1 (e.g. `"Engineering with"`)
- `heroAccent` — second line in `text-tertiary` (e.g. `"Precision."`)
- `aboutQuote` — optional italic blockquote beneath the about paragraph
- `yearsExperience` — number shown in the portrait badge (e.g. `"5"`)
- `heroBannerUrl` — used as the portrait / banner image in the right column

---

## 5.4 Visual Verification Checklist

Open `http://localhost:4321`:

- [ ] H1 renders the `heroHeadline` + `heroAccent` on two lines; accent is `text-tertiary` (warm brown)
- [ ] "The Narrative" pill badge visible above the H1
- [ ] About paragraph and optional italic quote visible
- [ ] Portrait card: aspect-square image, hovers to scale
- [ ] Years badge: white card overlapping bottom-left of portrait
- [ ] "Knowledge Base / Latest Insights" section header visible
- [ ] Blog cards: images start greyscale, transition to colour on hover
- [ ] "Read Full Insight" link with `north_east` icon
- [ ] Fallback "Articles coming soon" renders if no posts exist
- [ ] ExperiencePreview: `bg-primary-container` block, current role + company visible
- [ ] Honey "View Full Experience" button (`bg-tertiary`)
- [ ] Stats row: Positions / Years / Speciality

---

## Commit Checkpoint

```bash
git add src/components/home/ src/pages/index.astro
git commit -m "feat: implement Home page — narrative hero, blog highlights, experience CTA"
```
