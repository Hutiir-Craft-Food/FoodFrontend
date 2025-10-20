import { Link } from 'react-router-dom'
import useBreadcrumbs from './useBreadcrumbs'
import styles from './Breadcrumbs.module.scss'

export default function Breadcrumbs({ categoryId, productName }) {
  const { breadcrumbs, loading, error } = useBreadcrumbs(categoryId)

  if (loading) {
    return (
      <div>
        <p>Завантаження...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <p style={{ color: 'red' }}>
          Не вдалось завантажити навігацію по каталогу - {error}
        </p>
      </div>
    )
  }

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/categories/catalog/">
        <img src="/images/catalog-icon.svg" alt="catalog icon" />
      </Link>
      <span className="m-3">{' > '}</span>
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1
        return (
          <span key={item.id}>
            <Link to={`/categories/catalog/${item.id}`}>{item.name}</Link>
            <span className="m-3">{' > '}</span>
          </span>
        )
      })}
      <span className={styles.lastBreadcrumb}> {productName} </span>
    </nav>
  )
}
