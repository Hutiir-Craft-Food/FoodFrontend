import { Link } from 'react-router-dom'
import ModalWindow from '../modal-window/ModalWindow'
import SignInForm from '../auth/SignInForm/SignInForm'
import SignUpContainer from '../auth/SignUpContainer/SignUpContainer'
import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbarContainer}>
        <div className={styles.links}>
          <Link to="/about" className={styles.linkStyles}>
            Про нас
          </Link>
          <Link to="/manufacturers" className={styles.linkStyles}>
            Виробники
          </Link>
          <Link to="/cooperation" className={styles.linkStyles}>
            Співпраця
          </Link>
          <Link to="/delivery-and-payment" className={styles.linkStyles}>
            Доставка і оплата
          </Link>
          <Link to="/blog" className={styles.linkStyles}>
            Блог
          </Link>
        </div>
      </nav>
    </>
  )
}
