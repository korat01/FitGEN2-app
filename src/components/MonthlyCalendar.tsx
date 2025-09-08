import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Dumbbell, 
  Coffee, 
  Target, 
  Clock,
  Play,
  CheckCircle,
  Edit,
  X,
  Zap
} from 'lucide-react';

interface MonthlyCalendarProps {
  selectedDays: string[];
  programs: any[];
  onDayClick: (date: Date, program: any) => void;
  onEditProgram: (date: Date, program: any) => void;
  onStartWorkout: (date: Date, program: any) => void;
}

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  selectedDays,
  programs,
  onDayClick,
  onEditProgram,
  onStartWorkout
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const fullDayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  // Types de programmes avec exercices détaillés
  const programTypes = {
    'Push Day': {
      name: 'Push Day',
      exercises: [
        { name: 'Développé couché', sets: '4x8-10', weight: '80kg', rest: '2-3 min' },
        { name: 'Dips', sets: '3x12-15', weight: 'Poids du corps', rest: '90 sec' },
        { name: 'Élévations latérales', sets: '3x15', weight: '12kg', rest: '60 sec' },
        { name: 'Développé incliné', sets: '3x10-12', weight: '60kg', rest: '2 min' }
      ],
      duration: '75 min',
      difficulty: 'Intermédiaire',
      calories: 450
    },
    'Pull Day': {
      name: 'Pull Day',
      exercises: [
        { name: 'Tractions', sets: '4x8-10', weight: 'Poids du corps', rest: '2-3 min' },
        { name: 'Rowing barre', sets: '4x8-10', weight: '70kg', rest: '2 min' },
        { name: 'Curl biceps', sets: '3x12-15', weight: '15kg', rest: '60 sec' },
        { name: 'Face pull', sets: '3x15', weight: '20kg', rest: '60 sec' },
        { name: 'Shrugs', sets: '3x12', weight: '40kg', rest: '60 sec' }
      ],
      duration: '80 min',
      difficulty: 'Intermédiaire',
      calories: 480
    },
    'Leg Day': {
      name: 'Leg Day',
      exercises: [
        { name: 'Squat', sets: '4x8-10', weight: '100kg', rest: '3-4 min' },
        { name: 'Fentes', sets: '3x12', weight: '20kg', rest: '2 min' },
        { name: 'Soulevé de terre', sets: '4x6-8', weight: '120kg', rest: '3-4 min' },
        { name: 'Extensions', sets: '3x15', weight: '60kg', rest: '90 sec' },
        { name: 'Mollets', sets: '4x20', weight: '80kg', rest: '60 sec' },
        { name: 'Planche', sets: '3x45 sec', weight: 'Poids du corps', rest: '60 sec' }
      ],
      duration: '90 min',
      difficulty: 'Avancé',
      calories: 600
    },
    'Full Body': {
      name: 'Full Body',
      exercises: [
        { name: 'Squat', sets: '3x12', weight: '60kg', rest: '2 min' },
        { name: 'Développé couché', sets: '3x10', weight: '60kg', rest: '2 min' },
        { name: 'Tractions', sets: '3x8', weight: 'Poids du corps', rest: '2 min' },
        { name: 'Fentes', sets: '3x10', weight: '15kg', rest: '90 sec' },
        { name: 'Dips', sets: '3x10', weight: 'Poids du corps', rest: '90 sec' },
        { name: 'Planche', sets: '3x30 sec', weight: 'Poids du corps', rest: '60 sec' },
        { name: 'Burpees', sets: '3x10', weight: 'Poids du corps', rest: '60 sec' },
        { name: 'Mountain climbers', sets: '3x20', weight: 'Poids du corps', rest: '60 sec' }
      ],
      duration: '60 min',
      difficulty: 'Débutant',
      calories: 400
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Jours du mois précédent
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        program: null
      });
    }
    
    // Jours du mois actuel
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayName = fullDayNames[currentDate.getDay()];
      const isSelected = selectedDays.includes(dayName);
      const program = programs.find(p => 
        p.date && 
        p.date.getDate() === day && 
        p.date.getMonth() === month && 
        p.date.getFullYear() === year
      );
      
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: currentDate.toDateString() === new Date().toDateString(),
        isSelected,
        program
      });
    }
    
    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        program: null
      });
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDayStatus = (day: any) => {
    if (!day.isCurrentMonth) return 'other-month';
    if (!day.isSelected) return 'rest';
    if (day.program?.completed) return 'completed';
    if (day.isToday) return 'today';
    return 'scheduled';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'other-month': return 'text-slate-300 bg-slate-50';
      case 'rest': return 'text-slate-500 bg-slate-100 border-slate-200';
      case 'scheduled': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'today': return 'text-green-700 bg-green-50 border-green-200';
      case 'completed': return 'text-purple-700 bg-purple-50 border-purple-200';
      default: return 'text-slate-500 bg-slate-100 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'rest': return <Coffee className="h-3 w-3" />;
      case 'scheduled': return <Dumbbell className="h-3 w-3" />;
      case 'today': return <Play className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const handleDayClick = (day: any) => {
    if (day.isCurrentMonth && day.isSelected) {
      setSelectedDay(day.date);
      setSelectedProgram(day.program);
    }
  };

  const closeProgramDetails = () => {
    setSelectedDay(null);
    setSelectedProgram(null);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <>
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
              <div className="bg-blue-100 rounded-full p-2">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              Calendrier mensuel
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="border-2 border-slate-300 hover:border-slate-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold text-slate-700 min-w-[200px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="border-2 border-slate-300 hover:border-slate-400"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* En-têtes des jours */}
            <div className="grid grid-cols-7 gap-1">
              {dayNames.map(day => (
                <div key={day} className="p-2 text-center text-sm font-semibold text-slate-600">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Grille des jours */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const status = getDayStatus(day);
                const isClickable = day.isCurrentMonth && day.isSelected;
                
                return (
                  <div
                    key={index}
                    className={`relative p-2 h-20 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${getStatusColor(status)} ${
                      isClickable ? 'hover:scale-105' : 'cursor-default'
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          day.isToday ? 'text-green-600 font-bold' : ''
                        }`}>
                          {day.date.getDate()}
                        </span>
                        {getStatusIcon(status)}
                      </div>
                      
                      {day.program ? (
                        <div className="mt-1 space-y-1">
                          <div className="text-xs font-medium truncate">
                            {day.program.name}
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Clock className="h-2 w-2" />
                            {day.program.duration}
                          </div>
                        </div>
                      ) : day.isSelected && day.isCurrentMonth ? (
                        <div className="mt-1 text-xs text-slate-500">
                          Jour d'entraînement
                        </div>
                      ) : !day.isSelected && day.isCurrentMonth ? (
                        <div className="mt-1 text-xs text-slate-500">
                          Repos
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal de détails du programme */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
                  <div className="bg-blue-100 rounded-full p-2">
                    <Dumbbell className="h-6 w-6 text-blue-600" />
                  </div>
                  Programme du {selectedDay.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeProgramDetails}
                  className="border-2 border-slate-300 hover:border-slate-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {selectedProgram ? (
                <div className="space-y-6">
                  {/* Informations du programme */}
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold text-slate-800">{selectedProgram.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`${
                          selectedProgram.difficulty === 'Débutant' ? 'border-emerald-300 text-emerald-700' :
                          selectedProgram.difficulty === 'Intermédiaire' ? 'border-amber-300 text-amber-700' :
                          'border-red-300 text-red-700'
                        }`}
                      >
                        {selectedProgram.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Durée : {selectedProgram.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Target className="h-4 w-4" />
                        <span className="font-medium">{selectedProgram.exercises} exercices</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Zap className="h-4 w-4" />
                        <span className="font-medium">Calories : {selectedProgram.calories}</span>
                      </div>
                    </div>
                  </div>

                  {/* Liste des exercices */}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-3">Exercices du jour</h4>
                    <div className="space-y-3">
                      {selectedProgram.exercises && selectedProgram.exercises.length > 0 ? (
                        selectedProgram.exercises.map((exercise: any, index: number) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                            <span className="font-medium text-slate-800">{exercise.name}</span>
                            <div className="text-sm text-slate-600">
                              <span className="bg-slate-200 px-2 py-1 rounded-md">{exercise.sets}</span>
                              <span className="mx-2">•</span>
                              <span className="bg-slate-200 px-2 py-1 rounded-md">{exercise.weight}</span>
                              <span className="mx-2">•</span>
                              <span className="bg-slate-200 px-2 py-1 rounded-md">{exercise.rest}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-slate-500">
                          <Dumbbell className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                          <p>Exercices à définir</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold py-3"
                      onClick={() => {
                        onStartWorkout(selectedDay, selectedProgram);
                        closeProgramDetails();
                      }}
                    >
                      <Play className="h-5 w-5 mr-2" />
                      Commencer la séance
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        onEditProgram(selectedDay, selectedProgram);
                        closeProgramDetails();
                      }}
                      className="px-6 py-3 border-2 border-slate-300 hover:border-slate-400"
                    >
                      <Edit className="h-5 w-5 mr-2" />
                      Modifier
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Coffee className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">Jour de repos</h3>
                  <p className="text-slate-500">Profitez de votre journée de récupération !</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default MonthlyCalendar; 