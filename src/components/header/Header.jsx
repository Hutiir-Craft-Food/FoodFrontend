import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Modal from '../modal/Modal'
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

  return (
    <>
      <header className='container'>
        <div
          className={`${styles.headerContainer}
            ${isScrolled ? styles.scrolledHeader : ''}
          }`}
        >
          <div className={styles.rowOne}>
            <Link to='/'>
              <div className={styles.logo}>
                <img src='/images/logoHK-36@4x.svg' alt='logo' />
              </div>
            </Link>
            <div className={styles.nav}>
              <Navbar />
            </div>
          </div>
          <div
            className={`${styles.rowTwo} ${
              isScrolled ? styles.stickyRowTwo : ''
            }`}
          >
            {isScrolled ? (
              <Link to='/'>
                <div className={styles.logo}>
                  <img src='/images/logoHK-36@4x.svg' alt='logo' />
                </div>
              </Link>
            ) : (
              ''
            )}
            <div>
              <button className={styles.catalogButton}>
                Каталог
                <img src='/images/caret-down.svg' alt='CaretDown' />
              </button>
            </div>
            <div
              className={`${styles.searchContainer}  ${
                isScrolled ? styles.stickySearchContainer : ''
              }`}
            >
              <input
                type='search'
                placeholder='Я шукаю . . .'
                value={searchItem}
                onChange={handleInputChange}
              />
              <button className={styles.magnifyingGlass}>
                <img
                  className={styles.magnifyingGlass}
                  src='/images/magnifying-glass.svg'
                  alt='magnifyingGlass'
                />
              </button>
            </div>{' '}
            <div className={styles.iconsContainer}>
              <div className={styles.userIcon}>
                <img
                  src='/images/user-logout-default.svg'
                  alt='user icon'
                  onClick={() => setShowSignInForm(true)}
                />
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
      {showSignInForm && (
        <Modal handleClose={handleClose}>
          {showSignInForm ? <SignInForm /> : <SignUpContainer />}
        </Modal>
      )}
    </>
  )
}
