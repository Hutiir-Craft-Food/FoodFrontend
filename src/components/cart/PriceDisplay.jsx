import { formatPriceUAH } from '~/util/formatters'
import styles from './PriceDisplay.module.scss'

export default function PriceDisplay({ label, price, currency = 'UAH' }) {
  const formattedPrice =
    currency === 'UAH' ? formatPriceUAH(price) : formatPriceUAH(price)

  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <span className={styles.price}>{formattedPrice}</span>
    </div>
  )
}
