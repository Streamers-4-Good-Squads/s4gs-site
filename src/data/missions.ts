// Partenaires humanitaires présentés sur la page Notre mission, dans l'ordre voulu par l'association.
// url : site officiel, ouvert depuis une fenêtre sur la page (nouvel onglet), pour ne pas quitter le site.
// Les noms servent aussi d'ancres (#id) depuis la page Partenaires.
type Sec = { h3: string; quote?: string; paras?: string[]; items?: string[]; after?: string[] };
export type Org = { id: string; name: string; url?: string; tagline: string; paras: string[]; secs?: Sec[] };
type Strings = { h2: string; intro: string; site: string; dialog: string; open: string; close: string; orgs: Org[] };

// À FAIRE CONFIRMER : adresses des sites officiels (non vérifiables depuis l'environnement de développement).
const URLS = { childhope: 'https://childhope.org.ph/', ecpat: 'https://ecpat.org.ph/' };

const fr: Strings = {
  h2: 'Nos partenaires sur le terrain',
  intro: 'S4Gs agit avec trois organisations philippines, chacune spécialiste de son domaine.',
  site: 'Site officiel',
  dialog: 'Le site officiel de {name} va s’ouvrir dans un nouvel onglet. Cette page reste ouverte : tu pourras y revenir à tout moment.',
  open: 'Ouvrir le site',
  close: 'Fermer',
  orgs: [
    {
      id: 'aid-for-youth', name: 'Aid for Youth Philippines', tagline: 'Une équipe philippine, au plus près des enfants',
      paras: [
        'Aid for Youth Philippines est une organisation philippine à but non lucratif, enregistrée auprès de la Securities and Exchange Commission (SEC) et dirigée par son propre conseil d’administration indépendant. Elle soutient les enfants, les jeunes et les jeunes mères mineures célibataires en difficulté partout aux Philippines, avec l’aide alimentaire, l’accès aux soins et le soutien scolaire.',
        'L’aventure a commencé en 2023 par des distributions de repas, puis l’équipe s’est structurée sur le terrain. Depuis 2024, des streamers philippins participent aux événements de collecte organisés avec S4Gs. En 2025, l’événement s’est déroulé pour la première fois simultanément en Belgique et aux Philippines.',
        'Aujourd’hui, Aid for Youth Philippines co-organise le Streamathon S4Gs avec S4Gs. Les dons soutiennent ses activités humanitaires et celles de ses partenaires pour les enfants. Un rapport financier est publié après chaque édition.',
      ],
      secs: [
        {
          h3: 'Le programme Épicerie : une alternative au pagpag', quote: 'Un bol vide... vaut mieux qu’une assiette de pagpag',
          paras: [
            'Dans les quartiers les plus pauvres de Metro Manila, comme Tondo, Caloocan et Pasig, certaines familles survivent grâce au pagpag : des restes de nourriture, souvent issus de fast-foods, récupérés dans les poubelles, nettoyés puis recuits. Ils sont mangés ou revendus à très bas prix. Le pagpag n’est pas une culture, c’est un symptôme de la pauvreté.',
            'Pour les enfants, les risques sont graves :',
          ],
          items: [
            'Infections : salmonelle, E. coli, hépatite A et typhoïde, malgré la cuisson.',
            'Carences : des repas riches en calories mais pauvres en protéines, en vitamines et en minéraux, qui entraînent malnutrition et retards de croissance.',
            'Exclusion : la honte et la mise à l’écart, qui les éloignent de l’école.',
          ],
          after: ['Ces enfants ne manquent ni de courage ni de volonté. Ce qui leur manque, ce sont des alternatives sûres.'],
        },
        {
          h3: 'Une réponse adaptée à chaque situation', paras: ['Le programme d’Aid for Youth Philippines distingue trois groupes d’enfants :'],
          items: [
            'Les enfants qui vivent en famille et travaillent dans la rue : ils vivent encore chez eux et vont souvent à l’école, mais passent quelques heures par jour dans la rue pour aider leur famille. Ils reçoivent un colis alimentaire hebdomadaire et un bilan de santé.',
            'Les enfants qui vivent dans la rue avec leur famille : ils dorment dans des abris de fortune et sont très exposés au danger, surtout la nuit. Ils reçoivent eux aussi un colis alimentaire hebdomadaire et un bilan de santé.',
            'Les enfants sans abri : ils n’ont aucun endroit où conserver de la nourriture. Ils rejoignent le programme de distribution de repas, avec un suivi médical.',
          ],
        },
        {
          h3: 'Ce que contient un colis', paras: ['Un colis hebdomadaire nourrit une famille de sept personnes pendant sept jours. Il contient :'],
          items: [
            'riz, gruau de maïs et haricots mungo ;',
            'œufs, poulet et poisson ;',
            'sardines et thon en conserve ;',
            'légumes (malunggay, kangkong, courge, carottes) et bananes ;',
            'lait en poudre, eau potable, huile de cuisson et sel iodé.',
          ],
          after: [
            'Coût d’un colis : 107,26 €, soit environ 2,19 € par personne et par jour. Pour les enfants sans abri, 1 € finance un repas.',
            'Chaque don transforme une stratégie de survie risquée en un repas sûr et digne.',
          ],
        },
      ],
    },
    {
      id: 'childhope', name: 'ChildHope Philippines', url: URLS.childhope, tagline: 'Aux côtés des enfants des rues de Manille depuis plus de 35 ans',
      paras: [
        'ChildHope Philippines est une organisation non gouvernementale philippine qui défend les enfants des rues depuis 1989. Son objectif : que les enfants des quartiers urbains pauvres, en particulier celles et ceux qui vivent ou travaillent dans la rue, voient leurs droits reconnus et protégés.',
        'Son action repose sur le programme STEP (Street Education and Protection), mené dans plusieurs villes de Metro Manila, dont Caloocan, Pasay et Parañaque. En 2026, il a été relancé à Sta. Cruz et étendu à Quiapo, à Manille. Des éducatrices et éducateurs de rue vont à la rencontre des enfants là où ils se trouvent, et leur apportent une éducation de base, un soutien psychosocial et une protection au quotidien.',
      ],
      secs: [
        {
          h3: 'Des services mobiles', paras: ['Autour de ce programme, ChildHope a développé plusieurs services mobiles :'],
          items: [
            'KalyEskwela, une camionnette d’éducation mobile qui propose des apprentissages par le jeu, les contes, le multimédia et des ateliers.',
            'KliniKalye, une clinique mobile qui offre aux enfants des soins de santé primaires, des consultations et des traitements.',
            'KalyEnderia, une cantine mobile. Au-delà du repas, c’est un premier contact qui crée la confiance et amène les enfants vers les autres programmes.',
          ],
          after: [
            'ChildHope accompagne aussi les jeunes avec des projets de leadership, de plaidoyer et d’entrepreneuriat, pour qu’ils puissent agir dès aujourd’hui dans leur communauté.',
            'Aux côtés de S4Gs, ChildHope Philippines apporte son expérience de terrain auprès des enfants. En retour, elle gagne en visibilité et en soutien en Europe.',
          ],
        },
      ],
    },
    {
      id: 'ecpat', name: 'ECPAT Philippines', url: URLS.ecpat, tagline: 'Protéger les enfants de l’exploitation sexuelle, en ligne et hors ligne',
      paras: [
        'ECPAT Philippines fait partie d’un réseau mondial d’organisations qui luttent contre l’exploitation sexuelle des enfants, les contenus d’abus sexuels sur enfants et la traite des enfants à des fins sexuelles. Depuis trois décennies, elle travaille en étroite collaboration avec les forces de l’ordre nationales et locales : elle leur transmet les signalements et contribue aux enquêtes.',
        'La sécurité numérique est au cœur de son action. Aux Philippines, 96 % des jeunes de 12 à 17 ans sont en ligne, et tous sont exposés au risque d’abus et d’exploitation sexuels en ligne. ECPAT Philippines gère, avec le centre de lutte contre la cybercriminalité du DICT, une ligne de signalement des contenus d’abus sexuels sur enfants. Elle est membre du réseau international INHOPE. En 2024, elle a aussi relié son système eProtectKids à la Makabata Helpline du Council for the Welfare of Children.',
        'ECPAT Philippines associe activement les jeunes à la recherche de solutions.',
        'C’est là que S4Gs et ECPAT se rejoignent. ECPAT apporte son expertise de la protection de l’enfance et de la sécurité en ligne. S4Gs l’aide à toucher les jeunes là où ils jouent, regardent et échangent : sur les plateformes de streaming et dans les communautés de gaming.',
      ],
    },
  ],
};

const en: Strings = {
  h2: 'Our partners on the ground',
  intro: 'S4Gs works with three Filipino organisations, each a specialist in its field.',
  site: 'Official website',
  dialog: 'The official website of {name} will open in a new tab. This page stays open: you can come back to it at any time.',
  open: 'Open the website',
  close: 'Close',
  orgs: [
    {
      id: 'aid-for-youth', name: 'Aid for Youth Philippines', tagline: 'A Filipino team, close to the children',
      paras: [
        'Aid for Youth Philippines is a Filipino non-profit organisation. It is registered with the Securities and Exchange Commission (SEC) and governed by its own independent Board of Trustees. It supports children, young people and young single mothers who are minors in need across the Philippines, focusing on food assistance, access to health care and educational support.',
        'The journey began in 2023 with meal distributions. The team then came together on the ground. Since 2024, Filipino streamers have taken part in the fundraising events organised with S4Gs. In 2025, the event took place simultaneously in Belgium and the Philippines for the first time.',
        'Today, Aid for Youth Philippines co-organises the S4Gs Streamathon with S4Gs. Donations support its humanitarian activities and those of its partners for children. A financial report is published after each edition.',
      ],
      secs: [
        {
          h3: 'The Grocery Programme: an alternative to Pagpag', quote: 'An empty bowl... is better than a plate of Pagpag',
          paras: [
            'In the poorest neighbourhoods of Metro Manila, such as Tondo, Caloocan and Pasig, some families survive on pagpag. These are food leftovers, often from fast-food outlets, recovered from the garbage, cleaned and cooked again. They are eaten or resold at very low prices. Pagpag is not a culture, it is a symptom of poverty.',
            'For children, the risks are serious:',
          ],
          items: [
            'Infections: salmonella, E. coli, hepatitis A and typhoid, despite reheating.',
            'Deficiencies: meals high in calories but poor in protein, vitamins and minerals, leading to malnutrition and stunted growth.',
            'Exclusion: shame and exclusion that keep them away from school.',
          ],
          after: ['These children lack neither courage nor will. What they lack is safe alternatives.'],
        },
        {
          h3: 'A response adapted to each situation', paras: ['Aid for Youth Philippines’ programme distinguishes three groups of children:'],
          items: [
            'Children who live with their families and work on the street: they still live at home and often attend school, but spend a few hours a day on the street to help their families. They receive a weekly grocery pack and a medical check-up.',
            'Children who live on the street with their families: they live in makeshift shelters on the street and are highly exposed to danger, especially at night. They also receive a weekly grocery pack and a medical check-up.',
            'Homeless children: they have nowhere to store food. They join the meal distribution programme, with medical follow-up.',
          ],
        },
        {
          h3: 'What’s in a pack', paras: ['One weekly pack feeds a family of seven for seven days. It contains:'],
          items: [
            'rice, corn grits and mung beans;',
            'eggs, chicken and fish;',
            'canned sardines and tuna;',
            'vegetables (malunggay, kangkong, squash, carrots) and bananas;',
            'powdered milk, drinking water, cooking oil and iodised salt.',
          ],
          after: [
            'Cost of one pack: EUR 107.26, or about EUR 2.19 per person per day. For homeless children, EUR 1 funds one meal.',
            'Every donation turns a risky survival strategy into a safe and dignified meal.',
          ],
        },
      ],
    },
    {
      id: 'childhope', name: 'ChildHope Philippines', url: URLS.childhope, tagline: 'Standing by Manila’s street children for more than 35 years',
      paras: [
        'ChildHope Philippines is a Filipino non-governmental organisation. It has advocated for Filipino street children since 1989. Its goal is for children in poor urban communities, especially those living or working on the street, to have their rights recognised and protected.',
        'Its work is built around the STEP programme (Street Education and Protection). The programme runs in several cities of Metro Manila, including Caloocan, Pasay and Parañaque. In 2026, it was relaunched in Sta. Cruz and expanded to Quiapo, Manila. Street educators meet children where they are. They provide basic education, psychosocial support and day-to-day protection.',
      ],
      secs: [
        {
          h3: 'Mobile services', paras: ['Around this programme, ChildHope has developed several mobile services:'],
          items: [
            'KalyEskwela, a mobile education van offering learning through games, storytelling, multimedia and workshops.',
            'KliniKalye, a mobile clinic providing children with primary health care, consultations and treatment.',
            'KalyEnderia, a mobile soup kitchen. Beyond the meal itself, it is a first point of contact that builds trust and draws children into the other programmes.',
          ],
          after: [
            'ChildHope also supports young people through leadership, advocacy and entrepreneurship projects, so they can make a difference in their communities today.',
            'Alongside S4Gs, ChildHope Philippines brings its field experience with children. In return, it gains visibility and support in Europe.',
          ],
        },
      ],
    },
    {
      id: 'ecpat', name: 'ECPAT Philippines', url: URLS.ecpat, tagline: 'Protecting children from sexual exploitation, online and offline',
      paras: [
        'ECPAT Philippines is part of a global network of organisations working to end the sexual exploitation of children, child sexual abuse material and the trafficking of children for sexual purposes. For three decades, it has worked closely with national and local law enforcement, referring reports and assisting in investigations.',
        'Digital safety is central to its work. In the Philippines, 96% of young people aged 12 to 17 are online, and all of them face the risk of online sexual abuse and exploitation. ECPAT Philippines operates a hotline for reporting child sexual abuse material together with the DICT cybercrime centre. It is a member of the international INHOPE network. In 2024, it also linked its eProtectKids system with the Makabata Helpline of the Council for the Welfare of Children.',
        'ECPAT Philippines actively involves young people in finding solutions.',
        'This is where S4Gs and ECPAT meet. ECPAT brings its expertise in child protection and online safety. S4Gs helps it reach young people where they play, watch and connect: on streaming platforms and in gaming communities.',
      ],
    },
  ],
};

export const missions = (lang: string): Strings => (lang === 'fr' ? fr : en);
