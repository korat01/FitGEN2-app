import { creerProgrammeOptimise } from './programmeGenerator';
import { ClientProfile, Contraintes } from '@/types/programme';

// Fonction de test pour vérifier l'algorithme
export function testerAlgorithmeGeneration() {
  // Profil client de test
  const profilClient: ClientProfile = {
    nom: "Marie Dupont",
    age: 28,
    poids: 65,
    taille: 165,
    imc: 23.9,
    niveau: "intermédiaire",
    objectif: "perte_de_poids",
    vitesse_progression: "progression_legere",
    jours_disponibles: ["lundi", "mercredi", "vendredi", "samedi"],
    contraintes_medicales: ["genou_fragile"],
    limitations_physiques: "Aucune",
    equipement_disponible: ["haltères", "tapis", "élastiques"],
    format_souhaite: "salle",
    rm_values: {
      developpe_couche: 40,
      squat: 60,
      souleve_de_terre: 70
    }
  };

  const contraintes: Contraintes = {
    médicales: profilClient.contraintes_medicales,
    limitations: profilClient.limitations_physiques,
    équipement: profilClient.equipement_disponible
  };

  try {
    const programme = creerProgrammeOptimise(
      profilClient,
      profilClient.objectif,
      contraintes,
      profilClient.jours_disponibles
    );

    console.log("✅ Algorithme de génération fonctionnel !");
    console.log("Programme généré :", programme);
    
    // Vérifications
    const joursProgramme = Object.keys(programme);
    console.log(`📅 Jours d'entraînement : ${joursProgramme.length}`);
    
    for (const [jour, seance] of Object.entries(programme)) {
      console.log(`\n🏋️ ${seance.nom}`);
      console.log(`Focus : ${seance.focus}`);
      console.log(`Durée estimée : ${seance.durée_estimée} minutes`);
      console.log(`Intensité : ${seance.niveau_intensité}`);
      console.log(`Exercices : ${seance.blocs.length}`);
      
      seance.blocs.forEach((bloc, index) => {
        console.log(`  ${index + 1}. ${bloc.nom} - ${bloc.répétitions} reps x ${bloc.séries} séries`);
      });
    }

    return programme;
  } catch (error) {
    console.error("❌ Erreur dans l'algorithme :", error);
    throw error;
  }
}

// Test avec différents profils
export function testerProfilsMultiples() {
  const profils = [
    {
      nom: "Thomas Martin",
      age: 35,
      niveau: "avancé",
      objectif: "prise_de_masse",
      vitesse_progression: "progression_rapide",
      jours_disponibles: ["lundi", "mardi", "jeudi", "vendredi", "samedi"],
      equipement_disponible: ["haltères", "barre", "machine_guidée"],
      contraintes_medicales: []
    },
    {
      nom: "Sophie Bernard",
      age: 42,
      niveau: "débutant",
      objectif: "remise_en_forme",
      vitesse_progression: "maintien",
      jours_disponibles: ["mardi", "jeudi"],
      equipement_disponible: ["aucun", "tapis"],
      contraintes_medicales: ["dos_sensible"]
    },
    {
      nom: "Lucas Dubois",
      age: 25,
      niveau: "intermédiaire",
      objectif: "force",
      vitesse_progression: "progression_legere",
      jours_disponibles: ["lundi", "mercredi", "vendredi"],
      equipement_disponible: ["haltères", "barre"],
      contraintes_medicales: []
    }
  ];

  profils.forEach((profil, index) => {
    console.log(`\n🧪 Test profil ${index + 1}: ${profil.nom}`);
    
    const profilComplet: ClientProfile = {
      ...profil,
      poids: 70,
      taille: 175,
      imc: 22.9,
      limitations_physiques: "Aucune",
      format_souhaite: "salle",
      rm_values: {},
      niveau: profil.niveau as 'débutant' | 'intermédiaire' | 'avancé',
      objectif: profil.objectif as 'prise_de_masse' | 'perte_de_poids' | 'remise_en_forme' | 'endurance' | 'force',
      vitesse_progression: profil.vitesse_progression as 'maintien' | 'progression_legere' | 'progression_rapide'
    };

    const contraintes: Contraintes = {
      médicales: profilComplet.contraintes_medicales,
      limitations: profilComplet.limitations_physiques,
      équipement: profilComplet.equipement_disponible
    };

    try {
      const programme = creerProgrammeOptimise(
        profilComplet,
        profilComplet.objectif,
        contraintes,
        profilComplet.jours_disponibles
      );

      console.log(`✅ Programme généré pour ${profil.nom}`);
      console.log(`Objectif : ${profil.objectif}`);
      console.log(`Jours : ${Object.keys(programme).length}`);
      
    } catch (error) {
      console.error(`❌ Erreur pour ${profil.nom}:`, error);
    }
  });
} 