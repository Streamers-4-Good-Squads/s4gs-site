/* Espace équipe S4GS : édition des contenus (content.json) et publication via le service Cloudflare. */
(function () {
  'use strict';
  var app = document.getElementById('app'), who = document.getElementById('who'), outBtn = document.getElementById('out');
  var demo = /[?&]demo=1/.test(location.search);
  var cfg = {}, msal = null, token = '', email = '', data = null, sha = '', tab = 'home', dirty = false;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (x) { return String(x == null ? '' : x).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); };
  var bi = function (o) { return { fr: (o && o.fr) || '', en: (o && o.en) || '' }; };

  var TABS = [['home', 'Accueil'], ['sections', 'Rubriques'], ['news', 'Actualités'], ['events', 'Événements'], ['streamers', 'Streamers'], ['partners', 'Partenaires'], ['stats', 'Chiffres']];
  var SECTIONS = [['news', 'Actualités', 'Contenu réel : retire la mention Exemple, page indexée'], ['streamers', 'Streamers', 'Contenu réel : retire la mention Exemple, page indexée'], ['partners', 'Partenaires', 'Page et lien dans le menu'], ['transparency', 'Transparence', 'Page et lien dans le pied de page'], ['stats', 'Chiffres clés', 'Bloc sur la page d’accueil']];

  function show(html) { app.innerHTML = html; }
  function msg(t, cls) { var m = $('#msg'); if (m) { m.textContent = t; m.className = 'msg ' + (cls || ''); } }

  /* ---------- connexion Microsoft ---------- */
  function loadCfg() {
    return fetch('config.json', { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (c) { cfg = c; });
  }
  function login() {
    if (!cfg.tenantId || !cfg.clientId || !cfg.workerUrl) {
      show('<div class="box2"><h1>Espace équipe</h1><p class="warn">Connexion pas encore configurée.</p><p class="small">Il manque l’identifiant de l’organisation Microsoft, celui de l’application et l’adresse du service de publication (fichier public/admin/config.json).</p></div>');
      return;
    }
    msal = new (window.msal || window.msalBrowser).PublicClientApplication({ auth: { clientId: cfg.clientId, authority: 'https://login.microsoftonline.com/' + cfg.tenantId, redirectUri: location.origin + location.pathname }, cache: { cacheLocation: 'sessionStorage' } });
    msal.initialize().then(function () { return msal.handleRedirectPromise(); }).then(function (res) {
      var acc = (res && res.account) || msal.getAllAccounts()[0];
      if (!acc) return askLogin();
      return silent(acc);
    }).catch(function (e) { askLogin(String(e && e.message || e)); });
  }
  function askLogin(err) {
    show('<div class="box2"><h1>Espace équipe</h1><p class="small">Réservé aux adresses @s4gs.org. Connectez-vous avec votre compte Microsoft de l’association.</p>' + (err ? '<p class="msg err">' + esc(err) + '</p>' : '') + '<p><button class="pill pri" id="go">Se connecter avec Microsoft</button></p></div>');
    $('#go').onclick = function () { msal.loginRedirect({ scopes: ['openid', 'profile', 'email'] }); };
  }
  function silent(acc) {
    return msal.acquireTokenSilent({ scopes: ['openid', 'profile', 'email'], account: acc }).catch(function () { return msal.acquireTokenRedirect({ scopes: ['openid', 'profile', 'email'], account: acc }); }).then(function (r) {
      if (!r) return;
      token = r.idToken; email = (acc.username || '').toLowerCase();
      who.textContent = email; outBtn.hidden = false;
      outBtn.onclick = function () { msal.logoutRedirect({ account: acc, postLogoutRedirectUri: location.origin + location.pathname }); };
      return load();
    });
  }

  /* ---------- API ---------- */
  function api(path, opt) {
    opt = opt || {}; opt.headers = Object.assign({ Authorization: 'Bearer ' + token }, opt.headers || {});
    return fetch(cfg.workerUrl.replace(/\/$/, '') + path, opt).then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error(j.error || r.status); return j; }); });
  }
  function load() {
    show('<p class="small">Chargement des contenus…</p>');
    return api('/content').then(function (j) { data = j.content; sha = j.sha; render(); }).catch(function (e) { show('<div class="box2"><p class="msg err">' + esc(e.message) + '</p><p class="small">Si le message dit « accès refusé », votre adresse n’est pas autorisée.</p></div>'); });
  }
  function save() {
    msg('Publication en cours…');
    $('#pub').disabled = true;
    api('/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content: data, sha: sha }) }).then(function (j) {
      sha = j.sha; dirty = false; msg('Publié. Le site se met à jour dans 2 à 3 minutes.', 'ok'); $('#pub').disabled = false;
    }).catch(function (e) { msg('Échec : ' + e.message, 'err'); $('#pub').disabled = false; });
  }

  /* ---------- champs ---------- */
  function get(path) { return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, data); }
  function set(path, v) { var k = path.split('.'), o = data; for (var i = 0; i < k.length - 1; i++) o = o[k[i]]; o[k[k.length - 1]] = v; dirty = true; msg('Modifications non publiées', ''); }
  function F(lb, p, type, rows) {
    var v = get(p); var a = 'data-p="' + p + '"';
    var el = rows ? '<textarea rows="' + rows + '" ' + a + '>' + esc(v) + '</textarea>' : '<input type="' + (type || 'text') + '" ' + a + ' value="' + esc(v) + '">';
    return '<label class="af"><span>' + lb + '</span>' + el + '</label>';
  }
  function FB(lb, p, rows) { return '<div class="r2">' + F(lb + ' <small>(français)</small>', p + '.fr', 'text', rows) + F(lb + ' <small>(English)</small>', p + '.en', 'text', rows) + '</div>'; }
  var DEL = function (p, i) { return '<button class="del" type="button" data-del="' + p + '" data-i="' + i + '">Supprimer</button>'; };

  function body() {
    var h = '';
    if (tab === 'home') h = '<h2>Page d’accueil</h2>' + FB('Titre', 'home.h1') + FB('Présentation', 'home.lead', 4);
    if (tab === 'sections') h = '<h2>Rubriques visibles</h2><p class="small">Activez une rubrique seulement quand son contenu est prêt : elle apparaît alors dans le menu et sur le site.</p>' + SECTIONS.map(function (s) { return '<label class="tg"><input type="checkbox" data-sec="' + s[0] + '"' + (data.sections[s[0]] ? ' checked' : '') + '><span>' + s[1] + '<small>' + s[2] + '</small></span></label>'; }).join('');
    if (tab === 'news') h = '<h2>Actualités</h2><button class="add" type="button" data-add="news">+ Ajouter une actualité</button>' + data.news.map(function (n, i) {
      return '<div class="it">' + F('Date', 'news.' + i + '.date', 'date') + FB('Titre', 'news.' + i + '.t') + FB('Résumé', 'news.' + i + '.p', 3) +
        '<div class="imgrow">' + (n.img ? '<img src="' + esc(n.img) + '" alt="">' : '') + '<label class="mini" style="cursor:pointer">' + (n.img ? 'Changer l’image' : 'Ajouter une image') + '<input type="file" accept="image/*" hidden data-img="' + i + '"></label>' + (n.img ? '<button class="mini" type="button" data-noimg="' + i + '">Retirer</button>' : '') + '</div>' + DEL('news', i) + '</div>';
    }).join('');
    if (tab === 'events') h = '<h2>Événements</h2><p class="small">Date de début et de fin, ou un texte libre (ex. « Avril 2027 ») si la date n’est pas fixée. « Page liée » : mobile-cup, ou vide.</p><button class="add" type="button" data-add="events">+ Ajouter un événement</button>' + data.events.map(function (e, i) {
      return '<div class="it">' + FB('Titre', 'events.' + i + '.t') + FB('Description', 'events.' + i + '.p', 2) + '<div class="r2">' + F('Début', 'events.' + i + '.iso', 'date') + F('Fin', 'events.' + i + '.end', 'date') + '</div>' + FB('Date en texte libre', 'events.' + i + '.label') + '<div class="r2">' + F('Page liée', 'events.' + i + '.link') + '<label class="tg"><input type="checkbox" data-past="' + i + '"' + (e.past ? ' checked' : '') + '><span>Événement passé (archives)</span></label></div>' + DEL('events', i) + '</div>';
    }).join('');
    if (tab === 'streamers') h = '<h2>Streamers</h2><button class="add" type="button" data-add="streamers">+ Ajouter un streamer</button>' + data.streamers.map(function (s, i) {
      return '<div class="it">' + F('Pseudo', 'streamers.' + i + '.n') + FB('Profil (Streamer, Cosplayer…)', 'streamers.' + i + '.role') + FB('Région', 'streamers.' + i + '.region') + DEL('streamers', i) + '</div>';
    }).join('');
    if (tab === 'partners') h = '<h2>Partenaires</h2><button class="add" type="button" data-add="partners">+ Ajouter un groupe</button>' + data.partners.map(function (g, i) {
      return '<div class="it">' + FB('Nom du groupe', 'partners.' + i + '.h2') + '<label class="af"><span>Partenaires <small>(un par ligne)</small></span><textarea rows="5" data-names="' + i + '">' + esc(g.names.join('\n')) + '</textarea></label>' + DEL('partners', i) + '</div>';
    }).join('');
    if (tab === 'stats') h = '<h2>Chiffres clés</h2><button class="add" type="button" data-add="stats">+ Ajouter un chiffre</button>' + data.stats.map(function (s, i) {
      return '<div class="it"><div class="r2">' + F('Valeur', 'stats.' + i + '.v') + '<span></span></div>' + FB('Libellé', 'stats.' + i + '.l') + DEL('stats', i) + '</div>';
    }).join('');
    return h;
  }

  function render() {
    var y = scrollY;
    show('<h1>Espace équipe</h1><p class="small">Les modifications sont publiées sur le site quelques minutes après avoir cliqué sur « Publier ».' + (demo ? ' <strong>Mode démonstration : rien n’est publié.</strong>' : '') + '</p><div class="tabs" role="tablist">' + TABS.map(function (t) { return '<button type="button" data-tab="' + t[0] + '" aria-pressed="' + (tab === t[0]) + '">' + t[1] + '</button>'; }).join('') + '</div>' + body() +
      '<div class="bar"><span id="msg" class="msg"></span><button class="pill don" id="pub"' + (demo ? ' disabled' : '') + '>Publier</button></div>');
    scrollTo(0, y);
  }

  var BLANK = {
    news: function () { return { date: new Date().toISOString().slice(0, 10), img: '', t: bi(), p: bi() }; },
    events: function () { return { iso: '', end: '', label: bi(), t: bi(), p: bi(), link: '', past: false }; },
    streamers: function () { return { n: '', role: bi(), region: bi() }; },
    partners: function () { return { h2: bi(), names: [] }; },
    stats: function () { return { v: '', l: bi() }; }
  };

  app.addEventListener('input', function (e) {
    var t = e.target;
    if (t.dataset.p) set(t.dataset.p, t.value);
    else if (t.dataset.names) { data.partners[t.dataset.names].names = t.value.split('\n').map(function (x) { return x.trim(); }).filter(Boolean); dirty = true; }
  });
  app.addEventListener('change', function (e) {
    var t = e.target;
    if (t.dataset.sec) { data.sections[t.dataset.sec] = t.checked; dirty = true; msg('Modifications non publiées'); }
    else if (t.dataset.past) { data.events[t.dataset.past].past = t.checked; dirty = true; msg('Modifications non publiées'); }
    else if (t.dataset.img !== undefined && t.files[0]) upload(+t.dataset.img, t.files[0]);
  });
  app.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.tab) { tab = b.dataset.tab; render(); }
    else if (b.dataset.add) { data[b.dataset.add].unshift(BLANK[b.dataset.add]()); dirty = true; render(); }
    else if (b.dataset.del) { if (confirm('Supprimer cet élément ?')) { data[b.dataset.del].splice(+b.dataset.i, 1); dirty = true; render(); } }
    else if (b.dataset.noimg !== undefined) { data.news[+b.dataset.noimg].img = ''; dirty = true; render(); }
    else if (b.id === 'pub') save();
  });
  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });

  /* ---------- images : redimensionnées et converties en WebP avant l'envoi ---------- */
  function upload(i, file) {
    msg('Envoi de l’image…');
    var img = new Image(), url = URL.createObjectURL(file);
    img.onload = function () {
      var max = 1600, k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(function (blob) {
        var r = new FileReader();
        r.onload = function () {
          var name = (file.name || 'image').replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'image';
          if (demo) { msg('Mode démonstration : image non envoyée', 'err'); return; }
          api('/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, data: String(r.result).split(',')[1] }) }).then(function (j) {
            data.news[i].img = j.path; dirty = true; render(); msg('Image ajoutée. Pensez à publier.', 'ok');
          }).catch(function (e) { msg('Échec : ' + e.message, 'err'); });
        };
        r.readAsDataURL(blob);
      }, 'image/webp', 0.85);
    };
    img.onerror = function () { msg('Image illisible', 'err'); };
    img.src = url;
  }

  /* ---------- démarrage ---------- */
  if (demo) {
    data = JSON.parse(document.getElementById('seed').textContent); render();
  } else loadCfg().then(login).catch(function () { show('<p class="msg err">Configuration introuvable.</p>'); });
})();
