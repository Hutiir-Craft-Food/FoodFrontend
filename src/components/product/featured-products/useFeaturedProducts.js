import { useState, useEffect, useMemo } from 'react'
import ApiClient from '/src/services/apiClient'

export default function useFeaturedProducts({limit = 4} = {}) {
  const [products, setProducts] = useState([])
  const [visibleCount, setVisibleCount] = useState(limit)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    if (loading) {
      return
    }
    try {
      setLoading(true)
      const { data } = await ApiClient.get(`/v1/products/featured`)
      setProducts(data)
    } catch (error) {
      console.error('Error: ', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

   const loadMore = () => {
    setVisibleCount((prev) => prev + limit)
  }

  const productsForRender = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount]
  )

  const hasMore = visibleCount < products.length

  return {
    products: productsForRender,
    loading,
    loadMore,
    hasMore
  }
}
