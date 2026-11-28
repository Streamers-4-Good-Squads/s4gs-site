# Site S4Gs : notes pour Claude

Dépôt public `Streamers-4-Good-Squads/s4gs-site` : site statique Astro 5 de **Streamers 4 Good Squads ASBL** (association belge). Responsable côté site : Allan Pinet (EU Stream Coordinator, francophone). Président et administrateur Microsoft 365 : Éric.

**Règles de rédaction** : répondre en français, ton professionnel et direct. Jamais de tiret long (« — ») dans les textes ni les documents : utiliser « - », « | » ou une virgule. Pas de point médian (écrire « celles et ceux », « personne mineure »), jamais « charity » ni « caritatif ». Nom affiché **S4Gs** (pas « S4GS ») dans tous les textes visibles. Toute nouvelle chaîne existe en fr et en.

## 1. Repères essentiels
- Siège : 69 avenue de la Grotte, 4130 Liège, Belgique. Numéro d'entreprise **BE1036.153.802** (pied de page, conditions d'utilisation).
- Mission (message unique, repris partout) : soutenir les enfants des rues et les jeunes mères mineures seules aux Philippines, et les enfants victimes d'abus dans le monde. Dons : 70 % aux partenaires humanitaires, 30 % à la gestion, aucune attestation fiscale.
- Historique : dire seulement « depuis 2024 », sans détail par édition.
- **Interdits absolus sur le site** : toute mention de **Philia Haven** ou de **PlayFest** (anciens noms), de l'**HEAJ** (Haute École Albert Jacquard), des anciens comptes sociaux PlayFest, des noms de partenaires de l'ancienne maquette (dont RTBF iXPé).
- Documents internes (stratégie Mobile Cup 2027, guide technique, annexes formulaire et dotation) : **ne jamais les ajouter au dépôt, il est public**. Ils ne sont pas dans le dépôt : les redemander à Allan si besoin.

## 2. Événements
- **S4Gs Mobile Cup 2027** (événement principal) : tournoi mobile gratuit en ligne, Clash Royale (1c1) et Brawl Stars (3c3, trio ou solo), divisions Open et Découverte, trois zones (Europe 15-18 h, Amériques 18-21 h, Océanie 9-12 h, heure de Bruxelles) selon le pays de résidence. Pré-inscriptions le **16 déc. 2026** (`SITE.registrationsOpen`), mini-coupe 27-28 déc., qualifs 16-17 et 23-24 janv., finales 30-31 janv. 2027 (`src/data/event.ts`). 13 ans minimum, accord parental de 13 à 17 ans. Compétition de collecte par continent (Coupe des continents) sur Streamlabs Charity. Mention obligatoire : non organisé ni soutenu par Supercell.
- **Streamathon 2026** (passé, 20-22 nov. 2026) : à Namur dans les locaux de Pixiels, à Manille au CIIT College, et en ligne, au profit d'Aid for Youth Philippines. Page `/streamathon-2026/` avec vidéo.
- **Streamathon 2027** : avril 2027, date et lieu **à confirmer**. Formulaire streamers `/streamathon/` (brouillon noindex). Pays : suivre la carte qu'Allan doit transmettre, n'en lister aucun avant.
- **Mobile Football Cup 2027** (mars 2027, jeu EA) : page `/football-cup/` en noindex, **hors menu jusqu'après la clôture de janvier** (règle Supercell : ne pas promouvoir un autre éditeur pendant la Mobile Cup).

## 3. Technique
- Astro 5, `output: static`, `trailingSlash: 'always'`, format directory. Sitemap filtré par la liste `hidden` d'`astro.config.mjs` (pages noindex et rubriques inactives).
- Langues : 9 prévues (`src/i18n/locales.ts`), seulement **fr et en prêtes** (`READY`). hreflang et x-default (en) dans `Base.astro`.
- **Racine `/`** (`src/pages/index.astro`) : pas de page de choix. Redirection immédiate vers la dernière langue utilisée (`localStorage` `s4gs-lang`, écrit par `Base.astro`), sinon la langue du navigateur si prête, sinon l'anglais, en conservant `?utm_...` et l'ancre.
- Textes : `src/i18n/ui/{fr,en,types}.ts` (interface : menu, pied de page, vidéo, compte à rebours), `src/i18n/pages/*` : `fr.ts`/`en.ts`/`types.ts` (Mobile Cup et `/merci/`), `assoc-*` (accueil, association, événements, partenaires, streamers...), `docs-*` (pages documents), `form.ts` (formulaire Mobile Cup), `parents.ts`, `streamathon.ts`, `s2026.ts`, `extra.ts` (Participer, Faire un don), `home.ts`.
- Pages documents (`src/pages/[lang]/[doc]/`, `DOC_SLUGS`) : mission, rules, faq, privacy, terms, prizes, cookies, football-cup.
- Thème clair/sombre : `html[data-theme]`, `localStorage` `s4gs-theme`.

### Réglages (`src/config/site.ts`)
- Dons : `donationUrl` (Streamlabs Charity), `stripe.paymentLink` (lien direct, montant libre, euros), `paypalUrl`, `fundraisingUrl` (page d'équipe « S4Gs Mobile Cup 2027 » sur Streamlabs, **vide pour l'instant**).
- `socials` (Facebook `streamersforgood`, Instagram `s4gsquads_`, YouTube `@S4GSquads`, TikTok `@s4gsquads_`), `discordUrl` (`discord.gg/ry5AaASSy4`). Uniquement les nouveaux comptes.
- `contactEmail` (`tournoi@s4gs.org`, utilisé partout pour l'instant ; les adresses à afficher page par page restent **à choisir par Allan**), `address`.
- `formEndpoint`, `consentEndpoint`, `streamathonEndpoint` : vides = mode test (rien n'est envoyé). À renseigner quand le CRM est prêt.
- `registrationsOpen`, `registrations` (compteur, mis à jour à la main), `sections` (vient de `content.json`).

### Données (`src/data/`)
- `content.json` (modifiable depuis `/admin/`) : accueil, chiffres, actualités, événements, partenaires, `sections`. `assocPage()` (`src/i18n/pages/index.ts`) le fusionne avec les textes de base. Une rubrique à `false` est construite mais masquée (pied de page, sitemap, noindex, mention « Exemple »). État actuel : `partners`, `streamers`, `stats` à true ; `news`, `transparency` à false. Le Worker valide la structure de ce fichier : ajouter un champ demande de mettre à jour `worker/src/index.js` et `public/admin/admin.js`.
- `missions.ts` : partenaires humanitaires de la page Mission (Aid for Youth Philippines, ChildHope Philippines, ECPAT Philippines, dans cet ordre), fr/en, liens `https://childhope.org.ph/` et `https://ecpat.org/` ouverts depuis une fenêtre (nouvel onglet).
- `videos.json` : vidéos YouTube par page (clé = slug, plusieurs vidéos possibles, `url` + `title` fr/en).
- `event.ts` (dates et zones Mobile Cup), `streamathon.ts` (questions du formulaire Streamathon selon le pays et le mode), `text-overrides.json` (textes modifiés depuis le site, voir § 7).

### Composants (`src/components/`)
- `Header.astro` : menu avec sous-menus déroulants (survol ou bouton flèche sur ordinateur, liste en retrait sur mobile, Échap et clic extérieur ferment). « À propos » : L'association, Notre mission, Partenaires, Transparence (si active), Participer, Faire un don, Contact. « Événements » : Mobile Cup 2027, Streamathon 2027, Streamathon 2026, Streamers, Actualités (toujours affichées, à la demande d'Allan). Bouton « Faire un don » vers `/donate/`.
- `Footer.astro` : liens, réseaux, pages légales (dont Conditions d'utilisation), « © Streamers 4 Good Squads ASBL | Numéro d'entreprise BE1036.153.802 », mention Supercell.
- `RegisterForm.astro` : pré-inscription Mobile Cup (pays des trois zones hors Russie et Biélorussie, une division par jeu, coéquipiers Brawl Stars, tranche d'âge et e-mail parental). Format des données : `docs/specification-crm-inscriptions.md`.
- `StreamathonForm.astro`, `YouTube.astro` (lecteur chargé seulement au clic, puis youtube-nocookie.com), `Videos.astro` (section « En vidéo », ajoutée automatiquement par `Base.astro`, sauf `noVideos`), `Countdown.astro` (étapes datées avec fuseau, retiré automatiquement après la date de fin), `DonateBlock`, `DonateStrip` (bandeau vers Mission), `PageHead`, `LanguageSwitcher`.

## 4. Pages
| Page | Adresse | État |
|---|---|---|
| Accueil | `/fr/` | public, chiffres clés actifs |
| L'association, Événements, Contact, Participer | `/fr/association/` etc. | public |
| Faire un don | `/fr/donate/` | public : Streamlabs, puis carte (Stripe), puis PayPal |
| Notre mission | `/fr/mission/` | public, présentation des trois partenaires humanitaires |
| Partenaires | `/fr/partners/` | public : « Partenaires permanents » (haca.studio, Aid for Youth Philippines), puis un groupe par événement « <Événement> : partenaires de l'événement » (Top Gaming, Streamathon 2026 et 2027). ChildHope et ECPAT seulement sur Mission |
| Streamers | `/fr/streamers/` | public : pas de fiches, renvoi vers les réseaux et vers `/streamathon/` |
| Actualités, Transparence | `/fr/news/`, `/fr/transparency/` | masquées (exemples). Transparence : rapports d'activité publiés après chaque assemblée générale annuelle |
| Mobile Cup | `/fr/mobile-cup/` | public : compte à rebours, formulaire, compétition de collecte, guide de collecte (`#guide-collecte`) |
| Règlement, FAQ | `/fr/rules/`, `/fr/faq/` | public (règlement : version de travail, code de conduite inclus) |
| Streamathon 2026 | `/fr/streamathon-2026/` | public, vidéo |
| Streamathon 2027 (formulaire) | `/fr/streamathon/` | dans le menu, mais noindex (hypothèses à valider) |
| Confidentialité, Conditions d'utilisation, Cookies, Dotation, Football Cup | `/fr/privacy/` etc. | noindex en attente de validation |
| Confirmation, Accord parental | `/fr/merci/`, `/fr/parents/` | noindex. `/merci/` : fenêtre de don pour les 18+ ; `?a=minor` : aucune demande de don, lien de don envoyé au parent |
| Espace équipe | `/admin/` | voir § 6 |

Pages non reprises de l'ancienne maquette : article d'actualité, Live, galerie « En images » (à faire quand il y aura des contenus).

## 5. Design (fidèle à l'ancien simulateur)
- `src/styles/global.css` (base, formulaires, tableaux, FAQ, lecteur vidéo, compte à rebours, guide de collecte, partenaires de Mission) puis `src/styles/design.css` (design de l'ancien site porté tel quel : conteneur `.site` avec requêtes de conteneur `cqi`, `.spot`, en-tête `.stick`, bascule `.tgl`, `.hero`, `.band`, `.big`, `.card`, `.logos`, `.ft`, menus déroulants `.dd`).
- Pages en `<Base>` + `<PageHead>`, sections `.sec`, `.wrap`, `.head`, `.kick`, `.pill`.
- Respecter `prefers-reduced-motion`, lisibilité avant tout, pas de photos de remplissage en public. En français, espaces insécables avant `:` `?` `!` et dans les guillemets dans les titres et textes longs.
- Si Allan ne retrouve pas « le rendu de la première version », comparer avec l'artefact claude.ai « Simulateur Site S4GS ». Allan veut un aperçu (captures) avant intégration.

## 6. Espace équipe et mode édition
- `/admin/` (aperçu `/admin/?demo=1`) édite `content.json` (onglets Accueil, Rubriques, Actualités, Événements, Partenaires, Chiffres). Connexion Microsoft limitée à @s4gs.org, publication par un Cloudflare Worker (`worker/`) qui commit sur GitHub. Le crayon ✎ en bas de chaque page ouvre le mode édition **après connexion Microsoft @s4gs.org** (plus de code) : onglet Textes (route `/texts`, `text-overrides.json`, par langue) et onglet Couleurs (route `/styles`, `src/data/style-overrides.json`, par page et toutes langues, pastilles = variables CSS de la charte, couleur libre #rrggbb, contrôle de contraste dans les deux thèmes) (`public/edit/editor.js`). Les couleurs sont injectées à la compilation dans une balise `<style id="s4e-styles">` par `integrations/text-overrides.mjs`, avec des sélecteurs `main>...:nth-child(n)` validés (mêmes règles dans le Worker, l'intégration et l'éditeur). Procédure complète : `docs/editeur-equipe.md`.
- **Fait (29 nov. 2026)** : application Entra « S4Gs espace d'équipe », locataire `f5b0644a-d552-4b9f-9701-a9c59cb4ab5c`, client `f3212788-4df3-44e5-a6f9-e96b6cf15dd6`, 4 adresses de retour SPA (`https://streamers-4-good-squads.github.io/s4gs-site/admin/`, `.../edit/auth.html`, `https://s4gs.org/admin/`, `https://s4gs.org/edit/auth.html`). Identifiants dans `public/admin/config.json` et `worker/wrangler.toml` (non secrets).
- **Fait (29 nov. 2026)** : jeton GitHub fine-grained (dépôt `s4gs-site`, Contents read/write, expire le **29/11/2027** : à renouveler avant, puis mettre à jour le secret), Worker Cloudflare `s4gs-admin` déployé à **`https://s4gs-admin.s4gsquads.workers.dev`** (compte Cloudflare d'Allan, 6 variables texte + secret `GH_TOKEN`), `workerUrl` renseigné dans `config.json`. Contrôles faits : origine étrangère refusée (403), appel sans connexion refusé (401), CORS correct.
- **Reste** : consentement administrateur dans Entra si pas fait, premier test de connexion et de publication réelle depuis `/admin/` après fusion. Le Worker n'est pas déployé automatiquement : toute modification de `worker/src/index.js` doit être recopiée dans l'éditeur Cloudflare (Edit code, Deploy).
- Le script du mode édition est chargé à l'adresse `/edit/editor.js?v=<BUILD>` (`src/config/build.ts`, change à chaque compilation) : pas d'ancienne version en cache après une mise à jour.
- Vidéos et streamers ne sont pas gérés par `/admin/`.

## 7. Textes modifiés depuis le site
`src/data/text-overrides.json` (clé = texte d'origine, par langue) est appliqué en fin de compilation par `integrations/text-overrides.mjs`. `src/data/style-overrides.json` (couleurs, par page) est appliqué par la même intégration ; copies publiées dans `/edit/overrides.json` et `/edit/styles.json` pour l'éditeur. Si la structure d'une page change, vérifier que ses couleurs visent toujours les bons éléments. Un texte modifié change partout où le même texte apparaît dans la même langue. Quand un texte source change dans `src/i18n/`, vérifier s'il a une entrée dans ce fichier.

## 8. Déploiement
- GitHub Pages via Actions (`.github/workflows/deploy.yml`) à chaque push sur `main`, Node 20 (déprécié, à mettre à jour). URL provisoire : `https://streamers-4-good-squads.github.io/s4gs-site/` : `scripts/prefix-base.mjs` préfixe les attributs `href`/`src` avec `/s4gs-site` (pas les chaînes JavaScript : passer par un lien caché, comme le font la racine et le bouton ✎).
- **Domaine s4gs.org** (IONOS, Éric second propriétaire) : remplace l'ancien site Webflow à la même adresse, sans redirections des anciennes adresses. Bascule prévue vers le 10 décembre (TXT de vérification, domaine personnalisé dans Pages, A/AAAA/www, sans toucher aux enregistrements e-mail). **Ensuite créer la variable de dépôt `PAGES_AT_ROOT=true`**, sinon les liens restent préfixés.
- Cache GitHub Pages d'environ 10 minutes par page : ajouter `?v=N` avant de conclure à un bug.

## 9. Façon de travailler
- Ne jamais pousser sur `main` : branche (celle indiquée par l'environnement), commit, PR, puis demander à Allan de fusionner. Si la PR précédente est fusionnée, repartir de `origin/main` ; si elle est encore ouverte, ajouter les commits à la même branche (vérifier avec `git merge-base --is-ancestor`).
- PR : outil GitHub de l'environnement (MCP `create_pull_request`, `update_pull_request`) ; à défaut `gh api repos/Streamers-4-Good-Squads/s4gs-site/pulls -f title=... -f head=... -f base=main -f body=...` (`gh pr create` échoue).
- Clone superficiel : pousser avec `git -c push.negotiate=true push`, vérifier avec `git ls-remote --heads origin <branche>`. Jamais de push forcé.
- `npm run build` avant chaque commit, puis vérification Playwright (serveur local sur `dist`, captures clair, sombre, mobile 390 px). Pour l'adresse provisoire, tester une copie de `dist` passée par `prefix-base.mjs`. Pour les comptes à rebours, simuler la date avec `page.clock`.
- Réseau de l'environnement cloud : les domaines extérieurs doivent être autorisés dans les réglages de l'environnement (s4gs.org, childhope.org.ph, ecpat.org, buy.stripe.com, streamlabscharity.com, tiktok.com ont été vérifiés).
- Messages de commit et PR : lignes de coattribution demandées par l'environnement, jamais d'identifiant de modèle.

## 10. CRM et inscriptions
Détails : `docs/specification-crm-inscriptions.md` (format JSON en `text/plain`, statuts « Inscription validée », « En attente d'accord parental », « Accord reçu », « Non autorisé », accord parental, Streamathon, relais) et `docs/formulaire-power-automate.md`.
- L'e-mail de demande d'accord parental contient le lien de don (aucun lien de partage envoyé à la personne mineure).
- Pré-inscriptions Streamathon (`type: streamer-registration`) : réponses par pays dans `answers`.
- Le déclencheur HTTP de Power Automate est probablement premium : piste du Worker Cloudflare comme relais vers SharePoint (Microsoft Graph).

## 11. Décisions en attente (demander à Allan, ne rien trancher seul)
- Formulaire Streamathon : participation sur place aux Philippines, questions matériel et besoins particuliers, créneaux, âge minimum 13 ans avec e-mail parental de 13 à 17 ans.
- Mobile Cup : seuils de la division Découverte, option de dotation (1, 2 ou 3), règle de changement de deck entre les manches, paliers du compteur d'inscriptions, pays limites retirés du formulaire (Turquie, Caucase, Kazakhstan, Israël).
- Adresses e-mail de contact à afficher page par page.
- Mode édition : restreindre une modification de texte à la page en cours si besoin ; étendre les couleurs à l'en-tête et au pied de page si besoin.
- Vidéos supplémentaires (clips, présentations) : liens et pages à fournir.

## 12. Reste à faire
- **Avant le 16 décembre** : CRM ou plan B (endpoints), domaine s4gs.org puis `PAGES_AT_ROOT`, `SITE.fundraisingUrl` (campagne d'équipe Streamlabs à créer par Éric, et vérifier l'âge minimum d'un compte collecteur), relecture juridique (règlement, confidentialité avec durée de conservation et outil de formulaire, conditions d'utilisation) puis retrait des noindex, fin de la mise en route de l'espace équipe (§ 6).
- Bannière cookies compatible Consent Mode et GA4 (identifiants GA4 et Ad Grants à fournir), compteur d'inscriptions branché au CRM.
- Contenus réels pour Actualités et Transparence, puis activer ces rubriques.
- Traductions des 7 autres langues (relecture native obligatoire pour les textes juridiques).
- Vérification d'âge renforcée (proposée, non lancée) : date de naissance déclarée, confirmation par le parent pour les 13-17 ans, contrôle ciblé des gagnants, aucune pièce d'identité conservée.
- Documents internes à mettre à jour côté président : le bouton « Partage avec ta famille » pour les mineurs a été remplacé par le lien de don envoyé au parent.
- Libellés Streamlabs cités dans le guide de collecte (Join Now!, Start Fundraising, Choose an Event, Set My Goal Amount, Copy Link), relevés le 28 nov. 2026 : revérifier si l'interface change.
- Mise à jour de l'action GitHub (Node 20), page Football Cup à publier après janvier, galerie et Live quand il y aura des contenus.
