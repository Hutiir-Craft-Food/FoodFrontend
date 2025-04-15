import Logo from './Logo'
import Navbar from '../navbar/Navbar'
import styles from '././RowOne.module.scss'

export default function RowOne() {
  return (
      <div className={styles.rowOne}>
        <Logo />
        <Navbar className={styles.nav} />
      </div>
  )
}
