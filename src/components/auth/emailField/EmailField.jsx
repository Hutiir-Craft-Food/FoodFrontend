import clsx from 'clsx'
import { useAuthStore } from '~/components/auth/store/AuthStore'
import XCircle from '~/icons/XCircle.jsx'
import styles from './EmailField.module.scss'

export default function EmailField({
  emailValidate,
  shouldValidate = false,
  ...rest
}) {
  const { email, setEmail, errors } = useAuthStore()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleEmailClear = () => {
    setEmail('')
  }

  return (
    <div className={styles.emailContainer}>
      <label htmlFor="email">E-mail</label>
      <br />
      <div
        className={clsx(
          styles.inputContainer,
          shouldValidate && errors?.email && styles.inputErrorClass
        )}
      >
        <input
          {...rest}
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={handleEmailChange}
          onBlur={emailValidate}
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
      {shouldValidate && errors?.email && (
        <div className={styles.errors}>{errors.email}</div>
      )}
    </div>
  )
}
