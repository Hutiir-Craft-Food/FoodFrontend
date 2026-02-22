import HeroCarousel from '~/components/hero/HeroCarousel'
import FeaturedProducts from '~/components/product/featured-products/FeaturedProducts'
import Sellers from '~/components/seller/sellers-container/SellersContainer'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <div className='container'>
      <HeroCarousel />
      <FeaturedProducts />

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
      <Sellers />
    </div>
  )
}
