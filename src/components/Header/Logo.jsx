import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'

export default function Logo() {
  return (
    <Link to='/'>
      <div className={styles.logo}>
        <img src='/images/logoHK-36@4x.svg' alt='logo' />
      </div>
    </Link>
  )
}
