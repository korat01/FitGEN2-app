import { ClientProfile, BlocExercice, SeanceJour, ProgrammeHebdomadaire, Contraintes } from '@/types/programme';
import { tousBlocs } from './blocsExercices';

export function creerProgrammeOptimise(
  profilClient: ClientProfile, 
  objectif: string, 
  contraintes: Contraintes, 
  disponibilite: string[]
): ProgrammeHebdomadaire {
  // Initialiser le programme complet
  const programmeHebdomadaire: ProgrammeHebdomadaire = {};
  
  // 1. Optimiser automatiquement les jours selon la vitesse de progression
  const joursOptimaux = optimiserJoursSemaine(
    disponibilite, 
    objectif, 
    profilClient.niveau, 
    contraintes.médicales,
    profilClient.vitesse_progression
  );
  
  // 2. Générer une répartition intelligente des focus avec variété et respect des intervalles
  const focusRepartition = genererFocusAvecVariete(joursOptimaux, objectif);
  
  // 3. Pour chaque jour d'entraînement optimisé
  for (let i = 0; i < joursOptimaux.length; i++) {
    const jour = joursOptimaux[i];
    const focus = focusRepartition[i];
    
    if (focus && !focus.includes('repos')) {
      // Initialiser la séance du jour
      const séance: SeanceJour = {
        nom: jour.charAt(0).toUpperCase() + jour.slice(1),
        focus: focus,
        blocs: []
      };
      
      // Sélectionner blocs d'exercices compatibles pour ce jour
      const blocsCandidats = filtrerBlocsCompatibles(
        tousBlocs,
        focus,
        profilClient.niveau,
        contraintes.médicales,
        profilClient.equipement_disponible
      );
      
      // Éviter les exercices déjà utilisés dans les séances précédentes
      const exercicesDejaUtilises = Object.values(programmeHebdomadaire)
        .flatMap(seance => seance.blocs.map(bloc => bloc.nom));
      
      const blocsNonUtilises = blocsCandidats.filter(bloc => 
        !exercicesDejaUtilises.includes(bloc.nom)
      );
      
      // Optimiser la séquence des blocs selon la vitesse de progression
      const blocsOptimisés = optimiserSequenceBlocs(
        blocsNonUtilises.length > 0 ? blocsNonUtilises : blocsCandidats,
        objectif,
        profilClient.age,
        profilClient.limitations_physiques,
        profilClient.vitesse_progression,
        profilClient.niveau
      );
      
      // Ajouter à la séance (ajuster le nombre selon la vitesse)
      const nombreExercices = determinerNombreExercices(profilClient.vitesse_progression);
      séance.blocs = blocsOptimisés.slice(0, nombreExercices);
      
      // Adapter les charges selon le niveau et les 1RM avec la vitesse de progression
      séance.blocs = adapterChargesRepetitions(
        séance.blocs, 
        profilClient.niveau, 
        profilClient.rm_values, 
        profilClient.vitesse_progression
      );
      
      // Ajouter la séance au programme
      programmeHebdomadaire[jour] = séance;
    }
  }
  
  return programmeHebdomadaire;
}

function determinerNombreExercices(vitesseProgression: string): number {
  switch (vitesseProgression) {
    case 'maintien':
      return 3; // Programme léger
    case 'progression_legere':
      return 4; // Programme modéré
    case 'progression_rapide':
      return 6; // Programme intensif
    default:
      return 4;
  }
}

function genererFocusAvecVariete(joursOptimaux: string[], objectif: string): string[] {
  const focusVarietes = [
    'haut_corps_poussée',
    'bas_corps_force',
    'haut_corps_tirage', 
    'bas_corps_gainage',
    'full_body_léger',
    'cardio_interval',
    'force_composée'
  ];
  
  const focusRepartition: string[] = [];
  const groupesMusculairesUtilises: { [key: string]: number } = {};
  
  // Mapping des focus vers les groupes musculaires principaux
  const focusVersGroupes: { [key: string]: string[] } = {
    'haut_corps_poussée': ['pectoraux', 'épaules', 'triceps'],
    'haut_corps_tirage': ['dos', 'biceps'],
    'bas_corps_force': ['quadriceps', 'fessiers', 'ischio'],
    'bas_corps_gainage': ['fessiers', 'core', 'mollets'],
    'full_body_léger': ['全身'],
    'cardio_interval': ['cardio'],
    'force_composée': ['全身']
  };
  
  for (let i = 0; i < joursOptimaux.length; i++) {
    let focusChoisi = '';
    
    // Pour chaque focus possible, vérifier s'il respecte l'intervalle de 2 jours
    for (const focus of focusVarietes) {
      const groupes = focusVersGroupes[focus] || [];
      let peutUtiliser = true;
      
      // Vérifier si les groupes musculaires ont été utilisés dans les 2 derniers jours
      for (const groupe of groupes) {
        if (groupesMusculairesUtilises[groupe] !== undefined && 
            i - groupesMusculairesUtilises[groupe] < 2) {
          peutUtiliser = false;
          break;
        }
      }
      
      if (peutUtiliser) {
        focusChoisi = focus;
        // Marquer les groupes musculaires comme utilisés à ce jour
        for (const groupe of groupes) {
          groupesMusculairesUtilises[groupe] = i;
        }
        break;
      }
    }
    
    // Si aucun focus ne respecte l'intervalle, prendre le premier disponible
    if (!focusChoisi) {
      focusChoisi = focusVarietes[i % focusVarietes.length];
    }
    
    focusRepartition.push(focusChoisi);
  }
  
  return focusRepartition;
}

function optimiserJoursSemaine(
  disponibilite: string[], 
  objectif: string, 
  niveau: string, 
  contraintesMedicales: string[],
  vitesseProgression?: string
): string[] {
  // Cloner le tableau des jours disponibles
  let joursDisponibles = [...disponibilite];
  
  // Optimisation intelligente selon la vitesse de progression
  switch (vitesseProgression) {
    case 'progression_rapide':
      // Pour progression rapide : 5 jours maximum, prioriser l'efficacité
      if (joursDisponibles.length >= 5) {
        // Si 7 jours disponibles, choisir 5 jours optimaux avec repos
        if (joursDisponibles.length === 7) {
          return ['lundi', 'mardi', 'mercredi', 'vendredi', 'samedi'];
        }
        // Si 5-6 jours, prendre les 5 premiers
        return joursDisponibles.slice(0, 5);
      }
      // Si moins de 5 jours, prendre tous les jours disponibles
      return joursDisponibles;
      
    case 'progression_legere':
      // Pour progression modérée : 3-4 jours optimaux
      if (joursDisponibles.length > 4) {
        return joursDisponibles.slice(0, 4);
      } else if (joursDisponibles.length === 4) {
        return joursDisponibles;
      }
      // Si moins de 4 jours, prendre ce qui est disponible
      return joursDisponibles;
      
    case 'maintien':
      // Pour maintien : 2-3 jours maximum
      if (joursDisponibles.length > 3) {
        return joursDisponibles.slice(0, 3);
      }
      return joursDisponibles;
      
    default:
      // Logique par défaut selon objectif et niveau
      if (objectif === 'perte_de_poids' && joursDisponibles.length > 4) {
        return joursDisponibles.slice(0, 5);
      } else if (objectif === 'prise_de_masse' && joursDisponibles.length > 3) {
        return joursDisponibles.slice(0, 4);
      }
      
      // Adapter selon le niveau
      if (niveau === 'débutant' && joursDisponibles.length > 3) {
        return joursDisponibles.slice(0, 3);
      }
      
      return joursDisponibles;
  }
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
    'bas_corps_force': ['composé'],
    'bas_corps_gainage': ['composé', 'gainage'],
    'full_body_léger': ['composé', 'cardio', 'étirement'],
    'cardio_interval': ['cardio'],
    'force_composée': ['composé'],
    'repos_actif': ['étirement', 'cardio'],
    'repos_étirements': ['étirement']
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
  vitesseProgression?: string
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
