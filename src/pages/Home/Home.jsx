import { useState } from 'react'
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import SingInForm from '../../components/SingInForm/SingInForm'
import SingUpBuyerForm from '../../components/SignUpBuyerForm/SingUpBuyerForm'
import SingUpSellerForm from '../../components/SignUpSellerForm/SingUpSellerForm'
// import styles from './Home.module.scss';

export default function Home() {
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
    <div className='container'>
      <p>Home Page </p>
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
  )
}
