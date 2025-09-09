import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, BarChart3, Dumbbell, Apple, Calendar, Scan, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

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
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 