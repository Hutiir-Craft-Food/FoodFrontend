import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalWindow from "../ModalWindow/ModalWindow";
import SingInForm from "../SingInForm/SingInForm";
import SingUpBuyerForm from "../SignUpBuyerForm/SingUpBuyerForm";
import SingUpSellerForm from "../SignUpSellerForm/SingUpSellerForm";
import styles from "./Navbar.module.scss";

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
        <div className="container">
          <Link to="/">Головна сторінка</Link>
          <Link to="/delivery-and-payment">Доставка і оплата</Link>
          <Link to="/manufacturers">Виробники</Link>
          <Link to="/cooperation">Співпраця</Link>
          <Link to="/blog">Блог</Link>
          <Link to="/about">Про нас</Link>
          <button className="m-2" onClick={() => setShowSignInForm(true)}>
            Вхід
          </button>
          <button className="m-2" onClick={() => setShowSignUpBuyerForm(true)}>
            Реєстрація для покупця
          </button>
          <button className="m-2" onClick={() => setShowSignUpSellerForm(true)}>
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
