import { useState, useEffect, useCallback } from 'react'
import { roles, useAuthStore } from '../../store/AuthStore'
import {
  validateEmail,
  validatePassword,
  validateSellerName,
} from '../../../../util/ValidationUtil'
import styles from './SignUpSellerForm.module.scss'

export default function SignUpSellerForm() {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const { details, setDetails } = useAuthStore()
  const { setRole } = useAuthStore()
  const { getError } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  useEffect(() => {
    setRole(roles.SELLER)
  }, [setRole])

  const handleSellerNameChange = (event) => {
    const newName = event.target.value
    setDetails({ ...details, sellerName: newName })
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleEyeButton = () => {
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
          onBlur={validateSellerName}
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
          onChange={handleEmailChange}
          onBlur={validateEmail}
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
          onChange={handlePasswordChange}
          onBlur={validatePassword}
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
