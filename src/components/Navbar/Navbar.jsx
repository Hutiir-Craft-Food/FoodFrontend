import { useState } from 'react'
import { Link } from "react-router-dom";
import ModalWindow from '../ModalWindow/ModalWindow'
import SingInForm from '../SingInForm/SingInForm'
import SingUpBuyerForm from '../SignUpBuyerForm/SingUpBuyerForm'
import SingUpSellerForm from '../SignUpSellerForm/SingUpSellerForm'
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [showSignInForm, setShowSignInForm] = useState(false)
  const [showSignUpBuyerForm, setShowSignUpBuyerForm] = useState(false)
  const [showSignUpSellerForm, setShowSignUpSellerForm] = useState(false)

  const handleShowSignIn = () => setShowSignInForm(true)
  const handleShowSignUpBuyer = () => setShowSignUpBuyerForm(true)
  const handleShowSignUpSeller = () => setShowSignUpSellerForm(true)

  const handleClose = () => {
    setShowSignInForm(false)
    setShowSignUpBuyerForm(false)
    setShowSignUpSellerForm(false)
  }

  return (
    <nav className={styles.navbar}>
      <div className='container'>
        <Link to="#" className='m-2'>
          page1
        </Link>
        <Link to="#" className='m-2'>
          page2
        </Link>
        <Link to="#" className='m-2'>
          page3
        </Link>

        <button className='m-2' onClick={handleShowSignIn}>
          Вхід
        </button>
        <button className='m-2' onClick={handleShowSignUpBuyer}>
          Реєстрація для покупця
        </button>
        <button className='m-2' onClick={handleShowSignUpSeller}>
          Реєстрація для продавця
        </button>
        <ModalWindow show={showSignInForm} handleClose={handleClose} form={<SingInForm />} />
        <ModalWindow show={showSignUpBuyerForm} handleClose={handleClose} form={<SingUpBuyerForm />} />
        <ModalWindow show={showSignUpSellerForm} handleClose={handleClose} form={<SingUpSellerForm />} />
      </div>
    </nav>
  )
}
