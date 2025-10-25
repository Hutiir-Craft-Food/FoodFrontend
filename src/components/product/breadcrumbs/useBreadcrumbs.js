import { useState, useEffect, useCallback } from 'react'
import apiClient from '~/services/apiClient'

export default function useBreadcrumbs(categoryId) {
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const findPathById = useCallback((tree, targetId) => {
    if (!tree) return null
    if (tree.id === targetId) {
      return [{ id: tree.id, name: tree.name }]
    }
    if (Array.isArray(tree.children)) {
      for (const child of tree.children) {
        const childPath = findPathById(child, targetId)
        if (childPath) {
          return [{ id: tree.id, name: tree.name }, ...childPath]
        }
      }
    }
    return null
  }, [])

  useEffect(() => {
    if (!categoryId) return

    const fetchBreadcrumbs = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data } = await apiClient.get(
          `/v1/categories/catalog/${categoryId}`
        )
        const path = findPathById(data, categoryId)
        setBreadcrumbs(path || [])
      } catch (err) {
        console.error('Error fetching breadcrumbs:', err)
        setError(err.message || 'Не вдалося завантажити шлях категорій')
        setBreadcrumbs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBreadcrumbs()
  }, [categoryId, findPathById])

  return { breadcrumbs, loading, error }
}
