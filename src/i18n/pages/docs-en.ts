import type { DocPage } from './doc-types';
export const docsEn: Record<string, DocPage> = {
mission: {
  title: 'Our mission | Streamers 4 Good Squads', description: 'Streamers 4 Good Squads, a Belgian non-profit, supports street children, underage single young mothers in the Philippines and child victims of abuse worldwide.',
  h1: 'Our mission', lead: 'Streamers 4 Good Squads brings players and streamers together for one cause: protecting children.', cta: 'donate',
  blocks: [
    { h2: 'Who we help', paras: ['Every donation supports the S4GS mission for street children and underage single young mothers in the Philippines, as well as children who are victims of abuse worldwide.'] },
    { h2: 'How we work', paras: ['S4GS is a Belgian non-profit (ASBL). We organise online and in-person events, such as the Streamathon and the Mobile Cup, and pass the funds raised to humanitarian partners.'] },
    { h2: 'Where your donation goes', items: ['70% to humanitarian partners.', '30% to running the association.', 'No tax certificate is issued for donations.'] },
  ] },
privacy: {
  title: 'Privacy | Streamers 4 Good Squads', description: 'Privacy and cookie policy of Streamers 4 Good Squads.', noindex: true,
  h1: 'Privacy and cookies', lead: 'Working version to be validated before publication. Items in square brackets are to be completed.',
  blocks: [
    { h2: 'Who is responsible for your data', paras: ['Streamers 4 Good Squads, a non-profit association under Belgian law (ASBL). Registered office: 69 avenue de la Grotte, 4130 Liège, Belgium. Contact: tournoi@s4gs.org.'] },
    { h2: 'Data we collect', items: ['Nickname, game ID, Discord nickname.', 'Email address, country and language.', 'Chosen game, division and team.', 'Age bracket and, for ages 13 to 17, the email of a parent or legal guardian.', 'Your consents (rules, privacy, optional newsletter).'] },
    { h2: 'Why and on what basis', items: ['Running the tournament and sending you confirmation and reminders: your consent at pre-registration.', 'Obtaining parental consent for minors: the parent or guardian’s consent.', 'Sending the newsletter: your separate, optional consent.', 'Measuring site audience: your consent through the cookie banner.'] },
    { h2: 'Who receives this data', paras: ['Only the tools needed to run the event: [registration form tool, to be completed], Microsoft 365 and SharePoint for management, Discord for communication, and Streamlabs Charity for donations. Payments are made on their pages: S4GS does not see them and collects no banking data.'] },
    { h2: 'How long we keep it', paras: ['[Duration to be set.] Minors’ data and parental consents are deleted as soon as they are no longer needed after the event.'] },
    { h2: 'Your rights', paras: ['You can ask for access to your data, correction, deletion, and withdraw your consent at any time by writing to tournoi@s4gs.org. You may also lodge a complaint with the Belgian Data Protection Authority (autoriteprotectiondonnees.be).'] },
    { h2: 'Cookies', paras: ['The site only uses audience-measurement cookies with your consent. You can change your mind at any time using the “Manage cookies” link at the bottom of the page. [Cookie management tool to be completed.]'] },
  ] },
prizes: {
  title: 'Prizes | S4GS Mobile Cup 2027', description: 'Prizes of the S4GS Mobile Cup 2027, identical in every zone.', noindex: true,
  h1: 'Prizes', lead: 'Working version, pending the association’s choice of option. Rewards are the same in all three zones.',
  blocks: [
    { h2: 'Common rules', items: ['Same value everywhere, in local currency.', 'Brawl Stars trios: the value shown is per person.', 'Minors: prizes are sent through a parent.', 'No cash, unless a sponsor funds it, with written parental consent for minors.', 'The prize pool is published before registration opens, then updated with each new sponsor.'] },
    { h2: 'Base rewards', table: { head: ['Who', 'Reward'], rows: [['Podium of each bracket', 'Zone champion title, digital trophy, feature on air and on S4GS social media, place in the website Hall of Fame'], ['1st place in each Open division', 'Coaching session with a partner content creator, priority registration for the next edition'], ['Top 16 of each bracket', 'Exclusive Stream-E wallpaper and digital badge, special Discord role'], ['Best play (audience vote)', 'Clip broadcast on all S4GS channels with a credit to the player'], ['Free draw among registrants', 'Guest commentator slot on a final'], ['Fundraising: milestones of 1, 3, 10 and 25 donors', 'Discord role, badge and mention on the website, Stream-E wallpaper and digital certificate, on-air thanks'], ['Fundraising: top 3 in each zone', 'Session with a content creator, digital trophy, on-air feature'], ['Continents Cup', 'Show match broadcast in honour of the winning continent, special Stream-E visual in its colours']] }, paras: ['Digital gift cards and hardware may be added depending on the sponsors found. The fundraising ranking is separate from the sporting ranking: donations fund the mission, never the prizes.'] },
  ] },
cookies: {
  title: 'Cookies | Streamers 4 Good Squads', description: 'The cookies used by the Streamers 4 Good Squads website and how to manage them.', noindex: true,
  h1: 'Cookies', lead: 'Working version to be validated before publication. The site only uses measurement cookies with your consent.',
  blocks: [
    { h2: 'What the site stores without your consent', items: ['Your light or dark theme choice, kept in your browser. It does not leave your device.', 'Your cookie choice, once made.'] },
    { h2: 'What requires your consent', items: ['Audience measurement (Google Analytics): page views, where visits come from, registrations. It helps us know which actions bring in players.', 'No advertising cookie is set before your consent.'] },
    { h2: 'External services', paras: ['Donations are made on Streamlabs Charity pages, and conversations take place on Discord. These services have their own rules: read their policies before using them.'] },
    { h2: 'Changing your mind', paras: ['[Cookie management button to be connected once the tool is chosen.] You can also delete cookies from your browser settings.'] },
  ] },
'football-cup': {
  title: 'Mobile Football Cup 2027 | S4GS', description: 'The S4GS mobile football tournament, in March 2027.', noindex: true,
  h1: 'Mobile Football Cup 2027', lead: 'Working version: this page will be published after the January tournament closes.',
  blocks: [
    { h2: 'Dates', table: { head: ['Stage', 'Dates'], rows: [['Qualifiers, first weekend', '6 and 7 March 2027'], ['Qualifiers, second weekend', '13 and 14 March 2027'], ['Finals', '20 and 21 March 2027']] } },
    { h2: 'How it is played', paras: ['Friendly match between two designated players, with fixed settings (length, difficulty, allowed teams). They will be published in the rules after the chosen game has been tested.'] },
    { h2: 'Three zones, like in January', paras: ['Times per zone (Europe, Americas, Oceania) will be confirmed with the rules. Free to enter, donations are optional and support the S4GS mission.'] },
  ] },
rules: {
  title: 'Rules | S4GS Mobile Cup 2027', description: 'Rules of the S4GS Mobile Cup 2027: registration, match flow, scores, disconnections, disputes and penalties.',
  h1: 'Rules', lead: 'Working version, to be validated before registrations open. It applies to the Clash Royale and Brawl Stars tournaments of January 2027.', cta: 'register',
  blocks: [
    { h2: 'Taking part', items: ['Participation is free.', 'Minimum age: 13. Between 13 and 17, a parent or legal guardian’s consent is required.', 'One game account per person: lending accounts is forbidden.', 'Matches may be streamed: registering means you agree to image rights for these broadcasts.'] },
    { h2: 'Formats', table: { head: ['Bracket', 'Phase 1', 'Final phase'], rows: [['Clash Royale Open', 'Swiss rounds, 5 rounds, first to 2 games', 'Top 16 knockout, final first to 3 games'], ['Clash Royale Discovery', 'Swiss rounds, 5 rounds, first to 2 games', 'Top 16 knockout'], ['Brawl Stars Open (trios)', 'Swiss rounds, 5 rounds, first to 2 games', 'Top 16 knockout, final first to 3 games'], ['Brawl Stars Discovery (trios)', 'Swiss rounds, 5 rounds, first to 2 games', 'Top 16 knockout'], ['Mixed or women’s cup', 'Depends on registrations', 'Top 8 knockout']] }, paras: ['The number of Swiss rounds adjusts to the number of registrations.'] },
    { h2: 'How a match runs', items: ['Check in on the platform: opens 30 minutes before the start, closes 10 minutes before.', 'The platform shows your opponent, their Discord nickname and their game ID.', 'Contact them on Discord, then invite them in the game.', 'Play the whole match.', 'Take a screenshot at the end of every game.', 'Both sides report the score on the platform, with screenshots attached.', 'If there is a problem, open a referee ticket on Discord without waiting for the end of the match.'] },
    { h2: 'Delays and disconnections', items: ['After 10 minutes of absence, the game is lost.', 'Disconnection within the first minute, before any decisive advantage: the game is replayed.', 'After that, the referee decides from the screenshots.', 'Two deliberate or repeated disconnections in a match: game lost.', 'Latency is not grounds for a dispute for a game played in your own zone.'] },
    { h2: 'Disputes', items: ['Open a ticket on Discord with screenshots or a screen recording.', 'The referee decides within 10 minutes.', 'You may appeal to the tournament direction, whose decision is final.'] },
    { h2: 'Penalties', table: { head: ['Offence', 'Penalty'], rows: [['More than 10 minutes late', 'Game lost, then match lost'], ['False score reported', 'Warning, then match lost'], ['Toxic behaviour, insults', 'Warning, then exclusion'], ['Account lending, emulator, third-party software', 'Immediate exclusion'], ['Result fixing', 'Immediate exclusion of both sides'], ['Inappropriate contact with a minor', 'Immediate exclusion and report']] } },
  ] },
faq: {
  title: 'FAQ | S4GS Mobile Cup 2027', description: 'Frequently asked questions about the S4GS Mobile Cup 2027: minimum age, parental consent, match flow, donations.', h1: 'Frequently asked questions', lead: 'Got a question? You will probably find the answer here.',
  blocks: [{ h2: 'The tournament', qa: [
    { q: 'Is it really free?', a: 'Yes, registration is free. A €5 donation is only suggested, never required.' },
    { q: 'How old do I need to be?', a: 'At least 13. Between 13 and 17, a parent or legal guardian’s consent is requested by email.' },
    { q: 'How does a match work?', a: 'You check in, meet your opponent on Discord, play, then report the score with a screenshot. The details are in the rules.' },
    { q: 'What time do I play?', a: 'Matches are grouped by zone: Europe 3 pm to 6 pm, Americas 6 pm to 9 pm, Oceania 9 am to 12 pm, Brussels time.' },
  ] }, { h2: 'Donations', qa: [
    { q: 'What are donations used for?', a: 'They support street children and underage young mothers in the Philippines, as well as child victims of abuse worldwide. 70% goes to humanitarian partners, 30% to running the association.' },
    { q: 'Can I get a tax certificate?', a: 'No, no tax certificate is issued.' },
    { q: 'I am a minor, do I have to donate myself?', a: 'No. You can share the donation page with your family using the button provided.' },
  ] }],
},
};
