import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '../../tests/utils'
import App from '../App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('updates count when button is clicked', async () => {
    render(<App />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('count is 0')
    
    await fireEvent.click(button)
    expect(button).toHaveTextContent('count is 1')
  })

  it('displays logo images with correct alt text', () => {
    render(<App />)
    
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument()
    expect(screen.getByAltText('React logo')).toBeInTheDocument()
  })
})