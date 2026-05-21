import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "~/consts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => data.lang === "de" && !data.draft);
  return rss({
    title: SITE.title,
    description: SITE.description.de,
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/de/blog/${post.id.replace(/^de\//, "")}/`,
        categories: post.data.tags,
      })),
  });
}
