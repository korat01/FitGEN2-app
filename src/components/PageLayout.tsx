import React from 'react';
import AppHeader from './AppHeader';
import MobileNavigation from './MobileNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <AppHeader />
      <main className={cn(
        "transition-all duration-300",
        isMobile ? "pt-20 pb-20" : "pt-20"
      )}>
        <div className={cn(
          "animate-fade-in",
          isMobile ? "px-4" : "container mx-auto px-6"
        )}>
          {children}
        </div>
      </main>
      {isMobile && <MobileNavigation />}
    </div>
  );
};

export default PageLayout;