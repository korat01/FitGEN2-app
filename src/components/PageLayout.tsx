import React from 'react';
import AppHeader from '@/components/AppHeader';
import BottomNavigation from '@/components/BottomNavigation';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <main className={`pt-20 pb-20 md:pb-0 ${className}`}>
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default PageLayout; 