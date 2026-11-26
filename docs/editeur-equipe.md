# Espace équipe : mise en route

Page : `/admin/` du site. Réservée aux comptes Microsoft @s4gs.org. Les modifications sont enregistrées dans `src/data/content.json` ; le site se reconstruit seul (2 à 3 minutes).

Aperçu sans connexion : `/admin/?demo=1` (rien n'est publié).

## 1. Microsoft Entra (compte administrateur de l'organisation)
1. Aller sur https://entra.microsoft.com > Applications > Inscriptions d'applications > Nouvelle inscription.
2. Nom : `S4GS espace équipe`. Types de comptes : **Comptes dans cet annuaire d'organisation uniquement**.
3. URI de redirection, type **Application monopage (SPA)** : `https://streamers-4-good-squads.github.io/s4gs-site/admin/` (ajouter plus tard `https://s4gs.org/admin/`).
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
