import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Footer from './Footer'

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  test('renders logo image', () => {
    const logoImage = screen.getByRole('img', { name: 'logo' })
    expect(logoImage).toBeInTheDocument()
    expect(logoImage.src).toContain('/images/logo-footer.png')
  })

  test('renders email subscription form', () => {
    expect(
      screen.getByLabelText('Підпишись і отримуй спеціальні пропозиції!')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ваш e-mail')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'надіслати' })).toBeInTheDocument()
  })

  test('renders agreement message', () => {
    expect(
      screen.getByText(
        /Натискаючи кнопку «Підписатись», ви даєте згоду на обробку персональних даних/
      )
    ).toBeInTheDocument()
  })

  test('renders navigation sections', () => {
    expect(screen.getByText('Про нас')).toBeInTheDocument()
    expect(screen.getByText('Покупцям')).toBeInTheDocument()
    expect(screen.getByText('Продавцям')).toBeInTheDocument()
    expect(screen.getByText('Наша місія')).toBeInTheDocument()
    expect(screen.getByText('Блог')).toBeInTheDocument()
    expect(screen.getByText('Умови співпраці')).toBeInTheDocument()
  })

  test('renders social media icons', () => {
    expect(
      screen.getByRole('img', { name: 'facebook icon.' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'intagram icon' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'telegram icon' })
    ).toBeInTheDocument()
  })

  test('renders copyright text', () => {
    expect(screen.getByText(/© dreamteam, 2024-2025/)).toBeInTheDocument()
  })

  test('validates email input is required', () => {
    const emailInput = screen.getByPlaceholderText('Ваш e-mail')
    expect(emailInput).toHaveAttribute('required')
  })
})
