import { useState } from 'react'
import { useAuthStore } from '../store/AuthStore'
import XCircle from '~/icons/XCircle.jsx'
import ClosedEyeIcon from '~/icons/ClosedEyeIcon.jsx'
import OpenEyeIcon from '~/icons/OpenEyeIcon.jsx'
import styles from './SignInContainer.module.scss'

export default function SignInContainer() {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const { switchToRegister } = useAuthStore()
  const { login } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleEyeButtonClick = (e) => {
    setIsPasswordVisible((prevValue) => !prevValue)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleEmailClear = (e) => {
    setEmail('')
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    login()
  }

  return (
    <div className={styles.signInContainer}>
      <div className={styles.formContainer}>
        <h2>Вхід</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.emailContainer}>
            <label htmlFor="email">E-mail</label>
            <br />
            <div className={styles.inputContainer}>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={handleEmailChange}
                autoFocus
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
          </div>
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
          <a className={styles.fogetPasswordLink} href="#">
            Забули пароль?
          </a>
          <br />
          <button className={styles.signInButton} type="submit">
            Увійти
          </button>
          <br />
        </form>
        <div>
          <button
            className={styles.signUpLink}
            onClick={() => {
              switchToRegister()
            }}
          >
            Зареєструватись
          </button>
        </div>
      </div>
    </div>
  )
}
