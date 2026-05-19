import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import SearchBar from './SearchBar'
import { useAuthStore } from '../auth/store/AuthStore'
import styles from './RowTwo.module.scss'

import caretDownIcon from '/src/icons/caret-down.svg'
import userLogoutIcon from '/src/icons/user-logout-default.svg'
import userLoginIcon from '/src/icons/user-logIn-default.svg'
import heartIcon from '/src/icons/heartIcon-default.svg'
import basketIcon from '/src/icons/basket-default-noNotif.svg'

export default function RowTwo({ isScrolled }) {
  const { showAuthWidget } = useAuthStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className={styles.rowTwo}>
      {isScrolled && <Logo />}
      <div>
        <button className={styles.catalogButton}>
          Каталог
          <img src={caretDownIcon} alt="Expand menu" />
        </button>
      </div>

      <SearchBar />

      <div className={styles.iconsContainer}>
        <div className={styles.userIcon}>
          {!user && (
            <div
              id="login-button"
              role="button"
              onClick={() => showAuthWidget()}
            >
              <img src={userLogoutIcon} alt="Log out" />
            </div>
          )}
          {user && (
            <div
              id="login-button"
              role="button"
              className={styles.iconWrapper}
              onClick={() => navigate('/userProfile')}
            >
              <img src={userLoginIcon} alt="Login" />
            </div>
          )}
        </div>

        <div className={styles.heartIcon}>
          <div
            id="favorites-button"
            role="button"
            className={styles.iconWrapper}
            onClick={() => navigate('/favorites')}
          >
            <img src={heartIcon} alt="Wish list" />
          </div>
        </div>

        <div className={styles.basketIcon}>
          <div
            id="basket-button"
            role="button"
            className={styles.iconWrapper}
            onClick={() => navigate('/basket')}
          >
            <img src={basketIcon} alt="Shopping cart" />
          </div>
        </div>
      </div>
    </div>
  )
}
