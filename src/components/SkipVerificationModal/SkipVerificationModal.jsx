import styles from './SkipVerificationModal.module.scss'

export default function SkipVerificationModal({ onSkipFinish, onRegisterOTP}) {

  return (
    <div className={styles.modal_content}>
      <h3>Пропустити верифікацію e-mail?</h3>
      <p >Без підтвердження пошти ви не зможете відновити пароль або отримувати важливі сповіщення від маркетплейсу</p>
      <button className={styles.button} onClick={onRegisterOTP}>Підтвердити пошту</button>
      <button className={`${styles.button} ${styles.buttonSkip}`} onClick={onSkipFinish}>Пропустити</button>
    </div>
  )
}
