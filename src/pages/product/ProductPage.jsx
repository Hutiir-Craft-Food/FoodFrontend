import { useParams } from 'react-router-dom'

export default function ProductPage() {
  const { productId } = useParams()
  return <h1>Product ID: {productId}</h1>
}
