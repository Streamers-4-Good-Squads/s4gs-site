# Espace équipe : mise en route

Page : `/admin/` du site. Réservée aux comptes Microsoft @s4gs.org. Les modifications sont enregistrées dans `src/data/content.json` ; le site se reconstruit seul (2 à 3 minutes).

Aperçu sans connexion : `/admin/?demo=1` (rien n'est publié).

## 1. Microsoft Entra (compte administrateur de l'organisation)
1. Aller sur https://entra.microsoft.com > Applications > Inscriptions d'applications > Nouvelle inscription.
2. Nom : `S4GS espace équipe`. Types de comptes : **Comptes dans cet annuaire d'organisation uniquement**.
3. URI de redirection, type **Application monopage (SPA)** : `https://streamers-4-good-squads.github.io/s4gs-site/admin/` (ajouter plus tard `https://s4gs.org/admin/`).
   Ajouter aussi, pour le mode édition des textes : `https://streamers-4-good-squads.github.io/s4gs-site/edit/auth.html` (puis `https://s4gs.org/edit/auth.html`).
4. Une fois créée, noter l'**ID d'application (client)** et l'**ID de l'annuaire (locataire)**.

## 2. Jeton GitHub
GitHub > Settings > Developer settings > Fine-grained personal access tokens : accès limité au dépôt `s4gs-site`, permission **Contents : Read and write**. À conserver pour l'étape 3 (ne jamais le coller dans un fichier du dépôt).

## 3. Service de publication (Cloudflare)
1. Créer un compte gratuit sur https://dash.cloudflare.com.
2. Dans le dossier `worker/` : renseigner `TENANT_ID` et `CLIENT_ID` dans `wrangler.toml`, puis :
   `npx wrangler login`, `npx wrangler secret put GH_TOKEN` (coller le jeton), `npx wrangler deploy`.
3. Noter l'adresse affichée (`https://s4gs-admin.<compte>.workers.dev`).

## 4. Brancher la page
Renseigner `public/admin/config.json` : `tenantId`, `clientId`, `workerUrl`. Publier.

## Sécurité
- Le service vérifie la signature du jeton Microsoft, l'organisation, l'application et le domaine @s4gs.org.
- `ALLOWED_EMAILS` (dans `wrangler.toml`) permet de limiter à une liste d'adresses.
- Le service n'accepte que la structure de `content.json` et des images WebP dans `public/img/uploads/`.
- Chaque modification est un commit GitHub avec l'adresse de l'auteur : on peut tout annuler.
- Le règlement et les pages juridiques ne passent pas par cet outil.


## Mode édition des textes (bouton crayon)

Sur chaque page, un bouton discret en bas à gauche (✎) ouvre le mode édition après le code **2005**.
Les textes modifiables sont entourés : on clique dessus et on tape. « Publier » se connecte avec le compte Microsoft @s4gs.org
et enregistre les changements dans `src/data/text-overrides.json` via le Worker (route `/texts`), ce qui relance la publication du site (1 à 2 minutes).

- Le code ne fait qu'ouvrir le mode édition : il est lisible dans `public/edit/editor.js`. La sécurité vient de la connexion Microsoft vérifiée par le Worker.
- Tant que le Worker n'est pas configuré, « Télécharger le fichier » donne `text-overrides.json` à déposer dans `src/data/` sur GitHub.
- Un texte modifié l'est partout où le même texte apparaît dans la même langue (par exemple un titre repris sur l'accueil et sur la page Événements).
- Seuls les éléments qui ne contiennent que du texte sont modifiables (pas un paragraphe qui contient un lien, ni les messages affichés par les formulaires).
- Pour revenir au texte d'origine : retaper le texte d'origine, ou supprimer la ligne dans `src/data/text-overrides.json`.
