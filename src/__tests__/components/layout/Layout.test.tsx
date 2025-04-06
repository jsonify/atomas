import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../tests/utils';
import Layout from '../../../components/layout/Layout';

describe('Layout', () => {
  const defaultProps = {
    atoms: [
      { id: '1', value: 1, element: 'H', position: 0 },
      { id: '2', value: 2, element: 'He', position: 1 },
    ],
    centerAtom: { id: '3', value: 3, element: 'Li' },
    score: 100,
    isGameOver: false,
    onRotateClockwise: vi.fn(),
    onRotateCounterClockwise: vi.fn(),
    onCombine: vi.fn(),
    onAtomClick: vi.fn(),
  };

  it('renders all game components', () => {
    render(<Layout {...defaultProps} />);

    expect(screen.getByText('Atomas')).toBeInTheDocument();
    expect(screen.getByText('Score: 100')).toBeInTheDocument();
    expect(screen.getByLabelText('Game Board')).toBeInTheDocument();
    expect(screen.getByLabelText('Game Controls')).toBeInTheDocument();
  });

  it('passes correct props to child components', () => {
    render(<Layout {...defaultProps} />);

    // Check if atoms are rendered
    expect(screen.getByText('H')).toBeInTheDocument();
    expect(screen.getByText('He')).toBeInTheDocument();
    expect(screen.getByText('Li')).toBeInTheDocument();

    // Check if controls are rendered
    expect(screen.getByLabelText('Rotate Clockwise')).toBeInTheDocument();
    expect(screen.getByLabelText('Rotate Counter-clockwise')).toBeInTheDocument();
    expect(screen.getByLabelText('Combine Atoms')).toBeInTheDocument();
  });

  it('shows game over state when game is over', () => {
    render(<Layout {...defaultProps} isGameOver={true} />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  });
});