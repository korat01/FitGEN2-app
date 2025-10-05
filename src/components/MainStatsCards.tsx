import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Zap, Gauge, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { MainStats } from '@/types/stats';

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  mainValue: string;
  subValue: string;
  progress: number;
  communityRank: string;
  evolution: number[];
  color: string;
  bgGradient: string;
  performancePoints: number;
  performanceLevel: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  icon,
  mainValue,
  subValue,
  progress,
  communityRank,
  evolution,
  color,
  bgGradient,
  performancePoints,
  performanceLevel
}) => {
  const chartData = evolution.map((value, index) => ({
    week: `S${index + 1}`,
    value
  }));

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className={`w-10 h-10 ${bgGradient} rounded-xl flex items-center justify-center`}>
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Valeurs principales */}
        <div className="text-center">
          <div className={`text-3xl font-bold ${color}`}>
            {mainValue}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {subValue}
          </div>
          
          {/* Points de performance */}
          <div className="mt-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Points Performance</div>
                <div className={`text-lg font-bold ${color}`}>
                  {performancePoints}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Niveau</div>
                <div className="text-sm font-semibold text-gray-700">
                  {performanceLevel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jauge circulaire de progression */}
        <div className="flex justify-center">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={color.replace('text-', 'text-')}
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm font-bold ${color}`}>
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Graphique mini */}
        <div className="h-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color.replace('text-', '#')} 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Classement communautaire */}
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            {communityRank}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

interface MainStatsCardsProps {
  stats: MainStats;
}

export const MainStatsCards: React.FC<MainStatsCardsProps> = ({ stats }) => {
  console.log('🎯 MainStatsCards reçoit:', {
    stats,
    forcePoints: stats?.force?.performancePoints,
    speedPoints: stats?.speed?.performancePoints,
    endurancePoints: stats?.endurance?.performancePoints
  });

  if (!stats) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Aucune donnée de statistiques disponible</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Force */}
      <StatCard
        title="⚡ Force"
        icon={<Zap className="w-6 h-6 text-white" />}
        mainValue={`Total : ${stats.force.total} kg`}
        subValue={`${stats.force.wilks} Wilks`}
        progress={stats.force.weeklyProgress}
        communityRank={stats.force.communityRank}
        evolution={stats.force.evolution}
        color="text-blue-600"
        bgGradient="bg-gradient-to-r from-blue-500 to-indigo-500"
        performancePoints={stats.force.performancePoints}
        performanceLevel={stats.force.performanceLevel}
      />

      {/* Vitesse */}
      <StatCard
        title="🏃 Vitesse"
        icon={<Gauge className="w-6 h-6 text-white" />}
        mainValue={`100m : ${stats.speed.time100m}s`}
        subValue={`${stats.speed.maxSpeed} km/h`}
        progress={stats.speed.weeklyProgress}
        communityRank={stats.speed.communityRank}
        evolution={stats.speed.evolution}
        color="text-green-600"
        bgGradient="bg-gradient-to-r from-green-500 to-emerald-500"
        performancePoints={stats.speed.performancePoints}
        performanceLevel={stats.speed.performanceLevel}
      />

      {/* Endurance */}
      <StatCard
        title="💨 Endurance"
        icon={<Heart className="w-6 h-6 text-white" />}
        mainValue={`VO₂max : ${stats.endurance.vo2max}`}
        subValue={`${stats.endurance.distance30min} km/30min`}
        progress={stats.endurance.weeklyProgress}
        communityRank={stats.endurance.communityRank}
        evolution={stats.endurance.evolution}
        color="text-purple-600"
        bgGradient="bg-gradient-to-r from-purple-500 to-pink-500"
        performancePoints={stats.endurance.performancePoints}
        performanceLevel={stats.endurance.performanceLevel}
      />
    </div>
  );
};
