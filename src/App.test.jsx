import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App tests...', () => {
  test('Verify that App is rendering', () => {
    // TODO: if app variable isn't used for anything specific,
    //  keep only `render(<App />)` here:
    const app = render(<App />)

    // TODO: this is temporary debugging line here.
    //  remove line below, when this test is complete
    screen.debug()
  })
})
