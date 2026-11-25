import type { CupPage, ThanksPage } from './types';
export const cupEn: CupPage = {
  title: 'S4GS Mobile Cup 2027: free Clash Royale and Brawl Stars tournament',
  description: 'A free online tournament for Clash Royale and Brawl Stars, 16 to 31 January 2027, supporting street children and underage young mothers. Pre-register now.',
  hero: { kicker: 'Streamers 4 Good Squads presents', h1: 'S4GS Mobile Cup 2027', lead: 'Clash Royale and Brawl Stars, three time zones, one goal: playing together for children.', free: 'Free to enter' },
  dates: { h2: 'Key dates', items: { open: 'Registrations and Discord open', mini: 'Mini cup to practise', q1: 'First qualifier weekend', q2: 'Second qualifier weekend', finals: 'Finals' } },
  games: { h2: 'Two games, two divisions', intro: 'Each game has its own bracket in every zone.', crText: 'Real-time duels, Swiss rounds then a knockout bracket.', bsText: 'Matches in teams of three or solo, depending on the division.', open: 'Open', openText: 'For those aiming for the top of the ranking.', discovery: 'Discovery', discoveryText: 'To discover competition in a relaxed atmosphere.', mixed: 'A mixed or women’s cup runs in parallel.' },
  zones: { h2: 'Three zones, schedules for everyone', intro: 'So nobody plays with lag, matches are grouped by zone. Times shown in Brussels time.', names: { europe: 'Europe', americas: 'Americas', oceania: 'Oceania' }, tz: 'Brussels time' },
  format: { h2: 'How it works', items: ['Five Swiss rounds for everyone.', 'The top 16 of each bracket move on to a knockout stage.', 'Matches are refereed and followed on Discord.', 'Players aged 13 to 17 take part with a parent’s consent.'] },
  register: { h2: 'Pre-registration', text: 'Fill in the form in two minutes. You will get a confirmation email, then reminders before each match.', soon: 'Registrations open on 16 December. Come back, the button will activate.', counter: 'people already registered', ages: 'Under 13: registration is not possible. Ages 13 to 17: a parent’s email is required.' },
  donate: { h2: 'Every donation counts', text: 'The tournament is free. If you can, a €5 donation supports street children and underage young mothers in the Philippines, as well as children who are victims of abuse worldwide.', cta: 'Donate', use: '70% of donations go to humanitarian partners, 30% to running the association.' },
};
export const thanksEn: ThanksPage = {
  title: 'Thank you! Your pre-registration is saved', h1: 'Thank you, you are in!', lead: 'A confirmation email will arrive in a few minutes. Remember to check your spam folder.',
  next: ['Join the Discord when it opens on 16 December.', 'Have your nickname and player tag ready.', 'Tell your friends and family about the tournament.'],
  donate: { h2: 'Want to give a little boost?', text: 'A donation, even a small one, directly helps the children S4GS supports.', cta: 'Donate', minors: 'Under 18? No need to pay yourself: share the page with your family.', share: 'Share with my family', shareText: 'I am playing in the S4GS Mobile Cup 2027, a tournament for children. You can support us here:' },
};
