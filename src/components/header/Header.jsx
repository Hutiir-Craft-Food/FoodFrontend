import { useState, useEffect } from 'react'
import Modal from '../modal/Modal'
import RowOne from './RowOne'
import RowTwo from './RowTwo'
import SignInForm from '../auth/signin/SignInForm'
import SignUpContainer from '../auth/signup/SignUpContainer'
import styles from './Header.module.scss'

export default function Header() {
  const [isScrolled, setScrolled] = useState(false)
  const [showSignInForm, setShowSignInForm] = useState(false)

  const handleClose = () => {
    setShowSignInForm(false)
  }

  const stickyStyle = {
    position: 'sticky',
    zIndex: 1000,
    top: 0,
  }

  const handleScroll = () => {
    if (window.scrollY > 175) {
      setScrolled(true)
    } else if (window.scrollY < 100) {
      setScrolled(false)
    }
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header className="container" style={isScrolled ? stickyStyle : {}}>
        <div className={styles.headerContainer}>
          {!isScrolled && <RowOne />}
          <RowTwo
            isScrolled={isScrolled}
            setShowSignInForm={setShowSignInForm}
          />
          <div className={styles.hr} />
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
