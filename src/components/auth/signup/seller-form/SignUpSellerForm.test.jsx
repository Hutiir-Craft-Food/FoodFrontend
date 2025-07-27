import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import SignUpSellerForm from './SignUpSellerForm'
import { useAuthStore } from '../../store/AuthStore'

jest.mock('../../store/AuthStore')

describe('SignUpSellerForm component tests', () => {
  let mockSetEmail,
    mockSetPassword,
    mockSetDetails,
    mockAddError,
    mockRemoveError

  beforeEach(() => {
    mockSetEmail = jest.fn()
    mockSetPassword = jest.fn()
    mockSetDetails = jest.fn()
    mockAddError = jest.fn()
    mockRemoveError = jest.fn()
  })

  test('renders all inputs and toggle password button', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      details: { sellerName: '' },
      setDetails: mockSetDetails,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    render(<SignUpSellerForm />)

    expect(screen.getByLabelText(/назва компанії/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument()

    const toggleBtn = document.querySelector('#togglePassword')
    expect(toggleBtn).toBeInTheDocument()
  })

  test('shows error message for invalid email on blur event', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      details: { sellerName: '' },
      setDetails: mockSetDetails,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    const { rerender } = render(<SignUpSellerForm />)

    const emailInput = screen.getByLabelText(/e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)

    expect(mockAddError).toHaveBeenCalledWith(
      expect.objectContaining({ email: expect.any(String) })
    )

    useAuthStore.mockReturnValue({
      email: 'invalid-email',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      details: { sellerName: '' },
      setDetails: mockSetDetails,
      errors: { email: 'Невірний email' },
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    rerender(<SignUpSellerForm />)

    expect(screen.getByText(/Невірний email/i)).toBeInTheDocument()
  })

  test('does NOT show error message for valid email', () => {
    useAuthStore.mockReturnValue({
      email: 'user@example.com',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      details: { sellerName: '' },
      setDetails: mockSetDetails,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    render(<SignUpSellerForm />)

    expect(screen.queryByText(/Невірний email/i)).not.toBeInTheDocument()
  })

  test('toggles password visibility on toggle button click', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: 'password123',
      setPassword: mockSetPassword,
      details: { sellerName: '' },
      setDetails: mockSetDetails,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    const { container } = render(<SignUpSellerForm />)

    const passwordInput = screen.getByLabelText(/пароль/i)
    const toggleBtn = container.querySelector('button#togglePassword')

    expect(passwordInput).toHaveAttribute('type', 'password')

    fireEvent.click(toggleBtn)
    expect(passwordInput).toHaveAttribute('type', 'text')

    fireEvent.click(toggleBtn)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  test('calls store setters on input change events', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      details: { sellerName: '' },
      setDetails: mockSetDetails,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    render(<SignUpSellerForm />)

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'user@test.com' },
    })
    expect(mockSetEmail).toHaveBeenCalledWith('user@test.com')

    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'mypassword' },
    })
    expect(mockSetPassword).toHaveBeenCalledWith('mypassword')

    fireEvent.change(screen.getByLabelText(/назва компанії/i), {
      target: { value: 'My Company' },
    })
    expect(mockSetDetails).toHaveBeenCalledWith(
      expect.objectContaining({ sellerName: 'My Company' })
    )
  })

  test('keeps input values after rerender', () => {
    useAuthStore.mockReturnValue({
      email: 'persist@example.com',
      setEmail: mockSetEmail,
      password: 'persistpass',
      setPassword: mockSetPassword,
      details: { sellerName: 'Persist Name' },
      setDetails: mockSetDetails,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    const { rerender } = render(<SignUpSellerForm />)

    expect(screen.getByLabelText(/e-mail/i)).toHaveValue('persist@example.com')
    expect(screen.getByLabelText(/пароль/i)).toHaveValue('persistpass')
    expect(screen.getByLabelText(/назва компанії/i)).toHaveValue('Persist Name')

    rerender(<SignUpSellerForm />)

    expect(screen.getByLabelText(/e-mail/i)).toHaveValue('persist@example.com')
    expect(screen.getByLabelText(/пароль/i)).toHaveValue('persistpass')
    expect(screen.getByLabelText(/назва компанії/i)).toHaveValue('Persist Name')
  })

  test('displays error if password is too short after blur', () => {
    useAuthStore.mockReturnValue({
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      details: { sellerName: '' },
      setDetails: mockSetDetails,
      errors: {},
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    const { rerender } = render(<SignUpSellerForm />)

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
      details: { sellerName: '' },
      setDetails: mockSetDetails,
      errors: { password: 'Пароль замалий' },
      addError: mockAddError,
      removeError: mockRemoveError,
    })

    rerender(<SignUpSellerForm />)

    expect(screen.getByText(/Пароль замалий/i)).toBeInTheDocument()
  })
})
