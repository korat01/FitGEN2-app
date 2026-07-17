import React from 'react';
import AppHeader from './AppHeader';
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
        <AppHeader />
        <main className="pt-16 md:pt-20 pb-20 md:pb-6 px-4 md:px-6 bg-transparent">
          {children}
        </main>
        <MobileNavigation />
      </div>
    </div>
  );
};

export default PageLayout;
