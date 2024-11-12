import myIcon from '../../images/mdi_close.svg'
import arrow from '../../images/arrow.svg';
import styles from './ModalWindow.module.scss'

export default function Modal({ show, handleClose, handleBack, content }) {

  return (
    <>
      {show && <div className={styles.overlay} onClick={handleClose}></div>}
      {show && (
        <div className={styles.modal}>
          <img src={arrow} alt='arrow-icon' className={styles.arrow_icon} onClick={handleBack} />
          <img src={myIcon} alt='icon' className={styles.closeIcon} onClick={handleClose} />
          {content}
        </div>
      )}
    </>
  )
}
