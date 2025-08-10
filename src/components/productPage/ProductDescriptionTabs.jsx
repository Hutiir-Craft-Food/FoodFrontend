import styles from './ProductDescriptionTabs.module.scss'

export default function ProductDescriptionTabs() {
  return (
    <div className={styles.productDescriptionTabs}>
      <ul>
        <li>Опис</li>
        <li>Склад</li>
        <li>Алергени</li>
        <li>Харчова цінність</li>
        <li>Термін та умови зберігання</li>
      </ul>
    </div>
  )
}
