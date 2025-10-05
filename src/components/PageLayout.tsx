import React from 'react';
import AppHeader from './AppHeader';
import MobileNavigation from './MobileNavigation';
import { useMobileDetection } from '../hooks/useMobileDetection';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { isMobile } = useMobileDetection();

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      <AppHeader />
      <main className={`pt-16 md:pt-20 pb-24 md:pb-6 px-4 md:px-6 ${isMobile ? 'pb-safe-bottom' : ''}`}>
        {children}
      </main>
      {isMobile && <MobileNavigation />}
    </div>
  );
};

export default PageLayout;