import CustomCarousel from '../../components/CustomCarousel/CustomCarousel'
import styles from './HomePage.module.scss'
import NewProducts from '../../feature/product/NewProducts/NewProducts'
import Sellers from '../../feature/seller/Sellers/Sellers'
import RecommendedProducts from '../../feature/product/RecommendedProducts/RecommendedProducts'
import ProductsOffers from '../../feature/product/ProductOffers/ProductOffers'

export default function HomePage() {
  return (
    <div className="container">
      <h1>Khutir Craftu</h1>
      <CustomCarousel carouselCategory="advPosts" />
      <NewProducts />
      <ProductsOffers />
      <RecommendedProducts />

      <section>
        <h2>Чомy ми?</h2>
        <div className={styles.plus}>
          <div className="text-center">
            <i className="fa-solid fa-leaf"></i>
            <p>Безкоштовна доставка від 1500 грн.</p>
          </div>
          <div className="text-center">
            <i className="fa-solid fa-leaf"></i>
            <p>Доставка додому</p>
          </div>
          <div className="text-center">
            <i className="fa-solid fa-leaf"></i>
            <p>Гарантія свіжості</p>
          </div>
        </div>
      </section>
      <Sellers />
      <CustomCarousel title="Блог" carouselCategory="blogPosts" />
    </div>
  )
}
