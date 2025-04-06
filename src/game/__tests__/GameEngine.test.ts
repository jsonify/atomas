/***********************************************
* FILE: src/game/__tests__/GameEngine.test.ts
* CREATED: 2025-04-05 16:13:41
*
* PURPOSE:
* Unit tests for the Atomas game engine core functionality.
*
* METHODS:
* - Test game initialization
* - Test atom placement and rotation
* - Test combination mechanics
* - Test game over conditions
* - Test scoring system
*****************/

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GameEngine, createGame } from '../GameEngine';
import { generateAtom } from '../utils/gameUtils';
import { Atom } from '../../types/game';

// Mock atom generation for predictable tests
vi.mock('../utils/gameUtils', () => ({
  generateAtom: vi.fn(),
  canCombineAtoms: vi.fn(),
  calculateScore: vi.fn()
}));

describe('GameEngine', () => {
  let engine: GameEngine;
  let mockAtomCounter = 0;

  beforeEach(() => {
    // Reset mock counter
    mockAtomCounter = 0;
    
    // Create predictable atoms for testing
    (generateAtom as jest.Mock).mockImplementation(() => ({
      id: `test-${mockAtomCounter}`,
      value: mockAtomCounter % 3 + 1,
      element: `Element${mockAtomCounter % 3 + 1}`,
    }));

    engine = createGame();
  });

  describe('initialization', () => {
    it('should create initial game state', () => {
      const state = engine.getGameState();
      expect(state.score).toBe(0);
      expect(state.isGameOver).toBe(false);
      expect(state.atoms.length).toBe(6);
      expect(state.centerAtom).toBeTruthy();
    });
  });

  describe('rotation', () => {
    it('should rotate atoms clockwise', () => {
      const initialState = engine.getGameState();
      const firstAtom = initialState.atoms[0];
      
      engine.rotateClockwise();
      
      const newState = engine.getGameState();
      expect(newState.atoms[newState.atoms.length - 1]).toEqual(firstAtom);
    });

    it('should rotate atoms counter-clockwise', () => {
      const initialState = engine.getGameState();
      const lastAtom = initialState.atoms[initialState.atoms.length - 1];
      
      engine.rotateCounterClockwise();
      
      const newState = engine.getGameState();
      expect(newState.atoms[0]).toEqual(lastAtom);
    });

    it('should not rotate when game is over', () => {
      const initialState = engine.getGameState();
      engine['state'].isGameOver = true;
      
      engine.rotateClockwise();
      
      expect(engine.getGameState().atoms).toEqual(initialState.atoms);
    });
  });

  describe('atom placement', () => {
    it('should place center atom at specified position', () => {
      const initialState = engine.getGameState();
      const centerAtom = initialState.centerAtom;
      
      engine.placeAtom(2);
      
      const newState = engine.getGameState();
      expect(newState.atoms[2]).toEqual(centerAtom);
      expect(newState.atoms.length).toBe(7);
      expect(newState.centerAtom).not.toEqual(centerAtom);
    });

    it('should trigger game over when exceeding max size', () => {
      // Fill the circle to maximum size
      for (let i = 0; i < 12; i++) {
        engine.placeAtom(0);
      }
      
      const state = engine.getGameState();
      expect(state.isGameOver).toBe(true);
    });
  });

  describe('combinations', () => {
    beforeEach(() => {
      // Reset mock to create specific atom patterns
      mockAtomCounter = 0;
      (generateAtom as jest.Mock).mockImplementation(() => ({
        id: `test-${mockAtomCounter++}`,
        value: 1, // All atoms have value 1 for easier testing
        element: 'Element1',
      }));
      
      engine = createGame();
    });

    it('should combine three matching atoms', () => {
      const initialLength = engine.getGameState().atoms.length;
      
      // Place an atom to create a combination
      engine.placeAtom(2);
      
      const newState = engine.getGameState();
      expect(newState.atoms.length).toBe(initialLength - 2);
      expect(newState.score).toBeGreaterThan(0);
    });

    it('should handle plus atom combinations', () => {
      // Setup plus atom scenario
      (generateAtom as jest.Mock).mockImplementationOnce(() => ({
        id: 'plus-atom',
        value: -1,
        element: 'Plus',
      }));
      
      engine = createGame();
      engine.placeAtom(2);
      
      const state = engine.getGameState();
      expect(state.score).toBeGreaterThan(0);
    });
  });

  describe('game reset', () => {
    it('should reset game to initial state', () => {
      // Play some moves
      engine.placeAtom(0);
      engine.placeAtom(1);
      
      engine.resetGame();
      
      const state = engine.getGameState();
      expect(state.score).toBe(0);
      expect(state.isGameOver).toBe(false);
      expect(state.atoms.length).toBe(6);
      expect(state.centerAtom).toBeTruthy();
    });
  });
});