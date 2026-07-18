import { describe, it, expect } from 'vitest';
import { RECETTES, calculerMacrosRecette, getRecetteById, getAlimentById } from './nutritionData';

describe('RECETTES data integrity', () => {
  it('every ingredient reference resolves to a real Aliment (no stale/mismatched array index)', () => {
    RECETTES.forEach((recette) => {
      recette.ingredients.forEach((ing) => {
        expect(ing.aliment).toBeTruthy();
        expect(typeof ing.aliment.nom).toBe('string');
        expect(ing.aliment.nom.length).toBeGreaterThan(0);
      });
    });
  });

  it('gives every recipe a unique id, emoji and classe for the Nutrition page cards/filters', () => {
    const ids = RECETTES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    RECETTES.forEach((recette) => {
      expect(recette.emoji).toBeTruthy();
      expect(recette.classe).toBeTruthy();
    });
  });
});

describe('calculerMacrosRecette', () => {
  it('sums ingredient macros scaled by quantity and divides by portions', () => {
    const recette = getRecetteById('1')!; // Bowl protéiné : Poulet 150g, Riz complet 100g, Huile 10g, Brocoli 100g
    const macros = calculerMacrosRecette(recette);

    expect(macros.calories).toBe(481);
    expect(macros.proteines).toBe(53);
    expect(macros.glucides).toBe(30);
    expect(macros.lipides).toBe(16);
  });

  it('uses the correct ingredients for the Bowl protéiné (regression: indices used to be off by one)', () => {
    const recette = getRecetteById('1')!;
    const names = recette.ingredients.map((i) => i.aliment.nom);
    expect(names).toContain('Poulet (poitrine)');
    expect(names).toContain('Riz complet');
    expect(names).toContain('Huile d\'olive');
    expect(names).toContain('Brocoli');
  });

  it('divides correctly when a recipe serves more than one portion', () => {
    const singlePortion = getRecetteById('1')!;
    const doublePortion = { ...singlePortion, portions: 2 };
    const macrosSingle = calculerMacrosRecette(singlePortion);
    const macrosDouble = calculerMacrosRecette(doublePortion);
    expect(macrosDouble.calories).toBeLessThan(macrosSingle.calories);
    expect(macrosDouble.calories).toBeCloseTo(macrosSingle.calories / 2, -1);
  });
});

describe('getAlimentById / getRecetteById', () => {
  it('returns undefined for an unknown id instead of throwing', () => {
    expect(getAlimentById('does-not-exist')).toBeUndefined();
    expect(getRecetteById('does-not-exist')).toBeUndefined();
  });
});
