import { useState } from 'react'
import styles from './VariantSelector.module.scss'

export default function VariantSelector({
  prices = [],
  units = [],
  onSelect,
}) {
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0)

  const handleSelect = (price, index) => {
    if (index === selectedPriceIndex) return

    setSelectedPriceIndex(index)
    onSelect?.(price)
  }

  return (
    <div className={styles.listOfPackaging}>
      {prices.map((price, index) => {
        const unit = units.find(({ id }) => id === price.unitId)

        return (
          <button
            type="button"
            className={`${styles.buttonPackaging} ${
              selectedPriceIndex === index ? styles.active : ''
            }`}
            aria-pressed={selectedPriceIndex === index}
            key={price.id ?? index}
            onClick={() => handleSelect(price, index)}
          >
            {price.qty} {unit?.name || ''}
          </button>
        )
      })}
    </div>
  )
}
