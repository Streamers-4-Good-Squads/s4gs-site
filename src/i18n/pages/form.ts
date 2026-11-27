import type { FormStrings } from './form-types';
export const formFr: FormStrings = {
  h3: { player: 'Toi', event: 'Ton tournoi', age: 'Ton âge', consents: 'Pour finir' },
  nickname: 'Pseudo', tag: 'Identifiant de joueur', tagHelp: 'Il commence par #, par exemple #ABC123', discord: 'Pseudo Discord', email: 'Adresse e-mail', email2: 'Confirme ton adresse e-mail', emailHelp: 'Tu y recevras ta confirmation et les rappels.',
  country: 'Pays', choose: 'Choisir', zone: 'Zone de jeu', zoneHelp: 'Choisie d’après ton pays, modifiable. Horaires en heure de Bruxelles.', language: 'Langue des e-mails',
  games: 'Jeux', division: 'Division', open: 'Open', discovery: 'Découverte', mixed: 'Je m’inscris aussi à la coupe mixte ou féminine',
  bsMode: 'Brawl Stars : comment joues-tu ?', solo: 'En solo (une équipe te sera proposée sur Discord)', team: 'En équipe de trois', teamName: 'Nom de l’équipe', teammates: 'Identifiants de joueur de tes deux coéquipières ou coéquipiers', teammatesHelp: 'Chaque membre de l’équipe remplit aussi ce formulaire.',
  weekend: 'Week-end de qualifications', q1: '16 et 17 janvier', q2: '23 et 24 janvier', either: 'Les deux me conviennent',
  age: 'Tranche d’âge', under13: 'Moins de 13 ans', a1315: '13 à 15 ans', a1617: '16 à 17 ans', a18: '18 ans ou plus', parentEmail: 'Adresse e-mail d’un parent ou tuteur légal', parentHelp: 'Nous lui écrirons pour demander son accord. Sans accord avant le check-in, la participation n’est pas possible.',
  rules: 'J’ai lu et j’accepte le règlement et le code de conduite', privacy: 'J’ai lu la politique de confidentialité et j’accepte que mes données soient utilisées pour le tournoi', image: 'J’accepte que mon pseudo et mes matchs puissent être montrés pendant les diffusions du tournoi', newsletter: 'Je veux recevoir la newsletter de S4GS (facultatif)',
  submit: 'Je me pré-inscris', sending: 'Envoi en cours...', testBanner: 'Mode test : aucune donnée n’est envoyée pour le moment.',
  err: { parent: 'L’e-mail du parent doit être différent du tien.', email: 'Les deux adresses e-mail ne sont pas identiques.', tag: 'L’identifiant doit commencer par # (lettres et chiffres).', under13: 'Désolé, l’inscription est réservée aux personnes de 13 ans ou plus.', game: 'Choisis au moins un jeu.', network: 'L’envoi a échoué. Réessaie, ou écris-nous à tournoi@s4gs.org.', team: 'Le nom de l’équipe doit faire de 3 à 25 caractères.', mates: 'Indique les identifiants de tes deux coéquipières ou coéquipiers (commençant par #), différents du tien.' },
  rulesLink: 'Règlement', privacyLink: 'Confidentialité',
};
export const formEn: FormStrings = {
  h3: { player: 'You', event: 'Your tournament', age: 'Your age', consents: 'To finish' },
  nickname: 'Nickname', tag: 'Player tag', tagHelp: 'It starts with #, for example #ABC123', discord: 'Discord nickname', email: 'Email address', email2: 'Confirm your email address', emailHelp: 'You will get your confirmation and reminders here.',
  country: 'Country', choose: 'Choose', zone: 'Play zone', zoneHelp: 'Picked from your country, you can change it. Times are Brussels time.', language: 'Email language',
  games: 'Games', division: 'Division', open: 'Open', discovery: 'Discovery', mixed: 'I also register for the mixed or women’s cup',
  bsMode: 'Brawl Stars: how do you play?', solo: 'Solo (we will find you a team on Discord)', team: 'With a team of three', teamName: 'Team name', teammates: 'Player tags of your two teammates', teammatesHelp: 'Each team member also fills in this form.',
  weekend: 'Qualifier weekend', q1: '16 and 17 January', q2: '23 and 24 January', either: 'Both suit me',
  age: 'Age bracket', under13: 'Under 13', a1315: '13 to 15', a1617: '16 to 17', a18: '18 or older', parentEmail: 'Email of a parent or legal guardian', parentHelp: 'We will write to ask for their consent. Without consent before check-in, taking part is not possible.',
  rules: 'I have read and accept the rules and the code of conduct', privacy: 'I have read the privacy policy and agree to my data being used for the tournament', image: 'I agree that my nickname and my matches may be shown during tournament broadcasts', newsletter: 'I want to receive the S4GS newsletter (optional)',
  submit: 'Pre-register', sending: 'Sending...', testBanner: 'Test mode: no data is sent for now.',
  err: { parent: 'The parent’s email must be different from yours.', email: 'The two email addresses do not match.', tag: 'The tag must start with # (letters and digits).', under13: 'Sorry, registration is for people aged 13 or older.', game: 'Choose at least one game.', network: 'Sending failed. Try again, or write to us at tournoi@s4gs.org.', team: 'The team name must be 3 to 25 characters long.', mates: 'Enter the player tags of your two teammates (starting with #), different from yours.' },
  rulesLink: 'Rules', privacyLink: 'Privacy',
};
