import { READY_CODES } from './locales';
export const path = (lang: string, slug = '') => `/${lang}/${slug ? slug + '/' : ''}`;
export const fmtDate = (iso: string, lang: string, o: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }) =>
  new Intl.DateTimeFormat(lang, { ...o, timeZone: 'UTC' }).format(new Date(iso + 'T12:00:00Z'));
export const fmtRange = (a: string, b: string | undefined, lang: string) =>
  !b ? fmtDate(a, lang, { day: 'numeric', month: 'long', year: 'numeric' }) :
  `${new Intl.DateTimeFormat(lang, { day: 'numeric', timeZone: 'UTC' }).format(new Date(a + 'T12:00:00Z'))} ${lang === 'fr' ? 'au' : 'to'} ${fmtDate(b, lang, { day: 'numeric', month: 'long', year: 'numeric' })}`;
export const isReady = (l: string) => READY_CODES.includes(l);
export const fmtSpan = (a: string, b: string | undefined, lang: string) => {
  const full: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  if (!b || a.slice(0, 7) === b.slice(0, 7)) return fmtRange(a, b, lang);
  return `${fmtDate(a, lang, full)} ${lang === 'fr' ? 'au' : 'to'} ${fmtDate(b, lang, full)}`;
};
