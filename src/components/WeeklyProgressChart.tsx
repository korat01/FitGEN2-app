import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeeklyProgressChartProps {
  title?: string;
  data?: Array<{
    day: string;
    stats: number;
    rank: number;
  }>;
}

const defaultData = [
  { day: 'Lun', stats: 30, rank: 20 },
  { day: 'Mar', stats: 45, rank: 35 },
  { day: 'Mer', stats: 35, rank: 50 },
  { day: 'Jeu', stats: 60, rank: 45 },
  { day: 'Ven', stats: 80, rank: 70 },
  { day: 'Sam', stats: 110, rank: 95 },
  { day: 'Dim', stats: 75, rank: 60 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[rgba(21,25,40,0.95)] border border-[rgba(0,194,255,0.3)] rounded-lg p-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <p className="text-white font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({
  title = "Weekly Progress",
  data = defaultData
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-[#6B2AFF] to-[#00C2FF]" />
              <span className="text-muted-foreground">Stats</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-r from-[#00C2FF] to-[#00E0FF]" />
              <span className="text-muted-foreground">Rank</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                {/* Gradient for Stats area */}
                <linearGradient id="gradientStats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B2AFF" stopOpacity={0.8} />
                  <stop offset="50%" stopColor="#00C2FF" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#00C2FF" stopOpacity={0.1} />
                </linearGradient>
                {/* Gradient for Rank area */}
                <linearGradient id="gradientRank" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00C2FF" stopOpacity={0.6} />
                  <stop offset="50%" stopColor="#6B2AFF" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6B2AFF" stopOpacity={0.05} />
                </linearGradient>
                {/* Glow filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#A0AEC0', fontSize: 11 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#A0AEC0', fontSize: 11 }}
                dx={-5}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Rank Area (behind) */}
              <Area
                type="monotone"
                dataKey="rank"
                name="Rank"
                stroke="#00C2FF"
                strokeWidth={2}
                fill="url(#gradientRank)"
                filter="url(#glow)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
              
              {/* Stats Area (front) */}
              <Area
                type="monotone"
                dataKey="stats"
                name="Stats"
                stroke="#6B2AFF"
                strokeWidth={2}
                fill="url(#gradientStats)"
                filter="url(#glow)"
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stats summary */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(0,194,255,0.1)]">
          <div className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-[#6B2AFF] to-[#00C2FF] bg-clip-text text-transparent">
              435
            </p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#00E0FF] bg-clip-text text-transparent">
              +23%
            </p>
            <p className="text-xs text-muted-foreground">vs Last Week</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold bg-gradient-to-r from-[#2ECC71] to-[#00C2FF] bg-clip-text text-transparent">
              #3
            </p>
            <p className="text-xs text-muted-foreground">Local Rank</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgressChart;
