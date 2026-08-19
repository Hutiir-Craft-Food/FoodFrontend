import { Link } from 'react-router-dom'
import { truncateText } from '~/util/formatters'
import QuantityControls from './QuantityControls'
import PriceDisplay from './PriceDisplay'
import styles from './CartItem.module.scss'

export default function CartItem({ cartItem, onIncrement, onDecrement }) {
  if (!cartItem) {
    return null
  }

  const productImage = cartItem.product?.images?.thumbnail || ''
  const productName = truncateText(cartItem.product?.name || '', 50)
  const unitName = cartItem.unit?.name || ''
  const pricePerUnit = cartItem.price?.price || 0
  const sellerName = cartItem.seller?.name || ''
  const productId = cartItem.product?.id
  const subtotal = cartItem.subtotal || 0

  return (
    <div className={styles.container}>
      <div className={styles.sellerName}>{sellerName}</div>
      <div className={styles.content}>
        <div className={styles.productSection}>
          <div className={styles.imageWrapper}>
            {productImage ? (
              <Link to={`/products/${productId}`} className={styles.imageLink}>
                <img
                  src={productImage}
                  alt={productName}
                  className={styles.productImage}
                />
              </Link>
            ) : (
              <div className={styles.imagePlaceholder} />
            )}
          </div>
          <div className={styles.infoSection}>
            <div className={styles.productInfo}>
              <span className={styles.productName}>{productName}</span>
              {unitName && <span className={styles.unitName}>{unitName}</span>}
            </div>
          </div>
        </div>
        <div className={styles.controlsSection}>
          <QuantityControls
            quantity={cartItem.quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <div className={styles.pricesWrapper}>
            <PriceDisplay
              label="Ціна за одиницю товару"
              price={pricePerUnit}
              currency={cartItem.currency}
            />
            <PriceDisplay
              label="Сума"
              price={subtotal}
              currency={cartItem.currency}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
