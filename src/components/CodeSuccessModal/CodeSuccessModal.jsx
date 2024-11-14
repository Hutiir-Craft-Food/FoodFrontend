import balloons from '../../images/balloons.png';
import styles from './CodeSuccessModal.module.scss'


export default function CodeSuccessModal({ onConfirm }) {

  return (
    <div className={styles.modal_content}>
      <img src={balloons} alt='balloons-icon' className={styles.balloons_icon}/>
      <h3>Гайда за покупками!</h3>
      <p className={styles.text}>Вашу електронну адресу успішно підтверджено</p>
      <button className={styles.button} onClick={onConfirm}>Зрозуміло</button>
    </div>
  )
}
