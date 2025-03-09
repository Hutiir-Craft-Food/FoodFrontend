import closeIcon from '/src/icons/mdiclose.svg'
import styles from './ModalWindow.module.scss'

export default function Modal({ handleClose, form }) {
  return (
    <div>
      <div className={styles.overlay} onClick={handleClose}></div>
        <div className={styles.modal}>
          <img src={closeIcon} alt='icon' className={styles.closeIcon} onClick={handleClose} />
          {form}
        </div>
    </div>
  )
}
