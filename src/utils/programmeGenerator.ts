
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
  
  // 1. Déterminer la répartition optimale selon le profil et l'objectif
  const joursOptimaux = optimiserJoursSemaine(disponibilite, objectif, profilClient.niveau, contraintes.médicales);
  
  // 2. Définir les focus par jour (basé sur le modèle)
  const focusJours: { [key: string]: string } = {
    "lundi": "haut_corps_poussée",
    "mardi": "repos_actif",
    "mercredi": "bas_corps_gainage", 
    "jeudi": "repos_complet",
    "vendredi": "haut_corps_tirage",
    "samedi": "full_body_léger",
    "dimanche": "repos_étirements"
  };
  
  // 3. Pour chaque jour d'entraînement
  for (const jour of joursOptimaux) {
    if (focusJours[jour] && !focusJours[jour].includes('repos')) {
      const focus = focusJours[jour];
      
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
      
      // Optimiser la séquence des blocs
      const blocsOptimisés = optimiserSequenceBlocs(
        blocsCandidats,
        objectif,
        profilClient.age,
        profilClient.limitations_physiques
      );
      
      // Ajouter à la séance
      séance.blocs = blocsOptimisés.slice(0, 5); // Limiter à 5 exercices par séance
      
      // Adapter les charges selon le niveau et les 1RM
      séance.blocs = adapterChargesRepetitions(séance.blocs, profilClient.niveau, profilClient.rm_values);
      
      // Ajouter la séance au programme
      programmeHebdomadaire[jour] = séance;
    }
  }
  
  return programmeHebdomadaire;
}

function optimiserJoursSemaine(
  disponibilite: string[], 
  objectif: string, 
  niveau: string, 
  contraintesMedicales: string[]
): string[] {
  // Filtrer les jours disponibles et optimiser selon l'objectif
  let joursOptimaux = [...disponibilite];
  
  // Logique d'optimisation selon l'objectif
  if (objectif === 'perte_de_poids' && joursOptimaux.length > 4) {
    // Pour la perte de poids, privilégier plus de séances
    return joursOptimaux.slice(0, 5);
  } else if (objectif === 'prise_de_masse' && joursOptimaux.length > 3) {
    // Pour la prise de masse, 3-4 séances suffisent
    return joursOptimaux.slice(0, 4);
  }
  
  // Adapter selon le niveau
  if (niveau === 'débutant' && joursOptimaux.length > 3) {
    return joursOptimaux.slice(0, 3);
  }
  
  return joursOptimaux;
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
    'bas_corps_gainage': ['composé', 'gainage'],
    'full_body_léger': ['composé', 'cardio', 'étirement'],
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
  limitations?: string
): BlocExercice[] {
  let blocsOptimisés = [...blocs];
  
  // Trier selon l'objectif
  if (objectif === 'prise_de_masse') {
    // Prioriser les exercices composés
    blocsOptimisés.sort((a, b) => {
      if (a.type === 'composé' && b.type !== 'composé') return -1;
      if (a.type !== 'composé' && b.type === 'composé') return 1;
      return 0;
    });
  } else if (objectif === 'perte_de_poids') {
    // Mélanger cardio et résistance
    blocsOptimisés.sort((a, b) => {
      if (a.type === 'cardio' && b.type !== 'cardio') return -1;
      if (a.type !== 'cardio' && b.type === 'cardio') return 1;
      return 0;
    });
  }
  
  // Adapter selon l'âge
  if (age > 50) {
    // Privilégier les exercices à faible impact
    blocsOptimisés = blocsOptimisés.filter(bloc => bloc.difficulté <= 3);
  }
  
  return blocsOptimisés;
}

function calculerPourcentageSeance(objectif: string, niveau: string, jourSemaine: string): number {
  // Définir les pourcentages par séance selon l'objectif
  const pourcentagesParObjectif: { [key: string]: { [key: string]: number } } = {
    'force': {
      'seance1': 85, // Séance lourde
      'seance2': 70, // Séance modérée  
      'seance3': 90, // Séance très lourde
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

  // Mapper les jours aux séances
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
  return pourcentagesParObjectif[objectif]?.[seance] || 70;
}

function adapterChargesRepetitions(
  blocs: BlocExercice[], 
  niveau: string, 
  rmValues?: { [key: string]: number }
): BlocExercice[] {
  return blocs.map((bloc, index) => {
    const blocAdapte = { ...bloc };
    
    // Calculer le pourcentage pour cette séance (varie selon la position dans la semaine)
    const pourcentageSeance = calculerPourcentageSeance('force', niveau, 'lundi') - (index * 5); // Décroissance dans la séance
    
    // Si le bloc a une référence RM et que le client a fourni cette valeur
    if (bloc.exercice_rm && rmValues?.[bloc.exercice_rm]) {
      const rmValue = rmValues[bloc.exercice_rm];
      const pourcentage = bloc.pourcentage_rm || pourcentageSeance;
      
      // Calculer la charge basée sur le pourcentage du 1RM
      blocAdapte.charge = Math.round((rmValue * pourcentage) / 100);
      
      // Adapter les répétitions selon le pourcentage
      if (pourcentage >= 85) {
        blocAdapte.répétitions = '3-5';
        blocAdapte.séries = 5;
      } else if (pourcentage >= 75) {
        blocAdapte.répétitions = '6-8';
        blocAdapte.séries = 4;
      } else if (pourcentage >= 65) {
        blocAdapte.répétitions = '8-12';
        blocAdapte.séries = 3;
      } else {
        blocAdapte.répétitions = '12-15';
        blocAdapte.séries = 3;
      }
      
      blocAdapte.description = `${pourcentage}% du 1RM (${rmValue}kg)`;
    } else {
      // Adaptation classique par niveau si pas de 1RM
      if (niveau === 'débutant') {
        blocAdapte.charge = Math.max(0, bloc.charge * 0.7);
        if (typeof bloc.répétitions === 'number') {
          blocAdapte.répétitions = Math.min(15, bloc.répétitions + 3);
        }
        blocAdapte.séries = Math.max(2, (bloc.séries || 3) - 1);
      } else if (niveau === 'avancé') {
        blocAdapte.charge = bloc.charge * 1.2;
        if (typeof bloc.répétitions === 'number') {
          blocAdapte.répétitions = Math.max(6, bloc.répétitions - 2);
        }
        blocAdapte.séries = (bloc.séries || 3) + 1;
      } else {
        blocAdapte.séries = bloc.séries || 3;
      }
    }
    
    // Ajouter temps de repos adapté
    if (niveau === 'débutant') {
      blocAdapte.temps_repos = '90-120s';
    } else if (niveau === 'avancé') {
      blocAdapte.temps_repos = '60-90s';
    } else {
      blocAdapte.temps_repos = '60-90s';
    }
    
    return blocAdapte;
  });
}
