import { useParams } from 'react-router-dom'

export default function Category() {
  const { categoryId } = useParams()
  console.log(categoryId)
  return (
    <div className="container">
      <h1>Категорія товарів з categoryId - {categoryId} </h1>
    </div>
  )
}
