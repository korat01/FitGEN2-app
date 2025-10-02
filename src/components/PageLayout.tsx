import React from 'react';
import AppHeader from './AppHeader';
import MobileNavigation from './MobileNavigation';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="pt-14 md:pt-20 pb-20 md:pb-6 px-3 md:px-4 safe-area-px">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default PageLayout;