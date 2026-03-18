import { useState } from "react"
import styles from './ProductPrice.module.scss'

export default function ProductPrice({ product }) {
  const prices = product?.prices ?? []
  const units = product?.units ?? []
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0)
  const activePrice = prices[selectedPriceIndex] ?? {}

  return (
    <div className={styles.productPriceContainer}>
      <p className={styles.price}>
        {activePrice?.price ? `${activePrice.price} грн` : "Немає ціни"}
      </p>
      <div className={styles.listOFPackaging}>
        {prices.map((price, index) => {
          const unit = units.find(
            (unit) => unit.id === price.unitId
          )
          return (
            <button
              type="button"
              className={`${styles.buttonPackaging} ${selectedPriceIndex === index ? styles.active : ''}`}
              key={`${product.id}-${index}`}
              onClick={() => setSelectedPriceIndex(index)}
              
            >
              {price.qty} {unit?.name || ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}
