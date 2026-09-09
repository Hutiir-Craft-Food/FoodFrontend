import { useEffect } from 'react'
import { useAuthStore } from '~/components/auth/store/AuthStore'
import EmailField from '~/components/auth/emailField/EmailField.jsx'
import PasswordField from '~/components/auth/passwordField/PasswordField.jsx'
import {
  validateEmail,
  validatePassword,
  statuses as validationStatuses,
} from '~/util/ValidationUtil'
import styles from './SignUpBuyerForm.module.scss'

export default function SignUpBuyerForm() {
  const { email, password, addError, removeError } = useAuthStore()

  useEffect(() => {
    if (email) {
      const { status, error } = validateEmail(email)
      if (status === validationStatuses.FAIL) {
        addError({ email: error })
      } else {
        removeError('email')
      }
    }

    if (password) {
      const { status, error } = validatePassword(password)
      if (status === validationStatuses.FAIL) {
        addError({ password: error })
      } else {
        removeError('password')
      }
    }
  }, [])

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

  return (
    <div className={styles.formContainer}>
      <EmailField emailValidation={handleEmailValidation} validate={true} />
      <PasswordField
        passwordValidation={handlePasswordValidation}
        validate={true}
      />
    </div>
  )
}
