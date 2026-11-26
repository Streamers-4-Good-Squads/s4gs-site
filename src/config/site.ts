// Réglages modifiables sans toucher au design.
export const SITE = {
  url: 'https://s4gs.org',
  donationUrl: 'https://streamlabscharity.com/streamers-4-good-squads',
  discordUrl: 'https://discord.gg/DtjG2xyVCR',
  contactEmail: 'tournoi@s4gs.org',
  // Adresse qui reçoit les inscriptions (flux Power Automate ou API du CRM). Vide = mode test, rien n'est envoyé.
  formEndpoint: '',
  // Adresse qui reçoit les accords parentaux (même principe). Vide = mode test.
  consentEndpoint: '',
  // Ouverture des inscriptions (heure de Bruxelles)
  registrationsOpen: '2026-12-16',
  // Compteur d'inscriptions : mis à jour à la main ou par un script quotidien
  registrations: { count: 0, target: 64 },
};
