import { useState } from 'react'
import SignUpBuyerForm from './buyer-form/SignUpBuyerForm'
import SignUpSellerForm from './seller-form/SignUpSellerForm'
import { roles, useAuthStore } from '../store/AuthStore'
import Modal from '~/components/modal/Modal.jsx'
import ConfirmModal from '../confirmModal/ConfirmModal'
import styles from './SignUpContainer.module.scss'

export default function SignUpContainer() {
  const { switchToLogin, switchToSeller, switchToBuyer, checkIsModified } =
    useAuthStore()
  const { role } = useAuthStore()
  const { marketingConsent, setMarketingConsent } = useAuthStore()
  const { register } = useAuthStore()
  const { hasErrors } = useAuthStore()
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)

  const handleCloseConfirmModal = () => setShowConfirm(false)

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
                  if (checkIsModified()) {
                    setConfirmAction(() => switchToBuyer)
                    setShowConfirm(true)
                  } else {
                    switchToBuyer()
                  }
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
                  if (checkIsModified()) {
                    setConfirmAction(() => switchToSeller)
                    setShowConfirm(true)
                  } else {
                    switchToSeller()
                  }
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
              if (checkIsModified()) {
                setConfirmAction(() => switchToLogin)
                setShowConfirm(true)
              } else {
                switchToLogin()
              }
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
          <ConfirmModal
            confirmAction={confirmAction}
            setShowConfirm={setShowConfirm}
          />
        </Modal>
      )}
    </div>
  )
}
