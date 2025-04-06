/***********************************************
* FILE: src/game/__tests__/utils/gameUtils.test.ts
* CREATED: 2025-04-05 16:13:17
*
* PURPOSE:
* Unit tests for Atomas game utility functions.
*
* METHODS:
* - Test generateAtom()
* - Test canCombineAtoms()
* - Test calculateScore()
*****************/

import { describe, it, expect } from 'vitest';
import { generateAtom, canCombineAtoms, calculateScore } from '../../utils/gameUtils';
import { Atom } from '../../../types/game';

describe('gameUtils', () => {
  describe('generateAtom', () => {
    it('should generate valid atoms', () => {
      const atom = generateAtom();
      expect(atom).toHaveProperty('id');
      expect(atom).toHaveProperty('value');
      expect(atom).toHaveProperty('element');
      expect(typeof atom.id).toBe('string');
      expect(typeof atom.value).toBe('number');
      expect(typeof atom.element).toBe('string');
    });

    it('should generate atoms with valid values', () => {
      const atoms = Array.from({ length: 100 }, () => generateAtom());
      atoms.forEach(atom => {
        expect(atom.value).toSatisfy((v: number) => v === -1 || (v >= 1 && v <= 3));
      });
    });
  });

  describe('canCombineAtoms', () => {
    const createAtom = (value: number): Atom => ({
      id: '1',
      value,
      element: `Element${value}`,
    });

    it('should return true for three identical atoms', () => {
      const result = canCombineAtoms(
        createAtom(1),
        createAtom(1),
        createAtom(1)
      );
      expect(result).toBe(true);
    });

    it('should return false for different atoms', () => {
      const result = canCombineAtoms(
        createAtom(1),
        createAtom(2),
        createAtom(1)
      );
      expect(result).toBe(false);
    });

    it('should return false when plus atom is involved', () => {
      const result = canCombineAtoms(
        createAtom(1),
        createAtom(-1),
        createAtom(1)
      );
      expect(result).toBe(false);
    });
  });

  describe('calculateScore', () => {
    it('should calculate base score correctly for low values', () => {
      expect(calculateScore(1)).toBe(200); // 2^1 * 100
      expect(calculateScore(2)).toBe(400); // 2^2 * 100
      expect(calculateScore(3)).toBe(800); // 2^3 * 100
    });

    it('should include bonus for high-value combinations', () => {
      expect(calculateScore(6)).toBe(6400 + 3000); // (2^6 * 100) + (6 * 500)
      expect(calculateScore(7)).toBe(12800 + 3500); // (2^7 * 100) + (7 * 500)
    });
  });
});