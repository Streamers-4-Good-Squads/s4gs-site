const fr = {
  participate: {
    head: { title: 'Participer | Streamers 4 Good Squads', description: 'Streamer, devenir partenaire, jouer à la Mobile Cup ou soutenir S4GS : toutes les façons de rejoindre l’aventure.', kick: 'S’engager', h1: 'Rejoignez l’aventure S4GS', lead: 'Un projet collectif avec des streamers, des bénévoles, des partenaires et des spectateurs.' },
    cards: [
      { h3: 'Jouer à la Mobile Cup', text: 'Un tournoi gratuit et en ligne sur Clash Royale et Brawl Stars, du 16 décembre 2026 au 31 janvier 2027.', cta: 'Voir le tournoi', to: 'mobile-cup' },
      { h3: 'Devenir streamer', text: 'Streamez pour la cause, sur place ou à distance, lors de nos événements.', cta: 'Rejoindre le Discord', to: 'discord' },
      { h3: 'Devenir partenaire', text: 'Visibilité auprès d’une communauté engagée et association à un projet solidaire.', cta: 'Nous écrire', to: 'mail', subject: 'Partenariat S4GS' },
      { h3: 'Soutenir le projet', text: 'Partagez l’événement, suivez les streams ou faites un don.', cta: 'Faire un don', to: 'donate' },
    ],
    cta: { h2: 'Une question avant de vous lancer ?', text: 'Écrivez-nous ou venez en parler sur notre Discord, l’équipe vous répond.' },
  },
  donate: {
    head: { title: 'Faire un don | Streamers 4 Good Squads', description: 'Chaque don soutient la mission de S4GS auprès des enfants des rues et des jeunes mères mineures seules aux Philippines, et des enfants victimes d’abus dans le monde.', kick: 'Soutenir', h1: 'Chaque don peut changer une vie', lead: 'Nos événements mobilisent les communautés de streaming et de gaming pour soutenir les enfants des rues et les jeunes mères mineures seules aux Philippines, ainsi que les enfants victimes d’abus dans le monde.' },
    impact: { tag: 'Impact', h3: 'Vos dons améliorent directement les conditions de vie des enfants soutenus', text: 'Chaque contribution compte, quel que soit son montant.' },
    points: [{ h3: 'Alimentation', text: 'Des repas réguliers pour les enfants accueillis.' }, { h3: 'Éducation', text: 'Un accès à l’école.' }, { h3: 'Soins médicaux', text: 'Un suivi de santé.' }, { h3: 'Foyer sûr', text: 'Un cadre stable.' }],
    donate: { h2: 'Faire un don', text: 'Le don se fait sur Streamlabs Charity, plateforme sécurisée. Même modeste, il compte. 70 % vont aux partenaires humanitaires, 30 % à la gestion de l’association.', cta: 'Donner maintenant' },
    more: { h3: 'Transparence et engagement', text: 'Pour qui, comment nous agissons et où va chaque don.', cta: 'Lire notre mission' },
  },
};
const en = {
  participate: {
    head: { title: 'Get involved | Streamers 4 Good Squads', description: 'Stream, become a partner, play the Mobile Cup or support S4GS: every way to join the adventure.', kick: 'Get involved', h1: 'Join the S4GS adventure', lead: 'A collective project with streamers, volunteers, partners and viewers.' },
    cards: [
      { h3: 'Play the Mobile Cup', text: 'A free online tournament on Clash Royale and Brawl Stars, from 16 December 2026 to 31 January 2027.', cta: 'See the tournament', to: 'mobile-cup' },
      { h3: 'Become a streamer', text: 'Stream for the cause, on site or remotely, during our events.', cta: 'Join the Discord', to: 'discord' },
      { h3: 'Become a partner', text: 'Visibility with an engaged community and a link to humanitarian activities.', cta: 'Write to us', to: 'mail', subject: 'S4GS partnership' },
      { h3: 'Support the project', text: 'Share the event, watch the streams or donate.', cta: 'Donate', to: 'donate' },
    ],
    cta: { h2: 'A question before you start?', text: 'Write to us or come and chat on our Discord, the team will answer.' },
  },
  donate: {
    head: { title: 'Donate | Streamers 4 Good Squads', description: 'Every donation supports the S4GS mission for street children and young single mothers who are minors in the Philippines, and children who survived abuse worldwide.', kick: 'Support', h1: 'Every donation can change a life', lead: 'Our events mobilise streaming and gaming communities to support street children and young single mothers who are minors in the Philippines, and children who survived abuse worldwide.' },
    impact: { tag: 'Impact', h3: 'Your donations directly improve the living conditions of the children supported', text: 'Every contribution counts, whatever its amount.' },
    points: [{ h3: 'Meals', text: 'Regular food for the children in care.' }, { h3: 'Education', text: 'Access to school.' }, { h3: 'Medical care', text: 'Health follow-up.' }, { h3: 'Safe home', text: 'A stable setting.' }],
    donate: { h2: 'Donate', text: 'Donations go through Streamlabs Charity, a secure platform. Even a small gift counts. 70% goes to humanitarian partners, 30% to running the association.', cta: 'Donate now' },
    more: { h3: 'Transparency and commitment', text: 'Who we help, how we act and where each donation goes.', cta: 'Read our mission' },
  },
};
export const extraPage = (l: string) => (l === 'fr' ? fr : en);
