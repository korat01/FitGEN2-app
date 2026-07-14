import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Weight, Clock } from 'lucide-react';

interface StatsRecordsPanelProps {
  performances: any[];
  userWeight?: number;
}

const FORCE_DISCIPLINES = ['bench', 'squat', 'deadlift'];
const SPEED_DISCIPLINES = ['5k', '10k', 'marathon', 'sprint'];
const ENDURANCE_DISCIPLINES = ['plank', 'wall-sit', 'burpees'];

const getForceDisciplineLabel = (discipline: string) => {
  switch (discipline) {
    case 'bench': return 'Développé couché';
    case 'squat': return 'Squat';
    case 'deadlift': return 'Soulevé de terre';
    default: return discipline;
  }
};

const getEnduranceDisciplineLabel = (discipline: string) => {
  switch (discipline) {
    case '5k': return '5km';
    case '10k': return '10km';
    case 'marathon': return 'Marathon';
    case 'sprint': return 'Sprint';
    case 'plank': return 'Planche';
    case 'wall-sit': return 'Mur';
    case 'burpees': return 'Burpees';
    default: return discipline;
  }
};

export const StatsRecordsPanel: React.FC<StatsRecordsPanelProps> = ({
  performances,
  userWeight = 75,
}) => {
  const bestForceRecords = FORCE_DISCIPLINES.map((discipline) => {
    const disciplinePerformances = performances.filter((p) => p.discipline === discipline);
    if (disciplinePerformances.length === 0) return null;

    const bestPerf = disciplinePerformances.reduce((max, current) =>
      current.value > max.value ? current : max
    );

    return { discipline, ...bestPerf };
  }).filter(Boolean) as Array<{ discipline: string; id: string; value: number; date: string | Date }>;

  const bestSpeedRecords = SPEED_DISCIPLINES.map((discipline) => {
    const disciplinePerformances = performances.filter((p) => p.discipline === discipline);
    if (disciplinePerformances.length === 0) return null;

    const bestPerf = disciplinePerformances.reduce((min, current) =>
      current.value < min.value ? current : min
    );

    return { discipline, ...bestPerf };
  }).filter(Boolean) as Array<{ discipline: string; id: string; value: number; date: string | Date }>;

  const bestEnduranceRecords = ENDURANCE_DISCIPLINES.map((discipline) => {
    const disciplinePerformances = performances.filter((p) => p.discipline === discipline);
    if (disciplinePerformances.length === 0) return null;

    const bestPerf = disciplinePerformances.reduce((max, current) =>
      current.value > max.value ? current : max
    );

    return { discipline, ...bestPerf };
  }).filter(Boolean) as Array<{ discipline: string; id: string; value: number; date: string | Date }>;

  const allEnduranceRecords = [...bestSpeedRecords, ...bestEnduranceRecords];
  const hasForceRecords = performances.some((p) => FORCE_DISCIPLINES.includes(p.discipline));
  const hasEnduranceRecords = performances.some((p) =>
    [...SPEED_DISCIPLINES, ...ENDURANCE_DISCIPLINES].includes(p.discipline)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-red-400 flex items-center gap-3">
            <Weight className="w-6 h-6" />
            Force - Vos Records
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {bestForceRecords.map((perf) => {
            const ratio = Math.round((perf.value / userWeight) * 10) / 10;

            return (
              <div
                key={perf.id}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-1">
                  <div className="font-bold text-lg capitalize text-foreground">
                    {getForceDisciplineLabel(perf.discipline)}
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground">
                    Ratio: <span className="font-bold text-red-400">{ratio}×</span> poids corporel
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(perf.date).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold text-red-400">{perf.value} kg</div>
                  <Badge className="bg-red-500/15 border border-red-500/30 text-red-300 font-semibold">
                    Record Personnel
                  </Badge>
                </div>
              </div>
            );
          })}

          {!hasForceRecords && (
            <div className="text-center text-muted-foreground py-8">
              <Weight className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">Aucun record de force</p>
              <p className="text-sm">Ajoutez vos performances !</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-300 flex items-center gap-3">
            <Clock className="w-6 h-6" />
            Vitesse & Endurance - Vos Records
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {allEnduranceRecords.map((perf) => {
            const isSpeedRecord = SPEED_DISCIPLINES.includes(perf.discipline);
            const unit = isSpeedRecord ? 'min' : 'sec';
            const colorClass = isSpeedRecord ? 'text-blue-400' : 'text-green-400';
            const bgClass = isSpeedRecord
              ? 'from-blue-500/10 to-indigo-500/10'
              : 'from-green-500/10 to-emerald-500/10';
            const badgeClass = isSpeedRecord
              ? 'bg-blue-500/15 border border-blue-500/30 text-blue-300'
              : 'bg-green-500/15 border border-green-500/30 text-green-300';

            return (
              <div
                key={perf.id}
                className={`flex justify-between items-center p-4 bg-gradient-to-r ${bgClass} rounded-xl hover:shadow-md transition-all duration-300`}
              >
                <div className="space-y-1">
                  <div className="font-bold text-lg text-foreground">
                    {getEnduranceDisciplineLabel(perf.discipline)}
                  </div>
                  <div className="text-sm font-semibold text-muted-foreground">
                    {isSpeedRecord ? 'Meilleur chrono' : 'Durée maximale'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(perf.date).toLocaleDateString('fr-FR')}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className={`text-2xl font-bold ${colorClass}`}>
                    {perf.value} {unit}
                  </div>
                  <Badge className={`${badgeClass} font-semibold`}>
                    {isSpeedRecord ? 'Record Vitesse' : 'Record Endurance'}
                  </Badge>
                </div>
              </div>
            );
          })}

          {!hasEnduranceRecords && (
            <div className="text-center text-muted-foreground py-8">
              <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">Aucun record d&apos;endurance</p>
              <p className="text-sm">Ajoutez vos performances !</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
