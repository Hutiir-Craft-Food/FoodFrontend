import styles from './QuantityControls.module.scss'

export default function QuantityControls({
  quantity,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={onDecrement}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button
        className={styles.button}
        onClick={onIncrement}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
