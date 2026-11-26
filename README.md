# Site S4GS (Astro, GitHub Pages)

- `npm install` puis `npm run dev` (aperçu local) ou `npm run build` (dossier `dist`).
- Langues : `src/i18n/locales.ts` (passer `ready: true` quand une traduction est relue).
- Textes : `src/i18n/ui/<langue>.ts` (menus) et `src/i18n/pages/<langue>.ts` (pages).
- Dates et zones : `src/data/event.ts`. Liens (don, Discord, formulaire Tally, compteur) : `src/config/site.ts`.
- Formulaire d'inscription : voir `docs/formulaire-power-automate.md`.
- Déploiement : pousser sur `main`, le workflow `.github/workflows/deploy.yml` publie sur GitHub Pages. Le domaine s4gs.org se règle dans Settings > Pages (pas de fichier CNAME).
- Polices : marque pour en/fr/de/es/it/pt ; Nunito et Michroma pour pl/cs/ro (glyphs manquants dans les polices de marque).
