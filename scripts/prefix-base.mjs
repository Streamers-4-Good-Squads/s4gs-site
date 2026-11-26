// Test uniquement : prefixe les liens absolus du site pour l'adresse temporaire
// https://<org>.github.io/<depot>/ . Inutile (et desactive) une fois le domaine branche.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.argv[2] || '').replace(/\/+$/, '');
if (!base) { console.log('Pas de prefixe, rien a faire.'); process.exit(0); }

const attr = /(\b(?:href|src|action|poster)=)(["'])\/(?!\/)/g;
const cssUrl = /url\((["']?)\/(?!\/)/g;
let n = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.(html|css)$/.test(name)) continue;
    const src = readFileSync(p, 'utf8');
    const out = src
      .replace(attr, (_, a, q) => `${a}${q}${base}/`)
      .replace(cssUrl, (_, q) => `url(${q}${base}/`);
    if (out !== src) { writeFileSync(p, out); n++; }
  }
}
walk('dist');
console.log(`Prefixe ${base} applique sur ${n} fichiers.`);
