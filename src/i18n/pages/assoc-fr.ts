import type { AssocStrings } from './assoc-types';
export const assocFr: AssocStrings = {
  home: {
    kick: 'Streamers 4 Good Squads', h1: 'Gaming. Streaming. Solidarité.',
    lead: 'Depuis 2024, S4Gs réunit des streamers du monde entier pour soutenir des causes humanitaires, avec des événements tout au long de l’année.',
    join: 'Rejoindre la communauté', give: 'Faire un don', cupBtn: 'Je me pré-inscris à la Mobile Cup',
    assoc: { kick: 'L’association', h2: 'Une communauté, plusieurs missions', lead: 'Le jeu vidéo et le streaming au service de la solidarité, toute l’année.', more: 'Découvrir l’association' },
    missions: [
      { h3: 'Récolter des fonds', text: 'Organiser des événements de collecte de fonds, en ligne et en présence, pour soutenir des partenaires humanitaires choisis avec soin.' },
      { h3: 'Fédérer la communauté', text: 'Réunir streamers, joueurs et partenaires autour de projets communs, toute l’année.' },
      { h3: 'Sensibiliser', text: 'Faire connaître les causes soutenues et le pouvoir positif du jeu vidéo.' },
    ],
    stats: { kick: 'En chiffres', h2: 'Notre impact', items: [{ v: '0', l: 'euros récoltés (exemple)' }, { v: '0', l: 'streamers mobilisés (exemple)' }, { v: '0', l: 'pays représentés (exemple)' }, { v: '0', l: 'éditions organisées (exemple)' }] },
    events: { kick: 'Agenda', h2: 'Nos événements', all: 'Tous les événements' },
    news: { kick: 'Récemment', h2: 'Actualités', all: 'Toutes les actualités' },
    partners: { h2: 'Nos partenaires', all: 'Voir les partenaires' },
  },
  association: {
    head: { title: 'L’association | Streamers 4 Good Squads', description: 'Streamers 4 Good Squads est une ASBL belge qui utilise le streaming et le jeu vidéo pour soutenir l’action humanitaire.', kick: 'Qui sommes-nous', h1: 'Une association portée par une communauté', lead: 'Streamers 4 Good Squads (S4Gs) est une ASBL belge qui utilise le streaming pour soutenir l’action humanitaire.' },
    story: { h2: 'Ce que nous faisons', paras: ['Depuis 2024, S4Gs utilise le streaming et le jeu vidéo pour réunir une communauté internationale autour de causes humanitaires, avec de grands événements comme le Streamathon et la Mobile Cup, et des actions tout au long de l’année.', 'Streamers, joueurs, artistes et bénévoles de plusieurs pays donnent de leur temps et de leur visibilité. Les dons collectés sont reversés à des partenaires humanitaires.'] },
    missions: { h2: 'Nos missions', intro: 'Trois engagements guident toutes nos actions.' },
    partner: {
      tag: 'Partenaire humanitaire', h3: 'Aid for Youth Philippines',
      text: 'Pour l’édition 2026 du Streamathon, les dons ont soutenu Aid for Youth Philippines, qui accompagne des enfants en grande vulnérabilité.',
      points: [{ h3: 'Alimentation', text: 'Des repas réguliers pour les enfants accueillis.' }, { h3: 'Logement, soins, éducation', text: 'Un accompagnement qui s’étend progressivement à un foyer stable, aux soins médicaux et à l’école.' }],
      cta: 'Soutenir cette action',
    },
    transparency: { h2: 'Transparence', text: 'Rapports d’activité après chaque édition et comptes de l’association, à consulter sur la page dédiée.', cta: 'Voir les documents' },
    mission: { text: 'Pour qui, comment nous agissons et où va chaque don : le détail de notre mission.', cta: 'Lire notre mission' },
  },
  events: {
    head: { title: 'Événements | Streamers 4 Good Squads', description: 'La S4Gs Mobile Cup 2027, le Streamathon et les rendez-vous de S4Gs : dates, règlement et archives des éditions passées.', kick: 'Agenda', h1: 'Nos événements', lead: 'La Mobile Cup, le Streamathon et les rendez-vous de l’année, avec les archives des éditions passées.' },
    cup: { tag: 'Du 16 décembre 2026 au 31 janvier 2027', h3: 'S4Gs Mobile Cup 2027', text: 'Un tournoi gratuit et en ligne sur Clash Royale et Brawl Stars, ouvert aux joueurs d’Europe, des Amériques et d’Océanie. Les pré-inscriptions ouvrent le 16 décembre.', cta: 'Voir le tournoi et me pré-inscrire', rules: 'Lire le règlement', faq: 'Questions fréquentes' },
    stream: { tag: 'Chaque année', h3: 'Streamathon', text: 'Un week-end de 48 heures de stream en direct, où streamers et communauté se mobilisent pour la cause. La dernière édition a eu lieu du 20 au 22 novembre 2026, en Belgique dans les locaux de Pixiels, à Manille au CIIT College et en ligne.' },
    calendar: {
      kick: 'Calendrier', h2: 'À venir et archives', upcoming: 'À venir', past: 'Archives',
      items: [
        { iso: '2026-12-16', end: '2027-01-31', t: 'S4Gs Mobile Cup 2027', p: 'Tournoi mobile gratuit en ligne : Clash Royale et Brawl Stars.', link: 'mobile-cup' },
        { label: 'Avril 2027', t: 'S4Gs Streamathon 2027', p: 'Week-end exact et lieu à confirmer.' },
        { iso: '2026-11-20', end: '2026-11-22', t: 'S4Gs Streamathon 2026', p: 'Un week-end de 48 heures de stream, en Belgique dans les locaux de Pixiels, à Manille au CIIT College et en ligne, au profit d’Aid for Youth Philippines.', past: true },
      ],
    },
  },
  news: {
    head: { title: 'Actualités | Streamers 4 Good Squads', description: 'Les actualités de Streamers 4 Good Squads.', kick: 'Récemment', h1: 'Actualités', lead: 'Les nouvelles de l’association, des événements et de la communauté.' },
    sample: 'Exemple',
    posts: [
      { date: '2026-12-01', t: 'Titre d’actualité, exemple 1', p: 'Deux lignes de résumé pour donner envie de lire l’article.' },
      { date: '2026-12-08', t: 'Titre d’actualité, exemple 2', p: 'Deux lignes de résumé pour donner envie de lire l’article.' },
      { date: '2026-12-16', t: 'Titre d’actualité, exemple 3', p: 'Deux lignes de résumé pour donner envie de lire l’article.' },
    ],
  },
  streamers: {
    head: { title: 'Streamers | Streamers 4 Good Squads', description: 'Les streamers, artistes et créateurs qui font vivre S4Gs.', kick: 'Communauté', h1: 'Nos streamers', lead: 'Plus de 100 streamers, artistes et créateurs de plusieurs continents font vivre nos événements.' },
    sample: 'Exemple',
    follow: { h2: 'Suivez-les sur nos réseaux', text: 'Nos streamers sont présentés et relayés sur nos réseaux sociaux, avec leurs lives pendant chaque événement. Abonne-toi pour ne rien manquer.' },
    join: { h2: 'Devenir streamer', text: 'Streame à tour de rôle pendant nos événements, sur place ou à distance. Pré-inscris-toi pour le Streamathon 2027.', cta: 'Pré-inscription des streamers', subject: 'Je souhaite devenir streamer' },
    roles: ['Streamer', 'Cosplayer', 'Créateur'],
    items: [{ n: 'Pseudo 1', role: 'Streamer', region: 'Europe' }, { n: 'Pseudo 2', role: 'Cosplayer', region: 'Asie' }, { n: 'Pseudo 3', role: 'Créateur', region: 'Amériques' }, { n: 'Pseudo 4', role: 'Streamer', region: 'Europe' }],
  },
  partners: {
    head: { title: 'Partenaires | Streamers 4 Good Squads', description: 'Les organisations avec lesquelles S4Gs agit pour les enfants.', kick: 'Partenaires', h1: 'Ensemble pour une cause commune', lead: 'Certains partenaires accompagnent S4Gs tout au long de l’année, d’autres soutiennent un événement en particulier. Merci à toutes et à tous.' },
    sample: 'Exemple',
    groups: [
      { h2: 'Partenaires institutionnels', names: ['Partenaire exemple 1', 'Partenaire exemple 2'] },
      { h2: 'Partenaires communautaires', names: ['Partenaire exemple 3', 'Partenaire exemple 4', 'Partenaire exemple 5'] },
      { h2: 'Partenaires médias', names: ['Partenaire exemple 6', 'Partenaire exemple 7'] },
    ],
    join: { h2: 'Devenir partenaire', text: 'Visibilité auprès d’une communauté engagée, présence sur nos supports, association à un projet solidaire.', cta: 'Nous écrire', subject: 'Partenariat avec S4Gs' },
  },
  contact: {
    head: { title: 'Contact | Streamers 4 Good Squads', description: 'Contacter Streamers 4 Good Squads : questions, partenariats, presse, participation.', kick: 'Nous écrire', h1: 'Contact', lead: 'Une question, une idée, une envie de participer ? Voici comment nous joindre.' },
    cards: [
      { h3: 'Par e-mail', text: 'Pour toute question générale, ou sur la Mobile Cup.', cta: 'Écrire à l’équipe', subject: 'Question sur S4Gs' },
      { h3: 'Sur Discord', text: 'Rejoignez la communauté, posez vos questions et suivez les annonces.', cta: 'Rejoindre le Discord', href: 'discord' },
      { h3: 'Partenariats', text: 'Entreprises, associations et médias qui souhaitent s’associer à nos actions.', cta: 'Proposer un partenariat', subject: 'Partenariat avec S4Gs' },
      { h3: 'Devenir streamer', text: 'Vous souhaitez streamer pour la cause pendant nos événements ?', cta: 'Nous écrire', subject: 'Je souhaite devenir streamer' },
    ],
    address: 'Siège de l’association',
  },
  transparency: {
    head: { title: 'Transparence | Streamers 4 Good Squads', description: 'Rapports d’activité et documents de gouvernance de Streamers 4 Good Squads.', kick: 'Gouvernance', h1: 'Transparence', lead: 'Rapports de suivi après chaque édition et documents de l’association.' },
    sample: 'Exemple',
    docs: [{ t: 'Rapport d’activité 2026', p: 'Document à ajouter' }, { t: 'Statuts de l’association', p: 'Document à ajouter' }, { t: 'Comptes annuels', p: 'Document à ajouter' }],
    note: 'Les documents seront publiés ici après validation par le conseil d’administration.',
  },
};
