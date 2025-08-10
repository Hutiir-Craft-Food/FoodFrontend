import ProductGallery from '../../components/productPage/ProductGallery'
import ProductInfo from '../../components/productPage/ProductInfo'
import ProductDescriptionTabs from '../../components/productPage/ProductDescriptionTabs'
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
