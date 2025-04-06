import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../tests/utils';
import GameBoard from '../../../components/game/GameBoard';

describe('GameBoard', () => {
  const mockAtoms = [
    { id: '1', value: 1, element: 'H', position: 0 },
    { id: '2', value: 2, element: 'He', position: 1 },
  ];

  const mockCenterAtom = { id: '3', value: 3, element: 'Li' };

  it('renders atoms in circular positions', () => {
    render(
      <GameBoard
        atoms={mockAtoms}
        centerAtom={mockCenterAtom}
        onAtomClick={() => {}}
      />
    );

    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('He')).toBeInTheDocument();
    expect(screen.getByText('Li')).toBeInTheDocument();
  });

  it('calls onAtomClick with correct id when atom is clicked', () => {
    const handleClick = vi.fn();
    render(
      <GameBoard
        atoms={mockAtoms}
        centerAtom={mockCenterAtom}
        onAtomClick={handleClick}
      />
    );

    fireEvent.click(screen.getByText('H'));
    expect(handleClick).toHaveBeenCalledWith('1');
  });

  it('renders without center atom when centerAtom is null', () => {
    render(
      <GameBoard
        atoms={mockAtoms}
        centerAtom={null}
        onAtomClick={() => {}}
      />
    );

    expect(screen.queryByText('Li')).not.toBeInTheDocument();
  });
});