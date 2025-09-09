import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 pt-20">
      <div className="container mx-auto px-6 py-8">
        <div className="animate-in fade-in-50 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout; 