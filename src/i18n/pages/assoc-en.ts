import type { AssocStrings } from './assoc-types';
export const assocEn: AssocStrings = {
  home: {
    kick: 'Streamers 4 Good Squads', h1: 'Gaming. Streaming. Solidarity.',
    lead: 'Since 2024, S4Gs has brought together streamers from around the world to support humanitarian causes, with events throughout the year.',
    join: 'Join the community', give: 'Donate', cupBtn: 'Pre-register for the Mobile Cup',
    assoc: { kick: 'The association', h2: 'One community, several missions', lead: 'Gaming and streaming for solidarity, all year long.', more: 'Discover the association' },
    missions: [
      { h3: 'Raise funds', text: 'Run fundraising events, online and in person, to support carefully chosen humanitarian partners.' },
      { h3: 'Bring people together', text: 'Connect streamers, players and partners around shared projects all year.' },
      { h3: 'Raise awareness', text: 'Share the causes we back and the positive power of video games.' },
    ],
    stats: { kick: 'In numbers', h2: 'Our impact', items: [{ v: '0', l: 'euros raised (example)' }, { v: '0', l: 'streamers involved (example)' }, { v: '0', l: 'countries represented (example)' }, { v: '0', l: 'editions held (example)' }] },
    events: { kick: 'Agenda', h2: 'Our events', all: 'All events' },
    news: { kick: 'Lately', h2: 'News', all: 'All news' },
    partners: { h2: 'Our partners', all: 'See our partners' },
  },
  association: {
    head: { title: 'The association | Streamers 4 Good Squads', description: 'Streamers 4 Good Squads is a Belgian non-profit that uses streaming and video games to support humanitarian action.', kick: 'Who we are', h1: 'An association driven by a community', lead: 'Streamers 4 Good Squads (S4Gs) is a Belgian non-profit that uses streaming to support humanitarian action.' },
    story: { h2: 'What we do', paras: ['Since 2024, S4Gs has used streaming and video games to bring an international community together around humanitarian causes, with major events such as the Streamathon and the Mobile Cup, and actions all year long.', 'Streamers, players, artists and volunteers from several countries give their time and their visibility. The donations collected are passed on to humanitarian partners.'] },
    missions: { h2: 'Our missions', intro: 'Three commitments guide everything we do.' },
    partner: {
      tag: 'Humanitarian partner', h3: 'Aid for Youth Philippines',
      text: 'For the 2026 edition of the Streamathon, donations supported Aid for Youth Philippines, which looks after children in great vulnerability.',
      points: [{ h3: 'Food', text: 'Regular meals for the children in their care.' }, { h3: 'Housing, care, education', text: 'Support that gradually extends to a stable home, medical care and school.' }],
      cta: 'Support this work',
    },
    transparency: { h2: 'Transparency', text: 'Activity reports after each edition and the association’s accounts, available on the dedicated page.', cta: 'See the documents' },
    mission: { text: 'Who we help, how we work and where each donation goes: the details of our mission.', cta: 'Read our mission' },
  },
  events: {
    head: { title: 'Events | Streamers 4 Good Squads', description: 'The S4Gs Mobile Cup 2027, the Streamathon and S4Gs events: dates, rules and archive of past editions.', kick: 'Agenda', h1: 'Our events', lead: 'The Mobile Cup, the Streamathon and events through the year, with the archive of past editions.' },
    cup: { tag: '16 December 2026 to 31 January 2027', h3: 'S4Gs Mobile Cup 2027', text: 'A free online tournament on Clash Royale and Brawl Stars, open to players in Europe, the Americas and Oceania. Pre-registration opens on 16 December.', cta: 'See the tournament and pre-register', rules: 'Read the rules', faq: 'FAQ' },
    stream: { tag: 'Every year', h3: 'Streamathon', text: 'A 48-hour live-stream weekend where streamers and the community rally for the cause. The latest edition took place from 20 to 22 November 2026, in Namur at Pixiels’ premises, in Manila at CIIT College and online.' },
    calendar: {
      kick: 'Calendar', h2: 'Upcoming and archive', upcoming: 'Upcoming', past: 'Archive',
      items: [
        { iso: '2026-12-16', end: '2027-01-31', t: 'S4Gs Mobile Cup 2027', p: 'Free online mobile tournament: Clash Royale and Brawl Stars.', link: 'mobile-cup' },
        { label: 'April 2027', t: 'S4Gs Streamathon 2027', p: 'Exact weekend and venue to be confirmed.' },
        { iso: '2026-11-20', end: '2026-11-22', t: 'S4Gs Streamathon 2026', p: 'A 48-hour stream weekend, in Namur at Pixiels’ premises, in Manila at CIIT College and online, for Aid for Youth Philippines.', past: true },
      ],
    },
  },
  news: {
    head: { title: 'News | Streamers 4 Good Squads', description: 'News from Streamers 4 Good Squads.', kick: 'Lately', h1: 'News', lead: 'News from the association, our events and the community.' },
    sample: 'Example',
    posts: [
      { date: '2026-12-01', t: 'News headline, example 1', p: 'Two lines of summary to make people want to read the article.' },
      { date: '2026-12-08', t: 'News headline, example 2', p: 'Two lines of summary to make people want to read the article.' },
      { date: '2026-12-16', t: 'News headline, example 3', p: 'Two lines of summary to make people want to read the article.' },
    ],
  },
  streamers: {
    head: { title: 'Streamers | Streamers 4 Good Squads', description: 'The streamers, artists and creators who make S4Gs happen.', kick: 'Community', h1: 'Our streamers', lead: 'More than 100 streamers, artists and creators from several continents bring our events to life.' },
    sample: 'Example',
    follow: { h2: 'Follow them on our social media', text: 'Our streamers are featured and shared on our social media, with their live streams during each event. Follow us so you never miss a thing.' },
    join: { h2: 'Become a streamer', text: 'Take turns streaming during our events, on site or remotely. Pre-register for the Streamathon 2027.', cta: 'Streamer pre-registration', subject: 'I would like to become a streamer' },
    roles: ['Streamer', 'Cosplayer', 'Creator'],
    items: [{ n: 'Handle 1', role: 'Streamer', region: 'Europe' }, { n: 'Handle 2', role: 'Cosplayer', region: 'Asia' }, { n: 'Handle 3', role: 'Creator', region: 'Americas' }, { n: 'Handle 4', role: 'Streamer', region: 'Europe' }],
  },
  partners: {
    head: { title: 'Partners | Streamers 4 Good Squads', description: 'The organisations S4Gs works with for children.', kick: 'Partners', h1: 'Together for a shared cause', lead: 'Some partners stand by S4Gs all year round, others support a specific event. Thank you to all of them.' },
    sample: 'Example',
    groups: [
      { h2: 'Institutional partners', names: ['Example partner 1', 'Example partner 2'] },
      { h2: 'Community partners', names: ['Example partner 3', 'Example partner 4', 'Example partner 5'] },
      { h2: 'Media partners', names: ['Example partner 6', 'Example partner 7'] },
    ],
    join: { h2: 'Become a partner', text: 'Visibility with an engaged community, presence on our materials, a link to humanitarian activities.', cta: 'Write to us', subject: 'Partnership with S4Gs' },
  },
  contact: {
    head: { title: 'Contact | Streamers 4 Good Squads', description: 'Contact Streamers 4 Good Squads: questions, partnerships, press, taking part.', kick: 'Get in touch', h1: 'Contact', lead: 'A question, an idea, a wish to take part? Here is how to reach us.' },
    cards: [
      { h3: 'By e-mail', text: 'For any general question, or about the Mobile Cup.', cta: 'Write to the team', subject: 'Question about S4Gs' },
      { h3: 'On Discord', text: 'Join the community, ask your questions and follow the announcements.', cta: 'Join the Discord', href: 'discord' },
      { h3: 'Partnerships', text: 'Companies, organisations and media who would like to join our actions.', cta: 'Propose a partnership', subject: 'Partnership with S4Gs' },
      { h3: 'Become a streamer', text: 'Would you like to stream for the cause during our events?', cta: 'Write to us', subject: 'I would like to become a streamer' },
    ],
    address: 'Registered office',
  },
  transparency: {
    head: { title: 'Transparency | Streamers 4 Good Squads', description: 'Activity reports and governance documents of Streamers 4 Good Squads.', kick: 'Governance', h1: 'Transparency', lead: 'Follow-up reports after each edition and documents of the association.' },
    sample: 'Example',
    docs: [{ t: 'Activity report 2026', p: 'Document to be added' }, { t: 'Articles of association', p: 'Document to be added' }, { t: 'Annual accounts', p: 'Document to be added' }],
    note: 'Documents will be published here once approved by the board.',
  },
};
