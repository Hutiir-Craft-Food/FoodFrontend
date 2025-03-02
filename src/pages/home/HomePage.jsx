import CustomCarousel from '../../components/custom-carousel/CustomCarousel'
import NewProducts from '../../components/product/new-products/NewProducts'
import Sellers from '../../components/seller/sellers-container/SellersContainer'
import RecommendedProducts from '../../components/product/recommendations/RecommendedProducts'
import ProductsOffers from '../../components/product/offers/ProductOffers'
import styles from './HomePage.module.scss'

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
