/***********************************************
* FILE: src/game/utils/gameUtils.ts
* CREATED: 2025-04-05 16:13:00
*
* PURPOSE:
* Utility functions for the Atomas game engine handling atom generation,
* combination rules, and score calculations.
*
* METHODS:
* - generateAtom(): Creates a new atom with random properties
* - canCombineAtoms(): Checks if atoms can be combined
* - calculateScore(): Calculates points for combinations
*****************/

import { Atom } from '../../types/game';

const PLUS_ATOM_VALUE = -1;
const INITIAL_MAX_VALUE = 3;
const PLUS_ATOM_PROBABILITY = 0.15;

export const generateAtom = (): Atom => {
  const isPlusAtom = Math.random() < PLUS_ATOM_PROBABILITY;
  const value = isPlusAtom ? PLUS_ATOM_VALUE : Math.floor(Math.random() * INITIAL_MAX_VALUE) + 1;
  
  return {
    id: `${Date.now()}-${Math.random()}`,
    value,
    element: value === PLUS_ATOM_VALUE ? 'Plus' : `Element${value}`,
  };
};

export const canCombineAtoms = (left: Atom, center: Atom, right: Atom): boolean => {
  // Can't combine with plus atoms
  if (left.value === PLUS_ATOM_VALUE || center.value === PLUS_ATOM_VALUE || right.value === PLUS_ATOM_VALUE) {
    return false;
  }

  // Regular combination: three identical atoms
  return left.value === center.value && center.value === right.value;
};

export const calculateScore = (combinedValue: number): number => {
  // Base score is exponential based on the combined atom's value
  const baseScore = Math.pow(2, combinedValue) * 100;
  
  // Bonus for higher-value combinations
  const bonus = combinedValue > 5 ? combinedValue * 500 : 0;
  
  return baseScore + bonus;
};