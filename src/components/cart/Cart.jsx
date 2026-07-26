import React from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem'
import { formatPriceUAH } from '@/util/formatters'
import styles from './Cart.module.scss'

export default function Cart({ items = [], className = '' }) {
  // Group items by seller id
  const grouped = items.reduce((acc, item) => {
    const sellerId = (item?.seller?.id ?? '__no_seller__').toString()
    const sellerName = item?.seller?.name ?? 'Seller'
    if (!acc[sellerId]) acc[sellerId] = { sellerName, items: [] }
    acc[sellerId].items.push(item)
    return acc
  }, {})

  // Calculate total amount using reduce
  const totalAmount = items.reduce((sum, it) => {
    const subtotal = Number(
      it?.subtotal ??
        (it?.price?.price ? it.price.price * (it.quantity ?? 0) : 0)
    )
    return sum + (Number.isFinite(subtotal) ? subtotal : 0)
  }, 0)

  return (
    <section
      className={`${styles.container} ${className}`.trim()}
      aria-label="Shopping cart"
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Your cart</h2>
      </div>

      <div className={styles.itemsArea} role="list">
        {Object.entries(grouped).map(([sellerId, group]) => (
          <div className={styles.sellerGroup} key={sellerId}>
            <h3 className={styles.sellerHeading}>{group.sellerName}</h3>
            <div className={styles.sellerItems}>
              {group.items.map((cartItem) => (
                <div
                  role="listitem"
                  key={
                    cartItem.cartItemId ?? cartItem.id ?? cartItem.product?.id
                  }
                >
                  <CartItem cartItem={cartItem} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className={styles.emptyState} role="status">
            Your cart is empty.
          </div>
        )}
      </div>

      <div
        className={styles.totalsArea}
        aria-hidden={items.length === 0 ? 'true' : 'false'}
      >
        <div className={styles.totalsInner}>
          <div className={styles.totalsLabel}>Total</div>
          <div className={styles.totalsValue}>
            {formatPriceUAH(totalAmount)}
          </div>
        </div>
      </div>
    </section>
  )
}

Cart.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
}
