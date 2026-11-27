// Formulaire de pré-inscription des streamers au Streamathon 2027.
// Tout ce qui change selon le pays se règle ici, sans toucher au formulaire.
//
// 1. onSite : pays où l'on peut participer sur place. Les autres pays participent en ligne,
//    et la question « sur place ou en ligne » ne leur est pas posée.
// 2. questions : questions en plus des champs de base. Pour chacune :
//    - countries : codes pays (ISO, ex. 'BE') où la question est posée. Absent = tous les pays.
//    - mode : 'onsite' (seulement sur place), 'online' (seulement en ligne). Absent = les deux.
//    - required : réponse obligatoire quand la question est affichée.
//    Les réponses arrivent dans le champ « answers » des données envoyées, sous l'identifiant (id).

type L = { fr: string; en: string };
export type StreamQuestion = {
  id: string;
  type: 'radio' | 'checkbox' | 'text' | 'textarea';
  label: L;
  help?: L;
  options?: { value: string; label: L }[];
  required?: boolean;
  countries?: string[];
  mode?: 'onsite' | 'online';
};

export const STREAMATHON = {
  id: 'streamathon-2027',

  // EXEMPLES À CONFIRMER : lieux et pays réels de l'édition 2027.
  onSite: {
    BE: { fr: 'Belgique, lieu à confirmer', en: 'Belgium, venue to be confirmed' },
    PH: { fr: 'Philippines, lieu à confirmer', en: 'Philippines, venue to be confirmed' },
  } as Record<string, L>,

  questions: [
    {
      id: 'room',
      type: 'radio',
      required: true,
      countries: ['BE'],
      mode: 'onsite',
      label: { fr: 'Dans quelle salle préfères-tu streamer ?', en: 'Which room would you rather stream in?' },
      help: { fr: 'Les deux salles fonctionnent en parallèle pendant tout le week-end.', en: 'Both rooms run side by side all weekend.' },
      options: [
        { value: 'calm', label: { fr: 'Salle calme : discussion, créatif, streams posés', en: 'Quiet room: talk, creative, relaxed streams' } },
        { value: 'loud', label: { fr: 'Salle bruyante : jeux, défis, ambiance', en: 'Loud room: games, challenges, hype' } },
        { value: 'any', label: { fr: 'Pas de préférence', en: 'No preference' } },
      ],
    },
    {
      id: 'gear',
      type: 'radio',
      required: true,
      mode: 'onsite',
      label: { fr: 'Tu viens avec ton matériel ?', en: 'Will you bring your own gear?' },
      options: [
        { value: 'all', label: { fr: 'Oui, tout mon matériel', en: 'Yes, all my gear' } },
        { value: 'part', label: { fr: 'En partie', en: 'Some of it' } },
        { value: 'none', label: { fr: 'Non, j’aurai besoin d’un poste', en: 'No, I will need a setup' } },
      ],
    },
    {
      id: 'needs',
      type: 'textarea',
      mode: 'onsite',
      label: { fr: 'Besoins particuliers sur place (facultatif)', en: 'Specific needs on site (optional)' },
      help: { fr: 'Accessibilité, alimentation, horaires… pour qu’on puisse s’organiser.', en: 'Accessibility, food, timing… so we can plan ahead.' },
    },
  ] as StreamQuestion[],
};
