import styles from './ConfirmationDialogue.module.scss'

export default function ConfirmationDialogue({ onConfirm, onReject }) {
  return (
    <div className={styles.confirmModal}>
      <div className={styles.confirmModalContainer}>
        <p>Усі введені дані буде очищено. Продовжити?</p>
        <div className={styles.buttons}>
          <button className={styles.confirmBtn} onClick={() => onConfirm()}>
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
