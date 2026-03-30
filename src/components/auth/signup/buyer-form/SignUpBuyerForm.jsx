import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useAuthStore } from '../../store/AuthStore'
import XCircle from '~/icons/XCircle.jsx'
import ClosedEyeIcon from '~/icons/ClosedEyeIcon.jsx'
import OpenEyeIcon from '~/icons/OpenEyeIcon.jsx'
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

  useEffect(() => {
    if (email) {
      const { status, error } = validateEmail(email)
      if (status === validationStatuses.FAIL) {
        addError({ email: error })
      } else {
        removeError('email')
      }
    }

    if (password) {
      const { status, error } = validatePassword(password)
      if (status === validationStatuses.FAIL) {
        addError({ password: error })
      } else {
        removeError('password')
      }
    }
  }, [])

  const handleEmailClear = (e) => {
    setEmail('')
  }

  const handleEyeButton = (e) => {
    setIsPasswordVisible((prev) => !prev)
  }

  const handleEmailValidation = (e) => {
    const { status, error } = validateEmail(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ email: error })
    } else {
      removeError('email')
    }
  }

  const handlePasswordValidation = (e) => {
    const { status, error } = validatePassword(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ password: error })
    } else {
      removeError('password')
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.emailContainer}>
        <label htmlFor="email">E-mail</label>
        <div
          className={clsx(
            styles.inputContainer,
            errors?.email && styles.inputErrorClass
          )}
        >
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
          {email && (
            <button
              type="button"
              className={styles.buttonXCircle}
              onClick={handleEmailClear}
            >
              <XCircle />
            </button>
          )}
        </div>
        {errors?.email && <div className={styles.errors}>{errors.email}</div>}
      </div>

      <div className={styles.passwordContainer}>
        <label htmlFor="password">Пароль</label>
        <div
          className={clsx(
            styles.inputContainer,
            errors?.password && styles.inputErrorClass
          )}
        >
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            required
            minLength="8"
            value={password}
            placeholder="Створіть пароль"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordValidation}
          />
          <button
            type="button"
            id="togglePassword"
            className={styles.toggleEye}
            aria-label={
              isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'
            }
            onClick={handleEyeButton}
          >
            {isPasswordVisible ? <OpenEyeIcon /> : <ClosedEyeIcon />}
          </button>
        </div>
        {errors?.password ? (
          <div className={styles.errors}>{errors.password}</div>
        ) : (
          <div className={styles.hint}>
            Щонайменше 8 символів: літери, цифри, символи
          </div>
        )}
      </div>
    </div>
  )
}
