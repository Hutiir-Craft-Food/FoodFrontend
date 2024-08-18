import myIcon from '../../images/mdi_close.svg'
import styles from './ModalWindow.module.scss'

export default function Modal({ show, handleClose, form }) {
  // console.log(form)
  return (
    <>
      {show && <div className={styles.overlay} onClick={handleClose}></div>}
      {show && (
        <div className={styles.modal}>
          <img src={myIcon} alt='icon' className={styles.closeIcon} onClick={handleClose} />
          {form}
        </div>
      )}
    </>
  )
}
