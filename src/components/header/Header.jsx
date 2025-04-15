import { useState, useEffect } from 'react'
import Modal from '../modal/Modal'
import RowOne from './RowOne'
import RowTwo from './RowTwo'
import SignInForm from '../auth/signin/SignInForm'
import styles from './Header.module.scss'

export default function Header() {
  const [isScrolled, setScrolled] = useState(false)
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
          <RowOne />
          <RowTwo
            isScrolled={isScrolled}
            setShowSignInForm={setShowSignInForm}
          />
        </div>
      </header>
      {showSignInForm && (
        <Modal handleClose={handleClose}>
          <SignInForm />
        </Modal>
      )}
    </>
  )
}
