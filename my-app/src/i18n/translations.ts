// Bilingual UI strings (chrome/labels). Data content lives in db.json.
// Single source of truth is translations.json — imported here (typed) and also
// injected into the standalone live-preview HTML, so both deliverables match.
import data from "./translations.json";

export const LANGS = ["ar", "en"] as const;

export type Lang = (typeof LANGS)[number];

export const translations = data as Record<Lang, (typeof data)["ar"]>;
export type Translation = (typeof data)["ar"];
