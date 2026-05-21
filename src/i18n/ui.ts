import type { Locale } from "~/consts";

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.rss": "RSS",
    "lang.switchTo": "Deutsch",
    "lang.label": "English",
    "post.published": "Published",
    "post.updated": "Updated",
    "post.tags": "Tags",
    "post.translation": "Read in German",
    "post.ai": "AI-generated, curated by a human",
    "post.backToBlog": "← Back to all posts",
    "list.latestPosts": "Latest posts",
    "list.allPosts": "All posts",
    "list.projects": "Software projects",
    "list.noPosts": "No posts yet — check back soon.",
    "footer.builtWith": "Built with Astro and curated with Claude.",
    "404.title": "Page not found",
    "404.body": "The page you were looking for does not exist.",
    "404.home": "Go home",
  },
  de: {
    "nav.home": "Start",
    "nav.blog": "Blog",
    "nav.projects": "Projekte",
    "nav.about": "Über",
    "nav.rss": "RSS",
    "lang.switchTo": "English",
    "lang.label": "Deutsch",
    "post.published": "Veröffentlicht",
    "post.updated": "Aktualisiert",
    "post.tags": "Schlagwörter",
    "post.translation": "Auf Englisch lesen",
    "post.ai": "KI-generiert, von einem Menschen kuratiert",
    "post.backToBlog": "← Zurück zur Übersicht",
    "list.latestPosts": "Neueste Beiträge",
    "list.allPosts": "Alle Beiträge",
    "list.projects": "Software-Projekte",
    "list.noPosts": "Noch keine Beiträge — bald geht's los.",
    "footer.builtWith": "Gebaut mit Astro, kuratiert mit Claude.",
    "404.title": "Seite nicht gefunden",
    "404.body": "Die gesuchte Seite existiert nicht.",
    "404.home": "Zur Startseite",
  },
} as const;

export type UiKey = keyof (typeof ui)["en"];

export function useTranslations(lang: Locale) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui.en[key];
  };
}

export function getLocaleFromUrl(url: URL): Locale {
  const seg = url.pathname.split("/").filter(Boolean)[0];
  return seg === "de" ? "de" : "en";
}

export function localizedPath(path: string, lang: Locale, base = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const prefix = lang === "en" ? "" : `/${lang}`;
  return `${base}${prefix}${clean}`.replace(/\/+$/, "") || `${base}/`;
}
