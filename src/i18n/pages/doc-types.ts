export interface Block { h2: string; paras?: string[]; items?: string[]; table?: { head: string[]; rows: string[][] }; qa?: { q: string; a: string }[] }
export interface DocPage { title: string; description: string; h1: string; lead: string; blocks: Block[]; cta?: 'register' | 'donate'; noindex?: boolean }
