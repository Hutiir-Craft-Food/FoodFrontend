import styles from './QuantityControls.module.scss'

export default function QuantityControls({
  quantity = 1,
  onIncrement,
  onDecrement
}) {
  const handleIncrement = () => {
    if (onIncrement) {
      onIncrement()
    } else {
      console.log('Increment quantity to:', quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (onDecrement) {
      onDecrement()
    } else {
      console.log('Decrement quantity to:', quantity - 1)
    }
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleDecrement}
        aria-label='Decrease quantity'
      >
        −
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button
        className={styles.button}
        onClick={handleIncrement}
        aria-label='Increase quantity'
      >
        +
      </button>
    </div>
  )
}
