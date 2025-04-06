import { useCallback } from 'react';
import Layout from './components/layout/Layout';
import GameBoard from './components/game/GameBoard';
import GameControls from './components/game/GameControls';
import GameStatus from './components/game/GameStatus';
import { useGame } from './hooks/useGame';
import './styles/main.scss';

function App() {
  const {
    gameState,
    rotateClockwise,
    rotateCounterClockwise,
    placeAtom,
    resetGame
  } = useGame();

  const handleAtomClick = useCallback((id: string) => {
    const position = gameState.atoms.findIndex(atom => atom.id === id);
    if (position !== -1) {
      placeAtom(position);
    }
  }, [gameState.atoms, placeAtom]);

  const handleCombine = useCallback(() => {
    if (gameState.centerAtom) {
      const middlePosition = Math.floor(gameState.atoms.length / 2);
      placeAtom(middlePosition);
    }
  }, [gameState.centerAtom, gameState.atoms.length, placeAtom]);

  return (
    <Layout>
      <div className="game-container">
        <GameStatus
          score={gameState.score}
          isGameOver={gameState.isGameOver}
        />
        
        <GameBoard
          atoms={gameState.atoms}
          centerAtom={gameState.centerAtom}
          onAtomClick={handleAtomClick}
        />
        
        <GameControls
          onRotateClockwise={rotateClockwise}
          onRotateCounterClockwise={rotateCounterClockwise}
          onCombine={handleCombine}
        />

        {gameState.isGameOver && (
          <button
            onClick={resetGame}
            className="reset-button"
            aria-label="Reset Game"
          >
            Play Again
          </button>
        )}
      </div>
    </Layout>
  );
}

export default App;
