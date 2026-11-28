# Site S4GS : notes pour Claude

Dépôt : `Streamers-4-Good-Squads/s4gs-site`. Site statique Astro 5 de Streamers 4 Good Squads (ASBL belge). Responsable côté site : Allan Pinet (EU Stream Coordinator, francophone). Répondre en français, ton professionnel et direct, sans tirets longs (pas de "—" dans les textes ni les documents produits : utiliser "-", "|" ou une virgule).

## Contexte
- Refonte du site à partir des documents du président ("2027 Mobile Cup") et de l'ancienne maquette "Simulateur Site S4GS" (artefact claude.ai, design de référence).
- Événement principal : **S4GS Mobile Cup 2027**, tournoi mobile gratuit en ligne (Clash Royale, Brawl Stars), du 16 déc. 2026 au 31 janv. 2027. Pré-inscriptions ouvertes le **16 décembre 2026** (`SITE.registrationsOpen`). Âge minimum 13 ans, consentement parental de 13 à 17 ans.
- Autres événements : Streamathon 2027 (avril 2027, **à confirmer**), Streamathon 2026 (20-22 nov. 2026, passé, au profit d'Aid for Youth Philippines).
- Siège : 69 avenue de la Grotte, 4130 Liège (code postal 4130 confirmé).
- Ne pas réutiliser les noms de partenaires de la maquette (exemples, dont RTBF iXPé : relation non établie).

## Technique
- Astro 5, `output: static`, `trailingSlash: 'always'`, format directory. Sitemap filtré par la liste `hidden` d'`astro.config.mjs`.
- Langues : 9 prévues (`src/i18n/locales.ts`), seulement **fr et en prêtes** (`READY`). Autres : à traduire plus tard. hreflang géré par `Base.astro`.
- Textes : `src/i18n/ui/{fr,en,types}.ts` (interface), `src/i18n/pages/*` (pages : `assoc-*`, `home`, `docs-*`, `form`, `extra.ts` pour Participer et Don). Toute nouvelle chaîne doit exister en fr et en.
- Réglages : `src/config/site.ts` (URL de don Streamlabs, Discord, réseaux sociaux, adresse, e-mail `tournoi@s4gs.org`, `formEndpoint` et `consentEndpoint` vides = mode test, compteur d'inscriptions, `sections`).
- **Contenus modifiables** : `src/data/content.json` (accueil, chiffres, actualités, événements, streamers, partenaires, rubriques visibles). `assocPage()` (`src/i18n/pages/index.ts`) les fusionne avec les textes de base. `SITE.sections` vient de ce fichier : une rubrique à `false` est construite mais masquée (menu, pied de page, sitemap, noindex).
- Thème : `html[data-theme="dark"|"light"]`, mémorisé dans `localStorage` (`s4gs-theme`).

## Design (fidèle à l'ancien simulateur)
- `src/styles/global.css` (base, formulaires, tableaux, FAQ) puis `src/styles/design.css` (design de l'ancien site, porté tel quel : conteneur `.site` avec requêtes de conteneur `cqi`, bandeau `.spot`, en-tête `.stick` avec médaillon, bascule soleil/lune `.tgl`, hero animé `.hero`/`.vis`, bandeau `.mq`, cartes empilées `.stk/.sc`, bandes `.band`, `.big`, `.card`, pied de page `.ft`).
- Respecter `prefers-reduced-motion`. Lisibilité avant tout (jamais de texte sur une couleur proche). Pas de photos de remplissage rayées en public.
- Les pages sont en `<Base>` + `<PageHead>` ; les sections utilisent `.sec`, `.wrap`, `.head`, `.kick`, `.pill`.
- Si l'utilisateur dit qu'il ne retrouve pas "le rendu de la première version", comparer visuellement avec l'artefact "Simulateur Site S4GS" avant de répondre. Allan veut voir un aperçu avant intégration pour valider la direction artistique.

## Pages
Accueil, L'association, Événements, Partenaires (active), Actualités / Streamers / Transparence (masquées tant que `sections.* = false`), Contact, Participer, Faire un don, Mobile Cup (+ formulaire de pré-inscription), Streamathon (formulaire brouillon, noindex), merci, parents (consentement), et documents : mission, rules, faq, privacy, prizes, cookies, football-cup (certains en noindex en attendant validation).
Pages de l'ancien site non reprises : article d'actualité, Live (lecteur, planning, jauge) : à faire quand il y aura de vraies actualités ou un événement.

## Déploiement
- GitHub Pages via Actions (`.github/workflows/deploy.yml`) à chaque push sur `main`, Node 20. URL provisoire : `https://streamers-4-good-squads.github.io/s4gs-site/` (le script `scripts/prefix-base.mjs` préfixe les liens avec `/s4gs-site`).
- **Quand le domaine s4gs.org est branché sur Pages : créer la variable de dépôt `PAGES_AT_ROOT=true`** (sinon les liens restent préfixés). Domaine géré chez IONOS (enregistrement TXT de vérification, domaine personnalisé dans Pages, bascule vers le 10 décembre, Eric comme second propriétaire).
- Le cache de GitHub Pages dure environ 10 minutes, page par page : ajouter `?v=N` pour contourner avant de conclure à un bug.

## Façon de travailler avec GitHub
- Ne jamais pousser sur `main` directement : branche, commit, PR, puis demander à Allan de fusionner. `gh pr create` échoue (GraphQL bloqué) : utiliser `gh api repos/Streamers-4-Good-Squads/s4gs-site/pulls -f title=... -f head=... -f base=main -f body=...`.
- Dépôt en clone superficiel : pousser avec `git -c push.negotiate=true push`. Les alertes de hook "commits non poussés" sont des faux positifs : vérifier avec `git ls-remote --heads origin <branche>` et comparer à `git rev-parse HEAD`.
- Vérifier le rendu avec Playwright (build, serveur local sur `dist`, captures clair, sombre, mobile 390 px) avant de proposer une PR. Lancer `npm run build` avant chaque commit.
- Messages de commit : ajouter les lignes de coattribution demandées par l'environnement.

## Espace équipe (éditeur)
`/admin/` (aperçu sans connexion : `/admin/?demo=1`) édite `content.json`, connexion Microsoft limitée à @s4gs.org, publication par un Cloudflare Worker (`worker/`) qui commit sur GitHub. Mise en route détaillée : `docs/editeur-equipe.md`. **À configurer** : inscription d'application Microsoft Entra (par un admin du compte Microsoft 365), jeton GitHub limité au dépôt (Contents read/write), compte Cloudflare, puis renseigner `public/admin/config.json` et `worker/wrangler.toml`. Tant que ce n'est pas fait, `/admin/` affiche "connexion pas encore configurée".

## Textes modifiés depuis le site
`src/data/text-overrides.json` (clé = texte d'origine, par langue) est appliqué en fin de compilation par `integrations/text-overrides.mjs`. Quand un texte source change dans `src/i18n/`, vérifier s'il a une entrée dans ce fichier. Détails : `docs/editeur-equipe.md`.

## Travaux déposés à la main sur main (fin nov. 2026, conversation claude.ai)
- Mobile Cup alignée sur la stratégie 2027 et le guide technique (documents internes : **ne jamais les ajouter au dépôt, il est public**) : compétition de collecte et Coupe des continents, division Découverte, Brawl Stars en trio ou en solo, deux week-ends de qualifs, zone selon le pays de résidence, mention "non organisé ni soutenu par Supercell". Règlement, FAQ, dotation, mission, pages Don et Football mis à jour.
- Charte appliquée : pas de point médian, pas de "charity" / "caritatif", pas de tiret long.
- `/merci/` : fenêtre de don par-dessus la page pour les 18 ans et plus ; pour les mineurs (`?a=minor`), aucune demande de don, message "lien envoyé au parent avec la demande d'accord".
- `/streamathon/` : formulaire Streamathon 2027 (brouillon, noindex, hors menu). Questions selon le pays pilotées par `src/data/streamathon.ts` (ex. salle calme ou bruyante en Belgique, pas aux Philippines, en ligne seulement ailleurs). Envoi vers `SITE.streamathonEndpoint` (vide = mode test).
- Mode édition des textes (bouton ✎, code 2005 qui ne protège que l'ouverture), publication via la route `/texts` du Worker (non configuré : bouton "Télécharger le fichier" en attendant). Correction : `public/admin/admin.js` utilise `window.msal` (avec repli `msalBrowser`). Vérifié le 27 nov. 2026 : `public/edit/editor.js` et `integrations/text-overrides.mjs` sont bien sur main.

## Décisions prises (Éric, 28 nov. 2026)
- Nom affiché : **S4Gs** partout dans les textes (les noms techniques, polices `S4GS Display` et adresses restent tels quels).
- Bouton « Faire un don » de l'en-tête : mène à `/donate/`, qui propose dans l'ordre Streamlabs Charity, Stripe (montant libre, unique ou mensuel, en euros) puis PayPal (`SITE.stripe`, `SITE.paypalUrl`). Liens génériques : pendant les événements, chaque joueur a sa propre page de collecte.
- Partenaires humanitaires officiels : Aid for Youth Philippines, ChildHope Philippines, ECPAT Philippines, présentés sur la page Mission dans cet ordre (`src/data/missions.ts`), liens vers leurs sites dans une fenêtre (nouvel onglet, la page reste ouverte). Rubrique Partenaires (content.json, modifiable depuis `/admin/`) : un groupe « Partenaires permanents » (haca.studio, Aid for Youth Philippines), puis un groupe par événement intitulé « <Événement> : partenaires de l’événement » (Top Gaming pour les Streamathon 2026 et 2027). ChildHope et ECPAT ne sont que sur la page Mission. Un nom identique à un partenaire de `missions.ts` devient un lien vers sa présentation.
- Rapports d'activité publiés sur le site après chaque assemblée générale annuelle (rubrique Transparence à activer à ce moment).
- Menu : sous-menus déroulants « À propos » / « About us » (L'association, Notre mission, Partenaires, Transparence si active, Participer, Faire un don, Contact) et « Événements » (Mobile Cup 2027, Streamathon 2027, Streamathon 2026, Streamers, Actualités), dans `src/components/Header.astro`. Streamers et Actualités sont dans le menu à la demande d'Allan même si leur rubrique n'est pas activée : elles gardent la mention « Exemple » et le noindex jusqu'à la saisie des vrais contenus. Football Cup hors menu jusqu'après janvier (règle Supercell).
- Vidéos YouTube : `src/data/videos.json`, clé = slug de la page (ex. `streamathon-2026`, `mobile-cup`, `mission`), plusieurs vidéos possibles par page (`url` YouTube de tout format, `title` fr/en). La section « En vidéo » s'affiche automatiquement en bas de la page (`Base.astro`), ou à l'endroit choisi avec `<Videos>` et `noVideos` sur `<Base>`. Lecteur `src/components/YouTube.astro` : rien n'est chargé depuis YouTube avant le clic, puis youtube-nocookie.com. Pas encore modifiable depuis `/admin/` (à ajouter au Worker et à l'éditeur si besoin).
- Page Streamathon 2026 : `/streamathon-2026/` (`src/i18n/pages/s2026.ts`), avec la vidéo de l'édition.

## Décisions d'Allan après le check-up de l'ancien site Webflow (28 nov. 2026)
- Nom officiel : **Streamers 4 Good Squads ASBL** (avec un s). Numéro d'entreprise **BE1036.153.802** (pied de page, conditions d'utilisation).
- Historique : seulement « depuis 2024 », sans détail par édition.
- Streamathon 2026 : en Belgique **dans les locaux de Pixiels**, à Manille au CIIT College, et en ligne. **L'HEAJ (Haute École Albert Jacquard) ne doit apparaître nulle part sur le site.**
- **Aucune mention de Philia Haven ni de PlayFest** (anciens noms), nulle part.
- Chiffres de l'accueil : 30 000 repas, 3 continents, 100+ streamers, 15 M de personnes en **portée potentielle** (formulation à garder).
- Page Streamers : pas de fiches par streamer, renvoi vers les réseaux de S4Gs (onglet Streamers retiré de `/admin/`).
- Discord : `https://discord.gg/ry5AaASSy4`. Réseaux : uniquement les nouveaux comptes (`@S4GSquads`, `@s4gs.streamathon`...), jamais les anciens comptes PlayFest.
- Adresses e-mail de contact : à choisir page par page (demander à Allan).
- Conditions d'utilisation : page `/terms/` (brouillon noindex, relecture juridique avant publication).
- Comptes à rebours : `src/components/Countdown.astro`, étapes datées avec fuseau, disparition automatique après la date de fin (Mobile Cup : jusqu'au 31 janv. 2027).
- Pays du Streamathon : suivre la carte qu'Allan doit transmettre (ne pas lister de pays avant).
- Domaine : même adresse s4gs.org, l'ancien site disparaît, pas de redirections depuis les anciennes adresses Webflow.

## Décisions en attente (ne rien trancher seul : demander à Allan)
- Formulaire Streamathon : hypothèses à valider (Philippines avec participation sur place, questions matériel et besoins particuliers, créneaux, âge minimum 13 ans avec e-mail parental de 13 à 17 ans).
- Mode édition : un texte modifié change partout où le même texte apparaît dans la même langue. Restreindre à la page en cours si besoin.
- Mobile Cup : seuils de la division Découverte, option de dotation (1, 2 ou 3), traductions des 7 autres langues.
- Page Football Cup : volontairement hors menu, à annoncer seulement après la clôture de janvier.

## CRM (détails dans `docs/specification-crm-inscriptions.md`)
- E-mail de demande d'accord parental : il contient le lien de don (plus de lien de partage envoyé à la personne mineure).
- Prévoir la réception des pré-inscriptions Streamathon (`type: streamer-registration`) : réponses par pays dans le champ `answers`.
- Le déclencheur HTTP de Power Automate est probablement premium : envisager le Worker Cloudflare comme relais vers SharePoint (Microsoft Graph).

## Mise en route de l'espace équipe (Eric)
- Dans Microsoft Entra, ajouter l'adresse de redirection `.../edit/auth.html` en plus de `.../admin/` (voir `docs/editeur-equipe.md`, étape 1).

## Reste à faire
- Allan / président : confirmer la date du Streamathon 2027, ajouter l'historique 2024 et 2025, choisir l'option de lots, durée de conservation et outil de formulaire pour la politique de confidentialité, identifiants GA4 et Ad Grants + outil de cookies, relecture juridique du règlement, date de livraison du CRM (plan B si après le 16 décembre), DNS et domaine.
- Vérification d'âge à l'inscription (proposée, non lancée) : date de naissance déclarée + lien de confirmation envoyé au parent pour les 13-17 ans (statut "consentement parental en attente" à ajouter à `docs/specification-crm-inscriptions.md`), contrôle ciblé des gagnants, aucune pièce d'identité conservée.
- Contenus réels pour actualités, streamers, partenaires, transparence, chiffres, puis activer les rubriques.
- Traductions des 7 autres langues, bannière cookies + GA4, branchement du compteur au CRM, `formEndpoint` / `consentEndpoint` / `streamathonEndpoint` quand le CRM est prêt, retirer `noindex` des pages juridiques une fois validées, mise à jour de l'action GitHub (Node 20 déprécié).
- Écarts avec la stratégie 2027 et ses annexes, en attente de contenu ou de décision : guide pas à pas pour créer sa page de collecte Streamlabs Charity (lien à ajouter sur `/merci/`), paliers du compteur d'inscriptions (bonus débloqués), règle de changement de deck entre les manches (Clash Royale, « à confirmer » dans le guide), pays limites de la liste du formulaire (Turquie, Caucase, Kazakhstan, Israël retirés faute de mention dans la stratégie : à confirmer). Les documents internes prévoient encore un bouton « Partage avec ta famille » pour les mineurs : à mettre à jour côté président (le site envoie le lien de don au parent).
- Formulaire Mobile Cup (27 nov. 2026) : une division par jeu (`divisions`), identifiants des deux coéquipiers Brawl Stars (`brawlStars.teammates`), pays limités aux trois zones hors Russie et Biélorussie, case « règlement et code de conduite ». Format décrit dans `docs/specification-crm-inscriptions.md`.
- Liens partenaires confirmés par Éric : `https://childhope.org.ph/` et `https://ecpat.org/` (site du réseau international ECPAT). Chiffre « 96 % des 12-17 ans en ligne » : source sur le site d'ECPAT selon Éric. Lien Stripe direct renseigné dans `SITE.stripe.paymentLink` (28 nov. 2026) : la page Don n'utilise plus le bouton intégré ni le script Stripe.
- Galerie "En images" et Live à reprendre de l'ancien site quand il y aura des photos et un événement.
