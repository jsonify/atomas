import { memo } from 'react';
import type { Atom as AtomType } from '../../types/game';
import Atom from '../atoms/Atom';

interface GameBoardProps {
  atoms: AtomType[];
  centerAtom: AtomType | null;
  onAtomClick: (id: string) => void;
}

const GameBoard = memo(({ atoms, centerAtom, onAtomClick }: GameBoardProps) => {
  return (
    <div className="game-board" role="region" aria-label="Game Board">
      <div className="game-board-circle">
        {atoms.map((atom) => (
          <div
            key={atom.id}
            className="atom-position"
            style={{
              transform: `rotate(${(atom.position || 0) * 45}deg) translateX(100px)`,
            }}
          >
            <Atom {...atom} onClick={() => onAtomClick(atom.id)} />
          </div>
        ))}
      </div>
      
      {centerAtom && (
        <div className="center-atom">
          <Atom {...centerAtom} />
        </div>
      )}
    </div>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;