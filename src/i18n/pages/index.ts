import { cupFr, thanksFr } from './fr'; import { cupEn, thanksEn } from './en';
export const cupPage = (l: string) => (l === 'fr' ? cupFr : cupEn);
export const thanksPage = (l: string) => (l === 'fr' ? thanksFr : thanksEn);
import { docsFr } from './docs-fr'; import { docsEn } from './docs-en';
export const DOC_SLUGS = ['mission', 'rules', 'faq', 'privacy', 'prizes', 'cookies', 'football-cup'];
export const docPage = (l: string, s: string) => (l === 'fr' ? docsFr : docsEn)[s];
import { homeFr, homeEn } from './home'; export const homePage = (l: string) => (l === 'fr' ? homeFr : homeEn);
import { formFr, formEn } from './form'; export const formStrings = (l: string) => (l === 'fr' ? formFr : formEn);
