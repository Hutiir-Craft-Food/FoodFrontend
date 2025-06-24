import { useState } from 'react'
import { useAuthStore } from '../store/AuthStore'
import Modal from '~/components/modal/Modal.jsx'
import ConfirmModal from '../confirmModal/ConfirmModal'
import styles from './SignInContainer.module.scss'

export default function SignInContainer() {
  const { email, setEmail } = useAuthStore()
  const { password, setPassword } = useAuthStore()
  const { switchToRegister } = useAuthStore()
  const { login } = useAuthStore()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleCloseConfirmModal = () => setShowConfirm(false)

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
              if (email.trim() || password.trim()) {
                setShowConfirm(true)
              } else {
                switchToRegister()
              }
            }}
          >
            Зареєструватись
          </button>
        </div>
      </div>
      {showConfirm && (
        <Modal handleClose={handleCloseConfirmModal}>
          <ConfirmModal
            confirmAction={switchToRegister}
            setShowConfirm={setShowConfirm}
          />
        </Modal>
      )}
    </div>
  )
}
