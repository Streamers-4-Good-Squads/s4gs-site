// Mode édition du site (bouton crayon, bas de page à gauche).
// 1. Connexion obligatoire avec un compte Microsoft @s4gs.org (même application que /admin/).
// 2. Onglet « Textes » : les textes modifiables sont entourés, on clique et on tape.
//    Onglet « Couleurs » : on clique sur un élément de la page, puis on choisit la couleur du texte
//    ou du fond parmi les couleurs de la charte (elles s'adaptent au thème clair ou sombre) ou une couleur libre.
// 3. « Publier » envoie les changements au service de l'espace équipe, qui vérifie la connexion et les enregistre :
//    textes dans src/data/text-overrides.json, couleurs dans src/data/style-overrides.json. GitHub reconstruit le site.
// Les couleurs sont propres à une page (même rendu dans toutes les langues) ; les textes à une langue.
(function () {
  var MSAL = 'https://cdn.jsdelivr.net/npm/@azure/msal-browser@3.28.1/lib/msal-browser.min.js';
  var SEL = 'h1,h2,h3,h4,h5,h6,p,li,a,button,span,label,legend,small,td,th,dt,dd,summary,figcaption,blockquote,strong,em,b,div';
  var base = document.getElementById('s4e-src').href.replace(/\/edit\/editor\.js.*$/, '');
  var lang = (document.documentElement.lang || 'fr').slice(0, 2);
  var norm = function (s) { return String(s).replace(/\s+/g, ' ').trim(); };
  // Couleurs de la charte : variables CSS du site (valeurs différentes en thème clair et sombre)
  var PALETTE = [
    ['acc', 'Violet S4Gs'], ['lav', 'Lavande'], ['y', 'Jaune'], ['b', 'Bleu'], ['g', 'Vert'],
    ['ink', 'Texte'], ['mut', 'Texte secondaire'], ['card', 'Fond de carte'], ['bg', 'Fond de page'], ['tint', 'Teinte claire'], ['edge', 'Bordure'],
  ];
  var cfg = null, app = null, account = null;
  var on = false, mode = 'text', els = [], all = null, ui = null, pal = null;
  var page = pageKey(), styles0 = {}, styles = {}, picked = null;

  // Mêmes règles que le service : seuls les chemins depuis <main> et les couleurs de la charte ou #rrggbb sont gardés
  var SEL_OK = /^main(>[a-z][a-z0-9]*:nth-child\(\d{1,3}\))+$/, VAL_OK = /^(var\(--(acc|lav|y|b|g|ink|mut|card|bg|tint|edge)\)|#[0-9a-f]{6})$/i;
  function clean(rules) {
    var out = {};
    Object.keys(rules || {}).forEach(function (sel) {
      if (!SEL_OK.test(sel) || sel.length > 400) return;
      var d = {}; ['color', 'background'].forEach(function (p) { if (VAL_OK.test((rules[sel] || {})[p] || '')) d[p] = rules[sel][p]; });
      if (Object.keys(d).length) out[sel] = d;
    });
    return out;
  }
  function pageKey() {
    var p = location.pathname.replace(/^.*?\/([a-z]{2})\//, '/').replace(/index\.html$/, '');
    var parts = p.split('/').filter(Boolean);
    return parts.length ? parts.join('-') : 'index';
  }

  function css() {
    var s = document.createElement('style'); s.id = 's4e-style';
    s.textContent = [
      '.s4e-on.s4e-text [data-s4e]{outline:1.5px dashed var(--edge);outline-offset:2px;border-radius:4px;cursor:text}',
      '.s4e-on.s4e-text [data-s4e]:hover{outline-color:var(--acc)}',
      '.s4e-on.s4e-text [data-s4e]:focus{outline:2px solid var(--acc);background:color-mix(in srgb,var(--y) 35%,transparent)}',
      '.s4e-on.s4e-text [data-s4e].s4e-mod{outline:2px solid var(--g)}',
      '.s4e-on.s4e-color main *{cursor:crosshair}',
      '.s4e-hover{outline:2px dashed var(--acc)!important;outline-offset:2px}',
      '.s4e-picked{outline:3px solid var(--acc)!important;outline-offset:3px}',
      '#s4e-ui,#s4e-pal,#s4e-login{font:600 14px/1.3 system-ui,sans-serif;color:var(--ink)}',
      '#s4e-ui{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:9999;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;',
      'max-width:calc(100vw - 24px);padding:10px 14px;border-radius:18px;background:var(--card);border:2px solid var(--acc);box-shadow:0 10px 30px rgba(0,0,0,.25)}',
      '#s4e-ui button,#s4e-pal button,#s4e-login button{font:inherit;padding:8px 14px;border-radius:999px;border:1.5px solid var(--edge);background:var(--card);color:var(--ink);cursor:pointer}',
      '#s4e-ui button.s4e-pri,#s4e-login button.s4e-pri{background:var(--acc);border-color:var(--acc);color:var(--on-acc)}',
      '#s4e-ui button[aria-pressed=true]{background:var(--tint);border-color:var(--acc)}',
      '#s4e-ui button:disabled{opacity:.5;cursor:default}',
      '#s4e-ui .s4e-msg{flex:0 0 100%;text-align:center;font-weight:500}',
      '#s4e-pal{position:fixed;right:12px;top:50%;transform:translateY(-50%);z-index:9999;width:min(300px,calc(100vw - 24px));max-height:80vh;overflow:auto;padding:14px;border-radius:18px;background:var(--card);border:2px solid var(--acc);box-shadow:0 10px 30px rgba(0,0,0,.25);display:grid;gap:10px}',
      '#s4e-pal h4{margin:0;font:700 14px system-ui,sans-serif}#s4e-pal .s4e-what{font-weight:500;color:var(--mut);word-break:break-word}',
      '#s4e-pal .s4e-sw{display:flex;flex-wrap:wrap;gap:6px}',
      '#s4e-pal .s4e-sw button{width:30px;height:30px;padding:0;border-radius:10px;border:2px solid var(--edge)}',
      '#s4e-pal .s4e-sw button[aria-pressed=true]{outline:3px solid var(--acc);outline-offset:1px}',
      '#s4e-pal .s4e-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-weight:500}',
      '#s4e-pal input[type=color]{width:40px;height:30px;border:1.5px solid var(--edge);border-radius:8px;background:none;padding:0}',
      '#s4e-pal .s4e-warn{margin:0;color:#B3261E;font-weight:700}',
      '#s4e-pal .s4e-ok{margin:0;color:var(--mut);font-weight:500}',
      '#s4e-login{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:rgba(7,11,26,.6)}',
      '#s4e-login>div{background:var(--card);border-radius:20px;padding:22px;display:grid;gap:12px;width:min(360px,90vw);font-weight:500}',
      '#s4e-login .s4e-row{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}',
      '#s4e-login .s4e-err{color:#B3261E;margin:0;font-weight:700}',
      '@media (max-width:700px){#s4e-ui{gap:6px;padding:8px 10px}#s4e-ui button{padding:6px 11px;font-size:13px}#s4e-ui .s4e-n{flex:0 0 100%;text-align:center;font-size:13px}',
      '#s4e-pal{top:auto;transform:none;left:12px;right:12px;width:auto;max-height:42vh}}',
    ].join('');
    document.head.appendChild(s);
  }

  // ---------- Connexion Microsoft (@s4gs.org) ----------
  function loadScript(src) { return new Promise(function (ok, ko) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); }); }
  function prepare() {
    return fetch(base + '/admin/config.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (c) {
      cfg = c;
      if (!cfg.workerUrl || !cfg.clientId || !cfg.tenantId) throw new Error('L’espace équipe n’est pas configuré.');
      return window.msal ? null : loadScript(MSAL);
    }).then(function () {
      app = new msal.PublicClientApplication({ auth: { clientId: cfg.clientId, authority: 'https://login.microsoftonline.com/' + cfg.tenantId, redirectUri: base + '/edit/auth.html' }, cache: { cacheLocation: 'sessionStorage' } });
      return app.initialize();
    });
  }
  var SCOPES = ['openid', 'profile', 'email'];
  function allowed(acc) { return acc && /@s4gs\.org$/i.test(acc.username || ''); }
  function token() {
    return app.acquireTokenSilent({ scopes: SCOPES, account: account }).catch(function () { return app.loginPopup({ scopes: SCOPES }); })
      .then(function (r) { account = r.account; return r.idToken; });
  }
  // Fenêtre de connexion : le clic sur le bouton ouvre la fenêtre Microsoft (pas de blocage des pop-ups)
  function login(done) {
    var box = document.createElement('div'); box.id = 's4e-login';
    box.innerHTML = '<div role="dialog" aria-modal="true" aria-labelledby="s4e-lt"><strong id="s4e-lt">Modifier le site</strong>' +
      '<span>Réservé à l’équipe : connecte-toi avec ton compte Microsoft @s4gs.org.</span>' +
      '<p class="s4e-err" hidden></p><div class="s4e-row"><button type="button" data-a="no">Annuler</button><button type="button" class="s4e-pri" data-a="go">Se connecter avec Microsoft</button></div></div>';
    document.body.appendChild(box);
    var err = box.querySelector('.s4e-err'), go = box.querySelector('[data-a=go]');
    var fail = function (t) { err.textContent = t; err.hidden = false; go.disabled = false; };
    go.disabled = true;
    prepare().then(function () {
      var acc = app.getAllAccounts().filter(allowed)[0];
      if (acc) { account = acc; box.remove(); return done(); }
      go.disabled = false; go.focus();
    }).catch(function (e) { fail((e && e.message) || 'Connexion impossible.'); });
    box.querySelector('[data-a=no]').onclick = function () { box.remove(); };
    box.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') box.remove(); });
    go.onclick = function () {
      go.disabled = true; err.hidden = true;
      app.loginPopup({ scopes: SCOPES, prompt: 'select_account' }).then(function (r) {
        if (!allowed(r.account)) { app.clearCache && app.clearCache(); return fail('Ce compte n’est pas une adresse @s4gs.org.'); }
        account = r.account; box.remove(); done();
      }).catch(function (e) { fail(e && e.errorCode === 'user_cancelled' ? 'Connexion annulée.' : ((e && e.message) || 'Connexion impossible.')); });
    };
  }

  // ---------- Démarrage ----------
  function start() {
    if (on) return;
    if (!document.getElementById('s4e-style')) css();
    login(function () {
      Promise.all([
        fetch(base + '/edit/overrides.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
        fetch(base + '/edit/styles.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
      ]).then(function (res) {
        all = res[0] || {}; styles0 = clean((res[1] || {})[page] || {});
        styles = JSON.parse(JSON.stringify(styles0));
        enable();
      });
    });
  }

  // ---------- Textes ----------
  function editable(el) {
    // Exclus : interface d'édition, contenus qui changent tout seuls (compte à rebours, zones dynamiques)
    if (el.closest('#s4e-ui,#s4e-pal,#s4e-login,script,style,noscript,select,option,textarea,svg,[aria-hidden=true],[aria-live],.cdown,[data-s4e-skip]') || el.id === 's4e-btn') return false;
    if (!el.childNodes.length || !norm(el.textContent)) return false;
    for (var i = 0; i < el.childNodes.length; i++) if (el.childNodes[i].nodeType !== 3) return false;
    return true;
  }
  function originalOf(text) {
    var map = all[lang] || {};
    for (var k in map) if (map[k] === text) return k;
    return text;
  }
  function textMode(onoff) {
    els.forEach(function (el) {
      if (onoff) { try { el.contentEditable = 'plaintext-only'; } catch (e) { el.contentEditable = 'true'; } if (el.contentEditable !== 'plaintext-only') el.contentEditable = 'true'; }
      else el.removeAttribute('contenteditable');
    });
  }

  // ---------- Couleurs ----------
  // Chemin stable de l'élément depuis <main> (même structure dans toutes les langues)
  function pathOf(el) {
    var main = document.querySelector('main'); if (!main || !main.contains(el) || el === main) return null;
    var p = [];
    for (var n = el; n && n !== main; n = n.parentElement) {
      var i = 1; for (var s = n.previousElementSibling; s; s = s.previousElementSibling) i++;
      p.unshift(n.tagName.toLowerCase() + ':nth-child(' + i + ')');
    }
    return 'main>' + p.join('>');
  }
  function applyAll() {
    // Le style publié est remplacé par l'état courant, appliqué directement sur les éléments
    var tag = document.getElementById('s4e-styles'); if (tag) tag.remove();
    document.querySelectorAll('[data-s4e-css]').forEach(function (el) { el.style.removeProperty('color'); el.style.removeProperty('background'); el.removeAttribute('data-s4e-css'); });
    Object.keys(styles).forEach(function (sel) {
      var el; try { el = document.querySelector(sel); } catch (e) { el = null; }
      if (!el) return;
      el.setAttribute('data-s4e-css', '');
      if (styles[sel].color) el.style.setProperty('color', styles[sel].color, 'important');
      if (styles[sel].background) el.style.setProperty('background', styles[sel].background, 'important');
    });
  }
  function hover(ev) {
    if (mode !== 'color') return;
    document.querySelectorAll('.s4e-hover').forEach(function (n) { n.classList.remove('s4e-hover'); });
    var t = ev.target; if (pathOf(t)) t.classList.add('s4e-hover');
  }
  function pick(el) {
    if (picked) picked.classList.remove('s4e-picked');
    picked = el; el.classList.add('s4e-picked'); el.classList.remove('s4e-hover');
    panel();
  }
  function setColor(prop, v) {
    var sel = pathOf(picked); if (!sel) return;
    styles[sel] = styles[sel] || {};
    if (v) styles[sel][prop] = v; else delete styles[sel][prop];
    if (!Object.keys(styles[sel]).length) delete styles[sel];
    applyAll(); panel(); count();
  }
  // Contraste (WCAG) entre la couleur du texte et le premier fond opaque
  function rgb(s) { var m = String(s).match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/); return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null; }
  function lum(c) { return [c.r, c.g, c.b].map(function (x) { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }).reduce(function (s, x, i) { return s + x * [0.2126, 0.7152, 0.0722][i]; }, 0); }
  function contrast(el) {
    var fg = rgb(getComputedStyle(el).color), bg = null;
    for (var n = el; n; n = n.parentElement) { var c = rgb(getComputedStyle(n).backgroundColor); if (c && c.a > 0.5) { bg = c; break; } }
    bg = bg || rgb(getComputedStyle(document.body).backgroundColor) || { r: 255, g: 255, b: 255 };
    if (!fg) return null;
    var a = lum(fg), b = lum(bg); return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }
  function panel() {
    if (!pal) { pal = document.createElement('div'); pal.id = 's4e-pal'; document.body.appendChild(pal); pal.addEventListener('click', palClick); pal.addEventListener('input', palInput); }
    place();
    if (!picked) { pal.innerHTML = '<h4>Couleurs</h4><span class="s4e-what">Clique sur un élément de la page (titre, texte, bouton, carte, bandeau…) pour changer sa couleur.</span>'; return; }
    var sel = pathOf(picked), cur = styles[sel] || {};
    var what = picked.tagName.toLowerCase() + (norm(picked.textContent) ? ' « ' + norm(picked.textContent).slice(0, 50) + (norm(picked.textContent).length > 50 ? '…' : '') + ' »' : '');
    var row = function (prop, label) {
      var sw = PALETTE.map(function (p) {
        var v = 'var(--' + p[0] + ')';
        return '<button type="button" title="' + p[1] + '" aria-label="' + label + ' : ' + p[1] + '" aria-pressed="' + (cur[prop] === v) + '" data-prop="' + prop + '" data-v="' + v + '" style="background:' + v + '"></button>';
      }).join('');
      var custom = /^#/.test(cur[prop] || '') ? cur[prop] : '#5c2d91';
      return '<h4>' + label + '</h4><div class="s4e-sw">' + sw + '</div><div class="s4e-row"><label>Couleur libre <input type="color" data-prop="' + prop + '" value="' + custom + '" /></label>' +
        '<button type="button" data-prop="' + prop + '" data-v="">Par défaut</button></div>';
    };
    // Lisibilité mesurée dans les deux thèmes (bascule instantanée, sans affichage intermédiaire)
    var root = document.documentElement, th = root.dataset.theme || 'light', other = th === 'dark' ? 'light' : 'dark';
    var c1 = contrast(picked); root.dataset.theme = other; var c2 = contrast(picked); root.dataset.theme = th;
    var c = (c1 && c2) ? Math.min(c1, c2) : (c1 || c2), worst = c2 !== null && c2 < c1 ? other : th;
    pal.innerHTML = '<h4>Élément choisi</h4><span class="s4e-what">' + what.replace(/</g, '&lt;') + '</span>' +
      '<div class="s4e-row"><button type="button" data-a="parent">Élément parent</button><button type="button" data-a="close">Fermer</button></div>' +
      row('color', 'Couleur du texte') + row('background', 'Couleur du fond') +
      (c ? (c < 4.5 ? '<p class="s4e-warn">Lisibilité insuffisante en thème ' + (worst === 'dark' ? 'sombre' : 'clair') + ' (contraste ' + c.toFixed(1) + ':1, minimum 4,5:1) : choisis des couleurs plus contrastées.</p>' : '<p class="s4e-ok">Lisibilité correcte en thème clair et sombre (contraste minimum ' + c.toFixed(1) + ':1).</p>') : '') +
      '<p class="s4e-ok">Les couleurs de la charte s’adaptent au thème clair et sombre. La couleur libre reste identique dans les deux thèmes.</p>';
  }
  // Sur mobile, le panneau se place juste au-dessus de la barre du bas, quelle que soit sa hauteur
  function place() { if (pal && ui) pal.style.bottom = innerWidth <= 700 ? (ui.offsetHeight + 24) + 'px' : ''; }
  addEventListener('resize', place);
  function palClick(ev) {
    var b = ev.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'close') { if (picked) picked.classList.remove('s4e-picked'); picked = null; panel(); return; }
    if (b.dataset.a === 'parent') { var p = picked && picked.parentElement; if (p && pathOf(p)) pick(p); return; }
    if (b.dataset.prop !== undefined) setColor(b.dataset.prop, b.dataset.v);
  }
  function palInput(ev) { if (ev.target.type === 'color') setColor(ev.target.dataset.prop, ev.target.value.toLowerCase()); }

  // ---------- Mode édition ----------
  function enable() {
    on = true; document.documentElement.classList.add('s4e-on');
    els = [].slice.call(document.querySelectorAll(SEL)).filter(editable);
    els.forEach(function (el) {
      var t = norm(el.textContent);
      el.setAttribute('data-s4e', ''); el.dataset.s4eNow = t; el.dataset.s4eKey = originalOf(t);
      el.spellcheck = true;
      el.addEventListener('input', count);
      el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); el.blur(); } });
    });
    applyAll();
    // En mode édition, les liens et boutons de la page ne déclenchent rien ; en mode Couleurs, un clic choisit l'élément
    document.addEventListener('click', block, true);
    document.addEventListener('submit', block, true);
    document.addEventListener('mouseover', hover, true);
    addEventListener('beforeunload', leave);
    bar(); setMode('text');
  }
  function block(ev) {
    if (ev.target.closest && ev.target.closest('#s4e-ui,#s4e-pal,#s4e-login')) return;
    if (mode === 'color') { ev.preventDefault(); ev.stopPropagation(); if (pathOf(ev.target)) pick(ev.target); return; }
    if (ev.type === 'submit' || (ev.target.closest && ev.target.closest('a,button,label,summary'))) ev.preventDefault();
  }
  function leave(ev) { if (nText() || nColor()) { ev.preventDefault(); ev.returnValue = ''; } }
  function setMode(m) {
    mode = m;
    document.documentElement.classList.toggle('s4e-text', m === 'text');
    document.documentElement.classList.toggle('s4e-color', m === 'color');
    textMode(m === 'text');
    ui.querySelector('[data-a=text]').setAttribute('aria-pressed', m === 'text');
    ui.querySelector('[data-a=color]').setAttribute('aria-pressed', m === 'color');
    if (m === 'color') panel(); else { if (pal) { pal.remove(); pal = null; } if (picked) picked.classList.remove('s4e-picked'); picked = null; document.querySelectorAll('.s4e-hover').forEach(function (n) { n.classList.remove('s4e-hover'); }); }
    count();
  }

  function textChanges() {
    return els.filter(function (el) {
      var mod = norm(el.textContent) !== el.dataset.s4eNow; el.classList.toggle('s4e-mod', mod); return mod;
    }).map(function (el) { return { key: el.dataset.s4eKey, val: norm(el.textContent) }; });
  }
  function nText() { return els.length ? textChanges().length : 0; }
  function nColor() {
    var keys = {}; Object.keys(styles).concat(Object.keys(styles0)).forEach(function (k) { keys[k] = 1; });
    return Object.keys(keys).filter(function (k) { return JSON.stringify(styles[k] || {}) !== JSON.stringify(styles0[k] || {}); }).length;
  }
  function mergedTexts(base0) {
    var out = JSON.parse(JSON.stringify(base0 || {})); out[lang] = out[lang] || {};
    textChanges().forEach(function (c) { if (!c.val || c.val === c.key) delete out[lang][c.key]; else out[lang][c.key] = c.val; });
    return out;
  }
  function mergedStyles(base0) {
    var out = JSON.parse(JSON.stringify(base0 || {}));
    if (Object.keys(styles).length) out[page] = JSON.parse(JSON.stringify(styles)); else delete out[page];
    return out;
  }

  function bar() {
    ui = document.createElement('div'); ui.id = 's4e-ui';
    ui.innerHTML = '<button type="button" data-a="text">Textes</button><button type="button" data-a="color">Couleurs</button>' +
      '<span class="s4e-n"></span>' +
      '<button type="button" class="s4e-pri" data-a="pub" disabled>Publier</button>' +
      '<button type="button" data-a="undo" disabled>Annuler</button>' +
      '<button type="button" data-a="quit">Quitter</button><span class="s4e-msg" hidden></span>';
    document.body.appendChild(ui);
    ui.addEventListener('click', function (ev) {
      var a = ev.target.dataset && ev.target.dataset.a; if (!a) return;
      if (a === 'text' || a === 'color') setMode(a);
      if (a === 'quit') quit();
      if (a === 'undo') { els.forEach(function (el) { el.textContent = el.dataset.s4eNow; }); styles = JSON.parse(JSON.stringify(styles0)); applyAll(); if (picked) panel(); count(); }
      if (a === 'pub') publish();
    });
  }
  function count() {
    if (!ui) return;
    var t = nText(), c = nColor(), parts = [];
    if (t) parts.push(t + (t > 1 ? ' textes modifiés' : ' texte modifié'));
    if (c) parts.push(c + (c > 1 ? ' couleurs modifiées' : ' couleur modifiée'));
    ui.querySelector('.s4e-n').textContent = parts.length ? parts.join(', ') : (mode === 'text' ? 'Clique sur un texte entouré pour le modifier.' : 'Clique sur un élément pour changer sa couleur.');
    ['pub', 'undo'].forEach(function (a) { ui.querySelector('[data-a=' + a + ']').disabled = !(t || c); });
  }
  function msg(t, err) { var m = ui.querySelector('.s4e-msg'); m.textContent = t; m.hidden = !t; m.style.color = err ? '#B3261E' : ''; }
  function quit() {
    if ((nText() || nColor()) && !confirm('Quitter sans publier ? Les modifications seront perdues.')) return;
    removeEventListener('beforeunload', leave); location.reload();
  }

  // ---------- Publication via le service de l'espace équipe ----------
  function publish() {
    var btn = ui.querySelector('[data-a=pub]'); btn.disabled = true; msg('Publication…');
    var tok, doTexts = nText() > 0, doStyles = nColor() > 0;
    token().then(function (t) {
      tok = t;
      return doTexts ? api('/texts', 'GET').then(function (cur) { return api('/texts', 'PUT', { content: mergedTexts(cur.content), sha: cur.sha }); }) : null;
    }).then(function () {
      return doStyles ? api('/styles', 'GET').then(function (cur) { return api('/styles', 'PUT', { content: mergedStyles(cur.content), sha: cur.sha }); }) : null;
    }).then(function () {
      if (doTexts) { all = mergedTexts(all); els.forEach(function (el) { el.dataset.s4eNow = norm(el.textContent); }); }
      if (doStyles) styles0 = JSON.parse(JSON.stringify(styles));
      count(); msg('Publié ! Le site se met à jour dans 1 à 2 minutes (ajoute ?v=2 à l’adresse pour voir la nouvelle version).');
    }).catch(function (e) {
      btn.disabled = false; msg((e && e.message) || 'Publication impossible.', true);
    });
    function api(path, method, body) {
      return fetch(cfg.workerUrl.replace(/\/$/, '') + path, { method: method, headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || ('Erreur ' + r.status)); return j; }); });
    }
  }

  window.S4E = { start: start };
})();
