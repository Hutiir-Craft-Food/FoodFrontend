import { useState, useEffect } from 'react'
import apiClient from '~/services/apiClient'

export default function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data } = await apiClient.get(`/v1/product/${id}`)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product: ', error.message)
        setError(err.message || 'Не вдалося завантажити продукт')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}
