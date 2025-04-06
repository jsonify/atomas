import { useState, useCallback, useRef } from 'react';
import { GameEngine, createGame } from '../game/GameEngine';
import { GameState } from '../types/game';

export const useGame = () => {
  const gameEngineRef = useRef<GameEngine>(createGame());
  const [gameState, setGameState] = useState<GameState>(gameEngineRef.current.getGameState());

  const updateState = useCallback(() => {
    setGameState(gameEngineRef.current.getGameState());
  }, []);

  const rotateClockwise = useCallback(() => {
    gameEngineRef.current.rotateClockwise();
    updateState();
  }, [updateState]);

  const rotateCounterClockwise = useCallback(() => {
    gameEngineRef.current.rotateCounterClockwise();
    updateState();
  }, [updateState]);

  const placeAtom = useCallback((position: number) => {
    gameEngineRef.current.placeAtom(position);
    updateState();
  }, [updateState]);

  const resetGame = useCallback(() => {
    gameEngineRef.current.resetGame();
    updateState();
  }, [updateState]);

  return {
    gameState,
    rotateClockwise,
    rotateCounterClockwise,
    placeAtom,
    resetGame
  };
};