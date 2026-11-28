import { cupFr, thanksFr } from './fr'; import { cupEn, thanksEn } from './en';
export const cupPage = (l: string) => (l === 'fr' ? cupFr : cupEn);
export const thanksPage = (l: string) => (l === 'fr' ? thanksFr : thanksEn);
import { docsFr } from './docs-fr'; import { docsEn } from './docs-en';
export const DOC_SLUGS = ['mission', 'rules', 'faq', 'privacy', 'terms', 'prizes', 'cookies', 'football-cup'];
export const docPage = (l: string, s: string) => (l === 'fr' ? docsFr : docsEn)[s];
import { homeFr, homeEn } from './home'; export const homePage = (l: string) => (l === 'fr' ? homeFr : homeEn);
import { formFr, formEn } from './form'; export const formStrings = (l: string) => (l === 'fr' ? formFr : formEn);
import { assocFr } from './assoc-fr'; import { assocEn } from './assoc-en';
import content from '../../data/content.json';
// Les contenus de src/data/content.json (modifiables depuis /admin/) remplacent les textes de base.
export const assocPage = (l: string) => {
  const base = l === 'fr' ? assocFr : assocEn; const k = l === 'fr' ? 'fr' : 'en';
  const c: any = content; const v = (o: any) => (o && o[k] !== undefined ? o[k] : '');
  return {
    ...base,
    home: { ...base.home, h1: v(c.home?.h1) || base.home.h1, lead: v(c.home?.lead) || base.home.lead,
      stats: { ...base.home.stats, items: (c.stats ?? []).map((s: any) => ({ v: s.v, l: v(s.l) })) } },
    news: { ...base.news, posts: (c.news ?? []).map((n: any) => ({ date: n.date, img: n.img || '', t: v(n.t), p: v(n.p) })) },
    streamers: { ...base.streamers, items: (c.streamers ?? []).map((s: any) => ({ n: s.n, role: v(s.role), region: v(s.region) })) },
    partners: { ...base.partners, groups: (c.partners ?? []).map((g: any) => ({ h2: v(g.h2), names: g.names })) },
    events: { ...base.events, calendar: { ...base.events.calendar, items: (c.events ?? []).map((e: any) => ({ iso: e.iso || undefined, end: e.end || undefined, label: v(e.label) || undefined, t: v(e.t), p: v(e.p), link: e.link || undefined, past: !!e.past })) } },
  } as typeof base & { news: { posts: { img?: string }[] } };
};
