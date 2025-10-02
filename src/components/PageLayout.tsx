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
      <main className="pt-20 pb-20 md:pb-4 px-4 md:px-0">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default PageLayout;