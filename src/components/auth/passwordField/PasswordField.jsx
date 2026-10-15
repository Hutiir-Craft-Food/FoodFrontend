import { useState } from 'react'
import clsx from 'clsx'
import { useAuthStore } from '~/components/auth/store/AuthStore'
import ClosedEyeIcon from '~/icons/ClosedEyeIcon.jsx'
import OpenEyeIcon from '~/icons/OpenEyeIcon.jsx'
import styles from './PasswordField.module.scss'

export default function PasswordField({
  passwordValidate,
  shouldValidate = false,
  ...rest
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
          shouldValidate && errors?.password && styles.inputErrorClass
        )}
      >
        <input
          {...rest}
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          value={password}
          required
          onChange={handlePasswordChange}
          onBlur={passwordValidate}
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
      {shouldValidate &&
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
