import { useState } from 'react'
import clsx from 'clsx'
import { useAuthStore } from '~/components/auth/store/AuthStore'
import ClosedEyeIcon from '~/icons/ClosedEyeIcon.jsx'
import OpenEyeIcon from '~/icons/OpenEyeIcon.jsx'
import styles from './PasswordField.module.scss'

export default function PasswordField({
  passwordValidation,
  validate = false,
}) {
  const { password, setPassword, errors } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleEyeButtonClick = (e) => {
    setIsPasswordVisible((prevValue) => !prevValue)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className={styles.passwordContainer}>
      <label htmlFor="password">Пароль</label>
      <div
        className={clsx(
          styles.inputContainer,
          validate && errors?.password && styles.inputErrorClass
        )}
      >
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          value={password}
          required
          placeholder="Введіть пароль"
          onChange={handlePasswordChange}
          onBlur={passwordValidation}
        />
        <button
          type="button"
          id="togglePassword"
          className={styles.toggleEye}
          aria-label={
            isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'
          }
          onClick={handleEyeButtonClick}
        >
          {isPasswordVisible ? <OpenEyeIcon /> : <ClosedEyeIcon />}
        </button>
      </div>
      {validate &&
        (errors?.password ? (
          <div className={styles.errors}>{errors.password}</div>
        ) : (
          <div className={styles.hint}>
            Щонайменше 8 символів: літери, цифри, символи
          </div>
        ))}
    </div>
  )
}
