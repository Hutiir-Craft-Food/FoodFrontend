import { useState, useCallback } from 'react'
import { useAuthStore } from '../../store/AuthStore'
import styles from './SignUpBuyerForm.module.scss'

export default function SignUpBuyerForm({ errors, setErrors }) {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const validateEmail = useCallback(() => {
    const pattern = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/
    if (pattern.test(email)) {
      setErrors((errors) => ({
        ...errors,
        email: { valid: true },
      }))
      return
    }

    setErrors((errors) => ({
      ...errors,
      email: {
        valid: false,
        errorMessage: 'Вкажіть коректний email',
      },
    }))
  }, [email])

  const validatePassword = useCallback(() => {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/
    if (pattern.test(password)) {
      setErrors((errors) => ({
        ...errors,
        password: { valid: true },
      }))
      return
    }

    setErrors((errors) => ({
      ...errors,
      password: {
        valid: false,
        errorMessage: 'Від 8 буквенних та 1 числовий символи',
      },
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
