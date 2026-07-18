import React from 'react';

interface MacroStatsGridProps {
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
}

// Grille 2x2 Calories/Protéines/Glucides/Lipides — utilisée identiquement sur les cartes aliment et repas.
export const MacroStatsGrid: React.FC<MacroStatsGridProps> = ({ calories, proteines, glucides, lipides }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="text-center p-3 surface-panel-sm">
      <div className="text-2xl font-bold text-foreground">{calories}</div>
      <div className="text-sm text-muted-foreground">Calories</div>
    </div>
    <div className="text-center p-3 surface-panel-sm">
      <div className="text-2xl font-bold text-foreground">{proteines}g</div>
      <div className="text-sm text-muted-foreground">Protéines</div>
    </div>
    <div className="text-center p-3 surface-panel-sm">
      <div className="text-2xl font-bold text-foreground">{glucides}g</div>
      <div className="text-sm text-muted-foreground">Glucides</div>
    </div>
    <div className="text-center p-3 surface-panel-sm">
      <div className="text-2xl font-bold text-foreground">{lipides}g</div>
      <div className="text-sm text-muted-foreground">Lipides</div>
    </div>
  </div>
);

export default MacroStatsGrid;
