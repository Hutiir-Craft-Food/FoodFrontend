import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer tests...', () => {
  test('verify component contains word `Footer`', () => {
    render(<Footer />)

    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
