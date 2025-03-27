import closeIcon from '/src/icons/mdiclose.svg'
import styles from './ModalWindow.module.scss'

export default function Modal({show, children, handleClose }) {
  return (
    <>
      {show && <div className={styles.overlay} onClick={handleClose}></div>}
      {show && (
        <div className={styles.modal}>
          <img src={closeIcon} alt='icon' className={styles.closeIcon} onClick={handleClose} />
          {children}
        </div>
      )}
    </>
  )
}
