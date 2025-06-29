import { useAuthStore } from '../store/AuthStore'
import styles from './ConfirmModal.module.scss'

function ConfirmModal({ onConfirm, onReject }) {
  return (
    <div className={styles.confirmModal}>
      <div className={styles.confirmModalContainer}>
        <p>Усі введені дані буде очищено. Продовжити?</p>
        <div className={styles.buttons}>
          <button
            className={styles.confirmBtn}
            onClick={() => {
              onConfirm()
            }}
          >
            Так
          </button>
          <button className={styles.cancelBtn} onClick={() => onReject()}>
            Ні
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
