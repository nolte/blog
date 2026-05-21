// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Update site + base when the deployment URL is fixed. For a project page on
// GitHub Pages (https://<user>.github.io/blog/) set base: "/blog". For a
// custom domain or a user/organisation root site, leave base undefined.
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
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: "en", locales: { en: "en", de: "de" } } })],
  vite: {
    // Cast avoids a known Vite-version skew between Astro's internal Vite and
    // the one pulled in transitively by @tailwindcss/vite. Runtime is fine.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
