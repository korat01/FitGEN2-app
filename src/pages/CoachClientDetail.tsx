import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Footprints, ChefHat, Send, Dumbbell, Search, Sparkles } from 'lucide-react';
import { getCoachClient, sendMealToClient } from '@/utils/coachingData';
import { RECETTES, calculerMacrosRecette } from '@/utils/nutritionData';
import type { CoachedClient } from '@/types/coaching';

const SPORT_LABELS: Record<string, string> = {
  power: 'Powerlifting',
  marathon: 'Marathon',
  crossfit: 'Crossfit',
  calisthenics: 'Calisthéniques',
  streetlifting: 'Streetlifting',
  sprint: 'Sprint',
  classique: 'Classique',
};

const CoachClientDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<CoachedClient | undefined>(undefined);
  const [isMealModalOpen, setIsMealModalOpen] = useState(false);
  const [mealSearch, setMealSearch] = useState('');

  useEffect(() => {
    if (id) setClient(getCoachClient(id));
  }, [id]);

  // Petite simulation de "temps réel" pendant que le coach a la fiche ouverte — sans backend, on
  // ne peut pas recevoir de vraies mises à jour du téléphone du coaché, donc ce tick fait vivre
  // l'écran plutôt qu'un chiffre figé. Purement cosmétique, ne persiste pas.
  useEffect(() => {
    const interval = window.setInterval(() => {
      setClient((prev) => (prev ? { ...prev, stepsToday: prev.stepsToday + Math.floor(Math.random() * 8) } : prev));
    }, 4000);
    return () => window.clearInterval(interval);
  }, []);

  const filteredRecettes = useMemo(
    () => RECETTES.filter((r) => r.nom.toLowerCase().includes(mealSearch.toLowerCase())),
    [mealSearch]
  );

  const handleSendMeal = (recetteId: string) => {
    if (!id) return;
    const recette = RECETTES.find((r) => r.id === recetteId);
    if (!recette) return;
    const macros = calculerMacrosRecette(recette);
    const now = new Date();
    const heure = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const updated = sendMealToClient(id, { nom: recette.nom, emoji: recette.emoji, heure, calories: macros.calories });
    if (updated) setClient(updated);
    setIsMealModalOpen(false);
    setMealSearch('');
  };

  if (!client) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-muted-foreground">Coaché introuvable.</p>
        <Button onClick={() => navigate('/coaching')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à mes coachés
        </Button>
      </div>
    );
  }

  const stepsPercent = Math.min(Math.round((client.stepsToday / client.stepsGoal) * 100), 100);
  const programDaysCount = Object.values(client.program).filter((day) => day && day.length > 0).length;

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8 relative z-10 page-transition">
        <div className="space-y-6 stagger-animation">
          <Button onClick={() => navigate('/coaching')} variant="ghost" size="sm" className="text-muted-foreground -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Mes coachés
          </Button>

          {/* Header client */}
          <div className="glass-card rounded-2xl md:rounded-3xl p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-3xl shrink-0">
              {client.avatarEmoji}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                {SPORT_LABELS[client.sportClass] || client.sportClass} · Rang {client.rank}
              </p>
            </div>
          </div>

          {/* Pas du jour */}
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Footprints className="w-5 h-5 text-secondary" />
                Activité aujourd'hui
                <Badge variant="outline" className="ml-auto text-[10px] text-secondary border-secondary/30 animate-pulse">
                  <Sparkles className="w-3 h-3 mr-1" /> en direct
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-foreground tabular-nums">{client.stepsToday.toLocaleString('fr-FR')}</span>
                <span className="text-sm text-muted-foreground">/ {client.stepsGoal.toLocaleString('fr-FR')} pas</span>
              </div>
              <Progress value={stepsPercent} size="md" variant="subtle" />
            </CardContent>
          </Card>

          {/* Repas du jour */}
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-secondary" />
                Repas du jour
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {client.meals.length === 0 && (
                <p className="text-sm text-muted-foreground">Aucun repas logué pour l'instant.</p>
              )}
              {client.meals.map((meal) => (
                <div key={meal.id} className="flex items-center gap-3 p-3 surface-panel-sm rounded-lg">
                  <span className="text-xl shrink-0">{meal.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{meal.nom}</p>
                    <p className="text-xs text-muted-foreground">
                      {meal.heure} · {meal.calories} kcal
                      {meal.envoyeParCoach && <span className="text-secondary"> · envoyé par toi</span>}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Programme assigné */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-foreground">Programme sportif</p>
                <p className="text-sm text-muted-foreground">
                  {programDaysCount > 0 ? `${programDaysCount} jour${programDaysCount > 1 ? 's' : ''} programmé${programDaysCount > 1 ? 's' : ''}` : 'Aucun programme assigné'}
                </p>
              </div>
              <Button onClick={() => navigate(`/coaching/${client.id}/programme`)} className="gradient-primary text-white font-semibold shrink-0">
                <Dumbbell className="w-4 h-4 mr-2" />
                {programDaysCount > 0 ? 'Modifier' : 'Créer'} le programme
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <Button onClick={() => setIsMealModalOpen(true)} className="w-full gradient-primary text-white font-semibold h-12">
            <Send className="w-4 h-4 mr-2" />
            Envoyer un repas
          </Button>
        </div>
      </div>

      {/* Modal envoi de repas */}
      <Dialog open={isMealModalOpen} onOpenChange={setIsMealModalOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Envoyer un repas à {client.name}</DialogTitle>
          </DialogHeader>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 h-4 w-4" />
            <Input
              placeholder="Rechercher une recette..."
              value={mealSearch}
              onChange={(e) => setMealSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="space-y-2">
            {filteredRecettes.slice(0, 30).map((recette) => {
              const macros = calculerMacrosRecette(recette);
              return (
                <button
                  key={recette.id}
                  onClick={() => handleSendMeal(recette.id)}
                  className="w-full flex items-center gap-3 p-3 surface-panel-sm rounded-lg text-left hover:border-primary/40 border border-transparent transition-colors"
                >
                  <span className="text-xl shrink-0">{recette.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{recette.nom}</p>
                    <p className="text-xs text-muted-foreground">{macros.calories} kcal</p>
                  </div>
                  <Send className="w-4 h-4 text-secondary shrink-0" />
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoachClientDetail;
