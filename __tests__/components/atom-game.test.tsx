import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import AtomGame from '@/components/atom-game'

describe('AtomGame', () => {
  it('renders the game interface', () => {
    render(<AtomGame />)
    
    // Check for score display
    expect(screen.getByText(/score:/i)).toBeInTheDocument()
    
    // Check for game instructions
    expect(screen.getByText(/plus atoms/i)).toBeInTheDocument()
    expect(screen.getByText(/minus atoms/i)).toBeInTheDocument()
    expect(screen.getByText(/arrow atoms/i)).toBeInTheDocument()
    
    // Check for restart button
    expect(screen.getByRole('button', { name: /restart game/i })).toBeInTheDocument()
  })

  it('starts with initial atom count', () => {
    render(<AtomGame />)
    
    // Should start with 6 atoms (as defined in startGame)
    expect(screen.getByText('6/18')).toBeInTheDocument()
  })

  it('starts with score of 0', () => {
    render(<AtomGame />)
    expect(screen.getByText('Score: 0')).toBeInTheDocument()
  })

  it('can restart the game', async () => {
    render(<AtomGame />)
    const user = userEvent.setup()
    
    const restartButton = screen.getByRole('button', { name: /restart game/i })
    await user.click(restartButton)
    
    // After restart, score should be 0
    expect(screen.getByText('Score: 0')).toBeInTheDocument()
    // Should have initial atom count
    expect(screen.getByText('6/18')).toBeInTheDocument()
  })
})