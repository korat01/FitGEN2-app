import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  backTo?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  title,
  subtitle,
  icon,
  showBackButton = true,
  backTo = '/',
  children,
  actions
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête de page */}
        <div className="flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate(backTo)}
                className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              {icon && (
                <div className="bg-blue-100 rounded-full p-2">
                  {icon}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-slate-700 text-lg">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
              className="border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
            >
              <Home className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout; 