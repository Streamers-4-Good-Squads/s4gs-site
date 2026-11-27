# Brancher le formulaire d'inscription

Le formulaire est dans `src/components/RegisterForm.astro`. Tant que `formEndpoint` est vide dans `src/config/site.ts`, il fonctionne en mode test : il vérifie les champs, n'envoie rien et redirige vers la page de remerciement.

## Ce que le site envoie
Une requête POST, corps JSON (type `text/plain`, pour éviter la pré-requête CORS), à l'adresse `formEndpoint`. La réponse n'est pas lue : le site redirige vers `/xx/merci/` après l'envoi.

```json
{
  "version": 1,
  "submittedAt": "2026-12-16T14:03:22.000Z",
  "pageLang": "fr",
  "emailLang": "fr",
  "source": { "utm_source": "twitch", "utm_campaign": "mobilecup" },
  "nickname": "Pseudo",
  "tag": "#ABC123",
  "discord": "pseudo",
  "email": "joueur@exemple.be",
  "country": "BE",
  "zone": "europe",
  "games": ["clash-royale", "brawl-stars"],
  "divisions": { "clash-royale": "open", "brawl-stars": "discovery" },
  "brawlStars": { "mode": "team", "teamName": "Les Tests", "teammates": ["#DEF456", "#GHI789"] },
  "mixedCup": false,
  "weekend": "either",
  "ageBracket": "13-15",
  "parentEmail": "parent@exemple.be",
  "consents": { "rules": true, "privacy": true, "image": true, "newsletter": false }
}
```
`ageBracket` vaut `18+` ou `13-17` (moins de 13 ans : rien n'est envoyé). `brawlStars` et `parentEmail` valent `null` quand ils ne s'appliquent pas.

## Power Automate (version sans CRM)
1. make.powerautomate.com, Créer, Flux cloud instantané, déclencheur « Quand une requête HTTP est reçue ».
2. Ajouter « Analyser JSON » sur `triggerBody()` : le contenu arrive en texte, utiliser `json(triggerBody())` si besoin, avec l'exemple ci-dessus comme schéma.
3. Ajouter une ligne dans la liste SharePoint des inscrits.
4. Envoyer l'e-mail de confirmation depuis tournoi@s4gs.org, dans la langue `emailLang`.
5. Si `ageBracket` vaut `13-17` : envoyer la demande d'accord à `parentEmail`.
6. Enregistrer le flux : l'adresse HTTP POST apparaît dans le déclencheur. La copier dans `formEndpoint`.

À savoir : cette adresse est visible dans le code du site. Elle contient un jeton, donc ne jamais y exposer autre chose que ce flux, et vérifier côté flux les champs reçus (e-mail valide, drapeaux de consentement vrais, tag au bon format) avant d'écrire dans SharePoint.

## CRM
Le CRM peut recevoir le même JSON sur une adresse à lui (en autorisant l'origine https://s4gs.org). Pas de changement dans le site : seule la valeur de `formEndpoint` change.
