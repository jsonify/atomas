import '@testing-library/jest-dom'
import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  interface Assertion<T = any>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
}

// Run cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})