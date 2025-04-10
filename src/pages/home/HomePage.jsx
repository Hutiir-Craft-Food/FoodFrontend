import HeroCarousel from '/src/components/hero/HeroCarousel'
import NewProducts from '/src/components/product/new-products/NewProducts'
import Sellers from '/src/components/seller/sellers-container/SellersContainer'
import RecommendedProducts from '/src/components/product/recommendations/RecommendedProducts'
import ProductsOffers from '/src/components/product/offers/ProductOffers'
import styles from './HomePage.module.scss'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export default function HomePage() {
  return (
    <div className='container'>
      <h1></h1>
      <HeroCarousel />
      <NewProducts />
      <ProductsOffers />
      <RecommendedProducts />

      <section>
        <h2>Чомy ми?</h2>
        <div className={styles.plus}>
          <div className='text-center'>
            <i className='fa-solid fa-leaf'></i>
            <p>Безкоштовна доставка від 1500 грн.</p>
          </div>
          <div className='text-center'>
            <i className='fa-solid fa-leaf'></i>
            <p>Доставка додому</p>
          </div>
          <div className='text-center'>
            <i className='fa-solid fa-leaf'></i>
            <p>Гарантія свіжості</p>
          </div>
        </div>
      </section>
    </div>
  )
}
