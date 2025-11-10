import { useState, useEffect } from 'react'
import apiClient from '~/services/apiClient'

export default function useBreadcrumbs(categoryId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!categoryId) return

    const fetchBreadcrumbs = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data } = await apiClient.get(
          `/v1/categories/catalog/${categoryId}`
        )
        setData(data)
      } catch (error) {
        console.error('Error fetching breadcrumbs:', error)
        setError(error.message || 'Не вдалося завантажити шлях категорій')
      } finally {
        setLoading(false)
      }
    }

    fetchBreadcrumbs()
  }, [])

  return { data, loading, error }
}
