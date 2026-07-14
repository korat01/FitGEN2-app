export interface RawPerformance {
  id?: string;
  discipline: string;
  value: number;
  date: string | Date;
}

export const getDisciplineColor = (discipline: string) => {
  const colors: Record<string, string> = {
    bench: '#ef4444',
    squat: '#3b82f6',
    deadlift: '#10b981',
    '5k': '#8b5cf6',
    pullups: '#f59e0b',
  };
  return colors[discipline] || '#6b7280';
};

export const getDisciplineName = (discipline: string) => {
  const names: Record<string, string> = {
    bench: 'Développé couché',
    squat: 'Squat',
    deadlift: 'Soulevé de terre',
    '5k': '5km',
    pullups: 'Tractions',
  };
  return names[discipline] || discipline;
};

export const prepareChartData = (performances: RawPerformance[]) => {
  if (performances.length === 0) return {} as Record<string, { date: string; value: number; timestamp: number }[]>;

  const groupedData: Record<string, { date: string; value: number; timestamp: number }[]> = {};
  performances.forEach((perf) => {
    if (!groupedData[perf.discipline]) groupedData[perf.discipline] = [];
    groupedData[perf.discipline].push({
      date: new Date(perf.date).toLocaleDateString('fr-FR'),
      value: perf.value,
      timestamp: new Date(perf.date).getTime(),
    });
  });

  Object.keys(groupedData).forEach((discipline) => {
    groupedData[discipline].sort((a, b) => a.timestamp - b.timestamp);
  });

  return groupedData;
};

export const getChartDataForDiscipline = (performances: RawPerformance[], discipline: string) => {
  return prepareChartData(performances)[discipline] || [];
};

export const getAllChartData = (performances: RawPerformance[]) => {
  const chartData = prepareChartData(performances);
  const allDates = new Set<string>();

  Object.values(chartData).forEach((data) => {
    data.forEach((item) => allDates.add(item.date));
  });

  return Array.from(allDates)
    .map((date) => {
      const dataPoint: Record<string, string | number | null> = { date };
      Object.keys(chartData).forEach((discipline) => {
        const disciplineData = chartData[discipline].find((item) => item.date === date);
        dataPoint[discipline] = disciplineData ? disciplineData.value : null;
      });
      return dataPoint;
    })
    .sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime());
};
