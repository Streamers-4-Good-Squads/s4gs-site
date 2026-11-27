// Mode édition des textes du site.
// 1. Le bouton crayon (bas de page, à gauche) charge ce fichier et demande le code.
// 2. Les textes modifiables sont entourés : on clique et on tape directement.
// 3. « Publier » envoie les changements au service de l'espace équipe (connexion Microsoft @s4gs.org),
//    qui les enregistre dans src/data/text-overrides.json : GitHub reconstruit alors le site.
//    Tant que ce service n'est pas configuré, « Télécharger » donne le fichier à déposer à la main dans src/data/.
// Le code ne protège que l'ouverture du mode édition (il est lisible dans ce fichier public) :
// la publication est protégée par la connexion Microsoft vérifiée par le service.
(function () {
  var CODE = '2005';
  var MSAL = 'https://cdn.jsdelivr.net/npm/@azure/msal-browser@3.28.1/lib/msal-browser.min.js';
  var SEL = 'h1,h2,h3,h4,h5,h6,p,li,a,button,span,label,legend,small,td,th,dt,dd,summary,figcaption,blockquote,strong,em,b,div';
  var base = document.getElementById('s4e-src').href.replace(/\/edit\/editor\.js.*$/, '');
  var lang = (document.documentElement.lang || 'fr').slice(0, 2);
  var norm = function (s) { return String(s).replace(/\s+/g, ' ').trim(); };
  var on = false, els = [], all = null, ui = null;

  function css() {
    var s = document.createElement('style'); s.id = 's4e-style';
    s.textContent = [
      '.s4e-on [data-s4e]{outline:1.5px dashed var(--edge);outline-offset:2px;border-radius:4px;cursor:text}',
      '.s4e-on [data-s4e]:hover{outline-color:var(--acc)}',
      '.s4e-on [data-s4e]:focus{outline:2px solid var(--acc);background:color-mix(in srgb,var(--y) 35%,transparent)}',
      '.s4e-on [data-s4e].s4e-mod{outline:2px solid var(--g)}',
      '#s4e-ui{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:9999;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;',
      'max-width:calc(100vw - 24px);padding:10px 14px;border-radius:18px;background:var(--card);color:var(--ink);border:2px solid var(--acc);box-shadow:0 10px 30px rgba(0,0,0,.25);font:600 14px/1.3 system-ui,sans-serif}',
      '#s4e-ui button{font:inherit;padding:8px 14px;border-radius:999px;border:1.5px solid var(--edge);background:var(--card);color:var(--ink);cursor:pointer}',
      '#s4e-ui button.s4e-pri{background:var(--acc);border-color:var(--acc);color:var(--on-acc)}',
      '#s4e-ui button:disabled{opacity:.5;cursor:default}',
      '#s4e-ui .s4e-msg{flex:0 0 100%;text-align:center;font-weight:500}',
      '#s4e-code{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:rgba(7,11,26,.6)}',
      '#s4e-code form{background:var(--card);color:var(--ink);border-radius:20px;padding:22px;display:grid;gap:12px;width:min(320px,90vw);font:500 15px system-ui,sans-serif}',
      '#s4e-code input{font:inherit;padding:10px 12px;border-radius:12px;border:1.5px solid var(--edge);background:var(--bg);color:var(--ink);letter-spacing:.3em;text-align:center}',
      '#s4e-code .s4e-row{display:flex;gap:8px;justify-content:flex-end}',
      '#s4e-code button{font:inherit;padding:8px 14px;border-radius:999px;border:1.5px solid var(--edge);background:var(--card);color:var(--ink);cursor:pointer}',
      '#s4e-code button[type=submit]{background:var(--acc);border-color:var(--acc);color:var(--on-acc)}',
      '#s4e-code .s4e-err{color:#B3261E;margin:0;font-weight:700}',
    ].join('');
    document.head.appendChild(s);
  }

  // Code d'accès
  function askCode(done) {
    var box = document.createElement('div'); box.id = 's4e-code';
    box.innerHTML = '<form><label for="s4e-c">Code du mode édition</label><input id="s4e-c" type="password" inputmode="numeric" autocomplete="off" />' +
      '<p class="s4e-err" hidden>Code incorrect.</p><div class="s4e-row"><button type="button">Annuler</button><button type="submit">Entrer</button></div></form>';
    document.body.appendChild(box);
    var f = box.querySelector('form'), i = box.querySelector('input'), e = box.querySelector('.s4e-err');
    i.focus();
    box.querySelector('button[type=button]').onclick = function () { box.remove(); };
    box.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') box.remove(); });
    f.onsubmit = function (ev) {
      ev.preventDefault();
      if (i.value.trim() !== CODE) { e.hidden = false; i.select(); return; }
      box.remove(); done();
    };
  }

  // Textes modifiables : éléments qui ne contiennent que du texte
  function editable(el) {
    if (el.closest('#s4e-ui,#s4e-code,script,style,noscript,select,option,textarea,svg,[aria-hidden=true]') || el.id === 's4e-btn') return false;
    if (!el.childNodes.length || !norm(el.textContent)) return false;
    for (var i = 0; i < el.childNodes.length; i++) if (el.childNodes[i].nodeType !== 3) return false;
    return true;
  }
  function originalOf(text) {
    var map = all[lang] || {};
    for (var k in map) if (map[k] === text) return k;
    return text;
  }

  function start() {
    if (on) return;
    if (!document.getElementById('s4e-style')) css();
    askCode(function () {
      fetch(base + '/edit/overrides.json', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; })
        .catch(function () { return {}; }).then(function (o) { all = o || {}; enable(); });
    });
  }

  function enable() {
    on = true; document.documentElement.classList.add('s4e-on');
    els = [].slice.call(document.querySelectorAll(SEL)).filter(editable);
    els.forEach(function (el) {
      var t = norm(el.textContent);
      el.setAttribute('data-s4e', ''); el.dataset.s4eNow = t; el.dataset.s4eKey = originalOf(t);
      try { el.contentEditable = 'plaintext-only'; } catch (e) { el.contentEditable = 'true'; }
      if (el.contentEditable !== 'plaintext-only') el.contentEditable = 'true';
      el.spellcheck = true;
      el.addEventListener('input', count);
      el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); el.blur(); } });
    });
    // En mode édition, les liens et boutons ne déclenchent rien
    document.addEventListener('click', block, true);
    document.addEventListener('submit', block, true);
    addEventListener('beforeunload', leave);
    bar();
  }
  function block(ev) {
    if (ev.target.closest && ev.target.closest('#s4e-ui,#s4e-code')) return;
    if (ev.type === 'submit' || (ev.target.closest && ev.target.closest('a,button,label,summary'))) ev.preventDefault();
  }
  function leave(ev) { if (changes().length) { ev.preventDefault(); ev.returnValue = ''; } }

  function changes() {
    return els.filter(function (el) {
      var mod = norm(el.textContent) !== el.dataset.s4eNow; el.classList.toggle('s4e-mod', mod); return mod;
    }).map(function (el) { return { key: el.dataset.s4eKey, val: norm(el.textContent) }; });
  }
  function merged(base0) {
    var out = JSON.parse(JSON.stringify(base0 || {})); out[lang] = out[lang] || {};
    changes().forEach(function (c) { if (!c.val || c.val === c.key) delete out[lang][c.key]; else out[lang][c.key] = c.val; });
    return out;
  }

  function bar() {
    ui = document.createElement('div'); ui.id = 's4e-ui';
    ui.innerHTML = '<span class="s4e-n">Mode édition : clique sur un texte entouré pour le modifier.</span>' +
      '<button type="button" class="s4e-pri" data-a="pub" disabled>Publier</button>' +
      '<button type="button" data-a="dl" disabled>Télécharger le fichier</button>' +
      '<button type="button" data-a="undo" disabled>Annuler</button>' +
      '<button type="button" data-a="quit">Quitter</button><span class="s4e-msg" hidden></span>';
    document.body.appendChild(ui);
    ui.addEventListener('click', function (ev) {
      var a = ev.target.dataset && ev.target.dataset.a; if (!a) return;
      if (a === 'quit') quit();
      if (a === 'undo') { els.forEach(function (el) { el.textContent = el.dataset.s4eNow; }); count(); }
      if (a === 'dl') download();
      if (a === 'pub') publish();
    });
  }
  function count() {
    var n = changes().length;
    ui.querySelector('.s4e-n').textContent = n ? n + (n > 1 ? ' textes modifiés' : ' texte modifié') : 'Mode édition : clique sur un texte entouré pour le modifier.';
    ['pub', 'dl', 'undo'].forEach(function (a) { ui.querySelector('[data-a=' + a + ']').disabled = !n; });
  }
  function msg(t, err) { var m = ui.querySelector('.s4e-msg'); m.textContent = t; m.hidden = !t; m.style.color = err ? '#B3261E' : ''; }

  function quit() {
    if (changes().length && !confirm('Quitter sans publier ? Les modifications seront perdues.')) return;
    location.reload();
  }
  function download() {
    var blob = new Blob([JSON.stringify(merged(all), null, 2) + '\n'], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'text-overrides.json';
    ui.appendChild(a); a.click(); a.remove();
    msg('Fichier téléchargé : dépose-le dans src/data/ sur GitHub (il remplace l’ancien), le site se met à jour en 1 à 2 minutes.');
  }

  // Publication via le service de l'espace équipe (mêmes réglages que /admin/)
  function loadScript(src) { return new Promise(function (ok, ko) { var s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); }); }
  function publish() {
    var btn = ui.querySelector('[data-a=pub]'); btn.disabled = true; msg('Connexion…');
    var cfg, token;
    fetch(base + '/admin/config.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (c) {
      cfg = c;
      if (!cfg.workerUrl || !cfg.clientId || !cfg.tenantId) throw new Error('La publication directe n’est pas encore configurée (espace équipe). Utilise « Télécharger le fichier » en attendant.');
      return window.msal ? null : loadScript(MSAL);
    }).then(function () {
      var app = new msal.PublicClientApplication({ auth: { clientId: cfg.clientId, authority: 'https://login.microsoftonline.com/' + cfg.tenantId, redirectUri: base + '/edit/auth.html' }, cache: { cacheLocation: 'sessionStorage' } });
      var scopes = ['openid', 'profile', 'email'];
      return app.initialize().then(function () {
        var acc = app.getAllAccounts()[0];
        return (acc ? app.acquireTokenSilent({ scopes: scopes, account: acc }) : Promise.reject()).catch(function () { return app.loginPopup({ scopes: scopes }); });
      });
    }).then(function (r) {
      token = r.idToken; msg('Publication…');
      return api('GET');
    }).then(function (cur) {
      return api('PUT', { content: merged(cur.content), sha: cur.sha });
    }).then(function () {
      els.forEach(function (el) { el.dataset.s4eNow = norm(el.textContent); });
      all = merged(all);
      count(); msg('Publié ! Le site se met à jour dans 1 à 2 minutes (ajoute ?v=2 à l’adresse pour voir la nouvelle version).');
    }).catch(function (e) {
      btn.disabled = false; msg((e && e.message) || 'Publication impossible.', true);
    });
    function api(method, body) {
      return fetch(cfg.workerUrl.replace(/\/$/, '') + '/texts', { method: method, headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
        .then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || ('Erreur ' + r.status)); return j; }); });
    }
  }

  window.S4E = { start: start };
})();
