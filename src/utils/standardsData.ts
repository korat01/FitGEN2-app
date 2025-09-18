// Données de référence IPF/FFA officielles
export const STANDARDS_DATA = {
  // Total Powerlifting (Squat + Bench + Deadlift) - Hommes
  total: {
    male: {
      '66kg': {
        A: { value: 420, source: 'FFA Minima National' },
        S: { value: 620, source: 'IPF Elite' },
        World: { value: 800, source: 'IPF Record' }
      },
      '74kg': {
        A: { value: 500, source: 'FFA Minima National' },
        S: { value: 700, source: 'IPF Elite' },
        World: { value: 900, source: 'IPF Record' }
      },
      '83kg': {
        A: { value: 600, source: 'FFA Minima National' },
        S: { value: 800, source: 'IPF Elite' },
        World: { value: 1000, source: 'IPF Record' }
      },
      '93kg': {
        A: { value: 650, source: 'FFA Minima National' },
        S: { value: 900, source: 'IPF Elite' },
        World: { value: 1100, source: 'IPF Record' }
      },
      '105kg': {
        A: { value: 700, source: 'FFA Minima National' },
        S: { value: 1000, source: 'IPF Elite' },
        World: { value: 1200, source: 'IPF Record' }
      },
      '120kg+': {
        A: { value: 700, source: 'FFA Minima National' },
        S: { value: 1000, source: 'IPF Elite' },
        World: { value: 1250, source: 'IPF Record' }
      }
    },
    female: {
      '57kg': {
        A: { value: 250, source: 'FFA Minima National' },
        S: { value: 380, source: 'IPF Elite' },
        World: { value: 550, source: 'IPF Record' }
      },
      '63kg': {
        A: { value: 280, source: 'FFA Minima National' },
        S: { value: 420, source: 'IPF Elite' },
        World: { value: 600, source: 'IPF Record' }
      },
      '72kg': {
        A: { value: 320, source: 'FFA Minima National' },
        S: { value: 480, source: 'IPF Elite' },
        World: { value: 650, source: 'IPF Record' }
      },
      '84kg': {
        A: { value: 350, source: 'FFA Minima National' },
        S: { value: 520, source: 'IPF Elite' },
        World: { value: 700, source: 'IPF Record' }
      }
    }
  },

  // Développé couché - Hommes
  bench: {
    male: {
      '66kg': {
        A: { value: 120, source: 'FFA Minima National' },
        S: { value: 180, source: 'IPF Elite' },
        World: { value: 220, source: 'IPF Record' }
      },
      '74kg': {
        A: { value: 150, source: 'FFA Minima National' },
        S: { value: 210, source: 'IPF Elite' },
        World: { value: 250, source: 'IPF Record' }
      },
      '83kg': {
        A: { value: 180, source: 'FFA Minima National' },
        S: { value: 230, source: 'IPF Elite' },
        World: { value: 280, source: 'IPF Record' }
      },
      '93kg': {
        A: { value: 200, source: 'FFA Minima National' },
        S: { value: 260, source: 'IPF Elite' },
        World: { value: 300, source: 'IPF Record' }
      },
      '105kg': {
        A: { value: 220, source: 'FFA Minima National' },
        S: { value: 280, source: 'IPF Elite' },
        World: { value: 320, source: 'IPF Record' }
      },
      '120kg+': {
        A: { value: 220, source: 'FFA Minima National' },
        S: { value: 300, source: 'IPF Elite' },
        World: { value: 350, source: 'IPF Record' }
      }
    },
    female: {
      '57kg': {
        A: { value: 80, source: 'FFA Minima National' },
        S: { value: 130, source: 'IPF Elite' },
        World: { value: 180, source: 'IPF Record' }
      },
      '63kg': {
        A: { value: 100, source: 'FFA Minima National' },
        S: { value: 150, source: 'IPF Elite' },
        World: { value: 200, source: 'IPF Record' }
      },
      '72kg': {
        A: { value: 120, source: 'FFA Minima National' },
        S: { value: 170, source: 'IPF Elite' },
        World: { value: 220, source: 'IPF Record' }
      },
      '84kg': {
        A: { value: 130, source: 'FFA Minima National' },
        S: { value: 180, source: 'IPF Elite' },
        World: { value: 240, source: 'IPF Record' }
      }
    }
  },

  // Squat - Hommes
  squat: {
    male: {
      '66kg': {
        A: { value: 200, source: 'FFA Minima National' },
        S: { value: 280, source: 'IPF Elite' },
        World: { value: 340, source: 'IPF Record' }
      },
      '74kg': {
        A: { value: 240, source: 'FFA Minima National' },
        S: { value: 320, source: 'IPF Elite' },
        World: { value: 380, source: 'IPF Record' }
      },
      '83kg': {
        A: { value: 280, source: 'FFA Minima National' },
        S: { value: 350, source: 'IPF Elite' },
        World: { value: 420, source: 'IPF Record' }
      },
      '93kg': {
        A: { value: 300, source: 'FFA Minima National' },
        S: { value: 380, source: 'IPF Elite' },
        World: { value: 450, source: 'IPF Record' }
      },
      '105kg': {
        A: { value: 320, source: 'FFA Minima National' },
        S: { value: 400, source: 'IPF Elite' },
        World: { value: 480, source: 'IPF Record' }
      },
      '120kg+': {
        A: { value: 320, source: 'FFA Minima National' },
        S: { value: 400, source: 'IPF Elite' },
        World: { value: 500, source: 'IPF Record' }
      }
    },
    female: {
      '57kg': {
        A: { value: 140, source: 'FFA Minima National' },
        S: { value: 200, source: 'IPF Elite' },
        World: { value: 260, source: 'IPF Record' }
      },
      '63kg': {
        A: { value: 160, source: 'FFA Minima National' },
        S: { value: 220, source: 'IPF Elite' },
        World: { value: 280, source: 'IPF Record' }
      },
      '72kg': {
        A: { value: 180, source: 'FFA Minima National' },
        S: { value: 240, source: 'IPF Elite' },
        World: { value: 300, source: 'IPF Record' }
      },
      '84kg': {
        A: { value: 200, source: 'FFA Minima National' },
        S: { value: 260, source: 'IPF Elite' },
        World: { value: 320, source: 'IPF Record' }
      }
    }
  },

  // Soulevé de terre - Hommes
  deadlift: {
    male: {
      '66kg': {
        A: { value: 240, source: 'FFA Minima National' },
        S: { value: 330, source: 'IPF Elite' },
        World: { value: 400, source: 'IPF Record' }
      },
      '74kg': {
        A: { value: 280, source: 'FFA Minima National' },
        S: { value: 360, source: 'IPF Elite' },
        World: { value: 430, source: 'IPF Record' }
      },
      '83kg': {
        A: { value: 320, source: 'FFA Minima National' },
        S: { value: 400, source: 'IPF Elite' },
        World: { value: 480, source: 'IPF Record' }
      },
      '93kg': {
        A: { value: 350, source: 'FFA Minima National' },
        S: { value: 430, source: 'IPF Elite' },
        World: { value: 500, source: 'IPF Record' }
      },
      '105kg': {
        A: { value: 370, source: 'FFA Minima National' },
        S: { value: 450, source: 'IPF Elite' },
        World: { value: 520, source: 'IPF Record' }
      },
      '120kg+': {
        A: { value: 370, source: 'FFA Minima National' },
        S: { value: 500, source: 'IPF Elite' },
        World: { value: 550, source: 'IPF Record' }
      }
    },
    female: {
      '57kg': {
        A: { value: 160, source: 'FFA Minima National' },
        S: { value: 230, source: 'IPF Elite' },
        World: { value: 300, source: 'IPF Record' }
      },
      '63kg': {
        A: { value: 180, source: 'FFA Minima National' },
        S: { value: 250, source: 'IPF Elite' },
        World: { value: 320, source: 'IPF Record' }
      },
      '72kg': {
        A: { value: 200, source: 'FFA Minima National' },
        S: { value: 270, source: 'IPF Elite' },
        World: { value: 340, source: 'IPF Record' }
      },
      '84kg': {
        A: { value: 220, source: 'FFA Minima National' },
        S: { value: 290, source: 'IPF Elite' },
        World: { value: 360, source: 'IPF Record' }
      }
    }
  },

  // Autres disciplines (endurance, calisthenics)
  '5k': {
    male: {
      A: { value: 25, source: 'World Athletics' },    // 25 minutes
      S: { value: 18, source: 'World Athletics' },   // 18 minutes
      World: { value: 13, source: 'World Athletics' } // 13 minutes
    }
  },
  pullups: {
    male: {
      A: { value: 8, source: 'Standard' },      // 8 tractions
      S: { value: 15, source: 'Standard' },    // 15 tractions
      World: { value: 25, source: 'Standard' }  // 25 tractions
    }
  }
};

// Fonction utilitaire pour déterminer la catégorie de poids
export const getWeightCategory = (weight: number, sex: 'male' | 'female'): string => {
  if (sex === 'male') {
    if (weight <= 66) return '66kg';
    if (weight <= 74) return '74kg';
    if (weight <= 83) return '83kg';
    if (weight <= 93) return '93kg';
    if (weight <= 105) return '105kg';
    return '120kg+';
  } else {
    if (weight <= 57) return '57kg';
    if (weight <= 63) return '63kg';
    if (weight <= 72) return '72kg';
    if (weight <= 84) return '84kg';
    return '84kg+';
  }
};

// Profils utilisateur ajustés selon la classe de sport
export const USER_PROFILES = {
  crossfit: {
    force: 0.4,        // Équilibré force/endurance
    endurance: 0.4,    // Équilibré force/endurance
    explosivite: 0.15,  // Important pour les mouvements explosifs
    calisthenics: 0.05  // Peu de calisthenics pur
  },
  power: {
    force: 0.8,        // Focus maximal sur la force
    endurance: 0.05,   // Très peu d'endurance
    explosivite: 0.1,   // Peu d'explosivité
    calisthenics: 0.05  // Pas de calisthenics
  },
  classique: {
    force: 0.5,        // Force importante
    endurance: 0.2,    // Endurance modérée
    explosivite: 0.15,  // Explosivité modérée
    calisthenics: 0.15  // Calisthenics modéré
  },
  marathon: {
    force: 0.1,        // Très peu de force
    endurance: 0.8,    // Focus maximal sur l'endurance
    explosivite: 0.05,  // Très peu d'explosivité
    calisthenics: 0.05  // Pas de calisthenics
  },
  calisthenics: {
    force: 0.3,        // Force modérée
    endurance: 0.1,    // Peu d'endurance
    explosivite: 0.2,   // Explosivité importante
    calisthenics: 0.4   // Focus maximal sur calisthenics
  },
  yoga: {
    force: 0.2,        // Force modérée
    endurance: 0.3,    // Endurance modérée
    explosivite: 0.1,   // Peu d'explosivité
    calisthenics: 0.4   // Focus sur calisthenics
  },
  natation: {
    force: 0.2,        // Force modérée
    endurance: 0.6,     // Endurance importante
    explosivite: 0.15,  // Explosivité modérée
    calisthenics: 0.05  // Peu de calisthenics
  },
  cyclisme: {
    force: 0.1,        // Très peu de force
    endurance: 0.7,    // Endurance très importante
    explosivite: 0.15,  // Explosivité modérée
    calisthenics: 0.05  // Peu de calisthenics
  }
};

// Fonction pour obtenir le profil selon la classe de sport
export const getSportProfile = (sportClass: string) => {
  return USER_PROFILES[sportClass as keyof typeof USER_PROFILES] || USER_PROFILES.classique;
}; 