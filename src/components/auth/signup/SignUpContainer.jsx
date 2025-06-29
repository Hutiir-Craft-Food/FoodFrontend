import { useState } from 'react'
import SignUpBuyerForm from './buyer-form/SignUpBuyerForm'
import SignUpSellerForm from './seller-form/SignUpSellerForm'
import { roles, useAuthStore } from '../store/AuthStore'
import Modal from '~/components/modal/Modal.jsx'
import ConfirmModal from '../confirmModal/ConfirmModal'
import styles from './SignUpContainer.module.scss'

export default function SignUpContainer() {
  const { switchToLogin, switchToSeller, switchToBuyer, isDirty } =
    useAuthStore()
  const { role } = useAuthStore()
  const { setDetails, marketingConsent, setMarketingConsent } = useAuthStore()
  const { register } = useAuthStore()
  const { hasErrors } = useAuthStore()
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)

  const handleConfirm = () => {
    if (confirmAction === 'switchToBuyer') {
      switchToBuyer()
    } else if (confirmAction === 'switchToLogin') {
      switchToLogin()
    }
    setDetails({})
    setMarketingConsent(false)
    setShowConfirm(false)
  }

  const handleReject = () => {
    setShowConfirm(false)
  }

  const handleCloseConfirmModal = () => setShowConfirm(false)

  const handleSwitchToBuyer = () => {
    if (isDirty()) {
      setConfirmAction('switchToBuyer')
      setShowConfirm(true)
    } else {
      switchToBuyer()
    }
  }

  const handleSwitchToLogin = () => {
    if (isDirty()) {
      setConfirmAction('switchToLogin')
      setShowConfirm(true)
    } else {
      switchToLogin()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    register()
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
                onClick={() => {
                  handleSwitchToBuyer()
                }}
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
                onClick={() => {
                  switchToSeller()
                }}
              >
                Хочу продавати
              </button>
            </div>

            {role === roles.BUYER && <SignUpBuyerForm />}
            {role === roles.SELLER && <SignUpSellerForm />}
          </div>

          <div className={styles.checkboxLabel}>
            <label className={styles.checkboxContainer}>
              Бажаю отримувати новини та спеціальні пропозиції
              <input
                type="checkbox"
                id="marketingConsent"
                className={styles.checkmark}
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
              />
            </label>
          </div>

          <button
            className={
              hasErrors()
                ? `${styles.signUpButton} ${styles.signUpDisabled}`
                : `${styles.signUpButton} ${styles.signUpEnabled}`
            }
            disabled={hasErrors()}
          >
            Зареєструватись
          </button>
        </form>

        <div>
          <button
            className={styles.signInLink}
            onClick={() => {
              handleSwitchToLogin()
            }}
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
      {showConfirm && (
        <Modal handleClose={handleCloseConfirmModal}>
          <ConfirmModal onConfirm={handleConfirm} onReject={handleReject} />
        </Modal>
      )}
    </div>
  )
}
