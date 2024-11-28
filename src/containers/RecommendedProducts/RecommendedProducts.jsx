import { useState, useEffect, useRef } from 'react'
import ApiClient from '../../services/apiClient'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './RecommendedProducts.module.scss'

export default function RecommendedProducts() {
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const filter = 'is_recommend'
  const limit = 4
  const productsRef = useRef(false)

  const fetchProducts = async () => {
    const params = { filter, offset, limit }
    const uri = '/v1/products'
    try {
      setLoading(true)
      const { data } = await ApiClient.get(uri, { params })
      setProducts((previousProducts) => [...previousProducts, ...data.products])
      setOffset((previousOffset) => previousOffset + limit)
    } catch (error) {
      console.error('Error: ', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading & (productsRef.current === false)) {
      fetchProducts()
      return () => {
        productsRef.current = true
      }
    }
  }, [])

  return (
    <div className="container">
      <h2>Новинки </h2>
      <div className="row">
        {products?.length > 0 &&
          products.map((recommendedProduct) => {
            return (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                key={recommendedProduct.id}
              >
                <div className="rounded flex-column h-100">
                  <ProductCard itemCard={recommendedProduct} />
                </div>
              </div>
            )
          })}
        {loading && 'Завантаження...'}
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={fetchProducts} className={styles.buttonShowMore}>
          Показати ще
        </button>
      </div>
    </div>
  )
}
