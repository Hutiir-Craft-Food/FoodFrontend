import { useState } from 'react'
import SignUpBuyerForm from './buyer-form/SignUpBuyerForm'
import SignUpSellerForm from './seller-form/SignUpSellerForm'
import { actions, roles, useAuthStore } from '../store/AuthStore'
import styles from './SignUpContainer.module.scss'

export default function SignUpContainer() {
  const { subscription, setSubscription } = useAuthStore()

  // TODO: do we keep it as local state
  //  or externalize to GSM (global state management) ?
  const [formData, setFormData] = useState({})

  const { setAction } = useAuthStore()
  const { role, setRole } = useAuthStore()

  // TODO: can we externalize this handler?
  const handleSubmit = async (event) => {
    event.preventDefault()

    const requestBody = { ...formData, subscription, role }
    if (!formData.hasErrors) {
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
          // TODO:
          // write JWT token into AuthStore or localStorage? or both?
          setFormData({})
          setSubscription(false)
        }
        // else {
        //   const errorMessage =
        //     data.message || "Перевірте правильність введених даних";
        //   throw new Error(errorMessage);
        // }
      } catch (error) {
        console.error('Failed:', error)
      }
    }
  }

  const handleCheckbox = () => {
    setSubscription(!subscription)
  }

  const switchToSignIn = () => {
    setAction(actions.LOGIN)
  }

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.contentContainer}>
        <h4>Реєстрація</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContentContainer}>
            <div className={styles.rolesButtons}>
              <button
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
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                setSubscription={handleCheckbox}
              />
            )}
            {role === roles.SELLER && (
              <SignUpSellerForm
                handleSubmit={handleSubmit}
                setFormData={setFormData}
              />
            )}
          </div>

          {role === roles.SELLER && (
            <div className={styles.checkboxLabel}>
              <label className={styles.checkboxContainer}>
                Бажаю отримувати новини та спеціальні пропозиції
                <input
                  type="checkbox"
                  id="subscription"
                  value={subscription}
                  onChange={handleCheckbox}
                />
                <span className={styles.checkmark}></span>
              </label>
            </div>
          )}
          <br></br>

          <button
            className={
              formData.hasErrors
                ? `${styles.signUpButton} ${styles.signUpDisabled}`
                : `${styles.signUpButton} ${styles.signUpEnabled}`
            }
            disabled={formData.hasErrors}
          >
            Зареєструватись
          </button>
        </form>

        <div>
          <button
            className={styles.signInLink}
            onClick={() => switchToSignIn()}
          >
            {' '}
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
