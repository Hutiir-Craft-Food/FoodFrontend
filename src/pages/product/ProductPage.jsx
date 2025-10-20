import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/product/breadcrumbs/Breadcrumbs'
import ProductGallery from '../../components/product/ProductGallery/ProductGallery'
import ProductInfo from '../../components/product/productInfo/ProductInfo'
import ProductDescriptionTabs from '../../components/product/productDescriptionTabs/ProductDescriptionTabs'
import useProduct from '../../components/product/useProduct'
import styles from './ProductPage.module.scss'

export default function ProductPage() {
  const { id } = useParams()
  const { product, loading, error } = useProduct(id)
  const categoryId = product?.category?.id ?? ''
  const productName = product?.name ?? ''

  if (loading) {
    return (
      <div className="container">
        <h2>Завантаження продукту...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <h2>Помилка</h2>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container">
        <h2>Продукт не знайдено</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <h2>Сторінка продукту</h2>
      <h3>Product ID: {id}</h3>
      <div className={styles.productPageContent}>
        <Breadcrumbs categoryId={categoryId} productName={productName} />
        <div className={styles.galleryAndInfoContainer}>
          <ProductGallery />
          <ProductInfo product={product} />
        </div>
        <ProductDescriptionTabs product={product} />
      </div>
    </div>
  )
}
