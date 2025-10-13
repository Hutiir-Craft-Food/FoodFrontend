import { Link } from 'react-router-dom'

export default function Breadcrumbs({ categoryTree, productName }) {
  // in real app, categoryTree should come from backend
  //  GET /v1/categories/catalog/:categoryId
  // respnse from that api should be passed as prop to this component
  categoryTree = {
    id: 1,
    name: 'Молочні продукти',
    children: [
      {
        id: 2,
        name: 'Сири',
        children: [],
      },
    ],
  }

  const renderBreadcrumbs = (node) => {
    if (!node) return null

    const child = node.children.length > 0 ? node.children[0] : null

    return (
      <>
        <Link to={`/catalog?categoryId=${node.id}`}>{node.name}</Link>
        {child && (
          <>
            <span> &gt; </span>
            {renderBreadcrumbs(child)}
          </>
        )}
      </>
    )
  }

  return (
    <nav id="breadcrumbs" data-testid="breadcrumbs">
      <Link to="/catalog">Каталог</Link>
      <span> &gt; </span>
      {renderBreadcrumbs(categoryTree)}
      <span> &gt; </span>
      <span>{productName}</span>
    </nav>
  )
}
