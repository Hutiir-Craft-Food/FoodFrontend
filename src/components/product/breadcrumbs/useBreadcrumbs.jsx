import { useState, useEffect } from 'react'
import ApiClient from '~/services/apiClient'

export default function useBreadcrumbs(categoryId) {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function extractPathFromBranch(tree) {
    const path = []
    let current = tree

    while (current) {
      path.push({ id: current.id, name: current.name })
      if (current.children && current.children.length > 0) {
        current = current.children[0]
      } else {
        current = null
      }
    }

    return path
  }

  useEffect(() => {
    if (!categoryId) return

    const fetchBreadcrumbs = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data } = await ApiClient.get(`/v1/catalog/${categoryId}`)
        const path = extractPathFromBranch(data)
        setBreadcrumbs(path)
      } catch (error) {
        console.error('Error fetching path: ', error.message)
        setError(error.message || 'Не вдалося завантажити')
      } finally {
        setLoading(false)
      }
    }
    fetchBreadcrumbs()
  }, [categoryId])

  return { breadcrumbs }
}
