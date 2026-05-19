import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
import logoIcon from '/src/icons/logoHK-36@4x.svg'

export default function Logo() {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <img src={logoIcon} alt="logo" />
      </div>
    </Link>
  )
}
