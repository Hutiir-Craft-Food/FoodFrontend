import { useState } from 'react'
import { useAuthStore } from '../store/AuthStore'
import ClosedEyeIcon from '~/icons/ClosedEyeIcon.jsx'
import OpenEyeIcon from '~/icons/OpenEyeIcon.jsx'
import styles from './PasswordField.module.scss'

export default function PasswordField() {
  const { password, setPassword } = useAuthStore()
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
      <div className={styles.inputContainer}>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id="password"
          name="password"
          value={password}
          required
          onChange={handlePasswordChange}
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
    </div>
  )
}
