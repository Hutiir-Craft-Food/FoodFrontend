import { useState, useEffect } from 'react'
import ApiClient from '../../services/apiClient'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './RecommendedProducts.module.scss'

export default function RecommendedProducts() {
  const [recommendProducts, setRecommendProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const filter = 'is_recommend'
  const limit = 4

  const showMoreProducts = async () => {
    const params = { filter, offset, limit }
    const uri = '/v1/products'
    try {
      const { data } = await ApiClient.get(uri, { params })
      setRecommendProducts((previousProducts) => [
        ...previousProducts,
        ...data.products,
      ])
      setOffset(offset + 4)
    } catch (error) {
      console.error('Error: ', error.message)
    }
  }

  useEffect(() => {
    showMoreProducts()
  }, [])

  // const showMoreProducts = () => {
  // 	fetchProducts(offset, setOffset, recommendProducts, setRecommendProducts, filterString);
  // };

  // useEffect(() => {
  // 	fetchProducts(offset, setOffset, recommendProducts, setRecommendProducts, filterString);
  // }, []);

  return (
    <div className="container">
      <h2>Рекомендуємо спробувати </h2>
      <div className="row">
        {recommendProducts && recommendProducts.length > 0
          ? recommendProducts.map(function (recommendProduct) {
              return (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                  key={recommendProduct.id}
                >
                  <div className="rounded flex-column h-100">
                    <ProductCard itemCard={recommendProduct} />
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
