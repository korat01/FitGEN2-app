import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, Weight, MapPin, Flame } from 'lucide-react';
import { GlobalStats } from '@/types/stats';

interface GlobalStatsProps {
  stats: GlobalStats;
}

export const GlobalStatsDisplay: React.FC<GlobalStatsProps> = ({ stats }) => {
  const { totalSessions, totalVolume, totalDistance, totalCalories, evolution } = stats;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toLocaleString();
  };

  const getEvolutionIcon = (value: number) => {
    return value >= 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  const getEvolutionColor = (value: number) => {
    return value >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const statItems = [
    {
      title: 'Total séances',
      value: totalSessions,
      evolution: evolution.sessions,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Volume total soulevé',
      value: `${formatNumber(totalVolume)} kg`,
      evolution: evolution.volume,
      icon: <Weight className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Distance totale',
      value: `${formatNumber(totalDistance)} km`,
      evolution: evolution.distance,
      icon: <MapPin className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Calories estimées',
      value: `${formatNumber(totalCalories)} kcal`,
      evolution: evolution.calories,
      icon: <Flame className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          Statistiques Globales
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <div key={index} className={`bg-gradient-to-r ${item.bgColor} rounded-2xl p-6 border border-gray-200`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className="flex items-center gap-1">
                  {getEvolutionIcon(item.evolution)}
                  <span className={`text-sm font-semibold ${getEvolutionColor(item.evolution)}`}>
                    {item.evolution > 0 ? '+' : ''}{item.evolution}%
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{item.value}</h3>
                <p className="text-sm text-gray-600">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé de performance */}
        <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Résumé de Performance</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Moyenne par semaine */}
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(totalSessions / 52)}
              </div>
              <div className="text-sm text-gray-600">Séances/semaine</div>
            </div>
            
            {/* Volume moyen par séance */}
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round(totalVolume / totalSessions)}
              </div>
              <div className="text-sm text-gray-600">kg/séance</div>
            </div>
            
            {/* Distance moyenne par séance */}
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.round(totalDistance / totalSessions * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">km/séance</div>
            </div>
          </div>
        </div>

        {/* Badges de performance */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Badges de Performance</h4>
          <div className="flex flex-wrap gap-2">
            {totalSessions >= 100 && (
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <BarChart3 className="w-3 h-3 mr-1" />
                100+ Séances
              </Badge>
            )}
            {totalVolume >= 50000 && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Weight className="w-3 h-3 mr-1" />
                50k+ kg soulevés
              </Badge>
            )}
            {totalDistance >= 1000 && (
              <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                <MapPin className="w-3 h-3 mr-1" />
                1000+ km parcourus
              </Badge>
            )}
            {totalCalories >= 100000 && (
              <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                <Flame className="w-3 h-3 mr-1" />
                100k+ calories brûlées
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
