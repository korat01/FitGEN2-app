import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Trophy } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import { STATS_CHART } from '@/utils/statsChartTheme';
import {
  prepareChartData,
  getChartDataForDiscipline,
  getAllChartData,
  getDisciplineColor,
  getDisciplineName,
  RawPerformance,
} from '@/utils/statsDisplayHelpers';

interface StatsProgressPanelProps {
  performances: any[];
}

const getDisciplineEmoji = (discipline: string) => {
  switch (discipline) {
    case 'bench': return '💪';
    case 'squat': return '🏋️';
    case 'deadlift': return '⚡';
    case '5k': return '🏃';
    case 'pullups': return '🤸‍♂️';
    default: return '📊';
  }
};

const getDisciplineUnit = (discipline: string) => {
  if (discipline === '5k') return 'min';
  if (discipline === 'pullups') return 'reps';
  return 'kg';
};

export const StatsProgressPanel: React.FC<StatsProgressPanelProps> = ({ performances }) => {
  const rawPerformances = performances as RawPerformance[];
  const chartDataByDiscipline = prepareChartData(rawPerformances);
  const disciplines = Object.keys(chartDataByDiscipline);

  return (
    <div className="space-y-5 md:space-y-6">
      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Évolution globale de vos performances
          </CardTitle>
          <p className="text-muted-foreground">
            Progression de toutes vos disciplines dans le temps
          </p>
        </CardHeader>
        <CardContent>
          {performances.length > 0 ? (
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getAllChartData(rawPerformances)}>
                  <CartesianGrid strokeDasharray="3 3" stroke={STATS_CHART.grid} />
                  <XAxis
                    dataKey="date"
                    stroke={STATS_CHART.axis}
                    fontSize={12}
                    tick={{ fill: STATS_CHART.tick }}
                  />
                  <YAxis
                    stroke={STATS_CHART.axis}
                    fontSize={12}
                    tick={{ fill: STATS_CHART.tick }}
                  />
                  <Tooltip contentStyle={STATS_CHART.tooltipStyle} />
                  <Legend />
                  {disciplines.map((discipline) => (
                    <Line
                      key={discipline}
                      type="monotone"
                      dataKey={discipline}
                      stroke={getDisciplineColor(discipline)}
                      strokeWidth={3}
                      dot={{ fill: getDisciplineColor(discipline), strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: getDisciplineColor(discipline), strokeWidth: 2 }}
                      name={getDisciplineName(discipline)}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">Aucune performance enregistrée</p>
              <p className="text-sm">Ajoutez vos performances pour voir vos graphiques !</p>
            </div>
          )}
        </CardContent>
      </Card>

      {disciplines.map((discipline) => {
        const disciplineData = getChartDataForDiscipline(rawPerformances, discipline);
        const latestValue = disciplineData[disciplineData.length - 1]?.value;
        const firstValue = disciplineData[0]?.value;
        const improvement =
          latestValue && firstValue
            ? ((latestValue - firstValue) / firstValue * 100).toFixed(1)
            : '0';
        const unit = getDisciplineUnit(discipline);

        return (
          <Card key={discipline} className="glass-card border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: getDisciplineColor(discipline) }}
                  >
                    {getDisciplineEmoji(discipline)}
                  </div>
                  {getDisciplineName(discipline)}
                </CardTitle>
                <div className="text-right">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: getDisciplineColor(discipline) }}
                  >
                    {latestValue} {unit}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Number(improvement) > 0 ? '+' : ''}
                    {improvement}% d&apos;amélioration
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={disciplineData}>
                    <defs>
                      <linearGradient id={`gradient-${discipline}`} x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={getDisciplineColor(discipline)}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={getDisciplineColor(discipline)}
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={STATS_CHART.grid} />
                    <XAxis
                      dataKey="date"
                      stroke={STATS_CHART.axis}
                      fontSize={12}
                      tick={{ fill: STATS_CHART.tick }}
                    />
                    <YAxis
                      stroke={STATS_CHART.axis}
                      fontSize={12}
                      tick={{ fill: STATS_CHART.tick }}
                    />
                    <Tooltip
                      contentStyle={STATS_CHART.tooltipStyle}
                      formatter={(value: number) => [
                        `${value} ${unit}`,
                        getDisciplineName(discipline),
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={getDisciplineColor(discipline)}
                      strokeWidth={3}
                      fill={`url(#gradient-${discipline})`}
                      dot={{ fill: getDisciplineColor(discipline), strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: getDisciplineColor(discipline), strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
                <div className="text-center p-4 surface-panel">
                  <div className="text-lg font-bold text-foreground">{disciplineData.length}</div>
                  <div className="text-sm text-muted-foreground">Performances</div>
                </div>
                <div className="text-center p-4 surface-panel">
                  <div className="text-lg font-bold text-foreground">
                    {Math.max(...disciplineData.map((d) => d.value))} {unit}
                  </div>
                  <div className="text-sm text-muted-foreground">Record</div>
                </div>
                <div className="text-center p-4 surface-panel">
                  <div className="text-lg font-bold text-foreground">
                    {disciplineData.length > 1
                      ? (
                          ((Math.max(...disciplineData.map((d) => d.value)) -
                            Math.min(...disciplineData.map((d) => d.value))) /
                            Math.min(...disciplineData.map((d) => d.value))) *
                          100
                        ).toFixed(1) + '%'
                      : '0%'}
                  </div>
                  <div className="text-sm text-muted-foreground">Progression</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {performances.length > 0 && (
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Comparaison des records par discipline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={disciplines.map((discipline) => {
                    const disciplineData = getChartDataForDiscipline(rawPerformances, discipline);
                    return {
                      discipline: getDisciplineName(discipline),
                      record: Math.max(...disciplineData.map((d) => d.value)),
                      color: getDisciplineColor(discipline),
                    };
                  })}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={STATS_CHART.grid} />
                  <XAxis
                    dataKey="discipline"
                    stroke={STATS_CHART.axis}
                    fontSize={12}
                    tick={{ fill: STATS_CHART.tick }}
                  />
                  <YAxis
                    stroke={STATS_CHART.axis}
                    fontSize={12}
                    tick={{ fill: STATS_CHART.tick }}
                  />
                  <Tooltip contentStyle={STATS_CHART.tooltipStyle} />
                  <Bar dataKey="record" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
