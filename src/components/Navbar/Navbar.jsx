import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import CodeRegistrationModal from '../CodeRegistrationModal/CodeRegistrationModal';
import SkipVerificationModal from '../SkipVerificationModal/SkipVerificationModal';
import CodeSuccessModal from '../CodeSuccessModal/CodeSuccessModal';
import AccountIsReadyModal from '../AccountIsReadyModal/AccountItReadyModal';
import SignInForm from '../SignInForm/SignInForm';
import SignUpContainer from '../SignUpContainer/SignUpContainer';
import styles from './Navbar.module.scss'

export default function Navbar() {
  const [showSignInForm, setShowSignInForm] = useState(false)
  const [showSignUpContainer, setShowSignUpContainer] = useState(false)
  const [step, setStep] = useState(0);

  const handleClose = () => {
    setShowSignInForm(false);
    setShowSignUpContainer(false);
    setStep(0);
  }

  const handlePreviousStep = () => {
    if (step > 1){
      setStep((prevStep) => prevStep - 1);
    }
    if(step === 1){
      setShowSignUpContainer(true);
      setStep(0);
    }
  };

  const handleRegister = () => {
    setStep(1);
  };

  const handleVerify = async (code) => {
    console.log (code);
    try {
      const response = await fetch('/api/v1/user/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })

      if (response.ok) {
        console.log('Код валідний')
        setStep(2);
      } else {
        console.log('Помилка валідації коду')
      }
    } catch (error) {
      console.error('Помилка валідації коду:', error)
    }
  }

  const handleSkip = () => {
    setStep(3);
  };

  const handleSkipFinish = () => {
    setStep(4);
  };


  const handleConfirm = () => {
    window.location.href = '/';
  }

  const renderCodeModal = () => {
    switch (step) {
      case 1:
        return <CodeRegistrationModal onVerify={handleVerify} onSkip={handleSkip} />
      case 2:
        return <CodeSuccessModal onConfirm={handleConfirm} />
      case 3:
        return <SkipVerificationModal onSkipFinish={handleSkipFinish} onRegisterOTP={handleRegister} />
      case 4:
        return <AccountIsReadyModal onConfirm={handleConfirm} />
      default:
        return null
    }
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
        content={<SignInForm />}
      />
      <ModalWindow
        show={showSignUpContainer}
        handleClose={handleClose}
        content={
          <SignUpContainer setShowSignUpContainer={setShowSignUpContainer} onRegisterOTP={handleRegister} />
        }
      />
      <ModalWindow
        show={step}
        handleClose={handleClose}
        handleBack={handlePreviousStep}
        content={renderCodeModal()}
      />
    </>
  )
}
