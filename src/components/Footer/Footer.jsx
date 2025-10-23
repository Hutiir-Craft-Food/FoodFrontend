import styles from './Footer.module.scss'
import arrowRight from '~/icons/button/arrow-right.svg'
import facebookIcon from '~/icons/facebook-icon.svg'
import telegramIcon from '~/icons/telegram-icon.svg'
import instagramIcon from '~/icons/instagram-icon.svg'

export default function Footer() {
  const handleSubmit = () => {}
  return (
    <footer className="container">
      <div className={styles.footer}>
        <div className={styles.content}>
          <div className={styles.leftSide}>
            <div className={styles.logoCotainer}>
              <a href="/">
                <img src="/images/logo-footer.png" alt="logo" />
              </a>
            </div>
            <form className={styles.subscribeForm} onSubmit={handleSubmit}>
              <label htmlFor="email" className={styles.label}>
                Підпишись і отримуй спеціальні пропозиції!
              </label>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ваш e-mail"
                  required
                  className={styles.input}
                />
                <button type="submit" className={styles.button}>
                  <img src={arrowRight} alt="надіслати" />
                </button>
              </div>
              <p className={styles.agreementMessage}>
                Натискаючи кнопку «Підписатись», ви даєте згоду на обробку
                персональних даних
              </p>
            </form>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.blockOfLinks}>
              <h4>Про нас</h4>
              <ul>
                <li>
                  <a href="#">Наша місія</a>
                </li>
                <li>
                  <a href="#">Співпраця</a>
                </li>
                <li>
                  <a href="#">Контакти</a>
                </li>
                <li>
                  <a href="#">Політика конфіденціальності</a>
                </li>
              </ul>
            </div>
            <div className={styles.blockOfLinks}>
              <h4>Покупцям</h4>
              <ul>
                <li>
                  <a href="#">Блог</a>
                </li>
                <li>
                  <a href="#">Виробники</a>
                </li>
                <li>
                  <a href="#">Бонусна програма</a>
                </li>
                <li>
                  <a href="#">Доставка і оплата</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
              </ul>
            </div>
            <div className={styles.blockOfLinks}>
              <h4>Продавцям</h4>
              <ul>
                <li>
                  <a href="#">Умови співпраці</a>
                </li>
                <li>
                  <a href="#">Довідка</a>
                </li>
                <li>
                  <a href="#">Угода користувача</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.nav}>
          <nav>
            <ul>
              <li>
                <a href="#">
                  <img src={facebookIcon} alt="facebook icon." />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={instagramIcon} alt="intagram icon" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={telegramIcon} alt="telegram icon" />
                </a>
              </li>
            </ul>
          </nav>
          <p> &copy; dreamteam, 2024-2025</p>
        </div>
      </div>
    </footer>
  )
}
