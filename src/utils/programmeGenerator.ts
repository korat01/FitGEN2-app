import { ClientProfile, BlocExercice, SeanceJour, ProgrammeHebdomadaire, Contraintes } from '@/types/programme';
import { getAllBlocsEntrainement } from './blocsEntrainementData';

export function creerProgrammeOptimise(
  profilClient: ClientProfile, 
  objectif: string, 
  contraintes: Contraintes, 
  disponibilite: string[]
): ProgrammeHebdomadaire {
  // Initialiser le programme complet
  const programmeHebdomadaire: ProgrammeHebdomadaire = {};
  
  // 1. Définir le nombre de séances par semaine selon la vitesse de progression
  const nombreSeances = determinerNombreSeances(profilClient.vitesse_progression);
  
  // 2. Optimiser les jours selon disponibilité et nombre de séances requis
  const joursOptimaux = optimiserJoursSemaine(
    disponibilite, 
    nombreSeances,
    profilClient.vitesse_progression
  );
  
  // 3. Générer la répartition des types d'entraînement selon le sexe
  const focusRepartition = genererRepartitionSelonSexe(
    joursOptimaux.length,
    profilClient.nom, // on utilise le nom pour détecter le sexe ou ajouter un champ sexe
    objectif
  );
  
  // 4. Pour chaque jour d'entraînement optimisé
  for (let i = 0; i < joursOptimaux.length; i++) {
    const jour = joursOptimaux[i];
    const focus = focusRepartition[i];
    
    // Initialiser la séance du jour
    const séance: SeanceJour = {
      nom: `${jour.charAt(0).toUpperCase() + jour.slice(1)} - ${focus}`,
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
    
    // Optimiser la séquence des blocs
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
    
    // Adapter les charges selon le niveau et les 1RM
    séance.blocs = adapterChargesRepetitions(
      séance.blocs, 
      profilClient.niveau, 
      profilClient.rm_values, 
      profilClient.vitesse_progression
    );
    
    // Ajouter la séance au programme
    programmeHebdomadaire[jour] = séance;
  }
  
  return programmeHebdomadaire;
}

function determinerNombreSeances(vitesseProgression: string): { min: number, max: number } {
  switch (vitesseProgression) {
    case 'maintien':
      return { min: 2, max: 3 }; // 2 à 3 séances/semaine
    case 'progression_legere':
      return { min: 3, max: 4 }; // 3 à 4 séances/semaine
    case 'progression_rapide':
      return { min: 5, max: 6 }; // 5 à 6 séances/semaine
    default:
      return { min: 3, max: 4 };
  }
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

function genererRepartitionSelonSexe(
  nombreSeances: number, 
  nom: string, 
  objectif: string
): string[] {
  // Détection basique du sexe par le nom (à améliorer avec un champ dédié)
  const prenomsFeminins = ['marie', 'sarah', 'emma', 'claire', 'julie', 'sophie', 'laura', 'camille'];
  const estFemme = prenomsFeminins.some(prenom => 
    nom.toLowerCase().includes(prenom)
  );
  
  const repartition: string[] = [];
  
  if (estFemme) {
    // FEMME: 70% bas du corps, 30% haut du corps/full body
    const seancesBasCorps = Math.ceil(nombreSeances * 0.7);
    const seancesAutres = nombreSeances - seancesBasCorps;
    
    // Ajouter les séances bas du corps
    for (let i = 0; i < seancesBasCorps; i++) {
      repartition.push(i % 2 === 0 ? 'bas_corps_fessiers' : 'bas_corps_jambes');
    }
    
    // Ajouter les autres séances
    for (let i = 0; i < seancesAutres; i++) {
      repartition.push(i % 2 === 0 ? 'haut_corps_leger' : 'full_body_leger');
    }
  } else {
    // HOMME: au moins 1 full body + variété
    repartition.push('full_body_complet');
    
    for (let i = 1; i < nombreSeances; i++) {
      const focus = ['haut_corps_poussee', 'haut_corps_tirage', 'bas_corps_force'][i % 3];
      repartition.push(focus);
    }
  }
  
  return repartition;
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
  nombreSeances: { min: number, max: number },
  vitesseProgression?: string
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
    'haut_corps_poussee': ['composé', 'isolé'],
    'haut_corps_tirage': ['composé', 'isolé'],
    'haut_corps_leger': ['composé', 'isolé', 'étirement'],
    'bas_corps_force': ['composé'],
    'bas_corps_fessiers': ['composé', 'isolé'],
    'bas_corps_jambes': ['composé', 'isolé'],
    'full_body_complet': ['composé'],
    'full_body_leger': ['composé', 'cardio', 'étirement'],
    'cardio_interval': ['cardio'],
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
