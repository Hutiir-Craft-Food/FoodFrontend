import { useState, useEffect } from 'react'
import ApiClient from '/src/services/apiClient'

export default function useProducts({ filter, limit }) {
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    if (loading) return

    try {
      setLoading(true)

      const { data } = await ApiClient.get('/v1/products', {
        params: { filter, offset, limit }
      })

      setProducts(prev => [...prev, ...data.products])
    } catch (error) {
      console.error('Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [offset])

  useEffect(() => {
    setProducts([])
    setOffset(0)
  }, [filter])

  const loadMoreProducts = () => {
    setOffset(prev => prev + limit)
  }

  return { products, loadMoreProducts, loading }
}