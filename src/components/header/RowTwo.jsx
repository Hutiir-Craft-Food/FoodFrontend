import Logo from './Logo.jsx'
// import Navbar from '../navbar/Navbar'
import SearchBar from './Searchbar.jsx'
import styles from './RowTwo.module.scss'

export default function RowTwo({ isScrolled }) {
  return (
    <div className={`${styles.rowTwo} ${isScrolled && styles.stickyRowTwo}`}>
      {isScrolled && <Logo />}
      <div>
        <button className={styles.catalogButton}>
          Каталог
          <img src="/images/caret-down.svg" alt="CaretDown" />
        </button>
      </div>
      {/* search bar */}
      <SearchBar isScrolled={isScrolled} />

      {/* iconsContainer */}
      <div className={styles.iconsContainer}>
        <div className={styles.userIcon}>
          <img
            src="/images/user-logout-default.svg"
            alt="user icon"
            onClick={() => setShowSignInForm(true)}
          />
        </div>
        <div className={styles.heartIcon}>
          <img src="/images/heartIcon-default.svg" alt="heart icon" />
        </div>
        <div className={styles.basketIcon}>
          <img src="/images/basket-default-noNotif.svg" alt="user icon" />
        </div>
      </div>
    </div>
  )
}
