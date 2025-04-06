import { memo } from 'react';
import type { GameControls as GameControlsType } from '../../types/game';

const GameControls = memo(({
  onRotateClockwise,
  onRotateCounterClockwise,
  onCombine
}: GameControlsType) => {
  return (
    <div className="game-controls" role="group" aria-label="Game Controls">
      <button
        onClick={onRotateCounterClockwise}
        aria-label="Rotate Counter-clockwise"
        className="control-button"
      >
        ↺
      </button>
      
      <button
        onClick={onCombine}
        aria-label="Combine Atoms"
        className="control-button combine"
      >
        Combine
      </button>
      
      <button
        onClick={onRotateClockwise}
        aria-label="Rotate Clockwise"
        className="control-button"
      >
        ↻
      </button>
    </div>
  );
});

GameControls.displayName = 'GameControls';

export default GameControls;