import ProductCard from '../ProductCard/ProductCard'
import useProducts from '../../../hooks/useProducts'
import styles from './NewProducts.module.scss'

const filter = 'is_new'
const limit = 4

export default function NewProducts() {
  const { allProducts, loadMoreProducts, loading } = useProducts({
    filter,
    limit,
  })

  return (
    <div className="container">
      <h2>Новинки </h2>
      <div className="row">
        {allProducts.length > 0 &&
          allProducts.map((newProduct) => {
            return (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                key={newProduct.id}
              >
                <div className="rounded flex-column h-100">
                  <ProductCard product={newProduct} />
                </div>
              </div>
            )
          })}
        {loading && 'Завантаження...'}
      </div>
      <div className="d-flex justify-content-end">
        <button
          onClick={() => loadMoreProducts()}
          className={styles.buttonShowMore}
        >
          Показати ще
        </button>
      </div>
    </div>
  )
}
