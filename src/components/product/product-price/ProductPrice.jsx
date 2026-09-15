import { useState } from 'react'
import styles from './ProductPrice.module.scss'
import VariantSelector from '../variant-selector/VariantSelector'

export default function ProductPrice({ product }) {
  const prices = product?.prices ?? []
  const units = product?.units ?? []
  const [selection, setSelection] = useState({
    productId: product?.id,
    priceIndex: 0,
  })
  const selectedPriceIndex =
    selection.productId === product?.id ? selection.priceIndex : 0
  const activePrice = prices[selectedPriceIndex] ?? {}

  return (
    <div className={styles.productPriceContainer}>
      <p className={styles.price}>
        {activePrice?.price ? `${activePrice.price} грн` : 'Немає ціни'}
      </p>
      <VariantSelector
        key={product?.id}
        prices={prices}
        units={units}
        onSelect={(price) =>
          setSelection({
            productId: product?.id,
            priceIndex: prices.indexOf(price),
          })
        }
      />
    </div>
  )
}
