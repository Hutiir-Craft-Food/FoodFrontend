import balloons from '../../images/balloons.png';
import styles from './AccountIsReadyModal.module.scss'


export default function AccountIsReadyModal({ onConfirm }) {

  return (
    <div className={styles.modal_content}>
      <img src={balloons} alt='balloons-icon' className={styles.balloons_icon}/>
      <h3>Ваш акаунт створено!</h3>
      <p className={styles.text}>Ви можете підтвердити пошту пізніше
        у налаштуваннях вашого профілю</p>
      <button className={styles.button} onClick={onConfirm}>Зрозуміло</button>
    </div>
  )
}
