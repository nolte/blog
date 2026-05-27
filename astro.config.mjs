// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeMermaid from "rehype-mermaid";

// Update site + base when the deployment URL is fixed. For a project page on
// GitHub Pages (https://<user>.github.io/blog/) set base: "/blog". For a
// custom domain or a user/organisation root site, leave base undefined.
//
// Mermaid: rehype-mermaid's `inline-svg` strategy spawns Chromium per diagram
// at build time. That works in `astro build` but silently swallows the
// markdown body of any post containing a `mermaid` fence under `astro dev` —
// the async rehype plugin and Astro dev's content pipeline race, and the post
// renders with an empty `<article>`. The per-command strategy switch below
// keeps dev usable (raw fence stays as a `<pre>` block) while production
// still gets inline SVGs with no runtime JS. `defineConfig` in Astro is just
// type validation (not the Vite function form), so we detect the command via
// process.argv.
const isDevCommand = process.argv.some((arg) => arg === "dev");
const mermaidStrategy = isDevCommand ? "pre-mermaid" : "inline-svg";

export default defineConfig({
  site: "https://nolte.github.io",
  base: "/blog",
  trailingSlash: "ignore",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  markdown: {
    syntaxHighlight: { type: "shiki", excludeLangs: ["mermaid", "math"] },
    rehypePlugins: [[rehypeMermaid, { strategy: mermaidStrategy }]],
  },
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", de: "de" } } })],
  vite: {
    // Cast avoids a known Vite-version skew between Astro's internal Vite and
    // the one pulled in transitively by @tailwindcss/vite. Runtime is fine.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
