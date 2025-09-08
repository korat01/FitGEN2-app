import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import PlanningCalendar from '@/components/PlanningCalendar';
import ProgramGenerator from '@/components/ProgramGenerator';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import PlanningConfig from '@/components/PlanningConfig';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Dumbbell, 
  Target, 
  Clock,
  TrendingUp,
  Play,
  Settings,
  Grid3X3,
  CalendarDays
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Planning = () => {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [planningDuration, setPlanningDuration] = useState(3);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');

  // Charger les jours sélectionnés depuis le profil (simulation)
  useEffect(() => {
    const userSelectedDays = ['Mardi', 'Jeudi'];
    setSelectedDays(userSelectedDays);
  }, []);

  const handleDayClick = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleProgramsGenerated = (generatedPrograms: any[]) => {
    setPrograms(generatedPrograms);
    setIsGenerating(false);
  };

  const handleStartWorkout = (day: string) => {
    const program = programs.find(p => p.day === day);
    if (program) {
      navigate(`/programme/${program.day.toLowerCase()}`);
    }
  };

  const handleEditProgram = (day: string) => {
    const program = programs.find(p => p.day === day);
    if (program) {
      navigate(`/blocs-entrainement?edit=${program.day.toLowerCase()}`);
    }
  };

  const handleCalendarDayClick = (date: Date, program: any) => {
    if (program) {
      navigate(`/programme/${program.day.toLowerCase()}`);
    }
  };

  const handleCalendarEditProgram = (date: Date, program: any) => {
    if (program) {
      navigate(`/blocs-entrainement?edit=${program.day.toLowerCase()}`);
    }
  };

  const handleCalendarStartWorkout = (date: Date, program: any) => {
    if (program) {
      navigate(`/programme/${program.day.toLowerCase()}`);
    }
  };

  const handleDaysChange = (days: string[]) => {
    setSelectedDays(days);
  };

  const handleDurationChange = (months: number) => {
    setPlanningDuration(months);
  };

  const generateMonthlyPlanning = () => {
    setIsGenerating(true);
    
    // Simulation de la génération du planning mensuel
    setTimeout(() => {
      const newPrograms = [];
      const today = new Date();
      
      // Générer les programmes pour la durée sélectionnée
      for (let month = 0; month < planningDuration; month++) {
        const currentMonth = new Date(today.getFullYear(), today.getMonth() + month, 1);
        const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
          const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
          const dayName = currentDate.toLocaleDateString('fr-FR', { weekday: 'long' });
          
          if (selectedDays.includes(dayName)) {
            const programTypes = [
              { name: 'Push Day', exercises: 4, duration: '75 min', difficulty: 'Intermédiaire' },
              { name: 'Pull Day', exercises: 5, duration: '80 min', difficulty: 'Intermédiaire' },
              { name: 'Leg Day', exercises: 6, duration: '90 min', difficulty: 'Avancé' },
              { name: 'Full Body', exercises: 8, duration: '60 min', difficulty: 'Débutant' }
            ];
            
            const programType = programTypes[selectedDays.indexOf(dayName) % programTypes.length];
            
            newPrograms.push({
              date: currentDate,
              day: dayName,
              name: programType.name,
              exercises: programType.exercises,
              duration: programType.duration,
              difficulty: programType.difficulty,
              completed: false,
              isToday: currentDate.toDateString() === new Date().toDateString()
            });
          }
        }
      }
      
      setPrograms(newPrograms);
      setIsGenerating(false);
    }, 2000);
  };

  // Statistiques du planning
  const planningStats = {
    totalDays: selectedDays.length,
    completedWorkouts: programs.filter(p => p.completed).length,
    remainingWorkouts: programs.filter(p => !p.completed).length,
    weeklyProgress: programs.length > 0 ? Math.round((programs.filter(p => p.completed).length / programs.length) * 100) : 0,
    totalSessions: selectedDays.length * planningDuration * 4
  };

  return (
    <PageLayout
      title="Planning d'entraînement"
      subtitle="Organisez vos séances selon vos disponibilités"
      icon={<Calendar className="h-6 w-6 text-blue-600" />}
      actions={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/profile')}
            className="border-2 border-slate-300 hover:border-slate-400"
          >
            <Settings className="h-4 w-4 mr-2" />
            Modifier les jours
          </Button>
        </div>
      }
    >
      {/* Statistiques du planning */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Jours d'entraînement"
          value={planningStats.totalDays}
          subtitle="par semaine"
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Séances terminées"
          value={planningStats.completedWorkouts}
          subtitle="cette semaine"
          icon={Target}
          color="green"
        />
        <StatCard
          title="Séances restantes"
          value={planningStats.remainingWorkouts}
          subtitle="à effectuer"
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Progression"
          value={`${planningStats.weeklyProgress}%`}
          subtitle="de la semaine"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Configuration du planning */}
      <PlanningConfig
        selectedDays={selectedDays}
        onDaysChange={handleDaysChange}
        onDurationChange={handleDurationChange}
        onGeneratePlanning={generateMonthlyPlanning}
      />

      {/* Sélecteur de vue */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
            <div className="bg-violet-100 rounded-full p-2">
              <Calendar className="h-6 w-6 text-violet-600" />
            </div>
            Vue du planning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button
              variant={viewMode === 'weekly' ? 'default' : 'outline'}
              onClick={() => setViewMode('weekly')}
              className={`flex items-center gap-2 ${
                viewMode === 'weekly' 
                  ? 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white' 
                  : 'border-2 border-slate-300 hover:border-slate-400'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
              Vue hebdomadaire
            </Button>
            <Button
              variant={viewMode === 'monthly' ? 'default' : 'outline'}
              onClick={() => setViewMode('monthly')}
              className={`flex items-center gap-2 ${
                viewMode === 'monthly' 
                  ? 'bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white' 
                  : 'border-2 border-slate-300 hover:border-slate-400'
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              Calendrier mensuel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vue hebdomadaire (ancienne vue) */}
      {viewMode === 'weekly' && (
        <>
          {/* Générateur de programmes */}
          <ProgramGenerator
            selectedDays={selectedDays}
            onProgramsGenerated={handleProgramsGenerated}
          />

          {/* Calendrier de planning */}
          <PlanningCalendar
            selectedDays={selectedDays}
            programs={programs}
            onDayClick={handleDayClick}
          />

          {/* Actions rapides pour les programmes */}
          {programs.length > 0 && (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800 text-2xl">
                  <div className="bg-violet-100 rounded-full p-2">
                    <Dumbbell className="h-6 w-6 text-violet-600" />
                  </div>
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {programs.map((program, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-800">{program.day}</h4>
                        <Badge 
                          variant="outline" 
                          className={`${
                            program.difficulty === 'Débutant' ? 'border-emerald-300 text-emerald-700' :
                            program.difficulty === 'Intermédiaire' ? 'border-amber-300 text-amber-700' :
                            'border-red-300 text-red-700'
                          }`}
                        >
                          {program.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="font-medium text-slate-800">{program.name}</div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {program.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            {program.exercises} exos
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white font-semibold"
                            onClick={() => handleStartWorkout(program.day)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Commencer
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProgram(program.day)}
                            className="border-2 border-slate-300 hover:border-slate-400"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Vue calendrier mensuel */}
      {viewMode === 'monthly' && (
        <MonthlyCalendar
          selectedDays={selectedDays}
          programs={programs}
          onDayClick={handleCalendarDayClick}
          onEditProgram={handleCalendarEditProgram}
          onStartWorkout={handleCalendarStartWorkout}
        />
      )}
    </PageLayout>
  );
};

export default Planning; 