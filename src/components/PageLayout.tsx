import React from 'react';
import AppHeader from './AppHeader';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default PageLayout; 