import ProductGallery from '../../components/product/ProductGallery'
import ProductInfo from '../../components/product/ProductInfo'
import ProductDescriptionTabs from '../../components/product/ProductDescriptionTabs'
import styles from './ProductPage.module.scss'

export default function ProductPage() {
  return (
    <div className="container">
      <h2>Сторінка продукту</h2>
      <div className={styles.productPageContent}>
        <p>каталог - молочні продукти - сири - сир Брі</p>
        <div className={styles.galleryAndInfoContainer}>
          <ProductGallery />
          <ProductInfo />
        </div>
        <ProductDescriptionTabs />
      </div>
    </div>
  )
}
