import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { roles, useAuthStore } from '../../store/AuthStore'
import {
  validateEmail,
  validatePassword,
  validateSellerName,
  statuses as validationStatuses,
} from '~/util/ValidationUtil'
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

  const handlePasswordValidation = (e) => {
    const { status, error } = validatePassword(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ password: error })
    } else {
      removeError('password')
    }
  }

  const handleEyeButton = (e) => {
    e.preventDefault() // TODO: do we need this here ?
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
        {errors?.sellerName && (
          <div className={styles.errors}>{errors.sellerName}</div>
        )}
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
        {errors?.email && <div className={styles.errors}>{errors.email}</div>}
      </div>

      <div className={`${styles.passwordContainer} ${styles.inputsWrapper}`}>
        <label htmlFor="password">Пароль</label>
        <input
          className={clsx(errors?.password && styles.inputErrorClass)}
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
