// Service de publication de l'espace équipe S4GS (Cloudflare Worker).
// Vérifie la connexion Microsoft (organisation + domaine @s4gs.org), puis écrit dans le dépôt GitHub.

const CONTENT_PATH = 'src/data/content.json';
const TEXTS_PATH = 'src/data/text-overrides.json';
const STYLES_PATH = 'src/data/style-overrides.json';
const MAX_JSON = 300 * 1024, MAX_IMG = 1500 * 1024;

const b64url = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(s.length / 4) * 4, '=')), (c) => c.charCodeAt(0));
const txt = new TextDecoder();

let jwksCache = { at: 0, keys: null };
async function jwks(env) {
  if (jwksCache.keys && Date.now() - jwksCache.at < 3600e3) return jwksCache.keys;
  const r = await fetch(`https://login.microsoftonline.com/${env.TENANT_ID}/discovery/v2.0/keys`);
  jwksCache = { at: Date.now(), keys: (await r.json()).keys };
  return jwksCache.keys;
}

// Contrôle le jeton d'identité Microsoft et renvoie l'adresse e-mail validée.
async function verify(req, env) {
  const h = req.headers.get('Authorization') || '';
  const tok = h.startsWith('Bearer ') ? h.slice(7) : '';
  const parts = tok.split('.');
  if (parts.length !== 3) throw new Error('Connexion requise');
  let head, claims;
  try { head = JSON.parse(txt.decode(b64url(parts[0]))); claims = JSON.parse(txt.decode(b64url(parts[1]))); } catch (e) { throw new Error('Jeton refusé'); }
  if (head.alg !== 'RS256') throw new Error('Jeton refusé');
  const jwk = (await jwks(env)).find((k) => k.kid === head.kid);
  if (!jwk) throw new Error('Jeton refusé');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64url(parts[2]), new TextEncoder().encode(parts[0] + '.' + parts[1]));
  const now = Math.floor(Date.now() / 1000);
  if (!ok || claims.tid !== env.TENANT_ID || claims.aud !== env.CLIENT_ID || claims.exp < now || claims.nbf > now + 60 ||
      claims.iss !== `https://login.microsoftonline.com/${env.TENANT_ID}/v2.0`) throw new Error('Jeton refusé');
  const email = String(claims.preferred_username || claims.email || '').toLowerCase();
  if (!email.endsWith('@' + env.EMAIL_DOMAIN.toLowerCase())) throw new Error('Accès refusé : adresse hors de l’association');
  const allow = (env.ALLOWED_EMAILS || '').toLowerCase().split(',').map((x) => x.trim()).filter(Boolean);
  if (allow.length && !allow.includes(email)) throw new Error('Accès refusé : adresse non autorisée');
  return email;
}

const gh = (env, path, init = {}) => fetch(`https://api.github.com/repos/${env.GH_REPO}/${path}`, {
  ...init,
  headers: { Authorization: `Bearer ${env.GH_TOKEN}`, Accept: 'application/vnd.github+json', 'User-Agent': 's4gs-admin', 'X-GitHub-Api-Version': '2022-11-28', ...(init.headers || {}) },
});
const toB64 = (s) => { const u = new TextEncoder().encode(s); let bin = ''; u.forEach((c) => (bin += String.fromCharCode(c))); return btoa(bin); };
const fromB64 = (s) => txt.decode(Uint8Array.from(atob(s.replace(/\n/g, '')), (c) => c.charCodeAt(0)));

// Contrôle la forme du contenu : on n'accepte que du texte et la structure attendue.
function check(c) {
  const isStr = (x) => typeof x === 'string' && x.length < 5000;
  const bi = (o) => o && isStr(o.fr) && isStr(o.en);
  const arr = (a, f) => Array.isArray(a) && a.length < 300 && a.every(f);
  const img = (x) => x === '' || /^\/img\/uploads\/[a-z0-9-]+\.webp$/.test(x);
  const link = (x) => x === '' || /^[a-z0-9-]+$/.test(x);
  const date = (x) => x === '' || /^\d{4}-\d{2}-\d{2}$/.test(x);
  const ok = c && typeof c === 'object'
    && ['news', 'streamers', 'partners', 'transparency', 'stats'].every((k) => typeof c.sections?.[k] === 'boolean')
    && bi(c.home?.h1) && bi(c.home?.lead)
    && arr(c.stats, (s) => isStr(s.v) && bi(s.l))
    && arr(c.news, (n) => date(n.date) && n.date !== '' && img(n.img) && bi(n.t) && bi(n.p))
    && arr(c.streamers, (s) => isStr(s.n) && bi(s.role) && bi(s.region))
    && arr(c.partners, (g) => bi(g.h2) && arr(g.names, isStr))
    && arr(c.events, (e) => date(e.iso) && date(e.end) && bi(e.label) && bi(e.t) && bi(e.p) && link(e.link) && typeof e.past === 'boolean');
  if (!ok) throw new Error('Contenu invalide');
  // Seules ces clés sont conservées
  const { sections, home, stats, news, streamers, partners, events } = c;
  return { sections, home, stats, news, streamers, partners, events };
}

// Textes modifiés depuis le site : { "fr": { "texte d'origine": "nouveau texte" }, ... }
function checkTexts(c) {
  if (!c || typeof c !== 'object' || Array.isArray(c)) throw new Error('Textes invalides');
  const out = {};
  for (const [lang, map] of Object.entries(c)) {
    if (!/^[a-z]{2}$/.test(lang) || !map || typeof map !== 'object' || Array.isArray(map)) throw new Error('Textes invalides');
    out[lang] = {};
    for (const [k, v] of Object.entries(map)) {
      if (typeof k !== 'string' || typeof v !== 'string' || !k.trim() || !v.trim() || k.length > 2000 || v.length > 2000) throw new Error('Textes invalides');
      out[lang][k] = v;
    }
  }
  return out;
}

// Couleurs modifiées depuis le site : { page: { sélecteur: { color, background } } }, valeurs limitées aux couleurs
// de la charte (variables CSS) ou à un code #rrggbb, sélecteurs limités à un chemin depuis <main>.
function checkStyles(c) {
  if (!c || typeof c !== 'object' || Array.isArray(c)) throw new Error('Couleurs invalides');
  const SEL = /^main(>[a-z][a-z0-9]*:nth-child\(\d{1,3}\))+$/, VAL = /^(var\(--(acc|lav|y|b|g|ink|mut|card|bg|tint|edge)\)|#[0-9a-f]{6})$/i;
  const out = {};
  for (const [page, rules] of Object.entries(c)) {
    if (!/^[a-z0-9-]{1,80}$/.test(page) || !rules || typeof rules !== 'object' || Array.isArray(rules)) throw new Error('Couleurs invalides');
    out[page] = {};
    for (const [sel, d] of Object.entries(rules)) {
      if (!SEL.test(sel) || sel.length > 400 || !d || typeof d !== 'object') throw new Error('Couleurs invalides');
      const keep = {};
      for (const [p, v] of Object.entries(d)) {
        if (!['color', 'background'].includes(p) || typeof v !== 'string' || !VAL.test(v)) throw new Error('Couleurs invalides');
        keep[p] = v;
      }
      if (Object.keys(keep).length) out[page][sel] = keep;
    }
    if (!Object.keys(out[page]).length) delete out[page];
  }
  return out;
}

export default {
  async fetch(req, env) {
    // Réglage manquant : message clair plutôt qu'une erreur technique
    const missing = ['TENANT_ID', 'CLIENT_ID', 'EMAIL_DOMAIN', 'ALLOWED_ORIGINS', 'GH_REPO', 'GH_BRANCH', 'GH_TOKEN'].filter((k) => !env[k]);
    if (missing.length) return new Response(JSON.stringify({ error: 'Réglage manquant dans Cloudflare : ' + missing.join(', ') }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    const origin = req.headers.get('Origin') || '';
    const okOrigin = env.ALLOWED_ORIGINS.split(',').map((x) => x.trim()).includes(origin);
    const cors = { 'Access-Control-Allow-Origin': okOrigin ? origin : 'null', 'Access-Control-Allow-Headers': 'Authorization, Content-Type', 'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS', Vary: 'Origin' };
    const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', ...cors } });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (!okOrigin) return json({ error: 'Origine non autorisée' }, 403);
    try {
      const email = await verify(req, env);
      const url = new URL(req.url);
      if (url.pathname === '/content' && req.method === 'GET') {
        const r = await gh(env, `contents/${CONTENT_PATH}?ref=${env.GH_BRANCH}`);
        if (!r.ok) return json({ error: 'Lecture impossible (' + r.status + ')' }, 502);
        const f = await r.json();
        return json({ content: JSON.parse(fromB64(f.content)), sha: f.sha });
      }
      if (url.pathname === '/content' && req.method === 'PUT') {
        const raw = await req.text();
        if (raw.length > MAX_JSON) return json({ error: 'Contenu trop volumineux' }, 413);
        const { content, sha } = JSON.parse(raw);
        const clean = check(content);
        const r = await gh(env, `contents/${CONTENT_PATH}`, { method: 'PUT', body: JSON.stringify({ message: `Contenu modifié depuis l'espace équipe (${email})`, content: toB64(JSON.stringify(clean, null, 2) + '\n'), sha, branch: env.GH_BRANCH }) });
        if (r.status === 409 || r.status === 422) return json({ error: 'Quelqu’un a publié entre-temps : rechargez la page puis recommencez.' }, 409);
        if (!r.ok) return json({ error: 'Publication impossible (' + r.status + ')' }, 502);
        return json({ sha: (await r.json()).content.sha });
      }
      if (url.pathname === '/texts' && req.method === 'GET') {
        const r = await gh(env, `contents/${TEXTS_PATH}?ref=${env.GH_BRANCH}`);
        if (!r.ok) return json({ error: 'Lecture impossible (' + r.status + ')' }, 502);
        const f = await r.json();
        return json({ content: JSON.parse(fromB64(f.content)), sha: f.sha });
      }
      if (url.pathname === '/texts' && req.method === 'PUT') {
        const raw = await req.text();
        if (raw.length > MAX_JSON) return json({ error: 'Contenu trop volumineux' }, 413);
        const { content, sha } = JSON.parse(raw);
        const clean = checkTexts(content);
        const r = await gh(env, `contents/${TEXTS_PATH}`, { method: 'PUT', body: JSON.stringify({ message: `Textes modifiés depuis le site (${email})`, content: toB64(JSON.stringify(clean, null, 2) + '\n'), sha, branch: env.GH_BRANCH }) });
        if (r.status === 409 || r.status === 422) return json({ error: 'Quelqu’un a publié entre-temps : recommencez.' }, 409);
        if (!r.ok) return json({ error: 'Publication impossible (' + r.status + ')' }, 502);
        return json({ sha: (await r.json()).content.sha });
      }
      if (url.pathname === '/styles' && req.method === 'GET') {
        const r = await gh(env, `contents/${STYLES_PATH}?ref=${env.GH_BRANCH}`);
        if (r.status === 404) return json({ content: {}, sha: null });
        if (!r.ok) return json({ error: 'Lecture impossible (' + r.status + ')' }, 502);
        const f = await r.json();
        return json({ content: JSON.parse(fromB64(f.content)), sha: f.sha });
      }
      if (url.pathname === '/styles' && req.method === 'PUT') {
        const raw = await req.text();
        if (raw.length > MAX_JSON) return json({ error: 'Contenu trop volumineux' }, 413);
        const { content, sha } = JSON.parse(raw);
        const clean = checkStyles(content);
        const body = { message: `Couleurs modifiées depuis le site (${email})`, content: toB64(JSON.stringify(clean, null, 2) + '\n'), branch: env.GH_BRANCH };
        if (sha) body.sha = sha;
        const r = await gh(env, `contents/${STYLES_PATH}`, { method: 'PUT', body: JSON.stringify(body) });
        if (r.status === 409 || r.status === 422) return json({ error: 'Quelqu’un a publié entre-temps : recommencez.' }, 409);
        if (!r.ok) return json({ error: 'Publication impossible (' + r.status + ')' }, 502);
        return json({ sha: (await r.json()).content.sha });
      }
      if (url.pathname === '/upload' && req.method === 'POST') {
        const { name, data } = await req.json();
        if (!/^[a-z0-9-]{1,40}$/.test(name) || typeof data !== 'string' || data.length > MAX_IMG * 1.4) return json({ error: 'Image invalide' }, 400);
        const bytes = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
        // Contrôle de la signature WebP (RIFF....WEBP)
        if (txt.decode(bytes.slice(0, 4)) !== 'RIFF' || txt.decode(bytes.slice(8, 12)) !== 'WEBP') return json({ error: 'Seules les images WebP sont acceptées' }, 400);
        const file = `${name}-${Date.now().toString(36)}.webp`;
        const r = await gh(env, `contents/public/img/uploads/${file}`, { method: 'PUT', body: JSON.stringify({ message: `Image ajoutée depuis l'espace équipe (${email})`, content: data, branch: env.GH_BRANCH }) });
        if (!r.ok) return json({ error: 'Envoi impossible (' + r.status + ')' }, 502);
        return json({ path: '/img/uploads/' + file });
      }
      return json({ error: 'Introuvable' }, 404);
    } catch (e) {
      return json({ error: e.message || 'Erreur' }, /refus|requise|Jeton/.test(e.message || '') ? 401 : 400);
    }
  },
};
