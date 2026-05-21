export const SITE = {
  title: "Nolte's Blog",
  description: {
    en: "Knowledge base and notes on my software projects — written with AI, curated by me.",
    de: "Knowledge-Base und Notizen zu meinen Software-Projekten — KI-geschrieben, von mir kuratiert.",
  },
  author: "Nolte",
  defaultLocale: "en" as const,
} as const;

export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];
