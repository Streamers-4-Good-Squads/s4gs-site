# Spécification : réception des inscriptions Mobile Cup par le CRM

Document destiné à l'équipe qui développe le CRM de S4GS. Le site (statique, s4gs.org) envoie chaque pré-inscription au CRM. Rien d'autre n'est à changer côté site : il suffit de renseigner les adresses `formEndpoint`, `consentEndpoint` et `streamathonEndpoint` (`src/config/site.ts`).

## 1. Point d'entrée à fournir
- Une adresse HTTPS qui accepte les requêtes **POST**.
- Le corps est du JSON envoyé avec le type `text/plain;charset=UTF-8` (choix volontaire : cela évite la pré-requête CORS). Le CRM doit donc lire le corps comme du texte, puis le décoder comme du JSON, sans exiger `application/json`.
- Répondre **200 ou 204** quand l'inscription est enregistrée. Le site n'en lit pas le contenu, il redirige ensuite vers la page de remerciement.
- Autoriser l'origine `https://s4gs.org` (et `https://www.s4gs.org`) en CORS pour les réponses.

## 2. Contenu reçu (version 1)
| Champ | Type | Règle |
|---|---|---|
| version | nombre | Vaut 1. À refuser ou signaler si inconnu. |
| submittedAt | texte ISO 8601 | Date et heure d'envoi, UTC. |
| pageLang | texte | Langue de la page (fr, en...). |
| emailLang | texte | Langue des e-mails à envoyer (fr, en, de, es, it, pl, ro, cs, pt). |
| source | objet | Peut contenir utm_source, utm_medium, utm_campaign, utm_content, ref. Souvent vide. |
| nickname | texte | Pseudo, 40 caractères maximum. |
| tag | texte | Identifiant de joueur, commence par #, lettres et chiffres, en majuscules. |
| discord | texte | Pseudo Discord, 40 caractères maximum. |
| email | texte | Adresse e-mail en minuscules. |
| country | texte | Code pays à deux lettres (ISO 3166-1). |
| zone | texte | europe, americas ou oceania. |
| games | liste | clash-royale et/ou brawl-stars, au moins un. |
| divisions | objet | { "clash-royale": open, discovery ou null, "brawl-stars": open, discovery ou null }. Une division par jeu choisi, null pour un jeu non choisi. |
| brawlStars | objet ou null | { mode: solo ou team, teamName: texte (3 à 25 caractères) ou null, teammates: liste de 2 identifiants de joueur ou null }. teamName et teammates sont remplis seulement si mode vaut team. null si Brawl Stars n'est pas choisi. |
| mixedCup | booléen | Inscription à la coupe mixte ou féminine. |
| weekend | texte | q1 (16-17 janvier), q2 (23-24 janvier) ou either. |
| ageBracket | texte | 13-15, 16-17 ou 18+. Les moins de 13 ans ne sont jamais envoyés. |
| parentEmail | texte ou null | Obligatoire si ageBracket vaut 13-15 ou 16-17, sinon null. |
| consents | objet | { rules: true, privacy: true, image: true, newsletter: vrai ou faux }. |

## 3. Contrôles côté CRM (ne pas se fier au site)
- Refuser si rules, privacy ou image ne valent pas true, si l'e-mail ou le tag est mal formé, si ageBracket est autre chose que 13-15, 16-17 ou 18+, si parentEmail manque pour une personne mineure, si parentEmail est identique à email, si country n'est pas un pays des trois zones (Russie et Biélorussie exclues), ou si une division manque pour un jeu choisi.
- Un même e-mail et un même jeu ne créent qu'une inscription : doublon = mise à jour ou rejet silencieux, jamais deux lignes.
- Limiter le débit par adresse IP, et rejeter les envois dont la taille dépasse quelques Ko.
- Enregistrer la preuve des consentements : texte accepté (règlement et code de conduite, confidentialité, image), date, version de la page.
- Ne jamais renvoyer au navigateur de données personnelles.

## 4. Automatisations attendues après chaque inscription
1. Créer la fiche personne et l'inscription, avec un identifiant unique. Statut « Inscription validée » pour les 18 ans et plus, « En attente d'accord parental » pour les 13-17 ans. Les autres statuts possibles sont « Accord reçu » et « Non autorisé » (section 5). Seules les inscriptions « Inscription validée » ou « Accord reçu » sont exportées vers la plateforme de tournoi.
   Brawl Stars en équipe : chaque membre remplit le formulaire ; rapprocher les trois inscriptions grâce à teammates et signaler au staff une équipe incomplète avant le check-in.
2. Envoyer l'e-mail de confirmation depuis tournoi@s4gs.org, dans la langue emailLang : lien vers la plateforme de tournoi, invitation Discord, lien de don pour les personnes majeures. Pour les personnes mineures : aucun lien de don ni de partage (le lien de don passe par l'e-mail au parent, voir point 3).
3. Pour une personne mineure (13-15 ou 16-17) : e-mail au parent contenant le lien de don de l'association (et non plus un lien de partage envoyé à la personne mineure) et un lien personnel vers `https://s4gs.org/<langue>/parents/?t=<jeton>` (jeton de 16 à 128 caractères, lettres, chiffres, tiret, souligné, usage unique ou lié à l'inscription). Le lien de retrait est le même avec `&withdraw=1`. Sans accord avant le check-in, la participation n'est pas validée. Contrôle manuel des cas douteux avant chaque week-end.
4. Rappels automatiques à J-7, J-1 et H-1 avant chaque week-end de jeu.
5. Alerte au staff (e-mail ou Discord) si l'enregistrement ou un envoi d'e-mail échoue.

## 5. Accord parental (page `/xx/parents/`)
La page envoie un second type de message, à une adresse distincte (`consentEndpoint` dans `src/config/site.ts`), même principe (POST, texte brut contenant du JSON, réponse 200 ou 204).

```json
{
  "version": 1, "type": "parental-consent", "decision": "accepted",
  "token": "jeton-du-lien", "pageLang": "fr", "submittedAt": "2026-12-17T09:12:00.000Z",
  "parentName": "Nom Prénom", "relation": "parent", "contactEmail": "parent@exemple.be",
  "consents": { "participation": true, "data": true, "image": true, "prizes": true, "fundraising": true }
}
```
- `decision` vaut `accepted`, `refused` ou `withdrawn`. Pour `refused` et `withdrawn`, seuls `token`, `decision`, `pageLang` et `submittedAt` sont envoyés.
- `relation` vaut `parent` ou `guardian`.
- Le CRM doit vérifier que le jeton existe et n'est pas déjà utilisé, puis : `accepted` met le statut sur « Accord reçu » et envoie la confirmation ; `refused` met « Non autorisé » ; `withdrawn` retire la personne du tournoi et déclenche la suppression de ses données.
- Relances au parent à J+3 et J+7 après l'inscription, puis 48 heures avant le premier check-in.

## 6. Pré-inscriptions Streamathon 2027 (formulaire `/xx/streamathon/`)
Troisième type de message, envoyé à `streamathonEndpoint` (`src/config/site.ts`), même principe : POST, texte brut contenant du JSON, réponse 200 ou 204 (le site envoie en `no-cors` et ne lit pas la réponse).

```json
{
  "version": 1, "type": "streamer-registration", "event": "streamathon-2027",
  "submittedAt": "2027-02-01T18:00:00.000Z", "pageLang": "fr", "emailLang": "fr", "source": {},
  "nickname": "Pseudo", "email": "streamer@exemple.be", "country": "BE",
  "platforms": ["twitch"], "channel": "https://twitch.tv/pseudo",
  "participation": "onsite", "slots": ["..."],
  "ageBracket": "18+", "parentEmail": null,
  "answers": { "room": "calm", "gear": "all" },
  "idea": "Texte libre",
  "consents": { "privacy": true, "image": true, "newsletter": false }
}
```
- `participation` vaut `onsite` ou `online` ; seuls les pays listés dans `onSite` (`src/data/streamathon.ts`) peuvent valoir `onsite`.
- `answers` : réponses aux questions qui dépendent du pays et du mode de participation, sous l'identifiant (`id`) de chaque question de `src/data/streamathon.ts`. Les questions et les pays peuvent changer : le CRM doit accepter des clés inconnues et les stocker telles quelles (texte, ou liste pour les cases à cocher), sans colonne fixe par question.
- `ageBracket` vaut 13-15, 16-17 ou 18+ (moins de 13 ans bloqué par le site). `parentEmail` obligatoire de 13 à 17 ans, différent de `email` : même circuit d'accord parental que pour la Mobile Cup (section 5). Hypothèses encore à valider.

## 7. Relais technique (Power Automate ou Worker)
Le déclencheur HTTP de Power Automate ("When an HTTP request is received") est probablement un connecteur premium. Alternative envisagée : le Worker Cloudflare de l'espace équipe (`worker/`) reçoit les envois du site (inscriptions, accords parentaux, Streamathon) et les écrit dans des listes SharePoint via Microsoft Graph (par exemple une application Entra avec le droit `Sites.Selected`, limité au site SharePoint concerné : à confirmer). Les adresses `formEndpoint`, `consentEndpoint` et `streamathonEndpoint` pointeraient alors vers des routes de ce Worker.

## 8. Compteur d'inscriptions (facultatif)
Une adresse GET publique qui renvoie uniquement `{ "count": 123 }`, que le site pourra afficher. Pas d'autre donnée.

## 9. Données personnelles
- Données des personnes mineures et accords parentaux : suppression après l'événement, dans le délai de la politique de confidentialité.
- Aucune donnée bancaire : les dons passent par Streamlabs Charity ou Stripe.
- Accès restreint aux personnes qui gèrent le tournoi, journal des accès.

## 10. Exemple de test
```
curl -X POST "ADRESSE_DU_CRM" \
  -H "Content-Type: text/plain;charset=UTF-8" \
  --data '{"version":1,"submittedAt":"2026-12-16T14:03:22.000Z","pageLang":"fr","emailLang":"fr","source":{},"nickname":"Test","tag":"#ABC123","discord":"test","email":"test@exemple.be","country":"BE","zone":"europe","games":["clash-royale"],"divisions":{"clash-royale":"open","brawl-stars":null},"brawlStars":null,"mixedCup":false,"weekend":"either","ageBracket":"18+","parentEmail":null,"consents":{"rules":true,"privacy":true,"image":true,"newsletter":false}}'
```
