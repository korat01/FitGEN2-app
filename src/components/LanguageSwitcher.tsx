import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-50"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">FR</span>
    </Button>
  );
};

export default LanguageSwitcher;