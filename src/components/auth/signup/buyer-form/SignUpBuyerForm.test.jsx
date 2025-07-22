import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import SignUpBuyerForm from './SignUpBuyerForm'
import { useAuthStore } from '../../store/AuthStore'

//npm run test SignUpBuyerForm.test.jsx

jest.mock('../../store/AuthStore')

describe('SignUpBuyerForm', () => {
  let mockSetEmail, mockSetPassword, mockAddError, mockRemoveError

  beforeEach(() => {
    mockSetEmail = jest.fn()
    mockSetPassword = jest.fn()
    mockAddError = jest.fn()
    mockRemoveError = jest.fn()
  })

  test('renders email, password fields and password visibility toggle button', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    render(<SignUpBuyerForm />)

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { type: 'button' })).toBeInTheDocument()
  })

  test('calls setEmail when email field changes', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    render(<SignUpBuyerForm />)

    const emailInput = screen.getByLabelText(/e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } })
    expect(mockSetEmail).toHaveBeenCalledWith('user@test.com')
  })

  test('calls setPassword when password field changes', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    render(<SignUpBuyerForm />)

    const passwordInput = screen.getByLabelText(/пароль/i)
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } })
    expect(mockSetPassword).toHaveBeenCalledWith('mypassword')
  })

  test('displays error if email is invalid after blur', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    const { rerender } = render(<SignUpBuyerForm />)

    const emailInput = screen.getByLabelText(/e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } })
    fireEvent.blur(emailInput)

    expect(mockAddError).toHaveBeenCalledWith(
      expect.objectContaining({ email: expect.any(String) })
    )

    useAuthStore.mockReturnValue({
      email: 'not-an-email',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: { email: 'Невірний email' },
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    rerender(<SignUpBuyerForm />)

    expect(screen.getByText(/Невірний email/i)).toBeInTheDocument()
  })

  test('displays error if password is too short after blur', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    const { rerender } = render(<SignUpBuyerForm />)

    const passwordInput = screen.getByLabelText(/пароль/i)
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.blur(passwordInput)

    expect(mockAddError).toHaveBeenCalledWith(
      expect.objectContaining({ password: expect.any(String) })
    )

    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '123',
      setPassword: mockSetPassword,
      errors: { password: 'Пароль замалий' },
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    rerender(<SignUpBuyerForm />)

    expect(screen.getByText(/Пароль замалий/i)).toBeInTheDocument()
  })

  test('toggles password visibility on button click', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    const { container } = render(<SignUpBuyerForm />)

    const passwordInput = screen.getByLabelText(/пароль/i)
    const toggleButton = container.querySelector('#togglePassword')

    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'text')

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })
})
