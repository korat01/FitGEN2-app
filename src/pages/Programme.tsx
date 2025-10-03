import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { 
  Dumbbell, 
  Play, 
  Clock, 
  Target, 
  Zap,
  Calendar,
  CalendarDays,
  List,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Activity,
  Timer,
  Eye
} from 'lucide-react';
import { generateProgramme } from '../utils/programmeGenerator';

export const Programme: React.FC = () => {
  const { user } = useAuth();
  const [programme, setProgramme] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTab, setCurrentTab] = useState<'today' | 'weekly' | 'planning'>('today');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Charger le programme existant
  useEffect(() => {
    const savedProgramme = localStorage.getItem('userProgramme');
    if (savedProgramme) {
      try {
        setProgramme(JSON.parse(savedProgramme));
      } catch (error) {
        console.error('Erreur lors du chargement du programme:', error);
      }
    }
  }, []);

  // Ajoutez ce debug au début du composant
  useEffect(() => {
    console.log('=== DEBUG COMPOSANT PROGRAMME ===');
    console.log('User sportClass:', user.sportClass);
    console.log('Type:', typeof user.sportClass);
    console.log('Égalité avec "sprint":', user.sportClass === 'sprint');
  }, [user]);

  // Fonction pour générer un programme personnalisé selon le profil
  const handleGenerateProgramme = () => {
    console.log('🔴 Bouton cliqué !');
    
    if (!user) {
      alert('❌ Vous devez être connecté');
      return;
    }
    
    setIsGenerating(true);
    
    // Simuler une génération
    setTimeout(() => {
      console.log('👤 Profil utilisateur COMPLET:', user);
      
      try {
        // Utiliser la nouvelle fonction de génération
        const generatedProgramme = generateProgramme(user as any);
        console.log('📅 Programme généré:', generatedProgramme);
        
        // Adapter le format pour l'affichage existant
        const adaptedProgramme = {
          id: generatedProgramme.id,
          nom: generatedProgramme.nom,
          sessions: generatedProgramme.sessions.map((session: any) => ({
            id: session.id,
            nom: session.nom,
            day: session.day || 'lundi', // Valeur par défaut
            phase: session.phase || 'Adaptation',
            intensity: session.intensity || 'Modérée',
            duration: session.duration || session.duree || 60,
            exercises: session.exercises || session.exercices || [],
            notes: session.notes || '',
            equipment: session.equipment || []
          })),
          userProfile: {
            sportClass: user.sportClass,
            level: (user as any).niveau || (user as any).generalLevel || 'intermediaire',
            weight: user.weight || 70,
            age: user.age || 25,
            sex: user.sex || 'male',
            trainingDays: user.trainingDays || ['lundi', 'mercredi', 'vendredi'],
            trainingMonths: user.trainingMonths || 3
          }
        };
        
        console.log('📅 Programme adapté:', adaptedProgramme);
        
        localStorage.setItem('userProgramme', JSON.stringify(adaptedProgramme));
        setProgramme(adaptedProgramme);
        setIsGenerating(false);
        
        alert(`🎉 Programme ${user.sportClass} généré avec succès ! ${adaptedProgramme.sessions.length} séances créées.`);
      } catch (error) {
        console.error('❌ Erreur lors de la génération:', error);
        setIsGenerating(false);
        alert('❌ Erreur lors de la génération du programme');
      }
    }, 2000);
  };

  // Fonction pour régénérer
  const handleRegenerateProgramme = () => {
    const confirmRegenerate = confirm('🔄 Voulez-vous régénérer votre programme ?');
    if (confirmRegenerate) {
      handleGenerateProgramme();
    }
  };

  // Obtenir la session d'aujourd'hui
  const getTodaysSession = () => {
    if (!programme) return null;
    
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const today = days[new Date().getDay()];
    
    return programme.sessions.find((session: any) => session.day === today);
  };

  const todaySession = getTodaysSession();

  // Fonction pour générer le calendrier
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const calendar = [];
    let currentDate = new Date(startDate);
    
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      calendar.push(weekDays);
      
      if (currentDate.getMonth() !== month && week > 3) break;
    }
    
    return calendar;
  };

  // Fonction pour obtenir le nom du jour
  const getDayName = (dayIndex: number) => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    return days[dayIndex];
  };

  // Fonction pour vérifier si c'est aujourd'hui
  const isToday = (date: Date) => {
      const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Fonction pour vérifier si c'est le mois actuel
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Fonction pour obtenir la session d'une date
  const getSessionForDate = (date: Date) => {
    if (!programme) return null;
    
    const dayName = getDayName(date.getDay());
    return programme.sessions.find((session: any) => session.day === dayName);
  };

  // Fonction pour obtenir le nom du mois
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { month: 'long' });
  };

  const calendar = generateCalendar();

  const formatNumber = (value: number | undefined | null): string => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0';
    }
    return value.toString();
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Principal */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-8 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">🏋️ Mon Programme</h1>
                <p className="text-xl text-blue-100">Programme personnalisé selon votre profil</p>
            </div>
              <div className="flex gap-3">
                {programme && (
                  <Button 
                    onClick={handleRegenerateProgramme}
                    disabled={isGenerating}
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Mise à jour
                      </>
                    )}
                  </Button>
                )}
                <Button 
                  onClick={handleGenerateProgramme}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Génération...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Générer Mon Programme
                    </>
                  )}
                </Button>
          </div>
        </div>
          </div>
            </div>

        {/* Message si pas de programme */}
        {!programme && (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🏋️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun Programme Généré</h3>
              <p className="text-gray-500 mb-6">Générez votre programme personnalisé pour commencer votre entraînement !</p>
              <Button 
                onClick={handleGenerateProgramme}
                disabled={isGenerating}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Générer Mon Programme
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Programme Généré */}
        {programme && (
          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="today" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Aujourd'hui
          </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Hebdomadaire
              </TabsTrigger>
              <TabsTrigger value="planning" className="flex items-center gap-2">
                <List className="w-4 h-4" />
            Planning
          </TabsTrigger>
        </TabsList>

            {/* Onglet Aujourd'hui */}
            <TabsContent value="today">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-blue-500" />
                        Programme du Jour
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {todaySession ? (
                    <div className="space-y-6">
                      {/* Informations de la session */}
                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-bold text-gray-800">{todaySession.nom}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                              {todaySession.intensity}
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {todaySession.duration} min
                            </Badge>
                            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                              {todaySession.phase}
                            </Badge>
                    </div>
                  </div>
                  
                        {todaySession.notes && (
                          <div className="p-3 bg-blue-50 rounded-lg mb-4">
                            <p className="text-sm text-blue-800"><strong>Notes:</strong> {todaySession.notes}</p>
                    </div>
                        )}

                        {todaySession.equipment && todaySession.equipment.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Équipement requis:</p>
                            <div className="flex flex-wrap gap-2">
                              {todaySession.equipment.map((eq: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-gray-600">{eq}</Badge>
                              ))}
                    </div>
                    </div>
                        )}
                </div>

                      {/* Exercices */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">Exercices ({todaySession.exercises.length})</h4>
                        {todaySession.exercises.map((exercise: any, index: number) => (
                          <Card key={exercise.id} className="bg-white/60 backdrop-blur-sm border border-gray-200">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{exercise.nom}</CardTitle>
                                <Badge variant="outline">{exercise.categorie}</Badge>
                  </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-600">Séries</p>
                                    <p className="font-bold text-gray-800">{formatNumber(exercise.progression?.sets || exercise.series)}</p>
                  </div>
                                  <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-600">Reps</p>
                                    <p className="font-bold text-gray-800">{exercise.progression?.reps || exercise.reps}</p>
                </div>
                                  <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-600">Poids</p>
                                    <p className="font-bold text-gray-800">{formatNumber(exercise.progression?.poids || exercise.poids)}</p>
              </div>
                                  <div className="text-center p-2 bg-gray-50 rounded">
                                    <p className="text-sm text-gray-600">Repos</p>
                                    <p className="font-bold text-gray-800">{exercise.progression?.repos || exercise.repos}</p>
            </div>
          </div>

                                <div className="text-sm text-gray-600">
                                  <p><strong>Muscles:</strong> {exercise.muscles?.join(', ') || 'Non spécifié'}</p>
                                  <p><strong>Équipement:</strong> {exercise.equipement?.join(', ') || 'Non spécifié'}</p>
                </div>
                                
                                {exercise.conseils && (
                                  <div className="p-3 bg-yellow-50 rounded-lg">
                                    <p className="text-sm text-yellow-800"><strong>Conseil:</strong> {exercise.conseils}</p>
                </div>
                                )}
                </div>
              </CardContent>
            </Card>
                        ))}
                </div>
                </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RefreshCw className="w-12 h-12 text-white" />
                </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Jour de Repos</h3>
                      <p className="text-gray-600 mb-6">Profitez de cette journée pour récupérer et vous détendre.</p>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          💡 <strong>Conseil:</strong> La récupération est essentielle pour progresser. 
                          Vous pouvez faire des étirements légers ou une marche.
                        </p>
                </div>
                    </div>
                  )}
              </CardContent>
            </Card>
            </TabsContent>

            {/* Onglet Hebdomadaire */}
            <TabsContent value="weekly">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-green-500" />
                    Planning Hebdomadaire
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(day => {
                      const daySession = programme.sessions.find((s: any) => s.day === day);
                      return (
                        <Card key={day} className={`${daySession ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'} border-2`}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg capitalize">{day}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {daySession ? (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="bg-green-100 text-green-800">
                                    {daySession.intensity}
                                  </Badge>
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    {daySession.duration}min
                                  </Badge>
                    </div>
                                <p className="text-sm text-gray-600">
                                  <strong>{daySession.exercises?.length || 0}</strong> exercices
                                </p>
                                <p className="text-sm text-gray-600">
                                  <strong>Phase:</strong> {daySession.phase}
                                </p>
                                <div className="text-xs text-gray-500">
                                  {daySession.exercises?.slice(0, 2).map((ex: any) => ex.nom).join(', ') || 'Aucun exercice'}
                                  {daySession.exercises?.length > 2 && '...'}
                  </div>
                    </div>
                            ) : (
                              <div className="text-center py-4">
                                <RefreshCw className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Repos</p>
                  </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                    </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Planning */}
            <TabsContent value="planning">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-purple-500" />
                    Planning Mensuel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {programme ? (
                    <div className="space-y-6">
                      {/* Navigation du calendrier */}
                      <div className="flex items-center justify-between mb-6">
                    <Button 
                          variant="outline" 
                          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                          className="hover:bg-purple-50 hover:border-purple-300"
                        >
                          <ChevronLeft className="w-4 h-4" />
                    </Button>
                        <h2 className="text-xl font-bold text-gray-800">
                          {getMonthName(currentMonth)} {currentMonth.getFullYear()}
                        </h2>
                    <Button 
                          variant="outline" 
                          onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                          className="hover:bg-purple-50 hover:border-purple-300"
                        >
                          <ChevronRight className="w-4 h-4" />
                    </Button>
                      </div>

                      {/* Stats du programme */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Activity className="w-6 h-6 text-blue-200" />
                              <div>
                                <p className="text-xl font-bold">{programme.sessions.length}</p>
                                <p className="text-sm text-blue-200">Sessions/Semaine</p>
                </div>
              </div>
            </CardContent>
          </Card>

                        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-xl">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Timer className="w-6 h-6 text-green-200" />
                              <div>
                                <p className="text-xl font-bold">{Math.round(programme.sessions.reduce((acc: number, session: any) => acc + session.duration, 0) / programme.sessions.length) || 0}</p>
                                <p className="text-sm text-green-200">Min/Session</p>
                  </div>
                    </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Target className="w-6 h-6 text-purple-200" />
                              <div>
                                <p className="text-xl font-bold">{programme.userProfile?.sportClass || 'N/A'}</p>
                                <p className="text-sm text-purple-200">Classe Sport</p>
                    </div>
                  </div>
                          </CardContent>
                        </Card>
                  </div>
                  
                      {/* En-têtes des jours */}
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
                          <div key={day} className="text-center text-sm font-bold text-gray-700 p-3 bg-gray-100 rounded-lg">
                            {day}
                    </div>
                        ))}
                </div>
                
                      {/* Grille du calendrier */}
                      <div className="grid grid-cols-7 gap-2">
                        {calendar.map((week, weekIndex) =>
                          week.map((date, dayIndex) => {
                            const dayName = getDayName(dayIndex);
                            const sessionForDate = getSessionForDate(date);
                            const isCurrentMonthDay = isCurrentMonth(date);
                            const isTodayDate = isToday(date);
                            
                            return (
                              <div
                                key={`${weekIndex}-${dayIndex}`}
                                className={`
                                  min-h-[120px] p-3 rounded-xl border-2 transition-all duration-200
                                  ${isCurrentMonthDay ? 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md' : 'bg-gray-50 border-gray-100'}
                                  ${isTodayDate ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-300' : ''}
                                `}
                              >
                                {/* Numéro du jour */}
                                <div className="flex items-center justify-between mb-2">
                                  <span className={`text-lg font-bold ${isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {date.getDate()}
                                  </span>
                                  {isTodayDate && (
                                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                  )}
                    </div>
                                
                                {/* Session du jour */}
                                <div className="space-y-1">
                                  {sessionForDate ? (
                                    <div
                                      className={`
                                        text-xs p-2 rounded-lg text-white font-medium shadow-sm cursor-pointer
                                        ${sessionForDate.phase === 'Adaptation' ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                                          sessionForDate.phase === 'Progression' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                                          'bg-gradient-to-r from-red-500 to-red-600'}
                                        hover:scale-105 transition-transform duration-200
                                      `}
                                    >
                    <div className="flex items-center justify-between">
                                        <span className="truncate">{sessionForDate.nom}</span>
                                        <Eye className="w-3 h-3 opacity-90" />
                        </div>
                                      <div className="text-xs opacity-90 mt-1">
                                        {sessionForDate.duration}min • {sessionForDate.intensity}
                          </div>
                          </div>
                                  ) : (
                                    isCurrentMonthDay && (
                                      <div className="text-xs text-gray-400 text-center py-3 bg-gray-50 rounded-lg">
                                        <RefreshCw className="w-4 h-4 mx-auto mb-1" />
                                        Repos
                          </div>
                                    )
                                  )}
                        </div>
                      </div>
                            );
                          })
                        )}
                      </div>
                      
                      {/* Légende */}
                      <div className="flex items-center justify-center gap-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg"></div>
                          <span className="text-sm font-medium text-gray-700">Adaptation</span>
          </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg"></div>
                          <span className="text-sm font-medium text-gray-700">Progression</span>
                  </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg"></div>
                          <span className="text-sm font-medium text-gray-700">Spécialisation</span>
                      </div>
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-700">Aujourd'hui</span>
                          </div>
                          </div>
                        </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-32 h-32 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-16 h-16 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-3">Aucun Programme</h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Générez un programme personnalisé pour voir votre calendrier d'entraînement avec toutes vos sessions.
                      </p>
                          <Button 
                        onClick={handleGenerateProgramme} 
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
                      >
                        {isGenerating ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Génération...
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5 mr-3" />
                            Générer Programme
                          </>
                        )}
                          </Button>
                        </div>
                  )}
              </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
        )}
        </div>
      </div>
  );
};

export default Programme;