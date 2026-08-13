import { Link } from 'react-router-dom'
import styles from './Logo.module.scss'
import LogoIcon from '../../icons/LogoIcon'

export default function Logo() {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <LogoIcon />
      </div>
    </Link>
  )
}
