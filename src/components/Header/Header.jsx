import Navbar from '../Navbar/Navbar'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <p>Header </p>
        <Navbar />
      </div>
    </header>
  )
}
