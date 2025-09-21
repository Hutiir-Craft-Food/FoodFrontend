import { useState, useEffect } from 'react'
import ApiClient from '../../services/apiClient'

export default function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      setLoading(true)
      try {
        const { data } = await ApiClient.get(`/v1/product/${id}`)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product: ', error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product }
}
