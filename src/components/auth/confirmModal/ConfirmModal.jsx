import { useAuthStore } from '../store/AuthStore'
import styles from './ConfirmModal.module.scss'

function ConfirmModal({ confirmAction, setShowConfirm }) {
  const { details, setDetails, setMarketingConsent } = useAuthStore()
  return (
    <div className={styles.confirmModal}>
      <div className={styles.confirmModalContainer}>
        <p>Усі введені дані буде очищено. Продовжити?</p>
        <div className={styles.buttons}>
          <button
            className={styles.confirmBtn}
            onClick={() => {
              confirmAction()
              setDetails({})
              setMarketingConsent(false)
              setShowConfirm(false)
            }}
          >
            Так
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setShowConfirm(false)}
          >
            Ні
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
