import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Footprints, ChefHat, ChevronRight, Users, Plus, Trash2, UserPlus, Dumbbell, Sparkles } from 'lucide-react';
import { useHunterMode } from '@/hooks/useHunterMode';
import { loadCoachClients, addCoachClient, removeCoachClient } from '@/utils/coachingData';
import type { CoachedClient } from '@/types/coaching';

const SPORT_OPTIONS = [
  { value: 'classique', label: 'Classique', emoji: '🏋️' },
  { value: 'power', label: 'Powerlifting', emoji: '🏋️' },
  { value: 'marathon', label: 'Marathon', emoji: '🏃' },
  { value: 'crossfit', label: 'Crossfit', emoji: '🔥' },
  { value: 'calisthenics', label: 'Calisthéniques', emoji: '🤸' },
  { value: 'streetlifting', label: 'Streetlifting', emoji: '💪' },
  { value: 'sprint', label: 'Sprint', emoji: '⚡' },
];

const RANK_OPTIONS = ['E', 'D', 'C', 'B', 'A', 'S'];

const emptyForm = () => ({ name: '', sportClass: 'classique', rank: 'D', stepsGoal: '8000' });

const Coaching: React.FC = () => {
  const navigate = useNavigate();
  const { hunterPanelClass } = useHunterMode();
  const [clients, setClients] = useState<CoachedClient[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm());

  useEffect(() => {
    setClients(loadCoachClients());
  }, []);

  const lastMeal = (client: CoachedClient) =>
    client.meals.length > 0 ? client.meals[client.meals.length - 1] : null;

  const selectedSport = useMemo(
    () => SPORT_OPTIONS.find((s) => s.value === form.sportClass) || SPORT_OPTIONS[0],
    [form.sportClass]
  );

  const handleAddClient = () => {
    if (!form.name.trim()) return;
    addCoachClient({
      name: form.name.trim(),
      avatarEmoji: selectedSport.emoji,
      sportClass: form.sportClass,
      rank: form.rank,
      stepsToday: 0,
      stepsGoal: Number(form.stepsGoal) || 8000,
      lastActivityLabel: 'Ajouté à l\'instant',
    });
    setClients(loadCoachClients());
    setIsAddOpen(false);
    setForm(emptyForm());
  };

  const handleRemoveClient = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation();
    if (!window.confirm('Retirer ce coaché de ta liste ?')) return;
    removeCoachClient(clientId);
    setClients(loadCoachClients());
  };

  return (
    <div className="relative">
      <div className="container mx-auto px-4 py-8 relative z-10 page-transition">
        <div className="space-y-6 stagger-animation">
          {/* Header */}
          <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-[var(--shadow-glow-purple)] glass-card border border-primary/30 ${hunterPanelClass}`}>
            <div className="absolute inset-0 gradient-primary opacity-[var(--hero-overlay-opacity)]" />
            <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Mes coachés</h1>
                  <p className="text-white/80 text-sm mt-1">{clients.length} coaché{clients.length > 1 ? 's' : ''} suivi{clients.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              <Button onClick={() => setIsAddOpen(true)} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 shrink-0">
                <UserPlus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </div>

          {/* Créer sans passer par un coaché de l'app — pour quelqu'un que tu coaches mais qui n'a
              pas de compte, à donner en PDF. */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Sans client dans l'app</p>
            <div className="grid grid-cols-2 gap-3">
              <Card
                className="glass-card border-primary/20 cursor-pointer hover:border-primary/40 transition-all duration-200"
                onClick={() => navigate('/coaching/programme')}
              >
                <CardContent className="p-4 flex flex-col items-start gap-2">
                  <div className="w-10 h-10 bg-primary/15 border border-primary/25 rounded-xl flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Créer un programme</p>
                  <p className="text-xs text-muted-foreground">Exporté en PDF</p>
                </CardContent>
              </Card>
              <Card
                className="glass-card border-primary/20 cursor-pointer hover:border-primary/40 transition-all duration-200"
                onClick={() => navigate('/nutrition/plan', { state: { coachStandalone: true } })}
              >
                <CardContent className="p-4 flex flex-col items-start gap-2">
                  <div className="w-10 h-10 bg-secondary/15 border border-secondary/25 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">Créer un plan alimentaire</p>
                  <p className="text-xs text-muted-foreground">Exporté en PDF</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Liste des coachés */}
          {clients.length === 0 ? (
            <Card className="glass-card border-primary/20">
              <CardContent className="p-8 text-center">
                <Users className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">Aucun coaché pour l'instant.</p>
                <Button onClick={() => setIsAddOpen(true)} className="mt-4 gradient-primary text-white font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter ton premier coaché
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {clients.map((client) => {
                const stepsPercent = Math.min(Math.round((client.stepsToday / client.stepsGoal) * 100), 100);
                const meal = lastMeal(client);
                return (
                  <Card
                    key={client.id}
                    className="glass-card border-primary/20 cursor-pointer hover:border-primary/40 transition-all duration-200"
                    onClick={() => navigate(`/coaching/${client.id}`)}
                  >
                    <CardContent className="p-4 md:p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center text-2xl shrink-0">
                          {client.avatarEmoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-foreground truncate">{client.name}</h3>
                            <span className="text-xs text-muted-foreground shrink-0">{client.lastActivityLabel}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5 min-w-[110px]">
                              <Footprints className="w-3.5 h-3.5 text-secondary shrink-0" />
                              {client.stepsToday.toLocaleString('fr-FR')} pas
                            </span>
                            {meal && (
                              <span className="flex items-center gap-1.5 truncate">
                                <ChefHat className="w-3.5 h-3.5 text-secondary shrink-0" />
                                <span className="truncate">{meal.emoji} {meal.nom}</span>
                              </span>
                            )}
                          </div>
                          <Progress value={stepsPercent} size="sm" variant="subtle" className="mt-2" />
                        </div>
                        <Button variant="ghost" size="sm" onClick={(e) => handleRemoveClient(e, client.id)} className="text-muted-foreground/60 hover:text-destructive shrink-0 h-8 w-8 p-0">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Dialog ajout de coaché */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un coaché</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Nom</label>
              <Input
                placeholder="Prénom et nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Sport</label>
              <Select value={form.sportClass} onValueChange={(value) => setForm({ ...form, sportClass: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SPORT_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.emoji} {s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Rang</label>
                <Select value={form.rank} onValueChange={(value) => setForm({ ...form, rank: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {RANK_OPTIONS.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Objectif pas/jour</label>
                <Input
                  type="number"
                  min="1000"
                  step="500"
                  value={form.stepsGoal}
                  onChange={(e) => setForm({ ...form, stepsGoal: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleAddClient} disabled={!form.name.trim()} className="w-full gradient-primary text-white font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Coaching;
