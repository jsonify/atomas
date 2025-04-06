import { memo } from 'react';
import type { Atom as AtomType } from '../../types/game';

interface AtomProps extends AtomType {
  onClick?: () => void;
}

const Atom = memo(({ value, element, onClick }: AtomProps) => {
  return (
    <div 
      className="atom"
      onClick={onClick}
      role="button"
      aria-label={`${element} atom with value ${value}`}
    >
      <span className="atom-value">{value}</span>
      <span className="atom-element">{element}</span>
    </div>
  );
});

Atom.displayName = 'Atom';

export default Atom;