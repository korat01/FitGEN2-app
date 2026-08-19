import jsPDF from 'jspdf';
import type { AssignedProgram, JourSemaine, ProgramExercise } from '@/types/coaching';
import { JOURS_SEMAINE } from '@/types/coaching';
import type { GeneratedMealPlan } from '@/types/nutritionPlan';

// Export PDF côté client (pas de backend) — pensé pour un coach qui veut donner un programme ou un
// plan alimentaire à quelqu'un qui n'a pas de compte dans l'app (impression / envoi par mail).

const JOUR_LABELS: Record<JourSemaine, string> = {
  lundi: 'Lundi', mardi: 'Mardi', mercredi: 'Mercredi', jeudi: 'Jeudi',
  vendredi: 'Vendredi', samedi: 'Samedi', dimanche: 'Dimanche',
};

const PAGE_HEIGHT = 297; // A4 en mm
const MARGIN = 18;
const MAX_Y = PAGE_HEIGHT - MARGIN;

const today = () => new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

/** Petit gestionnaire de curseur Y qui saute de page automatiquement — jsPDF ne le fait pas tout
    seul en mode texte libre (contrairement à autoTable), donc on le fait à la main. */
class Cursor {
  doc: jsPDF;
  y: number;
  constructor(doc: jsPDF) {
    this.doc = doc;
    this.y = MARGIN;
  }
  ensureSpace(needed: number) {
    if (this.y + needed > MAX_Y) {
      this.doc.addPage();
      this.y = MARGIN;
    }
  }
  line(text: string, size: number, opts: { bold?: boolean; color?: [number, number, number]; gap?: number } = {}) {
    this.ensureSpace(opts.gap ?? size * 0.6);
    this.doc.setFontSize(size);
    this.doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
    this.doc.setTextColor(...(opts.color ?? [30, 30, 30]));
    this.doc.text(text, MARGIN, this.y);
    this.y += (opts.gap ?? size * 0.6) + 2;
  }
  space(h: number) {
    this.y += h;
  }
  rule() {
    this.ensureSpace(4);
    this.doc.setDrawColor(210, 210, 210);
    this.doc.line(MARGIN, this.y, 210 - MARGIN, this.y);
    this.y += 6;
  }
}

const describeExercise = (ex: ProgramExercise): string => {
  const parts: string[] = [];
  if (ex.series) parts.push(`${ex.series} séries`);
  if (ex.repetitions) parts.push(`${ex.repetitions} reps`);
  if (ex.charge) parts.push(`${ex.charge} kg`);
  if (ex.dureeSecondes) parts.push(`${ex.dureeSecondes}s`);
  if (ex.distanceMetres) parts.push(ex.distanceMetres >= 1000 ? `${(ex.distanceMetres / 1000).toFixed(1)}km` : `${ex.distanceMetres}m`);
  if (ex.reposSecondes) parts.push(`repos ${ex.reposSecondes}s`);
  return parts.join(' · ');
};

export const exportProgramToPdf = (clientName: string, program: AssignedProgram) => {
  const doc = new jsPDF();
  const c = new Cursor(doc);

  c.line('Programme d\'entraînement', 20, { bold: true, gap: 10 });
  c.line(clientName ? `Pour ${clientName}` : 'Programme personnalisé', 11, { color: [110, 110, 110] });
  c.line(`Généré le ${today()} avec Ascend`, 9, { color: [150, 150, 150] });
  c.space(4);
  c.rule();

  const activeDays = JOURS_SEMAINE.filter((d) => (program[d]?.length || 0) > 0);

  if (activeDays.length === 0) {
    c.line('Aucun exercice programmé.', 11, { color: [110, 110, 110] });
  }

  activeDays.forEach((day) => {
    const exercises = program[day] || [];
    c.line(JOUR_LABELS[day], 15, { bold: true, gap: 8, color: [30, 30, 30] });
    exercises.forEach((ex, i) => {
      c.ensureSpace(12);
      c.line(`${i + 1}. ${ex.nom}`, 11.5, { bold: true, gap: 6 });
      const desc = describeExercise(ex);
      if (desc) c.line(desc, 10, { color: [90, 90, 90], gap: 6 });
    });
    c.space(4);
  });

  doc.save(`programme-${(clientName || 'ascend').toLowerCase().replace(/\s+/g, '-')}.pdf`);
};

export const exportMealPlanToPdf = (clientName: string, plan: GeneratedMealPlan) => {
  const doc = new jsPDF();
  const c = new Cursor(doc);

  c.line('Plan alimentaire', 20, { bold: true, gap: 10 });
  c.line(clientName ? `Pour ${clientName}` : 'Plan personnalisé', 11, { color: [110, 110, 110] });
  c.line(`Généré le ${today()} avec Ascend`, 9, { color: [150, 150, 150] });
  c.space(4);
  c.rule();

  c.line(
    `Objectif : ${plan.targets.calories} kcal/jour  ·  P ${plan.targets.proteinesG}g  ·  G ${plan.targets.glucidesG}g  ·  L ${plan.targets.lipidesG}g`,
    11,
    { bold: true, gap: 8 }
  );
  c.space(4);

  plan.days.forEach((day, dayIndex) => {
    c.rule();
    c.line(`Jour ${dayIndex + 1} — ${day.jour}`, 14, { bold: true, gap: 7 });
    c.line(`${day.totalCalories} kcal  ·  P ${day.totalProteines}g  ·  G ${day.totalGlucides}g  ·  L ${day.totalLipides}g`, 9.5, { color: [110, 110, 110], gap: 6 });
    c.space(2);
    day.meals.forEach((meal) => {
      c.ensureSpace(12);
      c.line(`${meal.label} — ${meal.nom}`, 11, { bold: true, gap: 5.5 });
      c.line(`${meal.calories} kcal · P ${meal.proteines}g · G ${meal.glucides}g · L ${meal.lipides}g`, 9.5, { color: [110, 110, 110], gap: 6 });
    });
    c.space(3);
  });

  doc.save(`plan-alimentaire-${(clientName || 'ascend').toLowerCase().replace(/\s+/g, '-')}.pdf`);
};
