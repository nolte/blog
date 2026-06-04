import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z
    .object({
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
      // Audience contract — see spec/project/post-audience-communication
      // (nolte/claude-shared). primaryAudience defaults to "A" (peer-technical
      // reader), the corpus's most common shape; secondaryAudiences lists other
      // direct-end-reader subgroups served via escape-hatch links.
      primaryAudience: z.enum(["A", "B", "C"]).default("A"),
      secondaryAudiences: z.array(z.enum(["A", "B", "C"])).default([]),
    })
    .superRefine((data, ctx) => {
      if (data.secondaryAudiences.includes(data.primaryAudience)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["secondaryAudiences"],
          message: `secondaryAudiences must not contain the primaryAudience value "${data.primaryAudience}"`,
        });
      }
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
