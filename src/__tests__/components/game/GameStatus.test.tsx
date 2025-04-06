import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../tests/utils';
import GameStatus from '../../../components/game/GameStatus';

describe('GameStatus', () => {
  it('renders score', () => {
    render(<GameStatus score={100} isGameOver={false} />);
    expect(screen.getByText('Score: 100')).toBeInTheDocument();
  });

  it('does not show game over message when game is not over', () => {
    render(<GameStatus score={100} isGameOver={false} />);
    expect(screen.queryByText('Game Over!')).not.toBeInTheDocument();
  });

  it('shows game over message when game is over', () => {
    render(<GameStatus score={100} isGameOver={true} />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
  });

  it('updates score when it changes', () => {
    const { rerender } = render(<GameStatus score={100} isGameOver={false} />);
    expect(screen.getByText('Score: 100')).toBeInTheDocument();

    rerender(<GameStatus score={200} isGameOver={false} />);
    expect(screen.getByText('Score: 200')).toBeInTheDocument();
  });
});