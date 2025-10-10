import { Link } from 'react-router-dom'
import useBreadcrumbs from './useBreadcrumbs'
import styles from './Breadcrumbs.module.scss'

export default function Breadcrumbs({ categoryId }) {
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
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1
        return (
          <span key={item.id}>
            {!isLast ? (
              <Link to={`/catalog/${item.id}`}>
                {item.name.toLowerCase() == 'каталог' ? (
                  <img src="/images/catalog-icon.svg" alt="catalog icon" />
                ) : (
                  item.name
                )}
              </Link>
            ) : (
              <span className={styles.lastBreadcrumb}>{item.name}</span>
            )}
            {!isLast && <span className="m-3">{' > '}</span>}
          </span>
        )
      })}
    </nav>
  )
}
