import { useAuth } from '@/contexts/AuthContext';

// Petit helper partagé pour savoir si l'utilisateur est dans un rang "Hunter" (S/Nation/World —
// voir .hunter-mode dans index.css et le toggle dans App.tsx) et récupérer directement la classe
// à ajouter aux cartes qui doivent afficher les coins "fenêtre System" (.hunter-panel).
export function useHunterMode() {
  const { user } = useAuth();
  const rank = user?.rank;
  const isHunterRank = rank === 'S' || rank === 'Nation' || rank === 'World';
  return { isHunterRank, hunterPanelClass: isHunterRank ? 'hunter-panel' : '' };
}
