import { useState, useEffect } from 'react'
import ApiClient from '../../services/apiClient'
import ProductCard from '../../components/ProductCard/ProductCard'
import styles from './ProductOffers.module.scss'

export default function ProductsOffers() {
  const [offers, setOffers] = useState([])
  const [offset, setOffset] = useState(0)
  const filter = 'is_offer'
  const limit = 4

  const showMoreProducts = async () => {
    const params = { filter, offset, limit }
    const uri = '/v1/products'
    try {
      const { data } = await ApiClient.get(uri, { params })
      setOffers((previousOffersProducts) => [
        ...previousOffersProducts,
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
      <h2>Сезонні пропозиції </h2>
      <div className="row">
        {offers && offers.length > 0
          ? offers.map(function (offer) {
              return (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                  key={offer.id}
                >
                  <div className="rounded flex-column h-100">
                    <ProductCard itemCard={offer} />
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
