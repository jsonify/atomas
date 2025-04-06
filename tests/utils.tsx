import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add custom options here as needed
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
) {
  return render(ui, { ...options })
}

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }