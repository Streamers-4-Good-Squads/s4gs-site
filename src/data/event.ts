// Données de l'événement (valeurs du guide technique, version du 25/11/2026).
export const EVENT = {
  name: 'S4GS Mobile Cup 2027',
  games: ['clash-royale', 'brawl-stars'] as const,
  dates: [
    { id: 'open', date: '2026-12-16' },
    { id: 'mini', date: '2026-12-27', end: '2026-12-28' },
    { id: 'q1', date: '2027-01-16', end: '2027-01-17' },
    { id: 'q2', date: '2027-01-23', end: '2027-01-24' },
    { id: 'finals', date: '2027-01-30', end: '2027-01-31' },
  ],
  zones: [
    { id: 'europe', from: '15:00', to: '18:00', hue: 'b' },
    { id: 'americas', from: '18:00', to: '21:00', hue: 'g' },
    { id: 'oceania', from: '09:00', to: '12:00', hue: 'y' },
  ],
} as const;
