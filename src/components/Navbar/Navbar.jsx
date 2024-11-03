import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModalWindow from '../ModalWindow/ModalWindow'
import SignInForm from '../SignInForm/SignInForm'
import SignUpContainer from '../SignUpContainer/SignUpContainer'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const [showSignInForm, setShowSignInForm] = useState(false)
  const [showSignUpContainer, setShowSignUpContainer] = useState(false)

  const handleClose = () => {
    setShowSignInForm(false)
    setShowSignUpContainer(false)
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div id="navbar-container">
          <Link to="/" className="me-5">
            Головна сторінка
          </Link>
          <Link to="/delivery-and-payment" className="me-5">
            Доставка і оплата
          </Link>
          <Link to="/manufacturers" className="me-5">
            Виробники
          </Link>
          <Link to="/cooperation" className="me-5">
            Співпраця
          </Link>
          <Link to="/blog" className="me-5">
            Блог
          </Link>
          <Link to="/about" className="me-5">
            Про нас
          </Link>
          <button className="m-2" onClick={() => setShowSignInForm(true)}>
            Вхід
          </button>
          <button className="m-2" onClick={() => setShowSignUpContainer(true)}>
            Реєстрація
          </button>
        </div>
      </nav>

      <ModalWindow
        show={showSignInForm}
        handleClose={handleClose}
        form={<SignInForm />}
      />
      <ModalWindow
        show={showSignUpContainer}
        handleClose={handleClose}
        form={
          <SignUpContainer setShowSignUpContainer={setShowSignUpContainer} />
        }
      />
    </>
  )
}
