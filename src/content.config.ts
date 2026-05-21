import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(["en", "de"]),
    translationKey: z.string(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    draft: z.boolean().default(false),
    portfolioProject: z.string().optional(),
    aiGenerated: z.boolean().default(true),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    repo: z.string().url().optional(),
    homepage: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(["en", "de"]),
    translationKey: z.string(),
    archived: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { posts, projects };
