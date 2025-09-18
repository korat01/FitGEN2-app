
import { BlocExercice } from '@/types/programme';

export const tousBlocs: BlocExercice[] = [
  // Exercices haut du corps - Poussée
  {
    nom: "Pompes classiques",
    type: "composé",
    focus: "haut_corps_poussée",
    difficulté: 2,
    muscles_sollicités: ["pectoraux", "triceps", "deltoïdes antérieurs"],
    charge: 0,
    répétitions: 12,
    séries: 3,
    équipement: ["aucun"],
    description: "Position de planche, descendre la poitrine vers le sol et remonter",
    contraintes_médicales: ["épaule_limitée"]
  },
  {
    nom: "Pompes sur genoux",
    type: "composé",
    focus: "haut_corps_poussée",
    difficulté: 1,
    muscles_sollicités: ["pectoraux", "triceps"],
    charge: 0,
    répétitions: 15,
    séries: 3,
    équipement: ["aucun", "tapis"],
    description: "Version adaptée des pompes, genoux au sol"
  },
  {
    nom: "Développé haltères",
    type: "composé",
    focus: "haut_corps_poussée",
    difficulté: 3,
    muscles_sollicités: ["pectoraux", "triceps", "deltoïdes"],
    charge: 15,
    répétitions: 10,
    séries: 4,
    équipement: ["haltères"],
    description: "Allongé, pousser les haltères vers le haut"
  },
  {
    nom: "Dips sur chaise",
    type: "composé",
    focus: "haut_corps_poussée",
    difficulté: 3,
    muscles_sollicités: ["triceps", "pectoraux", "deltoïdes"],
    charge: 0,
    répétitions: 8,
    séries: 3,
    équipement: ["aucun"],
    description: "Mains sur une chaise, corps suspendu, flexion/extension des bras"
  },

  // Exercices haut du corps - Tirage
  {
    nom: "Tractions assistées",
    type: "composé",
    focus: "haut_corps_tirage",
    difficulté: 4,
    muscles_sollicités: ["dorsaux", "biceps", "rhomboïdes"],
    charge: 0,
    répétitions: 6,
    séries: 3,
    équipement: ["barre"],
    description: "Suspendre à une barre, tirer le corps vers le haut"
  },
  {
    nom: "Rowing haltères",
    type: "composé",
    focus: "haut_corps_tirage",
    difficulté: 2,
    muscles_sollicités: ["dorsaux", "biceps", "rhomboïdes"],
    charge: 12,
    répétitions: 12,
    séries: 3,
    équipement: ["haltères"],
    description: "Penché en avant, tirer les haltères vers la poitrine"
  },
  {
    nom: "Rowing élastique",
    type: "isolé",
    focus: "haut_corps_tirage",
    difficulté: 2,
    muscles_sollicités: ["dorsaux", "rhomboïdes"],
    charge: 0,
    répétitions: 15,
    séries: 3,
    équipement: ["élastiques"],
    description: "Tirer l'élastique vers soi, coudes le long du corps"
  },

  // Exercices bas du corps
  {
    nom: "Squats au poids du corps",
    type: "composé",
    focus: "bas_corps_gainage",
    difficulté: 2,
    muscles_sollicités: ["quadriceps", "fessiers", "mollets"],
    charge: 0,
    répétitions: 15,
    séries: 3,
    équipement: ["aucun"],
    description: "Pieds écartés, descendre en pliant les genoux",
    contraintes_médicales: ["genou_fragile"]
  },
  {
    nom: "Fentes alternées",
    type: "composé",
    focus: "bas_corps_gainage",
    difficulté: 3,
    muscles_sollicités: ["quadriceps", "fessiers", "mollets"],
    charge: 0,
    répétitions: 12,
    séries: 3,
    équipement: ["aucun"],
    description: "Pas en avant, plier le genou avant, alterner",
    contraintes_médicales: ["genou_fragile"]
  },
  {
    nom: "Soulevé de terre haltères",
    type: "composé",
    focus: "bas_corps_gainage",
    difficulté: 4,
    muscles_sollicités: ["ischio-jambiers", "fessiers", "lombaires"],
    charge: 20,
    répétitions: 8,
    séries: 4,
    équipement: ["haltères"],
    description: "Haltères au sol, soulever en gardant le dos droit",
    contraintes_médicales: ["dos_sensible", "hernie_discale"]
  },
  {
    nom: "Squats gobelet",
    type: "composé",
    focus: "bas_corps_gainage",
    difficulté: 3,
    muscles_sollicités: ["quadriceps", "fessiers", "core"],
    charge: 8,
    répétitions: 12,
    séries: 3,
    équipement: ["haltères", "kettlebell"],
    description: "Tenir un poids contre la poitrine, effectuer un squat"
  },

  // Exercices de gainage
  {
    nom: "Planche classique",
    type: "gainage",
    focus: "bas_corps_gainage",
    difficulté: 2,
    muscles_sollicités: ["core", "épaules", "fessiers"],
    charge: 0,
    répétitions: "30-60s",
    séries: 3,
    équipement: ["aucun", "tapis"],
    description: "Position de pompe, maintenir la position"
  },
  {
    nom: "Planche latérale",
    type: "gainage",
    focus: "bas_corps_gainage",
    difficulté: 3,
    muscles_sollicités: ["obliques", "core"],
    charge: 0,
    répétitions: "20-40s",
    séries: 2,
    équipement: ["aucun", "tapis"],
    description: "Sur le côté, maintenir le corps aligné"
  },
  {
    nom: "Mountain climbers",
    type: "cardio",
    focus: "full_body_léger",
    difficulté: 3,
    muscles_sollicités: ["core", "épaules", "jambes"],
    charge: 0,
    répétitions: 20,
    séries: 3,
    équipement: ["aucun"],
    description: "Position de planche, alterner genoux vers poitrine"
  },

  // Exercices cardio
  {
    nom: "Jumping jacks",
    type: "cardio",
    focus: "full_body_léger",
    difficulté: 2,
    muscles_sollicités: ["full_body", "cardio"],
    charge: 0,
    répétitions: 30,
    séries: 3,
    équipement: ["aucun"],
    description: "Sauts en écartant bras et jambes simultanément"
  },
  {
    nom: "Burpees",
    type: "cardio",
    focus: "full_body_léger",
    difficulté: 4,
    muscles_sollicités: ["full_body", "cardio"],
    charge: 0,
    répétitions: 8,
    séries: 3,
    équipement: ["aucun"],
    description: "Squat, position planche, pompe, saut vertical"
  },
  {
    nom: "Course sur place",
    type: "cardio",
    focus: "full_body_léger",
    difficulté: 1,
    muscles_sollicités: ["jambes", "cardio"],
    charge: 0,
    répétitions: "45s",
    séries: 3,
    équipement: ["aucun"],
    description: "Courir sur place en levant les genoux"
  },

  // Exercices d'étirement
  {
    nom: "Étirement ischio-jambiers",
    type: "étirement",
    focus: "repos_étirements",
    difficulté: 1,
    muscles_sollicités: ["ischio-jambiers"],
    charge: 0,
    répétitions: "30s",
    séries: 2,
    équipement: ["aucun", "tapis"],
    description: "Jambe tendue, se pencher vers l'avant"
  },
  {
    nom: "Étirement pectoraux",
    type: "étirement",
    focus: "repos_étirements",
    difficulté: 1,
    muscles_sollicités: ["pectoraux"],
    charge: 0,
    répétitions: "30s",
    séries: 2,
    équipement: ["aucun"],
    description: "Bras contre un mur, rotation du corps"
  },
  {
    nom: "Cobra yoga",
    type: "étirement",
    focus: "repos_étirements",
    difficulté: 2,
    muscles_sollicités: ["dos", "abdominaux"],
    charge: 0,
    répétitions: "20s",
    séries: 3,
    équipement: ["tapis"],
    description: "Allongé ventre, soulever le torse en s'appuyant sur les bras",
    contraintes_médicales: ["dos_sensible"]
  },

  // Exercices avec équipement spécialisé
  {
    nom: "Kettlebell swing",
    type: "composé",
    focus: "full_body_léger",
    difficulté: 3,
    muscles_sollicités: ["fessiers", "ischio-jambiers", "core", "épaules"],
    charge: 12,
    répétitions: 15,
    séries: 3,
    équipement: ["kettlebell"],
    description: "Balancer la kettlebell entre les jambes puis au niveau des épaules"
  },
  {
    nom: "Swiss ball crunch",
    type: "isolé",
    focus: "bas_corps_gainage",
    difficulté: 2,
    muscles_sollicités: ["abdominaux"],
    charge: 0,
    répétitions: 15,
    séries: 3,
    équipement: ["swiss_ball"],
    description: "Dos sur le ballon, effectuer des crunchs"
  },

  // Exercices de force - Développé couché
  {
    nom: "Développé couché haltères",
    type: "composé",
    focus: "haut_corps_poussée",
    difficulté: 4,
    muscles_sollicités: ["pectoraux", "triceps", "deltoïdes antérieurs"],
    charge: 25,
    répétitions: 8,
    séries: 4,
    équipement: ["haltères"],
    description: "Allongé sur un banc, pousser les haltères vers le haut",
    pourcentage_rm: 75,
    exercice_rm: "developpe_couche"
  },
  {
    nom: "Développé couché barre",
    type: "composé",
    focus: "haut_corps_poussée",
    difficulté: 5,
    muscles_sollicités: ["pectoraux", "triceps", "deltoïdes antérieurs"],
    charge: 40,
    répétitions: 6,
    séries: 4,
    équipement: ["barre", "machine_guidée"],
    description: "Allongé sur un banc, pousser la barre vers le haut",
    pourcentage_rm: 80,
    exercice_rm: "developpe_couche"
  },

  // Exercices de force - Squat
  {
    nom: "Squat barre",
    type: "composé",
    focus: "bas_corps_force",
    difficulté: 5,
    muscles_sollicités: ["quadriceps", "fessiers", "core"],
    charge: 50,
    répétitions: 6,
    séries: 4,
    équipement: ["barre"],
    description: "Barre sur les épaules, descendre en pliant les genoux",
    pourcentage_rm: 80,
    exercice_rm: "squat",
    contraintes_médicales: ["genou_fragile", "dos_sensible"]
  },
  {
    nom: "Squat haltères",
    type: "composé",
    focus: "bas_corps_force",
    difficulté: 4,
    muscles_sollicités: ["quadriceps", "fessiers", "core"],
    charge: 30,
    répétitions: 8,
    séries: 4,
    équipement: ["haltères"],
    description: "Haltères sur les épaules, effectuer un squat",
    pourcentage_rm: 75,
    exercice_rm: "squat",
    contraintes_médicales: ["genou_fragile"]
  },

  // Exercices de force - Soulevé de terre
  {
    nom: "Soulevé de terre barre",
    type: "composé",
    focus: "bas_corps_force",
    difficulté: 5,
    muscles_sollicités: ["ischio-jambiers", "fessiers", "lombaires", "core"],
    charge: 60,
    répétitions: 5,
    séries: 4,
    équipement: ["barre"],
    description: "Barre au sol, soulever en gardant le dos droit",
    pourcentage_rm: 85,
    exercice_rm: "souleve_de_terre",
    contraintes_médicales: ["dos_sensible", "hernie_discale"]
  },

  // Exercices de force - Développé militaire
  {
    nom: "Développé militaire haltères",
    type: "composé",
    focus: "haut_corps_poussée",
    difficulté: 4,
    muscles_sollicités: ["deltoïdes", "triceps", "trapèzes"],
    charge: 20,
    répétitions: 8,
    séries: 4,
    équipement: ["haltères"],
    description: "Debout, pousser les haltères au-dessus de la tête",
    pourcentage_rm: 75,
    exercice_rm: "developpe_militaire",
    contraintes_médicales: ["épaule_limitée"]
  },

  // Exercices de force - Rowing
  {
    nom: "Rowing barre",
    type: "composé",
    focus: "haut_corps_tirage",
    difficulté: 4,
    muscles_sollicités: ["dorsaux", "biceps", "rhomboïdes"],
    charge: 35,
    répétitions: 8,
    séries: 4,
    équipement: ["barre"],
    description: "Penché en avant, tirer la barre vers la poitrine",
    pourcentage_rm: 75,
    exercice_rm: "rowing"
  },

  // Exercices cardio intensifs
  {
    nom: "Sprint 30s",
    type: "cardio",
    focus: "cardio_intensif",
    difficulté: 4,
    muscles_sollicités: ["jambes", "cardio"],
    charge: 0,
    répétitions: "30s",
    séries: 6,
    équipement: ["aucun"],
    description: "Course à vitesse maximale pendant 30 secondes"
  },
  {
    nom: "Burpees avec pompe",
    type: "cardio",
    focus: "cardio_intensif",
    difficulté: 5,
    muscles_sollicités: ["full_body", "cardio"],
    charge: 0,
    répétitions: 10,
    séries: 4,
    équipement: ["aucun"],
    description: "Squat, position planche, pompe, saut vertical"
  },
  {
    nom: "Mountain climbers rapides",
    type: "cardio",
    focus: "cardio_intensif",
    difficulté: 4,
    muscles_sollicités: ["core", "épaules", "jambes"],
    charge: 0,
    répétitions: 30,
    séries: 4,
    équipement: ["aucun"],
    description: "Position de planche, alterner genoux vers poitrine rapidement"
  },

  // Exercices d'endurance
  {
    nom: "Course lente",
    type: "cardio",
    focus: "cardio_modere",
    difficulté: 2,
    muscles_sollicités: ["jambes", "cardio"],
    charge: 0,
    répétitions: "20min",
    séries: 1,
    équipement: ["aucun"],
    description: "Course à rythme modéré pendant 20 minutes"
  },
  {
    nom: "Vélo stationnaire",
    type: "cardio",
    focus: "cardio_modere",
    difficulté: 2,
    muscles_sollicités: ["jambes", "cardio"],
    charge: 0,
    répétitions: "25min",
    séries: 1,
    équipement: ["cardio"],
    description: "Pédaler à rythme modéré pendant 25 minutes"
  },

  // Exercices de remise en forme
  {
    nom: "Marche rapide",
    type: "cardio",
    focus: "cardio_modere",
    difficulté: 1,
    muscles_sollicités: ["jambes", "cardio"],
    charge: 0,
    répétitions: "30min",
    séries: 1,
    équipement: ["aucun"],
    description: "Marche à rythme soutenu pendant 30 minutes"
  },
  {
    nom: "Yoga flow",
    type: "étirement",
    focus: "repos_actif",
    difficulté: 2,
    muscles_sollicités: ["full_body", "flexibilité"],
    charge: 0,
    répétitions: "45min",
    séries: 1,
    équipement: ["tapis"],
    description: "Séquence de postures de yoga enchaînées"
  },

  // Exercices pour femmes - Focus bas du corps
  {
    nom: "Hip thrust haltères",
    type: "isolé",
    focus: "bas_corps_fessiers",
    difficulté: 3,
    muscles_sollicités: ["fessiers", "ischio-jambiers"],
    charge: 15,
    répétitions: 15,
    séries: 3,
    équipement: ["haltères"],
    description: "Allongé dos au sol, haltère sur le bassin, lever les hanches"
  },
  {
    nom: "Fentes bulgares",
    type: "composé",
    focus: "bas_corps_fessiers",
    difficulté: 4,
    muscles_sollicités: ["quadriceps", "fessiers", "mollets"],
    charge: 12,
    répétitions: 12,
    séries: 3,
    équipement: ["haltères"],
    description: "Pied arrière surélevé, effectuer des fentes",
    contraintes_médicales: ["genou_fragile"]
  },
  {
    nom: "Donkey kicks",
    type: "isolé",
    focus: "bas_corps_fessiers",
    difficulté: 2,
    muscles_sollicités: ["fessiers"],
    charge: 0,
    répétitions: 20,
    séries: 3,
    équipement: ["aucun"],
    description: "Position à 4 pattes, lever la jambe vers l'arrière"
  },

  // Exercices pour hommes - Focus force
  {
    nom: "Pull-ups",
    type: "composé",
    focus: "haut_corps_tirage",
    difficulté: 5,
    muscles_sollicités: ["dorsaux", "biceps", "rhomboïdes"],
    charge: 0,
    répétitions: 6,
    séries: 4,
    équipement: ["barre"],
    description: "Suspendu à une barre, tirer le corps vers le haut"
  },
  {
    nom: "Dips barres parallèles",
    type: "composé",
    focus: "haut_corps_poussée",
    difficulté: 4,
    muscles_sollicités: ["triceps", "pectoraux", "deltoïdes"],
    charge: 0,
    répétitions: 8,
    séries: 4,
    équipement: ["barre"],
    description: "Mains sur les barres parallèles, flexion/extension des bras"
  }
];
