import { useState } from 'react'
import SignUpBuyerForm from './buyer-form/SignUpBuyerForm'
import SignUpSellerForm from './seller-form/SignUpSellerForm'
import { actions, roles, useAuthStore } from '../store/AuthStore'
import styles from './SignUpContainer.module.scss'

export default function SignUpContainer() {
  const { setAction } = useAuthStore()
  const { role, setRole } = useAuthStore()
  const { marketingConsent, setMarketingConsent } = useAuthStore()
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const hasErrors = Object.values(errors).some(({ valid }) => valid === false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const requestBody = { ...formData, marketingConsent, role }
    if (!hasErrors) {
      try {
        const response = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })

        if (response.ok) {
          const data = await response.json()
          // TODO: put data.jwt into user.accessToken
          setFormData({})
          setMarketingConsent(false)
        }
      } catch (error) {
        console.error('Failed:', error)
      }
    }
  }

  const handleCheckbox = () => {
    setMarketingConsent(!marketingConsent)
  }

  const switchToSignIn = () => {
    setAction(actions.LOGIN)
  }

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.contentContainer}>
        <h2>Реєстрація</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContentContainer}>
            <div className={styles.rolesButtons}>
              <button
                type="button"
                className={
                  role === roles.BUYER
                    ? `${styles.button} ${styles.active}`
                    : `${styles.button}`
                }
                onClick={() => setRole(roles.BUYER)}
              >
                Хочу купувати
              </button>
              <button
                type="button"
                className={
                  role === roles.SELLER
                    ? `${styles.button} ${styles.active}`
                    : `${styles.button}`
                }
                onClick={() => setRole(roles.SELLER)}
              >
                Хочу продавати
              </button>
            </div>

            {role === roles.BUYER && (
              <SignUpBuyerForm
                errors={errors}
                setErrors={setErrors}
                setFormData={setFormData}
              />
            )}
            {role === roles.SELLER && (
              <SignUpSellerForm
                errors={errors}
                setErrors={setErrors}
                setFormData={setFormData}
              />
            )}
          </div>

          <div className={styles.checkboxLabel}>
            <label className={styles.checkboxContainer}>
              Бажаю отримувати новини та спеціальні пропозиції
              <input
                type="checkbox"
                id="marketingConsent"
                className={styles.checkmark}
                checked={marketingConsent}
                onChange={handleCheckbox}
              />
            </label>
          </div>

          <button
            className={
              hasErrors
                ? `${styles.signUpButton} ${styles.signUpDisabled}`
                : `${styles.signUpButton} ${styles.signUpEnabled}`
            }
            disabled={hasErrors}
          >
            Зареєструватись
          </button>
        </form>

        <div>
          <button
            className={styles.signInLink}
            onClick={() => switchToSignIn()}
          >
            Вже маю акаунт
          </button>
        </div>

        <div className={styles.userAgreement}>
          <p>
            <span>
              Підтверджуючи реєстрацію, я приймаю &nbsp;
              <a href="#" className={styles.userAgreementLink}>
                умови користувацької угоди
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
