import { useParams } from 'react-router-dom'
import ProductGallery from '../../components/product/ProductGallery/ProductGallery'
import ProductInfo from '../../components/product/ProductInfo/ProductInfo'
import ProductDescriptionTabs from '../../components/product/productDescriptoinTabs/ProductDescriptionTabs'
import useProduct from '../../components/product/useProduct'
import styles from './ProductPage.module.scss'

export default function ProductPage() {
  const { id } = useParams()
  const { product } = useProduct(id)
  const productName = (product && product.name) || ''
  return (
    <div className="container">
      <h2>Сторінка продукту</h2>
      <h3>Product ID: {id}</h3>
      <div className={styles.productPageContent}>
        <p>каталог - молочні продукти - сири - {productName}</p>
        <div className={styles.galleryAndInfoContainer}>
          <ProductGallery />
          <ProductInfo product={product} />
        </div>
        <ProductDescriptionTabs product={product} />
      </div>
    </div>
  )
}
