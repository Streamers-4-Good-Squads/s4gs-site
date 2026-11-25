// Les 9 langues du site. `ready: true` = traduction relue et publiée.
// Pour publier une langue : créer src/i18n/ui/<code>.ts, src/i18n/pages/<code>.ts, puis passer ready à true.
export const DEFAULT = 'en';
export const LOCALES = [
  { code: 'en', name: 'English', ready: true },
  { code: 'fr', name: 'Français', ready: true },
  { code: 'de', name: 'Deutsch', ready: false },
  { code: 'es', name: 'Español', ready: false },
  { code: 'it', name: 'Italiano', ready: false },
  { code: 'pl', name: 'Polski', ready: false },
  { code: 'ro', name: 'Română', ready: false },
  { code: 'cs', name: 'Čeština', ready: false },
  { code: 'pt', name: 'Português', ready: false },
] as const;
export type Lang = (typeof LOCALES)[number]['code'];
export const READY = LOCALES.filter((l) => l.ready);
export const READY_CODES = READY.map((l) => l.code) as string[];
