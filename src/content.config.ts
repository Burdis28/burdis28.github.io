import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "[!R][!E][!A][!D][!M][!E]*.md",
    base: "./src/content/blog",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      readTime: z.number(),
      category: z.string(),
      featured: z.boolean().default(false),
      excerpt: z.string(),
      coverImage: image(),
      coverImageAlt: z.string(),
    }),
});

export const collections = { blog };
