import SignInForm from '../auth/signin/SignInForm'
import SignUpContainer from '../auth/signup/SignUpContainer'
import closeIcon from '/src/icons/mdiclose.svg'
import styles from './Modal.module.scss'

export default function Modal({ showModal, action, setAction, handleClose }) {
  return (
    <>
      {showModal && (
        <div className={styles.overlay} onClick={handleClose}></div>
      )}
      {showModal && (
        <div className={styles.modal}>
          <img
            src={closeIcon}
            alt="icon"
            className={styles.closeIcon}
            onClick={handleClose}
          />
          {action === 'login' && <SignInForm setAction={setAction} />}
          {action === 'register' && <SignUpContainer setAction={setAction} />}
        </div>
      )}
    </>
  )
}
