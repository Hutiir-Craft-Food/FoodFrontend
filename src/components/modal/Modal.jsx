import closeIcon from '/src/icons/mdiclose.svg'
import styles from './Modal.module.scss'

export default function Modal({ handleClose, children }) {
  return (
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles.modal}>
        <img
          src={closeIcon}
          alt='icon'
          className={styles.closeIcon}
          onClick={handleClose}
        />
        {children}
      </div>
    </>
  )
}
