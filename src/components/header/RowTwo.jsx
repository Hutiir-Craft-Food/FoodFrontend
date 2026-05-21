import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import SearchBar from './SearchBar'
import { useAuthStore } from '../auth/store/AuthStore'
import styles from './RowTwo.module.scss'

import CaretDownIcon from '~/icons/CaretDown'
import UserLogoutIcon from '~/icons/UserLogout'
import UserLoginIcon from '~/icons/UserLogin'
import HeartIcon from '~/icons/Heart'
import BasketIcon from '~/icons/Basket'

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
          <CaretDownIcon />
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
              <UserLogoutIcon />
            </div>
          )}

          {user && (
            <div
              id="login-button"
              role="button"
              className={styles.iconWrapper}
              onClick={() => navigate('/userProfile')}
            >
              <UserLoginIcon />
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
            <HeartIcon />
          </div>
        </div>

        <div className={styles.basketIcon}>
          <div
            id="basket-button"
            role="button"
            className={styles.iconWrapper}
            onClick={() => navigate('/basket')}
          >
            <BasketIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
