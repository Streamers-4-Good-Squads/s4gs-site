import content from '../data/content.json';
// Réglages modifiables sans toucher au design.
export const SITE = {
  url: 'https://s4gs.org',
  donationUrl: 'https://streamlabscharity.com/streamers-4-good-squads',
  // Autres moyens de don, affichés sur la page Faire un don après Streamlabs (ordre voulu par l'association).
  // Stripe : si paymentLink (adresse buy.stripe.com/...) est renseigné, il remplace le bouton intégré,
  // qui ne charge le script de Stripe qu'au clic. La clé publishable est publique par nature.
  stripe: { paymentLink: '', buyButtonId: 'buy_btn_1UgVs8I58HrD7mHlE5m94Ilq', publishableKey: 'pk_live_51ThOm0I58HrD7mHligxlxnb91tqcnJwHdBSZgybpt1uMw3tYFGw9rYNn35OhlRac28NdKOfDPFEFXdzgQHcyXoIC00F7xQVdPG' },
  paypalUrl: 'https://www.paypal.com/donate/?hosted_button_id=RSKBAGGRFRWAS',
  socials: {
    facebook: 'https://www.facebook.com/streamersforgood',
    instagram: 'https://www.instagram.com/s4gsquads_',
    youtube: 'https://www.youtube.com/@S4GSquads',
    tiktok: 'https://www.tiktok.com/@s4gs.streamathon',
  },
  discordUrl: 'https://discord.gg/DtjG2xyVCR',
  contactEmail: 'tournoi@s4gs.org',
  // Siège de l'ASBL (code postal 4130 confirmé)
  address: '69 avenue de la Grotte, 4130 Liège, Belgique',
  // Adresse qui reçoit les inscriptions (flux Power Automate ou API du CRM). Vide = mode test, rien n'est envoyé.
  formEndpoint: '',
  // Adresse qui reçoit les accords parentaux (même principe). Vide = mode test.
  consentEndpoint: '',
  // Adresse qui reçoit les pré-inscriptions des streamers au Streamathon 2027. Vide = mode test.
  // Questions selon le pays : src/data/streamathon.ts
  streamathonEndpoint: '',
  // Ouverture des inscriptions (heure de Bruxelles)
  registrationsOpen: '2026-12-16',
  // Compteur d'inscriptions : mis à jour à la main ou par un script quotidien
  registrations: { count: 0, target: 64 },
  // Rubriques dont le contenu est encore un exemple : tant que la valeur est false, la page est construite
  // mais masquée du menu et du pied de page, non indexée et absente du plan du site.
  // Passer à true quand les vrais contenus sont saisis (src/i18n/pages/assoc-fr.ts et assoc-en.ts).
  // Les valeurs viennent de src/data/content.json (modifiable depuis /admin/).
  sections: content.sections as { news: boolean; streamers: boolean; partners: boolean; transparency: boolean; stats: boolean },
};
