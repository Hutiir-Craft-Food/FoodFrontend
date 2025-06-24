import { useState } from 'react'
import { useAuthStore } from '../../store/AuthStore'
import {
  validateEmail,
  validatePassword,
  statuses as validationStatuses,
} from '~/util/ValidationUtil'
import styles from './SignUpBuyerForm.module.scss'

export default function SignUpBuyerForm() {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const { errors, addError, removeError } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleEyeButton = (e) => {
    e.preventDefault() // TODO: do we need this ?
    setIsPasswordVisible((prev) => !prev)
  }

  const handleEmailValidation = (e) => {
    const { status, error } = validateEmail(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ email: [error] })
    } else {
      removeError('email')
    }
  }

  const handlePasswordValidation = (e) => {
    const { status, error } = validatePassword(e.target.value)
    if (status === validationStatuses.FAIL) {
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
        {errors?.email && <div className={styles.errors}>{errors.email}</div>}
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
        {errors?.password && (
          <div className={styles.errors}>{errors.password}</div>
        )}
      </div>
    </div>
  )
}
