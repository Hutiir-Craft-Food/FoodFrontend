import { Link } from 'react-router-dom'
import useBreadcrumbs from './useBreadcrumbs'
import styles from './Breadcrumbs.module.scss'
import CatalogIcon from '~/icons/Catalog'

export default function Breadcrumbs({ categoryId, productName }) {
  const { data, loading, error } = useBreadcrumbs(categoryId)

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

  const renderBreadcrumbs = (node) => {
    if (!node) return null

    const child = node.children.length > 0 ? node.children[0] : null

    return (
      <>
        <Link to={`/catalog/category/${node.id}`}>{node.name}</Link>
        {child && (
          <>
            <span className="m-3"> &gt; </span>
            {renderBreadcrumbs(child)}
          </>
        )}
      </>
    )
  }

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/catalog">
        <CatalogIcon />
      </Link>
      <span className="m-3">{' > '}</span>
      {renderBreadcrumbs(data)}
      <span className="m-3">{' > '}</span>
      <span className={styles.lastBreadcrumb}> {productName} </span>
    </nav>
  )
}
