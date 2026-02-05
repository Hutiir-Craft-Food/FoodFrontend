import styles from './ShippingAndPayment.module.scss'
import novaPoshta from '~/icons/nova-poshta.png'
import ukrPoshta from '~/icons/ukr-poshta.png'
import carIcon from '~/icons/car.svg'
import bagIcon from '~/icons/bag.svg'

export default function ShippingAndPayment({ product }) {
  return <div className={styles.shippingContainer}>
    <div className={styles.banner}>
      <img src="/images/banner_shipping.png" alt="banner"/>
    </div>
    <div  className={styles.shippingInfo}>
      <ul className={styles.infoList}>
        <li>
          <a href="#">
            <strong>Доставка</strong>
          </a>
        </li>
        <li>
          <a href="#">Оплата</a>
        </li>
        <li>
          <a href="#">Контакти виробника</a>
        </li>
      </ul>
      <p>
        <strong> Зверніть увагу! </strong>
       Для кожного виробника формуються окремі замовлення. Тому замовлення від різних виробників будуть доставлені окремими посилками.
      </p>
      <ul className={styles.deliveryList}>
        <li>
          <a href="#">
            <img src={novaPoshta} alt="nova poshta" />
            Нова пошта
          </a>
          
        </li>
          <li>
          <a href="#">
            <img src={ukrPoshta} alt="ukrposhta" />
            Укрпошта
          </a>
        </li>
          <li>
          <a href="#">
            <img src={carIcon} alt="car icon" />
            Самовивіз
          </a>
        </li>
          <li>
          <a href="#">
            <img src={bagIcon} alt="bag icon" />
            Курє'рська доставка
          </a>
        </li>
      </ul>
    </div>
  </ div>
}
