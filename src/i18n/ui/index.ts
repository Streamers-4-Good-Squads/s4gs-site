import { fr } from './fr'; import { en } from './en'; import type { UI } from './types';
const ALL: Record<string, UI> = { fr, en };
export const ui = (lang: string): UI => ALL[lang] ?? en;
