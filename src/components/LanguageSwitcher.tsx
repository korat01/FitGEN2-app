import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 text-foreground/90 border-white/15 hover:bg-white/10"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">FR</span>
    </Button>
  );
};

export default LanguageSwitcher;