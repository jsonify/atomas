import { memo } from 'react';
import type { GameStatus as GameStatusType } from '../../types/game';

const GameStatus = memo(({ score, isGameOver }: GameStatusType) => {
  return (
    <div className="game-status" role="status">
      <div className="score">
        Score: {score}
      </div>
      {isGameOver && (
        <div className="game-over" aria-label="Game Over">
          Game Over!
        </div>
      )}
    </div>
  );
});

GameStatus.displayName = 'GameStatus';

export default GameStatus;