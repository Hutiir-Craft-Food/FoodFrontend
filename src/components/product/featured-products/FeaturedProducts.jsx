import { Link } from 'react-router-dom'
import ArrowIcon from '~/icons/ArrowRight12x10'
import useFeaturedProducts from './useFeaturedProducts'
import ProductCard from '../product-card/ProductCard'
import styles from './FeaturedProducts.module.scss'

export default function FeaturedProducts() {
  const { products, loading, loadMore, hasMore } = useFeaturedProducts({limit: 4})

  return (
    <div className="container">
      <h2>Новинки</h2>
      <div className="row">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                key={product.id}
              >
                <div className="rounded flex-column h-100">
                  <ProductCard product={product} />
                </div>
              </div>
            )
          })}
        {loading && 'Завантаження...'}
      </div>
      <div className="d-flex justify-content-center">
        {hasMore ? (
          <button
            onClick={() => loadMore()}
            className={styles.button}
          >
            Показати ще
            <ArrowIcon className={styles.arrow} />
          </button>
          ) : (
          <Link to="/catalog">
            <button className={styles.button}>
              Показати всі смаколики
              <ArrowIcon className={styles.arrow} />
            </button>
          </Link>
        )}
      </div>
    </div>
  )
}
