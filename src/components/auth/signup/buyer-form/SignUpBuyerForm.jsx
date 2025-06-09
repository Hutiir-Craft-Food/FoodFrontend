import { useState, useCallback } from 'react'
import { useAuthStore } from '../../store/AuthStore'
import styles from './SignUpBuyerForm.module.scss'

export default function SignUpBuyerForm({ errors, setErrors }) {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const validateEmail = useCallback(() => {
    const pattern = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/
    const newValue = pattern.test(email)
      ? { valid: true, errorMessage: '' }
      : { valid: false, errorMessage: 'Некоректний формат email' }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: newValue,
    }))
  }, [email])

  const validatePassword = useCallback(() => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/
    const newValue = pattern.test(password)
      ? { valid: true, errorMessage: '' }
      : {
          valid: false,
          errorMessage: 'Пароль має містити щонайменше 8 літер та 1 цифру',
        }

    setErrors((prevErrors) => ({
      ...prevErrors,
      password: newValue,
    }))
  }, [password])

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleEyeButton = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputsWrapper}>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="e.g.example@gmail.com"
          required
          className={styles.formControl}
          value={email}
          onChange={handleEmailChange}
          onBlur={validateEmail}
        />
        {!errors.email?.valid && (
          <span className={styles.errors}>{errors.email?.errorMessage}</span>
        )}
      </div>

      <div className={`${styles.passwordContainer} ${styles.inputsWrapper}`}>
        <label htmlFor="password">Пароль</label>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
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
        <br />
        {!errors.password?.valid && (
          <span className={styles.errors}>{errors.password?.errorMessage}</span>
        )}
      </div>
    </div>
  )
}
