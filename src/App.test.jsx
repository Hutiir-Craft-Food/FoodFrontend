import { render, screen } from '@testing-library/react'
import App from './App'

describe('blah-blah-test descriptoin', () => {
  test('blah-blah-test case', () => {
    const app = render(<App />)
    screen.debug()
  })
})
