import { useAuthStore } from '~/components/auth/store/AuthStore'
import PasswordField from '../passwordField/PasswordField.jsx'
import EmailField from '../emailField/EmailField.jsx'
import styles from './SignInContainer.module.scss'

export default function SignInContainer() {
  const { switchToRegister } = useAuthStore()
  const { login } = useAuthStore()

  const handleSubmit = async (event) => {
    event.preventDefault()
    login()
  }

  return (
    <div className={styles.signInContainer}>
      <div className={styles.formContainer}>
        <h2>Вхід</h2>
        <form onSubmit={handleSubmit}>
          <EmailField />
          <PasswordField />
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
