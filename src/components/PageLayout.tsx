import React from 'react';
import MobileNavigation from './MobileNavigation';
import { VitalForceBackground } from './VitalForceBackground';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative safe-area-inset bg-transparent">
      <VitalForceBackground intensity="medium" />
      <div className="relative z-10">
        {/* padding-top/bottom en dur (pas juste .safe-area-inset sur le wrapper parent) : sur
            iPhone avec status bar "black-translucent" (contenu sous la barre de statut), on a vu
            du texte chevaucher l'heure/le réseau malgré le padding parent — max() garde une marge
            minimum même si env() ne remonte pas la vraie valeur dans ce contexte.
            padding-bottom : doit couvrir la vraie hauteur de MobileNavigation (variable selon
            l'encoche/barre home), sous peine de contenu caché derrière la nav. */}
        <main
          className="px-4 md:px-6 bg-transparent"
          style={{
            paddingTop: 'max(1rem, calc(0.75rem + env(safe-area-inset-top)))',
            paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))',
          }}
        >
          {children}
        </main>
        <MobileNavigation />
      </div>
    </div>
  );
};

export default PageLayout;
