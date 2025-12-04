import { useState } from 'react'
import { Link } from 'react-router-dom'
import arrowIcon from '~/icons/arrowIcon.svg'
import useProducts from '../useProducts'
import ProductCard from '../product-card/ProductCard'
import styles from './FeaturedProducts.module.scss'


export default function FeaturedProducts() {
  const api = '/v1/products/featured' 
  const limit = 4
  const { allProducts, loading } = useProducts({ api })
  const [visibleCount, setVisibleCount] = useState(limit)
  const productsForRender = allProducts.slice(0, visibleCount)

  const loadMoreProducts = () => {
    setVisibleCount((prev) => prev + limit)
  }

  return (
    <div className="container">
      <h2>Акції місяця </h2>
      <div className="row">
        {productsForRender.length > 0 &&
          productsForRender.map((product) => {
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
        {visibleCount < allProducts.length ?
          <button
            onClick={() => loadMoreProducts()}
            className={styles.button}
          >
            Показати ще
             <img className={styles.arrow} src={arrowIcon} alt="arrow icon"/>
          </button>
          :
          <Link to="/catalog">
            <button className={styles.button}>
              Показати всі смаколики
              <img className={styles.arrow} src={arrowIcon} alt="arrow icon"/>
            </button>
          </Link>
        }
      </div>
    </div>
  )
}
