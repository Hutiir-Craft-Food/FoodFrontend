import CloseButtonIcon from '~/icons/CloseButton'
import styles from './Modal.module.scss'

export default function Modal({ handleClose, children }) {
  return (
    <>
      <div className={styles.overlay} onClick={handleClose}></div>
      <div className={styles.modal}>
        <CloseButtonIcon className={styles.closeIcon} onClick={handleClose} />
        {children}
      </div>
    </>
  )
}
