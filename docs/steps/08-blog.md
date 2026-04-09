# Step 08 — Blog

Build the blog listing page (`/blog`) and the dynamic article detail page (`/blog/[slug]`). Blog posts are loaded from Astro Content Collections (Markdown files).

**Prerequisite:** Steps 01–04 complete. `src/content/blog/*.md` files created in Step 03.

**Reference design:** `rework/stitch_projects_skills(1)/stitch_projects_skills/personal_blog_professional_olive/code.html`

---

## 8.1 `src/components/blog/FeaturedPost.astro`

The large featured post card at the top of the listing. Renders a 2-column grid (image left, content right) inside a `bg-surface-container-low` card.

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'blog'>;
}
const { post } = Astro.props;

const formattedDate = post.data.date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<article class="md:col-span-12 group mb-8">
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-surface-container-low rounded-lg p-6 lg:p-12">

    <!-- Cover image -->
    <div class="overflow-hidden rounded-md aspect-video lg:aspect-square">
      <img
        src={post.data.coverImage}
        alt={post.data.coverImageAlt}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        width="600"
        height="600"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-col justify-center">
      <div class="flex gap-3 mb-6">
        <span class="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-sm text-[0.6875rem] font-label font-bold tracking-widest uppercase">
          Featured
        </span>
        <span class="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-sm text-[0.6875rem] font-label font-bold tracking-widest uppercase">
          {post.data.category}
        </span>
      </div>

      <h2 class="text-3xl md:text-4xl font-black font-headline tracking-tight text-on-background mb-4 group-hover:text-primary transition-colors">
        {post.data.title}
      </h2>

      <p class="text-on-surface-variant text-lg leading-relaxed mb-6 line-clamp-3">
        {post.data.excerpt}
      </p>

      <div class="flex items-center justify-between text-xs font-label uppercase tracking-widest text-on-surface-variant/60">
        <span>{post.data.readTime} Min Read • {formattedDate}</span>
        <a href={`/blog/${post.id}`} class="text-primary font-bold hover:underline underline-offset-4 decoration-secondary">
          Read Entry
        </a>
      </div>
    </div>

  </div>
</article>
```

Note: use `post.id` (not `post.slug`) for the blog link — required in Astro Content Collections v2+.

---

## 8.2 `src/components/blog/PostCard.astro`

A standard post card for the staggered grid. Accepts an `offset` prop — every odd card is shifted down `md:mt-24` to create an editorial stagger effect.

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'blog'>;
  offset?: boolean;
}
const { post, offset = false } = Astro.props;

const formattedDate = post.data.date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<article class={`md:col-span-6 group ${offset ? 'md:mt-24' : ''}`}>

  <!-- Cover image -->
  <div class="mb-6 overflow-hidden rounded-md aspect-video">
    <img
      src={post.data.coverImage}
      alt={post.data.coverImageAlt}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      width="400"
      height="225"
      loading="lazy"
    />
  </div>

  <!-- Tags -->
  <div class="flex gap-2 mb-4">
    <span class="bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-sm text-[0.6rem] font-label font-bold tracking-widest uppercase">
      {post.data.category}
    </span>
  </div>

  <!-- Title -->
  <h3 class="text-2xl font-black font-headline tracking-tight text-on-background mb-3 group-hover:text-primary transition-colors">
    {post.data.title}
  </h3>

  <!-- Excerpt -->
  <p class="text-on-surface-variant leading-relaxed mb-6">
    {post.data.excerpt}
  </p>

  <!-- Meta -->
  <div class="text-[0.6875rem] font-label uppercase tracking-widest text-on-surface-variant/60">
    {post.data.readTime} Min Read • {formattedDate}
  </div>

</article>
```

The stagger is applied by the parent page: `<PostCard post={post} offset={i % 2 === 1} />` — every second card is offset.

---

## 8.3 `src/components/blog/NewsletterCTA.astro`

A full-width `bg-primary` CTA block with direct contact links (no email form — uses `mailto:` and `/contact` links).

```astro
---
import profile from '../../content/data/profile.json';
---

<section class="mt-32 mb-24 relative overflow-hidden bg-primary p-12 lg:p-24 rounded-lg">
  <!-- Decorative triangle -->
  <div class="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" aria-hidden="true">
    <svg class="h-full w-full fill-white" viewBox="0 0 100 100">
      <path d="M0 0 L100 0 L100 100 Z"></path>
    </svg>
  </div>

  <div class="relative z-10 max-w-2xl">
    <h2 class="text-4xl md:text-5xl font-black font-headline tracking-tighter text-on-primary mb-6 leading-tight">
      Let's Talk <br/> Engineering.
    </h2>
    <p class="text-on-primary/80 text-lg mb-10 leading-relaxed">
      Interested in collaborating, discussing architecture patterns, or just talking tech? Reach out directly — no friction, no forms.
    </p>
    <div class="flex flex-col sm:flex-row gap-4">
      <a
        href={`mailto:${profile.social.email}`}
        class="flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold font-headline rounded-lg hover:bg-surface-container-low transition-all"
      >
        <span class="material-symbols-outlined" style="font-size:18px">mail</span>
        Send an Email
      </a>
      <a
        href="/contact"
        class="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-bold font-headline rounded-lg hover:bg-white/20 transition-all"
      >
        <span class="material-symbols-outlined" style="font-size:18px">contacts</span>
        All Contacts
      </a>
    </div>
    <p class="mt-6 text-on-primary/40 text-[0.6875rem] font-label uppercase tracking-widest">
      I typically respond within 1–2 business days.
    </p>
  </div>
</section>
```

This component imports `profile.json` directly for the email address — no Formspree dependency.

---

## 8.4 `src/pages/blog/index.astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import FeaturedPost from '../../components/blog/FeaturedPost.astro';
import PostCard from '../../components/blog/PostCard.astro';
import NewsletterCTA from '../../components/blog/NewsletterCTA.astro';

const allPosts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);

const featuredPost = allPosts.find((p) => p.data.featured);
const gridPosts = allPosts.filter((p) => !p.data.featured);
---

<BaseLayout
  title="Blog — Ondřej Burda"
  activeNav="blog"
  description="Articles on backend engineering, Kotlin/Java patterns, and software architecture."
>

  <header class="mb-16 max-w-4xl">
    <p class="text-secondary font-label text-xs uppercase tracking-[0.2em] mb-4">The Digital Garden</p>
    <h1 class="text-6xl md:text-7xl font-black font-headline tracking-tighter text-on-background leading-[0.9]">
      Engineering <br/>
      <span class="text-primary italic font-light">Insights.</span>
    </h1>
    <p class="mt-8 text-xl text-on-surface-variant max-w-2xl leading-relaxed">
      A curated collection of technical explorations and reflections on the evolving landscape of backend engineering.
    </p>
  </header>

  {featuredPost && <FeaturedPost post={featuredPost} />}

  {gridPosts.length > 0 && (
    <div class="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 mb-24 mt-16">
      {gridPosts.map((post, i) => (
        <PostCard post={post} offset={i % 2 === 1} />
      ))}
    </div>
  )}

  <NewsletterCTA />

</BaseLayout>
```

The H1 splits across two lines with `leading-[0.9]` tight tracking — "Engineering" in `text-on-background` (dark) and "Insights." in `text-primary italic font-light`.

---

## 8.5 `src/pages/blog/[slug].astro`

Dynamic route for individual article pages. Uses `post.id` for `getStaticPaths` and the `render()` function from `astro:content`.

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);

const formattedDate = post.data.date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<BaseLayout
  title={`${post.data.title} — Ondřej Burda`}
  activeNav="blog"
  description={post.data.excerpt}
>
  <article class="max-w-3xl">

    <!-- Back link -->
    <a href="/blog" class="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary text-sm font-medium mb-8 transition-colors">
      <span class="material-symbols-outlined" style="font-size:16px">arrow_back</span>
      Back to Insights
    </a>

    <!-- Cover image -->
    <div class="aspect-video rounded-xl overflow-hidden mb-8 bg-surface-container-low">
      <img
        src={post.data.coverImage}
        alt={post.data.coverImageAlt}
        class="w-full h-full object-cover"
        width="900"
        height="506"
      />
    </div>

    <!-- Article header -->
    <header class="mb-10">
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <span class="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full">
          {post.data.category}
        </span>
        <span class="text-on-surface-variant text-sm">
          {formattedDate} · {post.data.readTime} min read
        </span>
      </div>

      <h1 class="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight mb-4">
        {post.data.title}
      </h1>

      <p class="text-xl text-on-surface-variant leading-relaxed">
        {post.data.excerpt}
      </p>
    </header>

    <hr class="border-outline-variant/20 mb-10" />

    <!-- Article body -->
    <div class="prose prose-slate max-w-none
      prose-headings:font-headline prose-headings:text-on-surface
      prose-p:text-on-surface-variant prose-p:leading-relaxed
      prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
      prose-code:text-primary prose-code:bg-surface-container-low prose-code:rounded prose-code:px-1
      prose-pre:bg-on-primary-fixed-variant prose-pre:text-on-primary-container prose-pre:rounded-xl
      prose-strong:text-on-surface
      prose-li:text-on-surface-variant
    ">
      <Content />
    </div>

    <!-- Bottom back link -->
    <div class="mt-16 pt-8 border-t border-outline-variant/15">
      <a href="/blog" class="inline-flex items-center gap-1 text-primary font-bold hover:underline transition-colors">
        <span class="material-symbols-outlined" style="font-size:16px">arrow_back</span>
        All Articles
      </a>
    </div>

  </article>
</BaseLayout>
```

The `prose` classes require `@tailwindcss/typography`. With Tailwind v4 this is added in `global.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

---

## 8.6 Visual Verification Checklist

Open `http://localhost:4321/blog`:

- [ ] "The Digital Garden" label in `text-secondary` above H1
- [ ] H1: "Engineering" (dark) + "Insights." (primary, italic, light weight) — tight tracking
- [ ] Featured post: 2-column card, image left (aspect-square on `lg:`), content right
- [ ] "Featured" + category badges side by side
- [ ] Post grid: staggered — odd cards shifted down `md:mt-24`
- [ ] Post cards: no explicit card border, image scales on hover
- [ ] NewsletterCTA: `bg-primary` block with decorative triangle, two CTA buttons
- [ ] Click "Read Entry" → navigates to `/blog/[slug]`
- [ ] Article page: back link, cover image, category + date metadata, prose body renders

---

## Commit Checkpoint

```bash
git add src/components/blog/ src/pages/blog/
git commit -m "feat: implement Blog — listing page, staggered grid, article detail"
```
