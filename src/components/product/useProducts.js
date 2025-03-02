import { useState, useEffect } from 'react'
import ApiClient from '../../services/apiClient'

export default function useProducts({ filter, limit }) {
  const [products, setProducts] = useState({})
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    if (loading) {
      return
    }

    const params = { filter, offset, limit }
    const uri = '/v1/products'

    try {
      setLoading(true)
      const { data } = await ApiClient.get(uri, { params })
      setProducts((prevProducts) => ({
        ...prevProducts,
        [offset]: data.products,
      }))
    } catch (error) {
      console.error('Error: ', error.message)
    } finally {
      setLoading(false)
    }
  }

  const loadMoreProducts = () => {
    setOffset((prevOffset) => prevOffset + limit)
  }

  useEffect(() => {
    fetchProducts(offset)
  }, [offset])

  const allProducts = Object.values(products).flat()

  return { allProducts, loadMoreProducts, loading }
}
