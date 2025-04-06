/***********************************************
* FILE: src/game/GameEngine.ts
* CREATED: 2025-04-05 16:12:25
*
* PURPOSE:
* Core game engine for Atomas. Manages game state, atom combinations,
* and scoring independently of UI components.
*
* METHODS:
* - createGame(): Creates a new game instance
* - placeAtom(): Places current atom in the circle
* - combineAtoms(): Combines matching atoms
* - rotateAtoms(): Rotates atoms in the circle
* - getGameState(): Returns current game state
*****************/

import { Atom, GameState } from '../types/game';
import { generateAtom, canCombineAtoms, calculateScore } from './utils/gameUtils';

export class GameEngine {
  private state: GameState;
  private static readonly INITIAL_CIRCLE_SIZE = 6;
  private static readonly MAX_CIRCLE_SIZE = 18;

  constructor() {
    this.state = this.createInitialState();
  }

  private createInitialState(): GameState {
    return {
      score: 0,
      isGameOver: false,
      atoms: Array.from({ length: GameEngine.INITIAL_CIRCLE_SIZE }, () => generateAtom()),
      centerAtom: generateAtom(),
    };
  }

  public getGameState(): GameState {
    return { ...this.state };
  }

  public rotateClockwise(): void {
    if (this.state.isGameOver) return;

    const newAtoms = [...this.state.atoms];
    const lastAtom = newAtoms.pop();
    if (lastAtom) {
      newAtoms.unshift(lastAtom);
    }
    this.state.atoms = newAtoms;
  }

  public rotateCounterClockwise(): void {
    if (this.state.isGameOver) return;

    const newAtoms = [...this.state.atoms];
    const firstAtom = newAtoms.shift();
    if (firstAtom) {
      newAtoms.push(firstAtom);
    }
    this.state.atoms = newAtoms;
  }

  public placeAtom(position: number): void {
    if (this.state.isGameOver || !this.state.centerAtom) return;

    const newAtoms = [...this.state.atoms];
    newAtoms.splice(position, 0, this.state.centerAtom);

    if (newAtoms.length > GameEngine.MAX_CIRCLE_SIZE) {
      this.state.isGameOver = true;
      return;
    }

    this.state.atoms = newAtoms;
    this.state.centerAtom = generateAtom();
    this.checkCombinations(position);
  }

  private checkCombinations(position: number): void {
    const atoms = this.state.atoms;
    const currentAtom = atoms[position];

    if (!currentAtom) return;

    // Check for plus atom combinations
    if (currentAtom.value === -1) {
      this.handlePlusAtomCombination(position);
      return;
    }

    // Check for regular combinations
    const leftIdx = (position - 1 + atoms.length) % atoms.length;
    const rightIdx = (position + 1) % atoms.length;

    if (canCombineAtoms(atoms[leftIdx], currentAtom, atoms[rightIdx])) {
      this.combineAtoms(leftIdx, position, rightIdx);
    }
  }

  private handlePlusAtomCombination(position: number): void {
    const atoms = this.state.atoms;
    const leftIdx = (position - 1 + atoms.length) % atoms.length;
    const rightIdx = (position + 1) % atoms.length;

    if (atoms[leftIdx].value === atoms[rightIdx].value) {
      const newValue = atoms[leftIdx].value + 1;
      const combinedAtom: Atom = {
        id: `${Date.now()}-${newValue}`,
        value: newValue,
        element: `Element${newValue}`,
      };

      const newAtoms = [...atoms];
      newAtoms.splice(Math.min(position, rightIdx), 3);
      newAtoms.splice(position - 1, 0, combinedAtom);
      
      this.state.atoms = newAtoms;
      this.state.score += calculateScore(newValue);
    }
  }

  private combineAtoms(left: number, center: number, right: number): void {
    const atoms = this.state.atoms;
    const newValue = atoms[center].value + 1;
    const combinedAtom: Atom = {
      id: `${Date.now()}-${newValue}`,
      value: newValue,
      element: `Element${newValue}`,
    };

    const newAtoms = [...atoms];
    const removeIndices = [left, center, right].sort((a, b) => b - a);
    removeIndices.forEach(index => {
      newAtoms.splice(index, 1);
    });
    newAtoms.splice(left, 0, combinedAtom);

    this.state.atoms = newAtoms;
    this.state.score += calculateScore(newValue);
    
    // Check for chain reactions
    this.checkCombinations(left);
  }

  public resetGame(): void {
    this.state = this.createInitialState();
  }
}

export const createGame = (): GameEngine => {
  return new GameEngine();
};