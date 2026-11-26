export interface Item { h3: string; text: string }
export interface Head { title: string; description: string; kick: string; h1: string; lead: string }
export interface CalItem { iso?: string; end?: string; label?: string; t: string; p: string; link?: string; past?: boolean }
export interface AssocStrings {
  home: {
    kick: string; h1: string; lead: string; join: string; give: string; cupBtn: string;
    assoc: { kick: string; h2: string; lead: string; more: string };
    missions: Item[];
    stats: { kick: string; h2: string; items: { v: string; l: string }[] };
    events: { kick: string; h2: string; all: string };
    news: { kick: string; h2: string; all: string };
    partners: { h2: string; all: string };
  };
  association: {
    head: Head; story: { h2: string; paras: string[] }; missions: { h2: string; intro: string };
    partner: { tag: string; h3: string; text: string; points: Item[]; cta: string };
    transparency: { h2: string; text: string; cta: string };
    mission: { text: string; cta: string };
  };
  events: {
    head: Head;
    cup: { tag: string; h3: string; text: string; cta: string; rules: string; faq: string };
    stream: { tag: string; h3: string; text: string };
    calendar: { kick: string; h2: string; upcoming: string; past: string; items: CalItem[] };
  };
  news: { head: Head; sample: string; posts: { date: string; t: string; p: string }[] };
  streamers: { head: Head; sample: string; join: { h2: string; text: string; cta: string; subject: string }; roles: string[]; items: { n: string; role: string; region: string }[] };
  partners: { head: Head; sample: string; groups: { h2: string; names: string[] }[]; join: { h2: string; text: string; cta: string; subject: string } };
  contact: { head: Head; cards: { h3: string; text: string; cta: string; subject?: string; href?: string }[]; address: string };
  transparency: { head: Head; sample: string; docs: { t: string; p: string }[]; note: string };
}
