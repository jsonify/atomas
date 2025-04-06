import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../../../tests/utils';
import Atom from '../../../components/atoms/Atom';

describe('Atom', () => {
  const defaultProps = {
    id: '1',
    value: 1,
    element: 'H',
  };

  it('renders with correct value and element', () => {
    render(<Atom {...defaultProps} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('H')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Atom {...defaultProps} onClick={onClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-label', () => {
    render(<Atom {...defaultProps} />);
    
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'H atom with value 1'
    );
  });
});