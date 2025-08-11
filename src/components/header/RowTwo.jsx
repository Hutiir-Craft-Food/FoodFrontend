import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import SearchBar from './Searchbar'
import { useAuthStore } from '../auth/store/AuthStore'
import styles from './RowTwo.module.scss'

export default function RowTwo({ isScrolled }) {
  const { showAuthWidget, logout } = useAuthStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className={styles.rowTwo}>
      {isScrolled && <Logo />}
      <div>
        <button className={styles.catalogButton}>
          Каталог
          <img src="/images/caret-down.svg" alt="CaretDown" />
        </button>
      </div>

      {/* search bar */}
      <SearchBar />

      {/* iconsContainer */}
      <div className={styles.iconsContainer}>
        <div className={styles.userIcon}>
          {!user && (
            <img
              src="/images/user-logout-default.svg"
              alt="user logout icon"
              onClick={() => showAuthWidget()}
            />
          )}
          {user && (
            <img
              src="/images/user-logIn-default.svg"
              alt="user login icon"
              onClick={() => navigate('/userProfile')}
            />
          )}
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
