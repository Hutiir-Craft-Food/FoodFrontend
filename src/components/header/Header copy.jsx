import { useState, useEffect } from 'react'
import Logo from './Logo'
import Navbar from '../navbar/Navbar'
import Modal from '../modal/Modal'
import SearchBar from './Searchbar'
import RowOne from './RowOne'
import SignInForm from '../auth/signin/SignInForm'
import SignUpContainer from '../auth/signup/SignUpContainer'
import styles from './Header.module.scss'

export default function Header() {
  const [isScrolled, setScrolled] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [showSignInForm, setShowSignInForm] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  const handleInputChange = (e) => {
    const searchItem = e.target.value
    setSearchItem(searchItem)
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
      <header className="container">
        <div
          className={`${styles.headerContainer} ${
            isScrolled && styles.scrolledHeader
          }`}
        >
          <RowOne isScrolled={isScrolled} />
          <RowTwo isScrolled={isScrolled} />
          <div
            className={`${styles.rowTwo} ${isScrolled && styles.stickyRowTwo}`}
          >
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
        </div>
      </header>
      {showSignInForm && (
        <Modal handleClose={handleClose}>
          {showSignInForm ? <SignInForm /> : <SignUpContainer />}
        </Modal>
      )}
    </>
  )
}
