import { useState } from 'react'
import { useAuthStore } from '../../store/AuthStore'
import { validateEmail, validatePassword } from '@/util/ValidationUtil'
import styles from './SignUpBuyerForm.module.scss'

export default function SignUpBuyerForm() {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const { errors, addError, getError, removeError } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleEyeButton = (e) => {
    e.preventDefault()
    setIsPasswordVisible(!isPasswordVisible)
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
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailValidation}
        />
        {getError('email').map((err, index) => (
          <span key={index} className={styles.errors}>
            {err}
          </span>
        ))}
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
        <br />
        {getError('password').map((err, index) => (
          <span key={index} className={styles.errors}>
            {err}
          </span>
        ))}
      </div>
    </div>
  )
}
