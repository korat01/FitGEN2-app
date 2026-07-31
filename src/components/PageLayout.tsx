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
        <main className="pt-4 md:pt-6 pb-20 px-4 md:px-6 bg-transparent">
          {children}
        </main>
        <MobileNavigation />
      </div>
    </div>
  );
};

export default PageLayout;
