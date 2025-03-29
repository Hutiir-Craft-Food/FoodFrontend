import { useState, useContext } from 'react'
import SignUpBuyerForm from './buyer-form/SignUpBuyerForm'
import SignUpSellerForm from './seller-form/SignUpSellerForm'
import { AuthContext } from '/src/context/AuthContext'
import styles from './SignUpContainer.module.scss'

export default function SignUpContainer({ setShowSignUpContainer }) {
  const authContext = useContext(AuthContext)
  const [role, setRole] = useState('BUYER')
  const [marketingConsent, setMarketingConsent] = useState(false)
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
          authContext.setToken(data.jwt)
          setFormData({})
          setMarketingConsent(false)
          setShowSignUpContainer(false)
        }
      } catch (error) {
        console.error('Failed:', error)
      }
    }
  }

  const handleCheckbox = () => {
    setMarketingConsent(!marketingConsent)
  }

  return (
    <div className={styles.signUpContainer}>
      {role === 'BUYER' && (
        <div className={styles.imgContainer}>
          <img
            src='/images/sign-in.png'
            alt='imgForBuyerRegistration'
            className={styles.imgBuyer}
          />
        </div>
      )}
      {role === 'SELLER' && (
        <div className={styles.imgContainer}>
          <img
            src='/images/sign-in.png'
            alt='imgForBuyerRegistration'
            className={styles.imgSeller}
          />
        </div>
      )}

      <div className={styles.contentContainer}>
        <h4>Реєстрація</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContentContainer}>
            <div className={styles.rolesButtons}>
              <button
                type='button'
                className={
                  role === 'BUYER'
                    ? `${styles.button} ${styles.active}`
                    : styles.button
                }
                onClick={() => setRole('BUYER')}
              >
                Хочу купувати
              </button>
              <button
                type='button'
                className={
                  role === 'SELLER'
                    ? `${styles.button} ${styles.active}`
                    : styles.button
                }
                onClick={() => setRole('SELLER')}
              >
                Хочу продавати
              </button>
            </div>

            {role === 'BUYER' && (
              <SignUpBuyerForm
                errors={errors}
                setErrors={setErrors}
                setFormData={setFormData}
              />
            )}
            {role === 'SELLER' && (
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
                type='checkbox'
                id='subscription'
                checked={marketingConsent}
                onChange={handleCheckbox}
              />
              <span className={styles.checkmark}></span>
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

        <div className={styles.signInLink}>
          <a className={styles.signInLink} href='#'>
            Вже маю акаунт
          </a>
        </div>

        <div className={styles.userAgreement}>
          <p>
            <span>
              Підтверджуючи реєстрацію, я приймаю &nbsp;
              <a href='#' className={styles.userAgreementLink}>
                умови користувацької угоди
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
