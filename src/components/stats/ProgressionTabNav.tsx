import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Trophy, TrendingUp, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProgressionTab = 'overview' | 'records' | 'progress' | 'ranking';

const TABS: { value: ProgressionTab; label: string; icon: React.ElementType }[] = [
  { value: 'overview', label: 'Vue', icon: LayoutGrid },
  { value: 'records', label: 'Records', icon: Trophy },
  { value: 'progress', label: 'Évol.', icon: TrendingUp },
  { value: 'ranking', label: 'Classe.', icon: Medal },
];

const tabClass =
  'flex flex-col items-center justify-center gap-1 min-h-[52px] md:min-h-[44px] md:flex-row md:gap-2 rounded-xl px-2 py-2 text-[11px] md:text-sm font-medium transition-all duration-200 ' +
  'text-muted-foreground hover:text-foreground hover:bg-white/5 ' +
  'data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-white data-[state=active]:shadow-[0_0_16px_hsl(var(--primary)/0.35)]';

export const ProgressionTabNav: React.FC = () => (
  <TabsList
    className={cn(
      'grid grid-cols-4 gap-1.5 h-auto w-full',
      'glass-card border border-primary/20 p-2 rounded-2xl bg-card/40'
    )}
  >
    {TABS.map(({ value, label, icon: Icon }) => (
      <TabsTrigger key={value} value={value} className={tabClass}>
        <Icon className="w-4 h-4 shrink-0" />
        <span className="leading-none">{label}</span>
      </TabsTrigger>
    ))}
  </TabsList>
);
