import { ClientProfile, BlocExercice, SeanceJour, ProgrammeHebdomadaire, Contraintes } from '@/types/programme';
import { getAllBlocsEntrainement } from './blocsEntrainementData';
import { FocusArea, ForceFocus, UserProfile } from '@/types/profile';
import { Exercice, Programme } from '@/types/programme';

export function creerProgrammeOptimise(
  profilClient: ClientProfile, 
  objectif: string, 
  contraintes: Contraintes, 
  disponibilite: string[]
): ProgrammeHebdomadaire {
  // Initialiser le programme complet
  const programmeHebdomadaire: ProgrammeHebdomadaire = {};
  
  // 1. Définir le nombre de séances selon la vitesse de progression et l'objectif
  const nombreSeances = determinerNombreSeances(profilClient.vitesse_progression, profilClient.objectif);
  
  // 2. Optimiser les jours selon disponibilité et nombre de séances requis
  const joursOptimaux = optimiserJoursSemaine(disponibilite, nombreSeances);
  
  // 3. Générer la répartition des types d'entraînement selon le profil client
  const focusRepartition = genererRepartitionSelonProfil(
    joursOptimaux.length,
    profilClient,
    objectif
  );
  
  // 4. Pour chaque jour d'entraînement optimisé
  for (let i = 0; i < joursOptimaux.length; i++) {
    const jour = joursOptimaux[i];
    const focus = focusRepartition[i];
    
    // Initialiser la séance du jour
    const séance: SeanceJour = {
      nom: `${jour.charAt(0).toUpperCase() + jour.slice(1)} - ${getFocusDisplayName(focus)}`,
      focus: focus,
      blocs: []
    };
    
    // Sélectionner blocs d'exercices compatibles pour ce jour
    const tousBlocs = getAllBlocsEntrainement();
    const blocsCandidats = filtrerBlocsCompatibles(
      tousBlocs,
      focus,
      profilClient.niveau,
      contraintes.médicales,
      profilClient.equipement_disponible
    );
    
    // Éviter les exercices identiques sur 2 jours consécutifs
    const exercicesRecents = obtenirExercicesRecents(programmeHebdomadaire, joursOptimaux, i);
    const blocsNonUtilises = blocsCandidats.filter(bloc => 
      !exercicesRecents.includes(bloc.nom)
    );
    
    // Optimiser la séquence des blocs selon l'objectif et le profil
    const blocsOptimisés = optimiserSequenceBlocs(
      blocsNonUtilises.length > 0 ? blocsNonUtilises : blocsCandidats,
      objectif,
      profilClient.age,
      profilClient.limitations_physiques,
      profilClient.vitesse_progression,
      profilClient.niveau
    );
    
    // Déterminer le nombre d'exercices selon le profil
    const nombreExercices = determinerNombreExercices(profilClient.vitesse_progression, profilClient.objectif);
    séance.blocs = blocsOptimisés.slice(0, nombreExercices);
    
    // Adapter les charges selon le niveau et les 1RM
    séance.blocs = adapterChargesRepetitions(
      séance.blocs, 
      profilClient.niveau, 
      profilClient.rm_values, 
      profilClient.vitesse_progression,
      profilClient.objectif
    );
    
    // Calculer la durée estimée et l'intensité
    séance.durée_estimée = calculerDureeSeance(séance.blocs, profilClient.niveau);
    séance.niveau_intensité = determinerIntensite(profilClient.vitesse_progression, profilClient.objectif);
    
    // Ajouter la séance au programme
    programmeHebdomadaire[jour] = séance;
  }
  
  return programmeHebdomadaire;
}

function determinerNombreSeances(vitesseProgression: string, objectif: string): { min: number, max: number } {
  // Base selon la vitesse de progression
  let baseSeances = { min: 2, max: 3 };
  
  switch (vitesseProgression) {
    case 'maintien':
      baseSeances = { min: 2, max: 3 };
      break;
    case 'progression_legere':
      baseSeances = { min: 3, max: 4 };
      break;
    case 'progression_rapide':
      baseSeances = { min: 4, max: 6 };
      break;
  }
  
  // Ajuster selon l'objectif
  switch (objectif) {
    case 'prise_de_masse':
      baseSeances.max = Math.min(baseSeances.max + 1, 6);
      break;
    case 'perte_de_poids':
      baseSeances.min = Math.max(baseSeances.min, 3);
      baseSeances.max = Math.min(baseSeances.max + 1, 6);
      break;
    case 'endurance':
      baseSeances.min = Math.max(baseSeances.min, 3);
      break;
    case 'force':
      baseSeances.max = Math.min(baseSeances.max, 4); // Éviter le surentraînement
      break;
  }
  
  return baseSeances;
}

function determinerNombreExercices(vitesseProgression: string, objectif: string): number {
  let baseExercices = 4;
  
  switch (vitesseProgression) {
    case 'maintien':
      baseExercices = 3;
      break;
    case 'progression_legere':
      baseExercices = 4;
      break;
    case 'progression_rapide':
      baseExercices = 5;
      break;
  }
  
  // Ajuster selon l'objectif
  switch (objectif) {
    case 'prise_de_masse':
      baseExercices += 1;
      break;
    case 'perte_de_poids':
      baseExercices += 1; // Plus d'exercices pour brûler des calories
      break;
    case 'endurance':
      baseExercices += 1; // Plus d'exercices cardio
      break;
    case 'force':
      baseExercices = Math.min(baseExercices, 4); // Moins d'exercices mais plus intenses
      break;
  }
  
  return baseExercices;
}

function genererRepartitionSelonProfil(
  nombreSeances: number, 
  profilClient: ClientProfile, 
  objectif: string
): string[] {
  const repartition: string[] = [];
  
  // Déterminer le sexe (amélioration de la détection)
  const estFemme = detecterSexe(profilClient.nom);
  
  // Créer une répartition équilibrée selon l'objectif et le profil
  if (objectif === 'prise_de_masse') {
    // Focus sur les exercices composés
    const focuses = ['haut_corps_poussée', 'haut_corps_tirage', 'bas_corps_force', 'full_body_complet'];
    for (let i = 0; i < nombreSeances; i++) {
      repartition.push(focuses[i % focuses.length]);
    }
  } else if (objectif === 'perte_de_poids') {
    // Plus de cardio et full body
    const focuses = ['full_body_complet', 'cardio_intensif', 'bas_corps_endurance', 'haut_corps_leger'];
    for (let i = 0; i < nombreSeances; i++) {
      repartition.push(focuses[i % focuses.length]);
    }
  } else if (objectif === 'endurance') {
    // Focus cardio et endurance
    const focuses = ['cardio_intensif', 'bas_corps_endurance', 'full_body_leger', 'cardio_modere'];
    for (let i = 0; i < nombreSeances; i++) {
      repartition.push(focuses[i % focuses.length]);
    }
  } else if (objectif === 'force') {
    // Focus sur les exercices de force
    const focuses = ['haut_corps_poussée', 'haut_corps_tirage', 'bas_corps_force', 'full_body_complet'];
    for (let i = 0; i < nombreSeances; i++) {
      repartition.push(focuses[i % focuses.length]);
    }
  } else { // remise_en_forme
    // Répartition équilibrée
    if (estFemme) {
      // Plus de focus bas du corps pour les femmes
      const focuses = ['bas_corps_fessiers', 'bas_corps_jambes', 'haut_corps_leger', 'full_body_leger'];
      for (let i = 0; i < nombreSeances; i++) {
        repartition.push(focuses[i % focuses.length]);
      }
    } else {
      // Répartition équilibrée pour les hommes
      const focuses = ['haut_corps_poussée', 'haut_corps_tirage', 'bas_corps_force', 'full_body_complet'];
      for (let i = 0; i < nombreSeances; i++) {
        repartition.push(focuses[i % focuses.length]);
      }
    }
  }
  
  return repartition;
}

function detecterSexe(nom: string): boolean {
  const prenomsFeminins = [
    'marie', 'sarah', 'emma', 'claire', 'julie', 'sophie', 'laura', 'camille',
    'léa', 'chloé', 'manon', 'juliette', 'lola', 'zoé', 'agathe', 'inès',
    'jade', 'louise', 'alice', 'eva', 'lucie', 'anna', 'nina', 'elisa'
  ];
  
  return prenomsFeminins.some(prenom => 
    nom.toLowerCase().includes(prenom)
  );
}

function getFocusDisplayName(focus: string): string {
  const displayNames: { [key: string]: string } = {
    'haut_corps_poussée': 'Haut du corps - Poussée',
    'haut_corps_tirage': 'Haut du corps - Tirage',
    'haut_corps_leger': 'Haut du corps - Léger',
    'bas_corps_force': 'Bas du corps - Force',
    'bas_corps_endurance': 'Bas du corps - Endurance',
    'bas_corps_fessiers': 'Bas du corps - Fessiers',
    'bas_corps_jambes': 'Bas du corps - Jambes',
    'full_body_complet': 'Full Body - Complet',
    'full_body_leger': 'Full Body - Léger',
    'cardio_intensif': 'Cardio - Intensif',
    'cardio_modere': 'Cardio - Modéré'
  };
  
  return displayNames[focus] || focus;
}

function obtenirExercicesRecents(
  programme: ProgrammeHebdomadaire, 
  joursOptimaux: string[], 
  indexActuel: number
): string[] {
  const exercicesRecents: string[] = [];
  
  // Vérifier les 2 derniers jours pour éviter la répétition
  for (let i = Math.max(0, indexActuel - 2); i < indexActuel; i++) {
    const jourPrecedent = joursOptimaux[i];
    if (programme[jourPrecedent]) {
      exercicesRecents.push(
        ...programme[jourPrecedent].blocs.map(bloc => bloc.nom)
      );
    }
  }
  
  return exercicesRecents;
}


function optimiserJoursSemaine(
  disponibilite: string[], 
  nombreSeances: { min: number, max: number }
): string[] {
  // Si l'utilisateur a moins de jours disponibles que recommandé
  if (disponibilite.length < nombreSeances.min) {
    return disponibilite; // Prendre tous les jours disponibles
  }
  
  // Si l'utilisateur a plus de jours disponibles que nécessaire
  if (disponibilite.length > nombreSeances.max) {
    // Choisir le nombre optimal avec espacement
    return choisirJoursAvecEspacement(disponibilite, nombreSeances.max);
  }
  
  // Si l'utilisateur a exactement le bon nombre de jours ou dans la fourchette
  const nombreOptimal = Math.min(disponibilite.length, nombreSeances.max);
  return choisirJoursAvecEspacement(disponibilite, nombreOptimal);
}

function choisirJoursAvecEspacement(joursDisponibles: string[], nombreVoulu: number): string[] {
  // Si on veut tous les jours disponibles
  if (nombreVoulu >= joursDisponibles.length) {
    return joursDisponibles;
  }
  
  // Ordre de priorité des jours (pour une meilleure répartition)
  const ordrePriorite = ['lundi', 'mercredi', 'vendredi', 'mardi', 'jeudi', 'samedi', 'dimanche'];
  
  const joursChoisis: string[] = [];
  
  // Choisir les jours en priorité selon l'ordre et la disponibilité
  for (const jour of ordrePriorite) {
    if (joursDisponibles.includes(jour) && joursChoisis.length < nombreVoulu) {
      joursChoisis.push(jour);
    }
  }
  
  // Si on n'a pas assez de jours, compléter avec les restants
  for (const jour of joursDisponibles) {
    if (!joursChoisis.includes(jour) && joursChoisis.length < nombreVoulu) {
      joursChoisis.push(jour);
    }
  }
  
  return joursChoisis;
}

function filtrerBlocsCompatibles(
  tousBlocs: BlocExercice[],
  focus: string,
  niveau: string,
  contraintesMedicales: string[],
  equipement: string[]
): BlocExercice[] {
  return tousBlocs.filter(bloc => {
    // Vérifier compatibilité avec le focus du jour
    const focusCompatible = verifierFocusCompatible(bloc, focus);
    
    // Vérifier compatibilité avec les contraintes médicales
    const contraintesOK = verifierContraintesMedicales(bloc, contraintesMedicales);
    
    // Vérifier compatibilité avec le niveau
    const niveauOK = verifierNiveau(bloc, niveau);
    
    // Vérifier compatibilité avec l'équipement disponible
    const equipementOK = verifierEquipement(bloc, equipement);
    
    return focusCompatible && contraintesOK && niveauOK && equipementOK;
  });
}

function verifierFocusCompatible(bloc: BlocExercice, focus: string): boolean {
  const focusMapping: { [key: string]: string[] } = {
    'haut_corps_poussée': ['composé', 'isolé'],
    'haut_corps_tirage': ['composé', 'isolé'],
    'haut_corps_leger': ['composé', 'isolé', 'étirement'],
    'bas_corps_force': ['composé'],
    'bas_corps_endurance': ['composé'],
    'bas_corps_fessiers': ['composé', 'isolé'],
    'bas_corps_jambes': ['composé', 'isolé'],
    'full_body_complet': ['composé'],
    'full_body_leger': ['composé', 'cardio', 'étirement'],
    'cardio_intensif': ['cardio'],
    'cardio_modere': ['cardio'],
    'repos_actif': ['étirement', 'cardio']
  };
  
  const typesCompatibles = focusMapping[focus] || ['composé'];
  return typesCompatibles.includes(bloc.type);
}

function verifierContraintesMedicales(bloc: BlocExercice, contraintes: string[]): boolean {
  if (!bloc.contraintes_médicales) return true;
  
  // Vérifier qu'aucune contrainte du bloc n'est dans les contraintes du client
  return !bloc.contraintes_médicales.some(contrainte => 
    contraintes.includes(contrainte)
  );
}

function verifierNiveau(bloc: BlocExercice, niveau: string): boolean {
  const niveauMapping: { [key: string]: number } = {
    'débutant': 2,
    'intermédiaire': 4,
    'avancé': 5
  };
  
  const niveauMax = niveauMapping[niveau] || 2;
  return bloc.difficulté <= niveauMax;
}

function verifierEquipement(bloc: BlocExercice, equipementDisponible: string[]): boolean {
  // Si aucun équipement spécifique requis ou si "aucun" est requis
  if (bloc.équipement.includes('aucun')) return true;
  
  // Vérifier qu'au moins un équipement requis est disponible
  return bloc.équipement.some(equip => equipementDisponible.includes(equip));
}

function optimiserSequenceBlocs(
  blocs: BlocExercice[],
  objectif: string,
  age: number,
  limitations?: string,
  vitesseProgression?: string,
  niveau?: string
): BlocExercice[] {
  let blocsOptimisés = [...blocs];
  
  // Trier selon l'objectif
  if (objectif === 'force') {
    // Pour la force : privilégier massivement les exercices polyarticulaires
    blocsOptimisés = blocsOptimisés.filter(bloc => bloc.type === 'composé');
    blocsOptimisés.sort((a, b) => b.difficulté - a.difficulté);
  } else if (objectif === 'prise_de_masse') {
    blocsOptimisés.sort((a, b) => {
      if (a.type === 'composé' && b.type !== 'composé') return -1;
      if (a.type !== 'composé' && b.type === 'composé') return 1;
      return 0;
    });
  } else if (objectif === 'perte_de_poids') {
    blocsOptimisés.sort((a, b) => {
      if (a.type === 'cardio' && b.type !== 'cardio') return -1;
      if (a.type !== 'cardio' && b.type === 'cardio') return 1;
      return 0;
    });
  }
  
  // Adapter selon la vitesse de progression et niveau d'expérience
  if ((vitesseProgression === 'progression_rapide' || vitesseProgression === 'progression_legere') && niveau !== 'débutant') {
    // Pour progression rapide/modérée avec expérience : privilégier polyarticulaires
    blocsOptimisés = blocsOptimisés.filter(bloc => 
      bloc.type === 'composé' || bloc.type === 'gainage'
    );
    blocsOptimisés.sort((a, b) => {
      if (a.type === 'composé' && b.type !== 'composé') return -1;
      if (a.type !== 'composé' && b.type === 'composé') return 1;
      return b.difficulté - a.difficulté;
    });
  } else if (vitesseProgression === 'progression_rapide') {
    // Privilégier les exercices plus difficiles
    blocsOptimisés = blocsOptimisés.filter(bloc => bloc.difficulté >= 2);
    blocsOptimisés.sort((a, b) => b.difficulté - a.difficulté);
  } else if (vitesseProgression === 'maintien') {
    // Privilégier les exercices plus accessibles
    blocsOptimisés = blocsOptimisés.filter(bloc => bloc.difficulté <= 3);
  }
  
  // Adapter selon l'âge et niveau avancé
  if (age > 50) {
    blocsOptimisés = blocsOptimisés.filter(bloc => bloc.difficulté <= 3);
  } else if (niveau === 'avancé' && (!limitations || limitations === '')) {
    // Pour les avancés sans limitation : privilégier exercices très difficiles
    blocsOptimisés = blocsOptimisés.filter(bloc => bloc.difficulté >= 4);
    blocsOptimisés.sort((a, b) => b.difficulté - a.difficulté);
  }
  
  return blocsOptimisés;
}

function calculerPourcentageSeance(
  objectif: string, 
  niveau: string, 
  jourSemaine: string, 
  vitesseProgression?: string
): number {
  // Définir les pourcentages de base par séance selon l'objectif
  const pourcentagesParObjectif: { [key: string]: { [key: string]: number } } = {
    'force': {
      'seance1': 80,
      'seance2': 75,
      'seance3': 85,
    },
    'prise_de_masse': {
      'seance1': 75,
      'seance2': 80,
      'seance3': 70,
    },
    'endurance': {
      'seance1': 60,
      'seance2': 65,
      'seance3': 55,
    }
  };

  const jourToSeance: { [key: string]: string } = {
    'lundi': 'seance1',
    'mercredi': 'seance2', 
    'vendredi': 'seance3',
    'mardi': 'seance2',
    'jeudi': 'seance1',
    'samedi': 'seance3',
    'dimanche': 'seance1'
  };

  const seance = jourToSeance[jourSemaine] || 'seance1';
  let pourcentageBase = pourcentagesParObjectif[objectif]?.[seance] || 70;

  // Ajuster selon la vitesse de progression
  if (vitesseProgression === 'maintien') {
    pourcentageBase *= 0.85; // 15% de réduction pour maintien
  } else if (vitesseProgression === 'progression_rapide') {
    pourcentageBase *= 1.1; // 10% d'augmentation pour progression rapide
  }

  return Math.round(pourcentageBase);
}

function adapterChargesRepetitions(
  blocs: BlocExercice[], 
  niveau: string, 
  rmValues?: { [key: string]: number },
  vitesseProgression?: string,
  objectif?: string
): BlocExercice[] {
  return blocs.map((bloc, index) => {
    const blocAdapte = { ...bloc };
    
    // Calculer le pourcentage pour cette séance avec la vitesse de progression
    const pourcentageSeance = calculerPourcentageSeance('force', niveau, 'lundi', vitesseProgression) - (index * 3);
    
    // Si le bloc a une référence RM et que le client a fourni cette valeur
    if (bloc.exercice_rm && rmValues?.[bloc.exercice_rm]) {
      const rmValue = rmValues[bloc.exercice_rm];
      const pourcentage = bloc.pourcentage_rm || pourcentageSeance;
      
      // Calculer la charge basée sur le pourcentage du 1RM (arrondi sans décimales)
      blocAdapte.charge = Math.round(rmValue * pourcentage / 100);
      
      // Adapter les répétitions et séries selon le pourcentage ET la vitesse de progression
      if (pourcentage >= 80) {
        blocAdapte.répétitions = '3-4';
        blocAdapte.séries = 3;
      } else if (pourcentage >= 70) {
        blocAdapte.répétitions = '4-6';
        blocAdapte.séries = 4;
      } else if (pourcentage >= 65) {
        blocAdapte.répétitions = '6-8';
        blocAdapte.séries = vitesseProgression === 'maintien' ? 3 : 4;
      } else {
        blocAdapte.répétitions = '8-12';
        blocAdapte.séries = vitesseProgression === 'maintien' ? 2 : 3;
      }
      
      blocAdapte.description = `${pourcentage}% du 1RM (${rmValue}kg) - ${vitesseProgression}`;
    } else {
      // Adaptation classique par niveau et vitesse si pas de 1RM
      let multiplicateurCharge = 1;
      let ajustementSeries = 0;
      
      // Ajuster selon la vitesse de progression
      if (vitesseProgression === 'maintien') {
        multiplicateurCharge = 0.9;
        ajustementSeries = -1;
      } else if (vitesseProgression === 'progression_rapide') {
        multiplicateurCharge = 1.15;
        ajustementSeries = 1;
      }
      
      if (niveau === 'débutant') {
        blocAdapte.charge = Math.round(Math.max(0, bloc.charge * 0.7 * multiplicateurCharge));
        if (typeof bloc.répétitions === 'number') {
          blocAdapte.répétitions = Math.min(15, bloc.répétitions + 3);
        }
        blocAdapte.séries = Math.max(1, (bloc.séries || 3) - 1 + ajustementSeries);
      } else if (niveau === 'avancé') {
        blocAdapte.charge = Math.round(bloc.charge * 1.2 * multiplicateurCharge);
        if (typeof bloc.répétitions === 'number') {
          blocAdapte.répétitions = Math.max(6, bloc.répétitions - 2);
        }
        blocAdapte.séries = (bloc.séries || 3) + 1 + ajustementSeries;
      } else {
        blocAdapte.charge = Math.round(bloc.charge * multiplicateurCharge);
        blocAdapte.séries = Math.max(1, (bloc.séries || 3) + ajustementSeries);
      }
    }
    
    // Adapter temps de repos selon la vitesse de progression
    if (vitesseProgression === 'progression_rapide') {
      blocAdapte.temps_repos = '90-120s'; // Plus de repos pour récupération
    } else if (vitesseProgression === 'maintien') {
      blocAdapte.temps_repos = '45-60s'; // Moins de repos, rythme modéré
    } else {
      blocAdapte.temps_repos = '60-90s'; // Standard
    }
    
    return blocAdapte;
  });
}

function calculerDureeSeance(blocs: BlocExercice[], niveau: string): number {
  let dureeMinutes = 0;
  
  // Temps d'échauffement
  dureeMinutes += 10;
  
  // Temps pour chaque exercice
  for (const bloc of blocs) {
    // Temps d'exécution des séries
    const series = bloc.séries || 3;
    const repetitions = typeof bloc.répétitions === 'number' ? bloc.répétitions : 10;
    const tempsParRepetition = 3; // secondes par répétition
    const tempsSeries = (repetitions * tempsParRepetition * series) / 60; // en minutes
    
    // Temps de repos entre les séries
    let tempsRepos = 0;
    if (bloc.temps_repos) {
      const temps = bloc.temps_repos.split('-');
      const min = parseInt(temps[0]);
      const max = parseInt(temps[1]);
      tempsRepos = ((min + max) / 2 * (series - 1)) / 60; // en minutes
    }
    
    dureeMinutes += tempsSeries + tempsRepos;
  }
  
  // Temps d'étirement final
  dureeMinutes += 5;
  
  return Math.round(dureeMinutes);
}

function determinerIntensite(vitesseProgression: string, objectif: string): 'faible' | 'modérée' | 'élevée' {
  if (objectif === 'force') {
    return 'élevée';
  } else if (objectif === 'prise_de_masse') {
    return 'élevée';
  } else if (objectif === 'perte_de_poids') {
    return 'élevée';
  } else if (objectif === 'endurance') {
    return 'élevée';
  } else { // remise_en_forme
    return 'modérée';
  }
}

export class ProgrammeGenerator {
  private profile: UserProfile;
  private focusAreas: FocusArea[];
  private forceFocus: ForceFocus[];

  constructor(profile: UserProfile, focusAreas: FocusArea[] = [], forceFocus: ForceFocus[] = []) {
    this.profile = profile;
    this.focusAreas = focusAreas;
    this.forceFocus = forceFocus;
  }

  generateWeeklyProgramme(): Programme[] {
    const programmes: Programme[] = [];
    const jours = this.profile.frequence;
    
    if (this.profile.objectif === 'force' || this.profile.objectif === 'powerlifting') {
      return this.generateForceProgramme(jours);
    }
    
    if (this.profile.objectif === 'perte_poids' || this.profile.objectif === 'prise_masse' || this.profile.objectif === 'maintien') {
      return this.generateMusculationProgramme(jours);
    }
    
    return programmes;
  }

  private generateForceProgramme(jours: number): Programme[] {
    const programmes: Programme[] = [];
    const selectedFocus = this.forceFocus.filter(f => f.priorite > 0);
    
    if (selectedFocus.length === 0) {
      // Programme équilibré si aucun focus sélectionné
      return this.generateBalancedForceProgramme(jours);
    }

    // Générer les programmes selon les priorités
    for (let i = 0; i < jours; i++) {
      const focus = this.getFocusForDay(i, selectedFocus);
      const programme = this.createForceProgramme(focus, i + 1);
      programmes.push(programme);
    }

    return programmes;
  }

  private generateMusculationProgramme(jours: number): Programme[] {
    const programmes: Programme[] = [];
    const selectedAreas = this.focusAreas.filter(area => area.pourcentage > 0);
    
    if (selectedAreas.length === 0) {
      // Programme équilibré si aucun focus sélectionné
      return this.generateBalancedMusculationProgramme(jours);
    }

    // Calculer la répartition des jours
    const dayDistribution = this.calculateDayDistribution(selectedAreas, jours);
    
    let dayIndex = 0;
    for (const [areaId, days] of Object.entries(dayDistribution)) {
      const area = selectedAreas.find(a => a.id === areaId);
      if (!area) continue;

      for (let i = 0; i < days; i++) {
        const programme = this.createMusculationProgramme(area, dayIndex + 1);
        programmes.push(programme);
        dayIndex++;
      }
    }

    return programmes;
  }

  private calculateDayDistribution(areas: FocusArea[], totalDays: number): Record<string, number> {
    const distribution: Record<string, number> = {};
    const totalPercentage = areas.reduce((sum, area) => sum + area.pourcentage, 0);
    
    areas.forEach(area => {
      const days = Math.round((area.pourcentage / totalPercentage) * totalDays);
      distribution[area.id] = days;
    });

    // Ajuster pour que la somme fasse exactement totalDays
    const currentTotal = Object.values(distribution).reduce((sum, days) => sum + days, 0);
    const difference = totalDays - currentTotal;
    
    if (difference !== 0) {
      // Ajuster la zone avec le plus grand pourcentage
      const maxArea = areas.reduce((max, area) => 
        area.pourcentage > max.pourcentage ? area : max
      );
      distribution[maxArea.id] += difference;
    }

    return distribution;
  }

  private getFocusForDay(dayIndex: number, focusList: ForceFocus[]): ForceFocus {
    // Rotation des focus selon les priorités
    const sortedFocus = focusList.sort((a, b) => a.priorite - b.priorite);
    return sortedFocus[dayIndex % sortedFocus.length];
  }

  private createForceProgramme(focus: ForceFocus, dayNumber: number): Programme {
    const exercices = this.getForceExercices(focus);
    
    return {
      id: dayNumber,
      nom: `Force - ${focus.nom}`,
      duree: this.profile.preferences.dureeSeance,
      difficulte: this.profile.niveau,
      objectif: focus.objectif,
      exercices,
      calories: this.calculateCalories(exercices),
      progression: 0,
      statut: 'Non commencé' as const,
      streak: 0,
      xp: 0
    };
  }

  private createMusculationProgramme(area: FocusArea, dayNumber: number): Programme {
    const exercices = this.getMusculationExercices(area);
    
    return {
      id: dayNumber,
      nom: `Musculation - ${area.nom}`,
      duree: this.profile.preferences.dureeSeance,
      difficulte: this.profile.niveau,
      objectif: `Développement des ${area.nom}`,
      exercices,
      calories: this.calculateCalories(exercices),
      progression: 0,
      statut: 'Non commencé' as const,
      streak: 0,
      xp: 0
    };
  }

  private getForceExercices(focus: ForceFocus): Exercice[] {
    const baseExercices = this.getBaseForceExercices();
    const focusExercices = this.getFocusSpecificExercices(focus);
    
    return [...baseExercices, ...focusExercices];
  }

  private getMusculationExercices(area: FocusArea): Exercice[] {
    const baseExercices = this.getBaseMusculationExercices();
    const areaExercices = this.getAreaSpecificExercices(area);
    
    return [...baseExercices, ...areaExercices];
  }

  private getBaseForceExercices(): Exercice[] {
    return [
      {
        id: 1,
        nom: "Échauffement",
        series: 1,
        repetitions: 10,
        poids: 0,
        repos: 60,
        description: "Échauffement général",
        muscle: "Tout le corps",
        difficulte: 'Facile' as const,
        termine: false,
        calories: 20
      }
    ];
  }

  private getBaseMusculationExercices(): Exercice[] {
    return [
      {
        id: 1,
        nom: "Échauffement",
        series: 1,
        repetitions: 10,
        poids: 0,
        repos: 60,
        description: "Échauffement général",
        muscle: "Tout le corps",
        difficulte: 'Facile' as const,
        termine: false,
        calories: 20
      }
    ];
  }

  private getFocusSpecificExercices(focus: ForceFocus): Exercice[] {
    const exercicesMap: Record<string, Exercice[]> = {
      squat: [
        {
          id: 2,
          nom: "Squats",
          series: 5,
          repetitions: 5,
          poids: this.calculateWeight('squat'),
          repos: 180,
          description: "Exercice roi pour les jambes",
          muscle: "Quadriceps",
          difficulte: 'Difficile' as const,
          termine: false,
          calories: 150
        },
        {
          id: 3,
          nom: "Squats frontaux",
          series: 3,
          repetitions: 8,
          poids: this.calculateWeight('squat') * 0.8,
          repos: 120,
          description: "Variation du squat",
          muscle: "Quadriceps",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 100
        }
      ],
      deadlift: [
        {
          id: 2,
          nom: "Deadlift",
          series: 5,
          repetitions: 5,
          poids: this.calculateWeight('deadlift'),
          repos: 180,
          description: "Exercice roi pour le dos",
          muscle: "Dorsaux",
          difficulte: 'Difficile' as const,
          termine: false,
          calories: 200
        },
        {
          id: 3,
          nom: "Rack pulls",
          series: 3,
          repetitions: 8,
          poids: this.calculateWeight('deadlift') * 1.2,
          repos: 120,
          description: "Variation du deadlift",
          muscle: "Dorsaux",
          difficulte: 'Difficile' as const,
          termine: false,
          calories: 120
        }
      ],
      bench_press: [
        {
          id: 2,
          nom: "Développé couché",
          series: 5,
          repetitions: 5,
          poids: this.calculateWeight('bench_press'),
          repos: 180,
          description: "Exercice roi pour les pectoraux",
          muscle: "Pectoraux",
          difficulte: 'Difficile' as const,
          termine: false,
          calories: 120
        },
        {
          id: 3,
          nom: "Développé incliné",
          series: 3,
          repetitions: 8,
          poids: this.calculateWeight('bench_press') * 0.8,
          repos: 120,
          description: "Variation du développé",
          muscle: "Pectoraux",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 80
        }
      ]
    };

    return exercicesMap[focus.exercice] || [];
  }

  private getAreaSpecificExercices(area: FocusArea): Exercice[] {
    const exercicesMap: Record<string, Exercice[]> = {
      bras: [
        {
          id: 2,
          nom: "Curls biceps",
          series: 4,
          repetitions: 12,
          poids: this.calculateWeight('biceps'),
          repos: 60,
          description: "Développement des biceps",
          muscle: "Biceps",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 80
        },
        {
          id: 3,
          nom: "Extensions triceps",
          series: 4,
          repetitions: 12,
          poids: this.calculateWeight('triceps'),
          repos: 60,
          description: "Développement des triceps",
          muscle: "Triceps",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 80
        }
      ],
      fesses: [
        {
          id: 2,
          nom: "Squats",
          series: 4,
          repetitions: 15,
          poids: this.calculateWeight('squat'),
          repos: 90,
          description: "Exercice principal pour les fesses",
          muscle: "Fesses",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 120
        },
        {
          id: 3,
          nom: "Hip thrust",
          series: 4,
          repetitions: 12,
          poids: this.calculateWeight('hip_thrust'),
          repos: 90,
          description: "Exercice ciblé pour les fesses",
          muscle: "Fesses",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 100
        },
        {
          id: 4,
          nom: "Lunges",
          series: 3,
          repetitions: 12,
          poids: this.calculateWeight('lunges'),
          repos: 60,
          description: "Exercice unilatéral pour les fesses",
          muscle: "Fesses",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 80
        }
      ],
      jambes: [
        {
          id: 2,
          nom: "Squats",
          series: 4,
          repetitions: 12,
          poids: this.calculateWeight('squat'),
          repos: 120,
          description: "Exercice principal pour les jambes",
          muscle: "Quadriceps",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 150
        },
        {
          id: 3,
          nom: "Leg press",
          series: 4,
          repetitions: 15,
          poids: this.calculateWeight('leg_press'),
          repos: 90,
          description: "Exercice pour les jambes",
          muscle: "Quadriceps",
          difficulte: 'Facile' as const,
          termine: false,
          calories: 100
        }
      ],
      dos: [
        {
          id: 2,
          nom: "Tractions",
          series: 4,
          repetitions: 8,
          poids: 0,
          repos: 120,
          description: "Exercice principal pour le dos",
          muscle: "Dorsaux",
          difficulte: 'Difficile' as const,
          termine: false,
          calories: 120
        },
        {
          id: 3,
          nom: "Rowing",
          series: 4,
          repetitions: 12,
          poids: this.calculateWeight('rowing'),
          repos: 90,
          description: "Exercice pour le dos",
          muscle: "Dorsaux",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 100
        }
      ],
      pectoraux: [
        {
          id: 2,
          nom: "Développé couché",
          series: 4,
          repetitions: 8,
          poids: this.calculateWeight('bench_press'),
          repos: 120,
          description: "Exercice principal pour les pectoraux",
          muscle: "Pectoraux",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 120
        },
        {
          id: 3,
          nom: "Pompes",
          series: 3,
          repetitions: 15,
          poids: 0,
          repos: 60,
          description: "Exercice au poids du corps",
          muscle: "Pectoraux",
          difficulte: 'Facile' as const,
          termine: false,
          calories: 80
        }
      ],
      abdominaux: [
        {
          id: 2,
          nom: "Planche",
          series: 3,
          repetitions: 45,
          poids: 0,
          repos: 60,
          description: "Exercice de gainage",
          muscle: "Abdominaux",
          difficulte: 'Moyen' as const,
          termine: false,
          calories: 60
        },
        {
          id: 3,
          nom: "Crunches",
          series: 3,
          repetitions: 20,
          poids: 0,
          repos: 45,
          description: "Exercice pour les abdominaux",
          muscle: "Abdominaux",
          difficulte: 'Facile' as const,
          termine: false,
          calories: 40
        }
      ]
    };

    return exercicesMap[area.id] || [];
  }

  private calculateWeight(exercice: string): number {
    // Logique de calcul du poids selon le niveau et l'exercice
    const baseWeight = this.profile.poids;
    const multipliers: Record<string, number> = {
      squat: 0.8,
      deadlift: 1.0,
      bench_press: 0.6,
      biceps: 0.1,
      triceps: 0.1,
      hip_thrust: 0.5,
      lunges: 0.3,
      leg_press: 1.5,
      rowing: 0.4
    };

    const multiplier = multipliers[exercice] || 0.5;
    const levelMultiplier = this.getLevelMultiplier();
    
    return Math.round(baseWeight * multiplier * levelMultiplier);
  }

  private getLevelMultiplier(): number {
    const multipliers = {
      debutant: 0.6,
      intermediaire: 0.8,
      avance: 1.0
    };
    return multipliers[this.profile.niveau] || 0.8;
  }

  private calculateCalories(exercices: Exercice[]): number {
    return exercices.reduce((total, ex) => total + ex.calories, 0);
  }

  private generateBalancedForceProgramme(jours: number): Programme[] {
    // Programme équilibré pour la force
    const programmes: Programme[] = [];
    const exercices = ['squat', 'deadlift', 'bench_press'];
    
    for (let i = 0; i < jours; i++) {
      const focus = exercices[i % exercices.length];
      const programme = this.createForceProgramme(
        { id: focus, nom: focus, exercice: focus, priorite: 1, objectif: 'Développement équilibré' },
        i + 1
      );
      programmes.push(programme);
    }
    
    return programmes;
  }

  private generateBalancedMusculationProgramme(jours: number): Programme[] {
    // Programme équilibré pour la musculation
    const programmes: Programme[] = [];
    const areas = ['bras', 'jambes', 'dos', 'pectoraux', 'abdominaux'];
    
    for (let i = 0; i < jours; i++) {
      const area = areas[i % areas.length];
      const programme = this.createMusculationProgramme(
        { id: area, nom: area, pourcentage: 100, exercices: [], couleur: 'blue', icone: '' },
        i + 1
      );
      programmes.push(programme);
    }
    
    return programmes;
  }
}
