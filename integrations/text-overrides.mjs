// Textes modifiés depuis le site (mode édition, bouton crayon) : src/data/text-overrides.json
// Format : { "fr": { "texte d'origine": "nouveau texte" }, "en": { ... } }
// À la fin de la compilation, chaque texte d'origine trouvé dans les pages de la langue est remplacé.
// Une copie du fichier est publiée dans /edit/overrides.json pour l'éditeur.
// Couleurs modifiées depuis le site : src/data/style-overrides.json
// Format : { "<page>": { "main>section:nth-child(2)>...": { "color": "var(--y)", "background": "#112233" } } }
// <page> = chemin après la langue (« index » pour l'accueil, « mobile-cup », « mission »...), valable pour toutes les langues.
// Une feuille <style id="s4e-styles"> est ajoutée aux pages concernées ; copie publiée dans /edit/styles.json.
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

// Mêmes règles que le service (worker/src/index.js) : seules les valeurs sûres passent
const SEL_OK = /^main(>[a-z][a-z0-9]*:nth-child\(\d{1,3}\))+$/;
const VAL_OK = /^(var\(--(acc|lav|y|b|g|ink|mut|card|bg|tint|edge)\)|#[0-9a-f]{6})$/i;
export function styleSheet(rules) {
  if (!rules) return '';
  return Object.entries(rules).filter(([sel]) => SEL_OK.test(sel) && sel.length <= 400).map(([sel, d]) => {
    const decl = ['color', 'background'].filter((p) => d && VAL_OK.test(d[p] || '')).map((p) => `${p}:${d[p]}!important`).join(';');
    return decl ? `${sel}{${decl}}` : '';
  }).join('');
}
const pageOf = (rel) => {
  const parts = rel.replace(/\\/g, '/').replace(/index\.html$/, '').split('/').filter(Boolean);
  if (!parts.length || !/^[a-z]{2}$/.test(parts[0])) return null;
  return parts.slice(1).join('-') || 'index';
};

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
        const css = JSON.parse(readFileSync(new URL('../src/data/style-overrides.json', import.meta.url), 'utf8'));
        writeFileSync(join(root, 'edit', 'styles.json'), JSON.stringify(css));
        let n = 0, c = 0;
        const walk = (d) => readdirSync(d).forEach((f) => {
          const p = join(d, f);
          if (statSync(p).isDirectory()) return walk(p);
          if (!f.endsWith('.html')) return;
          const html = readFileSync(p, 'utf8');
          const lang = (html.match(/<html[^>]*\blang="([a-z]{2})/i) || [])[1];
          let out = applyOverrides(html, all[lang]);
          if (out !== html) n++;
          const sheet = styleSheet(css[pageOf(p.slice(root.length))]);
          if (sheet) { out = out.replace('</head>', `<style id="s4e-styles">${sheet}</style></head>`); c++; }
          if (out !== html) writeFileSync(p, out);
        });
        walk(root);
        console.log(`[textes modifiés] appliqués sur ${n} page(s), [couleurs modifiées] sur ${c} page(s)`);
      },
    },
  };
}
