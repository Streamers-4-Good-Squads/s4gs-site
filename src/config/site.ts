// Réglages modifiables sans toucher au design.
export const SITE = {
  url: 'https://s4gs.org',
  donationUrl: 'https://streamlabscharity.com/streamers-4-good-squads',
  discordUrl: 'https://discord.gg/REMPLACER', // à renseigner
  contactEmail: 'tournoi@s4gs.org',
  // Lien du formulaire d'inscription (Tally). Vide = bouton affiché en "bientôt".
  formUrl: { en: '', fr: '' } as Record<string, string>,
  // Ouverture des inscriptions (heure de Bruxelles)
  registrationsOpen: '2026-12-16',
  // Compteur d'inscriptions : mis à jour à la main ou par un script quotidien
  registrations: { count: 0, target: 64 },
};
