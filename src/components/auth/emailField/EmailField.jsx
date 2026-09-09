import clsx from 'clsx'
import { useAuthStore } from '~/components/auth/store/AuthStore'
import XCircle from '~/icons/XCircle.jsx'
import styles from './EmailField.module.scss'

export default function EmailField({ emailValidation, validate = false }) {
  const { email, setEmail, errors } = useAuthStore()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleEmailClear = (e) => {
    setEmail('')
  }

  return (
    <div className={styles.emailContainer}>
      <label htmlFor="email">E-mail</label>
      <br />
      <div
        className={clsx(
          styles.inputContainer,
          validate && errors?.email && styles.inputErrorClass
        )}
      >
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
          onBlur={emailValidation}
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
      {validate && errors?.email && (
        <div className={styles.errors}>{errors.email}</div>
      )}
    </div>
  )
}
