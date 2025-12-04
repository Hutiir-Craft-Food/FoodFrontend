import { useState, useEffect } from 'react'
import ApiClient from '/src/services/apiClient'

export default function useProducts({ api }) {
  const [products, setProducts] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    if (loading) {
      return
    }

    try {
      setLoading(true)
      const { data } = await ApiClient.get(api)
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

  const allProducts = Object.values(products).flat()

  return { allProducts, loading }
}
