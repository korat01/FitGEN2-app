import React from 'react';
import { AppThemeProvider } from './components/AppThemeProvider';
import ProgramGenerator from './components/ProgramGenerator';
import ThemeDemo from './components/ThemeDemo';

// Exemple d'utilisation du système de design
const App: React.FC = () => {
  const selectedDays = ['Lundi', 'Mercredi', 'Vendredi'];
  
  const handleProgramsGenerated = (programs: any[]) => {
    console.log('Programmes générés:', programs);
  };

  return (
    <AppThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            🎨 Système de Design FitGEN
          </h1>
          
          {/* Démonstration du système de thème */}
          <ThemeDemo />
          
          {/* Composant ProgramGenerator avec le nouveau système */}
          <ProgramGenerator 
            selectedDays={selectedDays}
            onProgramsGenerated={handleProgramsGenerated}
          />
        </div>
      </div>
    </AppThemeProvider>
  );
};

export default App;
