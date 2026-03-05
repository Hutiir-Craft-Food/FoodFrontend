import { useState } from "react"
import styles from './ProductPrice.module.scss'

export default function ProductPrice({ product }) {
  const pricesInfo = product?.prices ?? []
  const units = product?.units ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const activePrice = pricesInfo[activeIndex] ?? {}

  return (
    <div className={styles.productPriceContainer}>
      <p className={styles.price}>
        {activePrice?.price ? `${activePrice.price} грн` : "Немає ціни"}
      </p>
      <div className={styles.listOFPackaging}>
        {pricesInfo && pricesInfo.map((priceInfo, index) => {
          const unit = units.find(
            (unit) => unit.id === priceInfo.unitId
          )
          return (
            <button
              type="button"
              className={`${styles.buttonPackaging} ${activeIndex === index ? styles.active : ''}`}
              key={`${product.id}-${index}`}
              onClick={() => setActiveIndex(index)}
              
            >
              {priceInfo.qty} {unit?.name || ''}
            </button>
          )
        })}
      </div>
    </div>
  )
}
