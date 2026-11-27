export interface CupPage {
  title: string; description: string;
  hero: { kicker: string; h1: string; lead: string; free: string };
  dates: { h2: string; items: Record<string, string> };
  games: { h2: string; intro: string; crText: string; bsText: string; open: string; openText: string; discovery: string; discoveryText: string; mixed: string };
  zones: { h2: string; intro: string; names: Record<string, string>; tz: string };
  format: { h2: string; items: string[] };
  register: { h2: string; text: string; soon: string; counter: string; ages: string };
  fund: { h2: string; intro: string; items: string[]; continents: string; minors: string };
  donate: { h2: string; text: string; cta: string; use: string; free: string };
  disclaimer: string;
}
export interface ThanksPage {
  title: string; h1: string; lead: string; next: string[];
  donate: { h2: string; text: string; cta: string; free: string; minors: string; share: string; shareText: string; later: string; noAdvantage: string; fund: string };
}
export interface HomePage {
  title: string; description: string; h1: string; lead: string;
  mission: { h2: string; text: string; more: string };
  events: { h2: string; cup: { h3: string; text: string; cta: string }; stream: { h3: string; text: string } };
  help: { h2: string; items: { h3: string; text: string }[] };
}
