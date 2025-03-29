import { useState, useEffect } from 'react'
import Logo from './Logo'
import Navbar from '../navbar/Navbar'
import SearchBar from './Searchbar'
import ModalWindow from '../modal-window/ModalWindow'
import SignInForm from '../auth/signin/SignInForm'
import styles from './Header.module.scss'

export default function Header() {
  const [isScrolled, setScrolled] = useState(false)
  const [showSignInForm, setShowSignInForm] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  const handleClose = () => {
    setShowSignInForm(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header className='container'>
        <div className={`${styles.headerContainer} ${isScrolled && styles.scrolledHeader}`}>
          {!isScrolled && (
            <div className={styles.rowOne}>
              <Logo />
              <Navbar className={styles.nav} />
            </div>
          )}

          <div className={`${styles.rowTwo} ${isScrolled && styles.stickyRowTwo}`}>
            {isScrolled && <Logo />}
            <div>
              <button className={styles.catalogButton}>
                Каталог
                <img src='/images/caret-down.svg' alt='CaretDown' />
              </button>
            </div>
            {/* search bar */}
            <SearchBar isScrolled={isScrolled} />

            {/* iconsContainer */}
            <div className={styles.iconsContainer}>
              <div className={styles.userIcon}>
                <img src='/images/user-logout-default.svg' alt='user icon' onClick={() => setShowSignInForm(true)} />
              </div>
              <div className={styles.heartIcon}>
                <img src='/images/heartIcon-default.svg' alt='heart icon' />
              </div>
              <div className={styles.basketIcon}>
                <img src='/images/basket-default-noNotif.svg' alt='user icon' />
              </div>
            </div>
          </div>
        </div>
      </header>

      <ModalWindow show={showSignInForm} handleClose={handleClose} form={<SignInForm />} />
    </>
  )
}
