import { useState, useEffect } from 'react'
import clsx from 'clsx'
import RowOne from './RowOne'
import RowTwo from './RowTwo'
import { useAuthStore } from '../auth/store/AuthStore'
import styles from './Header.module.scss'

export default function Header() {
  const [isScrolled, setScrolled] = useState(false)
  const { user } = useAuthStore()

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
    <header className={clsx('container', isScrolled && styles.stickyStyle)}>
      <div className={styles.headerContainer}>
        {!isScrolled && <RowOne />}
        <RowTwo isScrolled={isScrolled} />
        <div className={styles.hr} />
      </div>
    </header>
  )
}
