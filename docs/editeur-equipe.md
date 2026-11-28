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


## Mode édition du site : textes et couleurs (bouton crayon)

Sur chaque page, un bouton discret en bas à gauche (✎) ouvre le mode édition. **Il faut se connecter avec un compte Microsoft @s4gs.org** (fenêtre Microsoft, une seule fois par session) : tout autre compte est refusé. Il n'y a plus de code.

La barre du bas propose deux onglets :
- **Textes** : les textes modifiables sont entourés, on clique dessus et on tape.
- **Couleurs** : on clique sur un élément de la page (titre, paragraphe, bouton, carte, bandeau ; « Élément parent » pour remonter vers le bloc qui l'entoure), puis on choisit la couleur du texte ou du fond. Les pastilles sont les couleurs de la charte (violet S4Gs, lavande, jaune, bleu, vert, texte, texte secondaire, fonds, teinte, bordure) : elles s'adaptent automatiquement au thème clair et sombre. « Couleur libre » donne n'importe quelle couleur, identique dans les deux thèmes. « Par défaut » retire la modification. Un contrôle de lisibilité (contraste minimum 4,5:1) est fait **dans les deux thèmes**.

« Publier » enregistre via le Worker : textes dans `src/data/text-overrides.json` (route `/texts`), couleurs dans `src/data/style-overrides.json` (route `/styles`). Le site se met à jour en 1 à 2 minutes.

- Un texte modifié l'est partout où le même texte apparaît **dans la même langue**. Une couleur modifiée vaut pour **la page**, dans **toutes les langues**.
- Seuls les éléments qui ne contiennent que du texte sont modifiables en texte (pas un paragraphe qui contient un lien, ni les contenus qui changent tout seuls comme le compte à rebours).
- Les couleurs ne concernent que le contenu de la page (pas l'en-tête ni le pied de page, communs à tout le site). Elles sont repérées par la position de l'élément dans la page : si la structure d'une page change beaucoup (sections ajoutées ou supprimées), une couleur peut disparaître ou se déplacer ; la refaire dans ce cas.
- Pour revenir à l'origine : retaper le texte d'origine ou « Par défaut » pour une couleur, ou supprimer la ligne dans le fichier JSON correspondant.
- Le Worker n'est pas mis à jour automatiquement : après une modification de `worker/src/index.js` (par exemple l'ajout de la route `/styles`), recopier le fichier dans l'éditeur Cloudflare (Edit code, Deploy).
