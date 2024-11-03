import { useState, useContext } from 'react'
import styles from './SignUpContainer.module.scss'
import SignUpBuyerForm from '../SignUpBuyerForm/SignUpBuyerForm'
import SignUpSellerForm from '../SignUpSellerForm/SignUpSellerForm'
import { AuthContext } from '../../containers/AuthContext'

export default function SignUpContainer({ setShowSignUpContainer }) {
  const authContext = useContext(AuthContext)

  const [role, setRole] = useState('BUYER')
  const [subscription, setSubscription] = useState(false)
  const [formData, setFormData] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()

    const requestBody = { ...formData, subscription, role }
    if (!formData.hasErrors) {
      try {
        const response = await fetch('/api/v1/user/register', {
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
          setSubscription(false)
          setShowSignUpContainer(false)
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

  return (
    <div className={styles.signUpContainer}>
      {role === 'BUYER' && (
        <div className={styles.imgContainer}>
          <img
            src="/images/sign-in.png"
            alt="imgForBuyerRegistration"
            className={styles.imgBuyer}
          />
        </div>
      )}
      {role === 'SELLER' && (
        <div className={styles.imgContainer}>
          <img
            src="/images/sign-in.png"
            alt="imgForBuyerRegistration"
            className={styles.imgSeller}
          />

          <div className={styles.steps}>
            <p>
              <span className={styles.steps}>1-2-3</span>
            </p>
          </div>
        </div>
      )}

      <div className={styles.contentContainer}>
        <h4>Реєстрація</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.formContentContainer}>
            <div className={styles.rolesButtons}>
              <button
                className={
                  role === 'BUYER'
                    ? `${styles.button} ${styles.active}`
                    : `${styles.button}`
                }
                onClick={() => setRole('BUYER')}
              >
                Хочу купувати
              </button>
              <button
                className={
                  role === 'SELLER'
                    ? `${styles.button} ${styles.active}`
                    : `${styles.button}`
                }
                onClick={() => setRole('SELLER')}
              >
                Хочу продавати
              </button>
            </div>

            {role === 'BUYER' && (
              <SignUpBuyerForm
                handleSubmit={handleSubmit}
                setFormData={setFormData}
                setSubscription={handleCheckbox}
              />
            )}
            {role === 'SELLER' && (
              <SignUpSellerForm
                handleSubmit={handleSubmit}
                setFormData={setFormData}
              />
            )}
          </div>

          {role === 'BUYER' && (
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

        <div className={styles.signInLink}>
          <a className={styles.signInLink} href="#">
            Вже маю акаунт
          </a>
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
