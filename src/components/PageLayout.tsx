import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

// Le fond animé (VitalForceBackground) et la nav du bas vivent maintenant une seule fois au niveau
// App.tsx, en dehors des <Routes> — avant, chaque changement de page démontait/remontait tout ça
// (chaque <Route> instancie un nouveau <PageLayout>), ce qui recalculait le mesh de dégradés, les
// particules et le bruit SVG à CHAQUE navigation et causait les à-coups signalés au changement de
// page. PageLayout ne s'occupe plus que du padding de contenu propre à chaque page.
const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="relative z-10 min-h-screen safe-area-inset bg-transparent">
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
    </div>
  );
};

export default PageLayout;
