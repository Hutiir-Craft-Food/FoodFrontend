import { Link } from 'react-router-dom'
import useBreadcrumbs from './useBreadcrumbs'
import styles from './Breadcrumbs.module.scss'

export default function Breadcrumbs({ categoryId }) {
  const { breadcrumbs } = useBreadcrumbs(categoryId)

  return (
    <nav className={styles.breadcrumbs}>
      {breadcrumbs.map((item, index) => (
        <Link to={`/catalog/${item.id}`} key={item.id}>
          {item.name.toLowerCase() == 'каталог' ? (
            <img src="/images/catalog-icon.svg" alt="catalog icon" />
          ) : (
            item.name
          )}
          {index < breadcrumbs.length - 1 && (
            <span className="m-3">{' > '}</span>
          )}
        </Link>
      ))}
    </nav>
  )
}
