import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Dumbbell, 
  Coffee, 
  Target, 
  Clock,
  Play,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PlanningCalendarProps {
  selectedDays: string[];
  programs: any[];
  onDayClick: (day: string) => void;
}

const PlanningCalendar: React.FC<PlanningCalendarProps> = ({
  selectedDays,
  programs,
  onDayClick
}) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (currentWeek * 7));
  
  const getDayProgram = (dayName: string) => {
    return programs.find(program => program.day === dayName);
  };

  const getDayStatus = (dayName: string) => {
    const isSelected = selectedDays.includes(dayName);
    const program = getDayProgram(dayName);
    
    if (!isSelected) return 'rest';
    if (program?.completed) return 'completed';
    if (program?.isToday) return 'today';
    return 'scheduled';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'rest': return 'bg-slate-100 text-slate-500 border-slate-200';
      case 'scheduled': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'today': return 'bg-green-50 text-green-700 border-green-200';
      case 'completed': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-500 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'rest': return <Coffee className="h-4 w-4" />;
      case 'scheduled': return <Dumbbell className="h-4 w-4" />;
      case 'today': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Coffee className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'rest': return 'Repos';
      case 'scheduled': return 'Programmé';
      case 'today': return "Aujourd'hui";
      case 'completed': return 'Terminé';
      default: return 'Repos';
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-slate-900 text-2xl">
          <div className="bg-blue-100 rounded-full p-2">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          Planning hebdomadaire
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Navigation des semaines */}
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="border-2 border-slate-300 hover:border-slate-400"
            >
              ← Semaine précédente
            </Button>
            <h3 className="text-lg font-semibold text-slate-700">
              Semaine du {startOfWeek.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
            </h3>
            <Button 
              variant="outline" 
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="border-2 border-slate-300 hover:border-slate-400"
            >
              Semaine suivante →
            </Button>
          </div>

          {/* Grille des jours */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {days.map((day, index) => {
              const status = getDayStatus(day);
              const program = getDayProgram(day);
              
              return (
                <div
                  key={day}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${getStatusColor(status)}`}
                  onClick={() => onDayClick(day)}
                >
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      {getStatusIcon(status)}
                      <span className="font-semibold text-sm">{day}</span>
                    </div>
                    
                    <div className="text-xs">
                      {getStatusText(status)}
                    </div>
                    
                    {program && (
                      <div className="space-y-2">
                        <div className="text-xs font-medium">
                          {program.name}
                        </div>
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <Clock className="h-3 w-3" />
                          {program.duration}
                        </div>
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <Target className="h-3 w-3" />
                          {program.exercises} exos
                        </div>
                      </div>
                    )}
                    
                    {status === 'rest' && (
                      <div className="text-xs text-slate-500">
                        Jour de repos
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanningCalendar; 