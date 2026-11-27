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
Accueil, L'association, Événements, Actualités / Streamers / Partenaires / Transparence (masquées tant que `sections.* = false`), Contact, Participer, Faire un don, Mobile Cup (+ formulaire de pré-inscription), merci, parents (consentement), et documents : mission, rules, faq, privacy, prizes, cookies, football-cup (certains en noindex en attendant validation).
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

## Reste à faire
- Allan / président : confirmer la date du Streamathon 2027, relire le texte Aid for Youth Philippines, ajouter l'historique 2024 et 2025, choisir l'option de lots, durée de conservation et outil de formulaire pour la politique de confidentialité, identifiants GA4 et Ad Grants + outil de cookies, relecture juridique du règlement, date de livraison du CRM (plan B si après le 16 décembre), DNS et domaine.
- Vérification d'âge à l'inscription (proposée, non lancée) : date de naissance déclarée + lien de confirmation envoyé au parent pour les 13-17 ans (statut "consentement parental en attente" à ajouter à `docs/specification-crm-inscriptions.md`), contrôle ciblé des gagnants, aucune pièce d'identité conservée.
- Contenus réels pour actualités, streamers, partenaires, transparence, chiffres, puis activer les rubriques.
- Traductions des 7 autres langues, bannière cookies + GA4, pages de redirection depuis l'ancien site Webflow, branchement du compteur au CRM, `formEndpoint` / `consentEndpoint` quand le CRM est prêt, retirer `noindex` des pages juridiques une fois validées, mise à jour de l'action GitHub (Node 20 déprécié).
- Galerie "En images" et Live à reprendre de l'ancien site quand il y aura des photos et un événement.
