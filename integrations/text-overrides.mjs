// Textes modifiés depuis le site (mode édition, bouton crayon) : src/data/text-overrides.json
// Format : { "fr": { "texte d'origine": "nouveau texte" }, "en": { ... } }
// À la fin de la compilation, chaque texte d'origine trouvé dans les pages de la langue est remplacé.
// Une copie du fichier est publiée dans /edit/overrides.json pour l'éditeur.
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (m, e) => {
  e = e.toLowerCase();
  if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' }[e];
});
const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function applyOverrides(html, map) {
  if (!map || !Object.keys(map).length) return html;
  // Les blocs script, style et textarea ne sont jamais modifiés
  return html.split(/(<(script|style|textarea)\b[\s\S]*?<\/\2>)/i).map((part, i) => {
    if (i % 3 === 1) return part;
    if (i % 3 === 2) return '';
    return part.replace(/>([^<]+)</g, (m, text) => {
      const key = norm(decode(text));
      if (!key || !(key in map)) return m;
      const lead = text.match(/^\s*/)[0], trail = text.match(/\s*$/)[0];
      return '>' + lead + escape(map[key]) + trail + '<';
    });
  }).join('');
}

export default function textOverrides() {
  return {
    name: 's4gs-text-overrides',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const root = fileURLToPath(dir);
        const src = new URL('../src/data/text-overrides.json', import.meta.url);
        const all = JSON.parse(readFileSync(src, 'utf8'));
        mkdirSync(join(root, 'edit'), { recursive: true });
        writeFileSync(join(root, 'edit', 'overrides.json'), JSON.stringify(all));
        let n = 0;
        const walk = (d) => readdirSync(d).forEach((f) => {
          const p = join(d, f);
          if (statSync(p).isDirectory()) return walk(p);
          if (!f.endsWith('.html')) return;
          const html = readFileSync(p, 'utf8');
          const lang = (html.match(/<html[^>]*\blang="([a-z]{2})/i) || [])[1];
          const out = applyOverrides(html, all[lang]);
          if (out !== html) { writeFileSync(p, out); n++; }
        });
        walk(root);
        console.log(`[textes modifiés] appliqués sur ${n} page(s)`);
      },
    },
  };
}
