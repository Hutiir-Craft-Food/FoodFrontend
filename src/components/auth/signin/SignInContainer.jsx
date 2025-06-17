import { useState } from 'react'
import { actions, useAuthStore } from '../store/AuthStore'
import styles from './SignInContainer.module.scss'

export default function SignInContainer() {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const { setAction } = useAuthStore()
  const { login } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleEyeButtonClick = (e) => {
    e.preventDefault() // TODO: do we need this ?
    setIsPasswordVisible((prevValue) => !prevValue)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    login()
  }

  // TODO: use switchToRegister in AuthStore
  const switchToSignUp = () => {
    setAction(actions.REGISTER)
  }

  return (
    <div className={styles.signInContainer}>
      <div className={styles.formContainer}>
        <h2>Вхід</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.emailContainer}>
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={handleEmailChange}
              autoFocus
            />
          </div>
          <div className={styles.passwordContainer}>
            <label htmlFor="password">Пароль</label>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              required
              onChange={handlePasswordChange}
            />
            <button
              id="togglePassword"
              className={`${styles.toggleEye} ${
                isPasswordVisible ? styles.openEye : styles.closeEye
              }`}
              aria-label={
                isPasswordVisible ? 'Приховати пароль' : 'Показати пароль'
              }
              onClick={handleEyeButtonClick}
            ></button>
          </div>
          <br />
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
            onClick={() => switchToSignUp()}
          >
            {' '}
            Зареєструватись
          </button>
        </div>
      </div>
    </div>
  )
}
