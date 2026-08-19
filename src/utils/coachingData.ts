import type { CoachedClient, AssignedProgram, MealLogEntry } from '@/types/coaching';

const STORAGE_KEY = 'coachClients';

// Coachés de démo — sert à concevoir/valider tout le parcours coach (liste, fiche coaché, envoi de
// repas, programme) avant de brancher un vrai backend. Rien ici n'est connecté à un vrai téléphone.
const DEMO_CLIENTS: CoachedClient[] = [
  {
    id: 'demo-1',
    name: 'Lucas Martin',
    avatarEmoji: '🏋️',
    sportClass: 'power',
    rank: 'C',
    stepsToday: 4210,
    stepsGoal: 8000,
    lastActivityLabel: 'il y a 12 min',
    meals: [
      { id: 'm1', nom: 'Porridge avoine, banane et amandes', emoji: '🥣', heure: '07:45', calories: 380 },
      { id: 'm2', nom: 'Poulet, riz et brocoli renforcé', emoji: '💪', heure: '12:30', calories: 650 },
    ],
    program: {},
  },
  {
    id: 'demo-2',
    name: 'Sarah Dubois',
    avatarEmoji: '🏃',
    sportClass: 'marathon',
    rank: 'B',
    stepsToday: 9840,
    stepsGoal: 12000,
    lastActivityLabel: 'il y a 3 min',
    meals: [
      { id: 'm3', nom: 'Smoothie protéiné', emoji: '🥤', heure: '06:50', calories: 320 },
      { id: 'm4', nom: 'Thon, pâtes complètes et tomate', emoji: '🍝', heure: '12:15', calories: 480 },
      { id: 'm5', nom: 'Fromage blanc, kiwi et amandes', emoji: '🥝', heure: '16:40', calories: 260 },
    ],
    program: {},
  },
  {
    id: 'demo-3',
    name: 'Yanis Belkacem',
    avatarEmoji: '🤸',
    sportClass: 'calisthenics',
    rank: 'D',
    stepsToday: 1560,
    stepsGoal: 8000,
    lastActivityLabel: 'il y a 2 h',
    meals: [
      { id: 'm6', nom: 'Œufs brouillés à l\'avocat', emoji: '🍳', heure: '09:10', calories: 420 },
    ],
    program: {},
  },
];

export const loadCoachClients = (): CoachedClient[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore, retombe sur le seed
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_CLIENTS));
  return DEMO_CLIENTS;
};

const saveCoachClients = (clients: CoachedClient[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
};

export const getCoachClient = (id: string): CoachedClient | undefined =>
  loadCoachClients().find((c) => c.id === id);

export const updateCoachClient = (id: string, updater: (client: CoachedClient) => CoachedClient): CoachedClient | undefined => {
  const clients = loadCoachClients();
  let updated: CoachedClient | undefined;
  const next = clients.map((c) => {
    if (c.id !== id) return c;
    updated = updater(c);
    return updated;
  });
  saveCoachClients(next);
  return updated;
};

export const addCoachClient = (client: Omit<CoachedClient, 'id' | 'meals' | 'program'>): CoachedClient => {
  const newClient: CoachedClient = {
    ...client,
    id: `client-${Date.now()}`,
    meals: [],
    program: {},
  };
  const clients = loadCoachClients();
  saveCoachClients([...clients, newClient]);
  return newClient;
};

export const removeCoachClient = (clientId: string) => {
  saveCoachClients(loadCoachClients().filter((c) => c.id !== clientId));
};

export const sendMealToClient = (clientId: string, meal: Omit<MealLogEntry, 'id' | 'envoyeParCoach'>) =>
  updateCoachClient(clientId, (client) => ({
    ...client,
    meals: [
      ...client.meals,
      { ...meal, id: `sent-${Date.now()}`, envoyeParCoach: true },
    ],
  }));

export const assignProgramToClient = (clientId: string, program: AssignedProgram) =>
  updateCoachClient(clientId, (client) => ({ ...client, program }));
