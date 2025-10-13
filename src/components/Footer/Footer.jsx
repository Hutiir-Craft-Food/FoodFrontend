import styles from './Footer.module.scss'

export default function Footer() {
  const handleSubmit = () => {}
  return (
    <footer className="container">
      <div className={styles.footer}>
        <div className={styles.content}>
          <div className={styles.left_side}>
            <div className={styles.logo_cotainer}>
              <a href="/">
                <img src="/images/logo_footer.png" alt="logo" />
              </a>
            </div>
            <form className={styles.subscribeForm} onSubmit={handleSubmit}>
              <label htmlFor="email" className={styles.label}>
                Підпишись і отримуй спеціальні пропозиції!
              </label>
              <div className={styles.input_group}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ваш e-mail"
                  required
                  className={styles.input}
                />
                <button type="submit" className={styles.button}>
                  <img src="/images/arrow-right.svg" alt="надіслати" />
                </button>
              </div>
              <p className={styles.agreement_message}>
                Натискаючи кнопку «Підписатись», ви даєте згоду на обробку
                персональних даних
              </p>
            </form>
          </div>
          <div className={styles.right_side}>
            <ul>
              <h4>Про нас</h4>
              <li>Наша місія</li>
              <li>Співпраця</li>
              <li>Контакти</li>
              <li>Політика конфіденціальності</li>
            </ul>
            <ul>
              <h4>Покупцям</h4>
              <li>Блог</li>
              <li>Виробники</li>
              <li>Бонусна програма</li>
              <li>Доставка і оплата</li>
              <li>FAQ</li>
            </ul>
            <ul>
              <h4>Продавцям</h4>
              <li>Умови співпраці</li>
              <li>Довідка</li>
              <li>Угода користувача</li>
            </ul>
          </div>
        </div>
        <div className={styles.nav}>
          <nav>
            <ul>
              <li>
                <a href="#">
                  <img src="/images/facebook_icon.svg" alt="facebook_icon." />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/images/instagram_icon.svg" alt="intagram_icon" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="images/telegram_icon.svg" alt="itelegram_icon" />
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
