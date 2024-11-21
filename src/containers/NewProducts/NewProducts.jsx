import { useState, useEffect } from 'react'
import ApiClient from '../../services/apiClient'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './NewProducts.module.scss'

export default function NewProducts() {
  const [newProducts, setNewProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const filter = 'is_new'
  const limit = 4

  const showMoreProducts = async () => {
    const params = { filter, offset, limit }
    const uri = '/v1/products'
    try {
      const { data } = await ApiClient.get(uri, { params })
      setNewProducts((previousProducts) => [
        ...previousProducts,
        ...data.products,
      ])
      setOffset((previousOffset) => previousOffset + 4)
    } catch (error) {
      console.error('Error: ', error.message)
    }
  }

  useEffect(() => {
    showMoreProducts()
  }, [])

  return (
    <div className="container">
      <h2>Новинки </h2>
      <div className="row">
        {newProducts && newProducts.length > 0
          ? newProducts.map(function (newProduct) {
              return (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                  key={newProduct.id}
                >
                  <div className="rounded flex-column h-100">
                    <ProductCard itemCard={newProduct} />
                  </div>
                </div>
              )
            })
          : 'Завантаження...'}
      </div>
      <div className="d-flex justify-content-end">
        <button onClick={showMoreProducts} className={styles.buttonShowMore}>
          Показати ще
        </button>
      </div>
    </div>
  )
}
