# Step 08 — Blog

Build the blog listing page (`/blog`) and the dynamic article detail page (`/blog/[slug]`). Blog posts are loaded from Astro Content Collections (Markdown files).

**Prerequisite:** Steps 01–04 complete. `src/content/blog/*.md` files created in Step 03.

**Reference:** `design-assets/blog/prototype.html`, `design-assets/blog/screen.png`

---

## 8.1 `src/components/blog/FeaturedPost.astro`

The large editorial-style featured post card at the top of the blog listing.

```astro
---
import type { CollectionEntry } from 'astro:content';

interface Props {
  post: CollectionEntry<'blog'>;
}
const { post } = Astro.props;

// Format date: "May 12, 2024"
const formattedDate = post.data.date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<section class="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm group hover:shadow-lg transition-all duration-300">
  <div class="grid md:grid-cols-2">

    <!-- Cover image (left half) -->
    <div class="h-64 md:h-full relative overflow-hidden">
      <img
        src={post.data.coverImage}
        alt={post.data.coverImageAlt}
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        width="600"
        height="400"
      />
    </div>

    <!-- Content (right half) -->
    <div class="p-8 md:p-12 flex flex-col justify-center">

      <!-- Featured badge + metadata -->
      <div class="flex items-center gap-3 mb-6">
        <span class="bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
          Featured
        </span>
        <span class="text-on-surface-variant text-sm font-medium">
          {formattedDate} · {post.data.readTime} min read
        </span>
      </div>

      <!-- Title -->
      <h2 class="text-3xl font-bold font-headline text-on-surface mb-4 leading-tight">
        {post.data.title}
      </h2>

      <!-- Excerpt -->
      <p class="text-on-surface-variant mb-8 line-clamp-3 leading-relaxed">
        {post.data.excerpt}
      </p>

      <!-- Tags + CTA -->
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <span class="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full">
            {post.data.category}
          </span>
        </div>
        <a
          href={`/blog/${post.slug}`}
          class="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          Read Article
          <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>

    </div>
  </div>
</section>
```

---

## 8.2 `src/components/blog/PostCard.astro`

A standard blog post card for the 2×N grid.

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

<article class="bg-surface-container-lowest rounded-xl flex flex-col h-full shadow-sm hover:shadow-md transition-all">

  <!-- Cover image -->
  <div class="h-48 rounded-t-xl overflow-hidden">
    <img
      src={post.data.coverImage}
      alt={post.data.coverImageAlt}
      class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      width="400"
      height="192"
      loading="lazy"
    />
  </div>

  <!-- Card content -->
  <div class="p-6 flex flex-col flex-1">

    <!-- Date + read time -->
    <div class="flex items-center justify-between mb-4">
      <span class="text-on-surface-variant text-xs font-medium">{formattedDate}</span>
      <span class="text-on-surface-variant text-xs font-medium">{post.data.readTime} min read</span>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-bold font-headline text-on-surface mb-3 leading-tight">
      {post.data.title}
    </h3>

    <!-- Excerpt -->
    <p class="text-on-surface-variant text-sm mb-6 flex-1 leading-relaxed">
      {post.data.excerpt}
    </p>

    <!-- Category + Read More -->
    <div class="flex items-center justify-between mt-auto">
      <span class="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full">
        {post.data.category}
      </span>
      <a href={`/blog/${post.slug}`} class="text-primary text-sm font-bold hover:underline">
        Read More
      </a>
    </div>

  </div>
</article>
```

---

## 8.3 `src/components/blog/NewsletterCTA.astro`

The full-width newsletter subscribe section with Formspree form.

```astro
---
// Replace XXXXXXXX with your actual Formspree endpoint ID
// Get it from: https://formspree.io/forms (after creating a form)
const FORMSPREE_ID = 'XXXXXXXX';
---

<section class="mt-20 p-12 bg-primary-container rounded-2xl relative overflow-hidden">
  <!-- Decorative blurred blob -->
  <div
    class="absolute -right-20 -bottom-20 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20"
    aria-hidden="true"
  ></div>

  <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">

    <!-- Text content -->
    <div class="flex-1">
      <h2 class="text-3xl font-bold font-headline text-on-primary mb-2">
        Subscribe to Tech Deep Dives
      </h2>
      <p class="text-on-primary-container">
        Get bi-weekly articles on architecture, frontend engineering, and developer tooling.
      </p>
    </div>

    <!-- Form -->
    <form
      action={`https://formspree.io/f/${FORMSPREE_ID}`}
      method="POST"
      class="relative z-10 w-full md:w-auto flex flex-col sm:flex-row gap-3"
    >
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        class="px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white focus:outline-none sm:w-80"
      />
      <button
        type="submit"
        class="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-surface-container-low transition-colors"
      >
        Join Now
      </button>
    </form>

  </div>
</section>
```

---

## 8.4 `src/pages/blog/index.astro`

The blog listing page. Separates the `featured` post from the grid.

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import FeaturedPost from '@components/blog/FeaturedPost.astro';
import PostCard from '@components/blog/PostCard.astro';
import NewsletterCTA from '@components/blog/NewsletterCTA.astro';

// Fetch all blog posts, sorted by date (newest first)
const allPosts = (await getCollection('blog')).sort(
  (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
);

const featuredPost = allPosts.find((p) => p.data.featured);
const gridPosts = allPosts.filter((p) => !p.data.featured);
---

<BaseLayout
  title="Blog — Ondřej Burda"
  activeNav="blog"
  description="Articles on scalable architecture, modern frontend patterns, and cloud computing."
>
  <div class="space-y-12">

    <!-- Page header -->
    <header>
      <h1 class="text-5xl font-extrabold font-headline text-on-surface tracking-tighter mb-4">
        Insights & Engineering
      </h1>
      <p class="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
        Exploring the intersection of scalable architecture, modern frontend patterns, and the future of cloud computing.
      </p>
    </header>

    <!-- Featured post -->
    {featuredPost && <FeaturedPost post={featuredPost} />}

    <!-- Post grid -->
    {gridPosts.length > 0 && (
      <section class="grid md:grid-cols-2 gap-8">
        {gridPosts.map((post) => (
          <PostCard post={post} />
        ))}
      </section>
    )}

    <!-- Newsletter CTA -->
    <NewsletterCTA />

  </div>
</BaseLayout>
```

---

## 8.5 `src/pages/blog/[slug].astro`

Dynamic route for individual blog article pages. Astro generates one static page per `.md` file in `src/content/blog/`.

```astro
---
import { getCollection, getEntry } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

// Required for static site generation — tell Astro which slugs exist
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();

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
      <span class="material-symbols-outlined text-sm">arrow_back</span>
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
      <!-- Category + metadata -->
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <span class="px-3 py-1 bg-surface-container-high text-on-surface-variant text-xs font-bold rounded-full">
          {post.data.category}
        </span>
        <span class="text-on-surface-variant text-sm">
          {formattedDate} · {post.data.readTime} min read
        </span>
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight mb-4">
        {post.data.title}
      </h1>

      <!-- Excerpt / lead -->
      <p class="text-xl text-on-surface-variant leading-relaxed">
        {post.data.excerpt}
      </p>
    </header>

    <!-- Divider -->
    <hr class="border-outline-variant/20 mb-10" />

    <!-- Article body — Markdown rendered content -->
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

    <!-- Back link at the bottom -->
    <div class="mt-16 pt-8 border-t border-outline-variant/15">
      <a href="/blog" class="inline-flex items-center gap-1 text-primary font-bold hover:underline transition-colors">
        <span class="material-symbols-outlined text-sm">arrow_back</span>
        All Articles
      </a>
    </div>

  </article>
</BaseLayout>
```

Note: `prose` classes require `@tailwindcss/typography` plugin. Install it:

```bash
npm install -D @tailwindcss/typography
```

Then add to `tailwind.config.mjs`:

```javascript
plugins: [
  require('@tailwindcss/typography'),
],
```

---

## 8.6 Visual Verification Checklist

Open `http://localhost:4321/blog` and compare against `design-assets/blog/screen.png`:

- [ ] Page H1: "Insights & Engineering" in `font-headline font-extrabold tracking-tighter`
- [ ] Featured post: 2-column layout — image left, content right
- [ ] "Featured" badge: light blue background (`bg-primary-fixed`), dark text
- [ ] Post grid: 2-column, equal height cards
- [ ] Cover images: `h-48`, `rounded-t-xl`, clip overflow
- [ ] Category chips: `bg-surface-container-high`, `rounded-full`, small
- [ ] Newsletter CTA: `bg-primary-container` background, white input field, decorative blurred blob
- [ ] Click a "Read More" → navigates to `/blog/[slug]`
- [ ] Article page: back link, large cover image, article title in `font-headline`, Markdown body renders with prose styles

---

## Commit Checkpoint

```bash
git add src/components/blog/ src/pages/blog/
git commit -m "feat: implement Blog — listing page, article detail, newsletter CTA"
```
