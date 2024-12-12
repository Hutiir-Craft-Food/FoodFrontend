import myIcon from '../../images/mdi_close.svg'
import styles from './ModalWindow.module.scss'

export default function Modal({ show, handleClose, content }) {

  return (
    <>
      {show && <div className={styles.overlay} onClick={handleClose}></div>}
      {show && (
        <div className={styles.modal}>
          <img src={myIcon} alt='close icon' className={styles.closeIcon} onClick={handleClose} />
          {content}
        </div>
      )}
    </>
  )
}
