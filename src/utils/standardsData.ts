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
      '120kg': {
        A: { value: 700, source: 'FFA Minima National' },
        S: { value: 1000, source: 'IPF Elite' },
        World: { value: 1250, source: 'IPF Record' }
      }
    },
    female: {
      '47kg': {
        A: { value: 200, source: 'FFA Minima National' },
        S: { value: 300, source: 'IPF Elite' },
        World: { value: 400, source: 'IPF Record' }
      },
      '52kg': {
        A: { value: 250, source: 'FFA Minima National' },
        S: { value: 350, source: 'IPF Elite' },
        World: { value: 450, source: 'IPF Record' }
      },
      '57kg': {
        A: { value: 300, source: 'FFA Minima National' },
        S: { value: 400, source: 'IPF Elite' },
        World: { value: 500, source: 'IPF Record' }
      },
      '63kg': {
        A: { value: 350, source: 'FFA Minima National' },
        S: { value: 450, source: 'IPF Elite' },
        World: { value: 550, source: 'IPF Record' }
      },
      '72kg': {
        A: { value: 400, source: 'FFA Minima National' },
        S: { value: 500, source: 'IPF Elite' },
        World: { value: 600, source: 'IPF Record' }
      },
      '84kg': {
        A: { value: 450, source: 'FFA Minima National' },
        S: { value: 550, source: 'IPF Elite' },
        World: { value: 650, source: 'IPF Record' }
      }
    }
  },
  
  // Bench Press - Hommes
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
      '120kg': {
        A: { value: 220, source: 'FFA Minima National' },
        S: { value: 300, source: 'IPF Elite' },
        World: { value: 350, source: 'IPF Record' }
      }
    },
    female: {
      '47kg': {
        A: { value: 60, source: 'FFA Minima National' },
        S: { value: 90, source: 'IPF Elite' },
        World: { value: 110, source: 'IPF Record' }
      },
      '52kg': {
        A: { value: 70, source: 'FFA Minima National' },
        S: { value: 100, source: 'IPF Elite' },
        World: { value: 120, source: 'IPF Record' }
      },
      '57kg': {
        A: { value: 80, source: 'FFA Minima National' },
        S: { value: 110, source: 'IPF Elite' },
        World: { value: 130, source: 'IPF Record' }
      },
      '63kg': {
        A: { value: 90, source: 'FFA Minima National' },
        S: { value: 120, source: 'IPF Elite' },
        World: { value: 140, source: 'IPF Record' }
      },
      '72kg': {
        A: { value: 100, source: 'FFA Minima National' },
        S: { value: 130, source: 'IPF Elite' },
        World: { value: 150, source: 'IPF Record' }
      },
      '84kg': {
        A: { value: 110, source: 'FFA Minima National' },
        S: { value: 140, source: 'IPF Elite' },
        World: { value: 160, source: 'IPF Record' }
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
        S: { value: 360, source: 'IPF Elite' },
        World: { value: 420, source: 'IPF Record' }
      },
      '93kg': {
        A: { value: 320, source: 'FFA Minima National' },
        S: { value: 400, source: 'IPF Elite' },
        World: { value: 460, source: 'IPF Record' }
      },
      '105kg': {
        A: { value: 360, source: 'FFA Minima National' },
        S: { value: 440, source: 'IPF Elite' },
        World: { value: 500, source: 'IPF Record' }
      },
      '120kg': {
        A: { value: 380, source: 'FFA Minima National' },
        S: { value: 460, source: 'IPF Elite' },
        World: { value: 520, source: 'IPF Record' }
      }
    },
    female: {
      '47kg': {
        A: { value: 100, source: 'FFA Minima National' },
        S: { value: 140, source: 'IPF Elite' },
        World: { value: 170, source: 'IPF Record' }
      },
      '52kg': {
        A: { value: 120, source: 'FFA Minima National' },
        S: { value: 160, source: 'IPF Elite' },
        World: { value: 190, source: 'IPF Record' }
      },
      '57kg': {
        A: { value: 140, source: 'FFA Minima National' },
        S: { value: 180, source: 'IPF Elite' },
        World: { value: 210, source: 'IPF Record' }
      },
      '63kg': {
        A: { value: 160, source: 'FFA Minima National' },
        S: { value: 200, source: 'IPF Elite' },
        World: { value: 230, source: 'IPF Record' }
      },
      '72kg': {
        A: { value: 180, source: 'FFA Minima National' },
        S: { value: 220, source: 'IPF Elite' },
        World: { value: 250, source: 'IPF Record' }
      },
      '84kg': {
        A: { value: 200, source: 'FFA Minima National' },
        S: { value: 240, source: 'IPF Elite' },
        World: { value: 270, source: 'IPF Record' }
      }
    }
  },
  
  // Deadlift - Hommes
  deadlift: {
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
        S: { value: 360, source: 'IPF Elite' },
        World: { value: 420, source: 'IPF Record' }
      },
      '93kg': {
        A: { value: 320, source: 'FFA Minima National' },
        S: { value: 400, source: 'IPF Elite' },
        World: { value: 460, source: 'IPF Record' }
      },
      '105kg': {
        A: { value: 360, source: 'FFA Minima National' },
        S: { value: 440, source: 'IPF Elite' },
        World: { value: 500, source: 'IPF Record' }
      },
      '120kg': {
        A: { value: 380, source: 'FFA Minima National' },
        S: { value: 460, source: 'IPF Elite' },
        World: { value: 520, source: 'IPF Record' }
      }
    },
    female: {
      '47kg': {
        A: { value: 100, source: 'FFA Minima National' },
        S: { value: 140, source: 'IPF Elite' },
        World: { value: 170, source: 'IPF Record' }
      },
      '52kg': {
        A: { value: 120, source: 'FFA Minima National' },
        S: { value: 160, source: 'IPF Elite' },
        World: { value: 190, source: 'IPF Record' }
      },
      '57kg': {
        A: { value: 140, source: 'FFA Minima National' },
        S: { value: 180, source: 'IPF Elite' },
        World: { value: 210, source: 'IPF Record' }
      },
      '63kg': {
        A: { value: 160, source: 'FFA Minima National' },
        S: { value: 200, source: 'IPF Elite' },
        World: { value: 230, source: 'IPF Record' }
      },
      '72kg': {
        A: { value: 180, source: 'FFA Minima National' },
        S: { value: 220, source: 'IPF Elite' },
        World: { value: 250, source: 'IPF Record' }
      },
      '84kg': {
        A: { value: 200, source: 'FFA Minima National' },
        S: { value: 240, source: 'IPF Elite' },
        World: { value: 270, source: 'IPF Record' }
      }
    }
  }
};

// FONCTION POUR DÉTERMINER LA CATÉGORIE DE POIDS
export const getWeightCategory = (weight: number): string => {
  if (weight <= 66) return '66kg';
  if (weight <= 74) return '74kg';
  if (weight <= 83) return '83kg';
  if (weight <= 93) return '93kg';
  if (weight <= 105) return '105kg';
  return '120kg';
};

// FONCTIONS POUR RÉCUPÉRER LES RÉFÉRENCES SELON LE POIDS ET SEXE
export const getBenchReferences = (weight: number, sex: 'male' | 'female') => {
  const weightCategory = getWeightCategory(weight);
  console.log(`🔍 getBenchReferences: ${weight}kg, ${sex}, catégorie: ${weightCategory}`);
  
  if (sex === 'male') {
    const refs = STANDARDS_DATA.bench.male[weightCategory];
    console.log(`📊 Références bench homme ${weightCategory}:`, refs);
    return refs || STANDARDS_DATA.bench.male['120kg'];
  } else {
    const refs = STANDARDS_DATA.bench.female[weightCategory];
    console.log(`📊 Références bench femme ${weightCategory}:`, refs);
    return refs || STANDARDS_DATA.bench.female['84kg'];
  }
};

export const getSquatReferences = (weight: number, sex: 'male' | 'female') => {
  const weightCategory = getWeightCategory(weight);
  console.log(`🔍 getSquatReferences: ${weight}kg, ${sex}, catégorie: ${weightCategory}`);
  
  if (sex === 'male') {
    const refs = STANDARDS_DATA.squat.male[weightCategory];
    console.log(`📊 Références squat homme ${weightCategory}:`, refs);
    return refs || STANDARDS_DATA.squat.male['120kg'];
  } else {
    const refs = STANDARDS_DATA.squat.female[weightCategory];
    console.log(`📊 Références squat femme ${weightCategory}:`, refs);
    return refs || STANDARDS_DATA.squat.female['84kg'];
  }
};

export const getDeadliftReferences = (weight: number, sex: 'male' | 'female') => {
  const weightCategory = getWeightCategory(weight);
  console.log(`🔍 getDeadliftReferences: ${weight}kg, ${sex}, catégorie: ${weightCategory}`);
  
  if (sex === 'male') {
    const refs = STANDARDS_DATA.deadlift.male[weightCategory];
    console.log(`📊 Références deadlift homme ${weightCategory}:`, refs);
    return refs || STANDARDS_DATA.deadlift.male['120kg'];
  } else {
    const refs = STANDARDS_DATA.deadlift.female[weightCategory];
    console.log(`📊 Références deadlift femme ${weightCategory}:`, refs);
    return refs || STANDARDS_DATA.deadlift.female['84kg'];
  }
};

export const getRunReferences = (sex: 'male' | 'female') => {
  if (sex === 'male') {
    return { A: 20, S: 16, World: 12 }; // Temps en minutes pour 5km
  } else {
    return { A: 25, S: 20, World: 15 };
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
    calisthenics: 0.05  // Peu de calisthenics
  },
  classique: {
    force: 0.5,        // Équilibré
    endurance: 0.3,    // Modéré
    explosivite: 0.15,  // Modéré
    calisthenics: 0.05  // Peu
  },
  marathon: {
    force: 0.1,        // Très peu de force
    endurance: 0.8,    // Focus maximal sur l'endurance
    explosivite: 0.05,  // Très peu d'explosivité
    calisthenics: 0.05  // Peu de calisthenics
  },
  calisthenics: {
    force: 0.3,        // Force relative
    endurance: 0.2,    // Endurance modérée
    explosivite: 0.2,   // Explosivité importante
    calisthenics: 0.3   // Focus sur le calisthenics
  }
};

export const getSportProfile = (sportClass: string) => {
  return USER_PROFILES[sportClass] || USER_PROFILES.classique;
}; 