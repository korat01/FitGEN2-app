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
      <main className="pt-16 pb-24 md:pt-20 md:pb-4 px-4 md:px-6 max-w-7xl mx-auto">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default PageLayout;