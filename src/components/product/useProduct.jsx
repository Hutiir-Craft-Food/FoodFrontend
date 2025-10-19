import { useState, useEffect } from 'react'
import ApiClient from '../../services/apiClient'

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
        const { data } = await ApiClient.get(`/v1/products/${id}`)

        setProduct(data)
      } catch (e) {
        const errorMessage = e.message || 'Не вдалося завантажити продукт'
        console.error('Error fetching product: ', errorMessage)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}
