import clsx from 'clsx'
import { useAuthStore } from '~/components/auth/store/AuthStore'
import {
  validateEmail,
  validatePassword,
  validateSellerName,
  statuses as validationStatuses,
} from '~/util/ValidationUtil'
import XCircle from '~/icons/XCircle.jsx'
import EmailField from '~/components/auth/emailField/EmailField.jsx'
import PasswordField from '~/components/auth/passwordField/PasswordField.jsx'
import styles from './SignUpSellerForm.module.scss'

export default function SignUpSellerForm() {
  const { details, setDetails } = useAuthStore()
  const { errors, addError, removeError } = useAuthStore()

  const handleSellerNameChange = (event) => {
    const newName = event.target.value
    setDetails({ ...details, sellerName: newName })
  }

  const handleSellerNameValidation = (e) => {
    const { status, error } = validateSellerName(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ sellerName: error })
    } else {
      removeError('sellerName')
    }
  }

  const handleEmailValidation = (e) => {
    const { status, error } = validateEmail(e.target.value)
    if (status === validationStatuses.FAIL) {
      addError({ email: error })
    } else {
      removeError('email')
    }
  }

  const handleSellerNameClear = (e) => {
    setDetails({ ...details, sellerName: '' })
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
      <div className={styles.sellerNameContainer}>
        <label htmlFor="sellerName">Назва компанії або ПІБ</label>
        <div
          className={clsx(
            styles.inputContainer,
            errors?.sellerName && styles.inputErrorClass
          )}
        >
          <input
            type="text"
            id="sellerName"
            name="sellerName"
            placeholder="ТОВ 'Фермер'"
            minLength="3"
            required
            value={details.sellerName}
            onChange={handleSellerNameChange}
            onBlur={handleSellerNameValidation}
          />
          {details.sellerName && (
            <button
              type="button"
              className={styles.buttonXCircle}
              onClick={handleSellerNameClear}
            >
              <XCircle />
            </button>
          )}
        </div>
        {errors?.sellerName && (
          <div className={styles.errors}>{errors.sellerName}</div>
        )}
      </div>
      <EmailField emailValidation={handleEmailValidation} validate={true} />
      <PasswordField
        passwordValidation={handlePasswordValidation}
        validate={true}
      />
    </div>
  )
}
