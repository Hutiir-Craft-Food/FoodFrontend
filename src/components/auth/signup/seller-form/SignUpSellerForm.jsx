import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { roles, useAuthStore } from '../../store/AuthStore'
import {
  validateEmail,
  validatePassword,
  validateSellerName,
  statuses as validationStatuses,
} from '~/util/ValidationUtil'
import XCircle from '~/icons/XCircle.jsx'
import ClosedEyeIcon from '~/icons/ClosedEyeIcon.jsx'
import OpenEyeIcon from '~/icons/OpenEyeIcon.jsx'
import styles from './SignUpSellerForm.module.scss'

export default function SignUpSellerForm() {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const { details, setDetails } = useAuthStore()
  const { errors, addError, removeError } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleSellerNameChange = (event) => {
    const newName = event.target.value
    setDetails({ ...details, sellerName: newName })
  }

  const handleSellerNameValidation = (e) => {
    const { status, error } = validateSellerName(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ sellerName: error })
    } else {
      removeError('sellerName')
    }
  }

  const handleEmailValidation = (e) => {
    const { status, error } = validateEmail(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ email: error })
    } else {
      removeError('email')
    }
  }

  const handleEmailClear = (e) => {
    setEmail('')
  }

  const handleSellerNameClear = (e) => {
    setDetails({ ...details, sellerName: '' })
  }

  const handlePasswordValidation = (e) => {
    const { status, error } = validatePassword(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ password: error })
    } else {
      removeError('password')
    }
  }

  const handleEyeButton = (e) => {
    setIsPasswordVisible((prev) => !prev)
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.sellerNameContainer}>
        <label htmlFor="sellerName">Назва компанії або ПІБ</label>
        <div
          className={clsx(
            styles.inputContainer,
            errors?.sellerName && styles.inputErrorClass
          )}
        >
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
          {details.sellerName && (
            <button
              type="button"
              className={styles.buttonXCircle}
              onClick={handleSellerNameClear}
            >
              <XCircle />
            </button>
          )}
        </div>
        {errors?.sellerName && (
          <div className={styles.errors}>{errors.sellerName}</div>
        )}
      </div>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailValidation}
          />

          {email && (
            <button
              className={styles.buttonXCircle}
              onClick={handleEmailClear}
              type="button"
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
            value={password}
            minLength="8"
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
