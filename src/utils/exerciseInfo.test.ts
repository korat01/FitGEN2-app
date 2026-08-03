import { describe, it, expect } from 'vitest';
import { getExerciseInfo } from './exerciseInfo';

describe('getExerciseInfo', () => {
  it('reconnaît les 3 mouvements IPF et fournit des règles', () => {
    ['Squat', 'Développé Couché', 'Soulevé de Terre'].forEach((nom) => {
      const info = getExerciseInfo(nom);
      expect(info?.isIPFLift).toBe(true);
      expect(info?.ipfRules?.length).toBeGreaterThan(0);
    });
  });

  it('retrouve le mouvement canonique malgré les suffixes ajoutés par les générateurs', () => {
    const variants = [
      'Squat (échauffement)',
      'Développé Couché (FSL)',
      'Soulevé de Terre (volume)',
      'Développé Couché Pause',
      'Squat (vitesse)',
      'Squat (test — trouvez votre charge de référence)',
    ];
    variants.forEach((nom) => {
      expect(getExerciseInfo(nom)).toBeDefined();
      expect(getExerciseInfo(nom)?.isIPFLift).toBe(true);
    });
  });

  it('les accessoires sont reconnus mais ne sont pas marqués comme mouvements IPF', () => {
    const info = getExerciseInfo('Presse à Jambes');
    expect(info).toBeDefined();
    expect(info?.isIPFLift).toBe(false);
    expect(info?.ipfRules).toBeUndefined();
  });

  it("retourne undefined pour un exercice totalement inconnu", () => {
    expect(getExerciseInfo('Exercice Mystère Inventé')).toBeUndefined();
  });
});
