import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../tests/utils';
import GameControls from '../../../components/game/GameControls';

describe('GameControls', () => {
  const mockHandlers = {
    onRotateClockwise: vi.fn(),
    onRotateCounterClockwise: vi.fn(),
    onCombine: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all control buttons', () => {
    render(<GameControls {...mockHandlers} />);
    
    expect(screen.getByLabelText('Rotate Clockwise')).toBeInTheDocument();
    expect(screen.getByLabelText('Rotate Counter-clockwise')).toBeInTheDocument();
    expect(screen.getByLabelText('Combine Atoms')).toBeInTheDocument();
  });

  it('calls correct handlers when buttons are clicked', () => {
    render(<GameControls {...mockHandlers} />);
    
    fireEvent.click(screen.getByLabelText('Rotate Clockwise'));
    expect(mockHandlers.onRotateClockwise).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText('Rotate Counter-clockwise'));
    expect(mockHandlers.onRotateCounterClockwise).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByLabelText('Combine Atoms'));
    expect(mockHandlers.onCombine).toHaveBeenCalledTimes(1);
  });

  it('buttons are correctly labeled', () => {
    render(<GameControls {...mockHandlers} />);
    
    expect(screen.getByText('↻')).toBeInTheDocument();
    expect(screen.getByText('↺')).toBeInTheDocument();
    expect(screen.getByText('Combine')).toBeInTheDocument();
  });
});