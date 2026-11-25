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
    { h2: 'Who is responsible for your data', paras: ['Streamers 4 Good Squads, a non-profit association under Belgian law (ASBL). Registered office: [address to be completed]. Contact: tournoi@s4gs.org.'] },
    { h2: 'Data we collect', items: ['Nickname, game ID, Discord nickname.', 'Email address, country and language.', 'Chosen game, division and team.', 'Age bracket and, for ages 13 to 17, the email of a parent or legal guardian.', 'Your consents (rules, privacy, optional newsletter).'] },
    { h2: 'Why and on what basis', items: ['Running the tournament and sending you confirmation and reminders: your consent at pre-registration.', 'Obtaining parental consent for minors: the parent or guardian’s consent.', 'Sending the newsletter: your separate, optional consent.', 'Measuring site audience: your consent through the cookie banner.'] },
    { h2: 'Who receives this data', paras: ['Only the tools needed to run the event: [registration form tool, to be completed], Microsoft 365 and SharePoint for management, Discord for communication, and Streamlabs Charity for donations. Payments are made on their pages: S4GS does not see them and collects no banking data.'] },
    { h2: 'How long we keep it', paras: ['[Duration to be set.] Minors’ data and parental consents are deleted as soon as they are no longer needed after the event.'] },
    { h2: 'Your rights', paras: ['You can ask for access to your data, correction, deletion, and withdraw your consent at any time by writing to tournoi@s4gs.org. You may also lodge a complaint with the Belgian Data Protection Authority (autoriteprotectiondonnees.be).'] },
    { h2: 'Cookies', paras: ['The site only uses audience-measurement cookies with your consent. You can change your mind at any time using the “Manage cookies” link at the bottom of the page. [Cookie management tool to be completed.]'] },
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
