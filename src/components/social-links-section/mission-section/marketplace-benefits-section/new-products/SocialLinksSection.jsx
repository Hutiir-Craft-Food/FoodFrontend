import FacebookIcon from '~/icons/Facebook'
import TelegramIcon from '~/icons/Telegram'
import InstagramIcon from '~/icons/Instagram'
import styles from './SocialLinksSection.module.scss'

export default function SocialLinksSection() {
  return (
    <div className="container">
      <h2>Слідкуйте за нами</h2>
      <div className={styles.nav}>
        <nav>
          <ul>
            <li>
              <button className={styles.socialLinksButton}>
                <FacebookIcon size={20} color="#fff" />
              </button>
            </li>
            <li>
              <button className={styles.socialLinksButton}>
                <InstagramIcon size={20} color="#fff" />
              </button>
            </li>
            <li>
              <button className={styles.socialLinksButton}>
                <TelegramIcon size={20} color="#fff" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
