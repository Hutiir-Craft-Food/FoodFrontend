import { useState } from "react";
import SiteNavigation from "./SiteNavigation";
import ProductCategory from "./ProductCategory";
import styles from "./Header.module.scss";
import SingInForm from "../SingInForm/SingInForm";
import registerIcon from "./Icons/mdi_user.svg";

const Header = () => {
  const [showSignInForm, setShowSignInForm] = useState(false);

  const handleSignInClick = () => {
    setShowSignInForm(!showSignInForm);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <SiteNavigation />
        <div className={styles.logoSection}>
          <Logo />
          <input
            type="text"
            placeholder="Пошук..."
            className={styles.searchInput}
          />
          <button className={styles.registerButton} onClick={handleSignInClick}>
            <img
              src={registerIcon}
              alt="Реєстрація"
              className={styles.registerIcon}
            />
          </button>
          <button className={styles.cartButton}>🛒</button>
          <button className={styles.regionSelector}>Вибір регіону</button>
        </div>
        <ProductCategory />
      </div>
      <div
        className={`${styles.signInContainer} ${
          showSignInForm ? styles.show : ""
        }`}
      >
        <SingInForm />
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src="/path/to/main-logo.png" alt="Main Logo" />
    </div>
  );
};

export default Header;
