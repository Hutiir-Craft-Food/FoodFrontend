import { useState, useEffect } from 'react'
import { roles, useAuthStore } from '../../store/AuthStore'
import {
  validateEmail,
  validatePassword,
  validateSellerName,
} from '@/util/ValidationUtil'
import styles from './SignUpSellerForm.module.scss'

export default function SignUpSellerForm() {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const { details, setDetails } = useAuthStore()
  const { setRole } = useAuthStore()
  const { errors, addError, getError, removeError } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  useEffect(() => {
    setRole(roles.SELLER)
  }, [setRole])

  const handleSellerNameChange = (event) => {
    const newName = event.target.value
    setDetails({ ...details, sellerName: newName })
  }

  const handleSellerNameValidation = (e) => {
    const { status, error } = validateSellerName(e.target.value)
    if (status === 'FAIL') {
      addError({ sellerName: [error] })
    } else {
      removeError('sellerName')
    }
  }

  const handleEmailValidation = (e) => {
    const { status, error } = validateEmail(e.target.value)
    if (status === 'FAIL') {
      addError({ email: [error] })
    } else {
      removeError('email')
    }
  }

  const handlePasswordValidation = (e) => {
    const { status, error } = validatePassword(e.target.value)
    if (status === 'FAIL') {
      addError({ password: [error] })
    } else {
      removeError('password')
    }
  }

  const handleEyeButton = (e) => {
    e.preventDefault()
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsWrapper}>
        <label htmlFor="sellerName">Назва компанії або ПІБ</label>
        <input
          type="text"
          id="sellerName"
          name="sellerName"
          placeholder="ТОВ 'Фермер'"
          minLength="3"
          required
          value={details.sellerName}
          onChange={handleSellerNameChange}
          onBlur={handleSellerNameValidation}
        />
        {getError('sellerName').map((msg, idx) => (
          <span key={idx} className={styles.errors}>
            {msg}
          </span>
        ))}
      </div>

      <div className={styles.inputsWrapper}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="e.g.example@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailValidation}
        />
        {getError('email').map((msg, idx) => (
          <span key={idx} className={styles.errors}>
            {msg}
          </span>
        ))}
      </div>

      <div className={`${styles.passwordContainer} ${styles.inputsWrapper}`}>
        <label htmlFor="password">Пароль</label>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          minLength="9"
          required
          value={password}
          placeholder="Створіть пароль"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordValidation}
        />
        <button
          id="togglePassword"
          className={`${styles.toggleEye} ${
            isPasswordVisible ? styles.openEye : styles.closeEye
          }`}
          onClick={handleEyeButton}
          type="button"
        ></button>
        {getError('password').map((msg, idx) => (
          <span key={idx} className={styles.errors}>
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}
