import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import SingInForm from '../SignInForm/SignInForm';
import SingUpBuyerForm from '../SignUpBuyerForm/SingUpBuyerForm';
import SingUpSellerForm from '../SignUpSellerForm/SingUpSellerForm';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showSignUpBuyerForm, setShowSignUpBuyerForm] = useState(false);
  const [showSignUpSellerForm, setShowSignUpSellerForm] = useState(false);

  const handleClose = () => {
    setShowSignInForm(false);
    setShowSignUpBuyerForm(false);
    setShowSignUpSellerForm(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div id='navbar-container'>
          <Link to='/' className='me-5'>Головна сторінка</Link>
          <Link to='/delivery-and-payment' className='me-5'>Доставка і оплата</Link>
          <Link to='/manufacturers' className='me-5'>Виробники</Link>
          <Link to='/cooperation' className='me-5'>Співпраця</Link>
          <Link to='/blog' className='me-5'>Блог</Link>
          <Link to='/about' className='me-5'>Про нас</Link>
          <button className='m-2' onClick={() => setShowSignInForm(true)}>
            Вхід
          </button>
          <button className='m-2' onClick={() => setShowSignUpBuyerForm(true)}>
            Реєстрація для покупця
          </button>
          <button className='m-2' onClick={() => setShowSignUpSellerForm(true)}>
            Реєстрація для продавця
          </button>
        </div>
      </nav>
      <ModalWindow
        show={showSignInForm}
        handleClose={handleClose}
        form={<SingInForm />}
      />
      <ModalWindow
        show={showSignUpBuyerForm}
        handleClose={handleClose}
        form={<SingUpBuyerForm />}
      />
      <ModalWindow
        show={showSignUpSellerForm}
        handleClose={handleClose}
        form={<SingUpSellerForm />}
      />
    </>
  );
};

export default Navbar;
