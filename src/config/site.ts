// Réglages modifiables sans toucher au design.
export const SITE = {
  url: 'https://s4gs.org',
  donationUrl: 'https://streamlabscharity.com/streamers-4-good-squads',
  discordUrl: 'https://discord.gg/DtjG2xyVCR',
  contactEmail: 'tournoi@s4gs.org',
  // Siège de l'ASBL (code postal 4130 confirmé)
  address: '69 avenue de la Grotte, 4130 Liège, Belgique',
  // Adresse qui reçoit les inscriptions (flux Power Automate ou API du CRM). Vide = mode test, rien n'est envoyé.
  formEndpoint: '',
  // Adresse qui reçoit les accords parentaux (même principe). Vide = mode test.
  consentEndpoint: '',
  // Ouverture des inscriptions (heure de Bruxelles)
  registrationsOpen: '2026-12-16',
  // Compteur d'inscriptions : mis à jour à la main ou par un script quotidien
  registrations: { count: 0, target: 64 },
  // Rubriques dont le contenu est encore un exemple : tant que la valeur est false, la page est construite
  // mais masquée du menu et du pied de page, non indexée et absente du plan du site.
  // Passer à true quand les vrais contenus sont saisis (src/i18n/pages/assoc-fr.ts et assoc-en.ts).
  sections: { news: false, streamers: false, partners: false, transparency: false, stats: false },
};
