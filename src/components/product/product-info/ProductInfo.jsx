import styles from './ProductInfo.module.scss'

export default function ProductInfo({ product }) {
  const productName = product?.name ?? ''
  return <div className={styles.productInfo}>{productName}</div>
}
