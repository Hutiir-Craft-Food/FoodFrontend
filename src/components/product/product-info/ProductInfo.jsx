import styles from './ProductInfo.module.scss'

export default function ProductInfo({ product }) {
  const productName = product?.name ?? ''
  return (
    <div className={styles.productInfo}>
      <h3>{productName}</h3>
    </div>
  )
}
