import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PerformanceInputProps {
  onPerformanceAdded: (performance: any) => void;
  user: any;
}

export const PerformanceInput: React.FC<PerformanceInputProps> = ({ onPerformanceAdded, user }) => {
  const [performance, setPerformance] = useState({
    discipline: '',
    value: '',
    date: new Date().toISOString().split('T')[0]
  });

  const disciplines = [
    { id: 'bench', name: 'Développé couché', unit: 'kg' },
    { id: 'squat', name: 'Squat', unit: 'kg' },
    { id: 'deadlift', name: 'Soulevé de terre', unit: 'kg' },
    { id: '5k', name: '5km', unit: 'min' },
    { id: 'pullups', name: 'Tractions', unit: 'reps' },
    { id: 'total', name: 'Total Powerlifting', unit: 'kg' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (performance.discipline && performance.value) {
      const newPerformance = {
        id: Date.now().toString(),
        discipline: performance.discipline,
        value: parseFloat(performance.value),
        date: new Date(performance.date),
        userId: user?.id || '1'
      };
      
      onPerformanceAdded(newPerformance);
      
      // Reset form
      setPerformance({
        discipline: '',
        value: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une performance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="discipline">Discipline</Label>
            <Select value={performance.discipline} onValueChange={(value) => setPerformance({ ...performance, discipline: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une discipline" />
              </SelectTrigger>
              <SelectContent>
                {disciplines.map((disc) => (
                  <SelectItem key={disc.id} value={disc.id}>
                    {disc.name} ({disc.unit})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="value">Valeur</Label>
            <Input
              id="value"
              type="number"
              value={performance.value}
              onChange={(e) => setPerformance({ ...performance, value: e.target.value })}
              placeholder="Entrez votre performance"
              step="0.1"
            />
          </div>
          
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={performance.date}
              onChange={(e) => setPerformance({ ...performance, date: e.target.value })}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Ajouter la performance
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}; 