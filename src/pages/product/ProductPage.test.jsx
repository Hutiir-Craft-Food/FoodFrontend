import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './ProductPage'
import useProduct from '~/components/product/useProduct'

// Mock the useProduct hook
jest.mock('~/components/product/useProduct')

// Mock the child components
jest.mock('~/components/product/ProductGallery/ProductGallery', () => () => (
  <div data-testid="product-gallery">Product Gallery</div>
))

jest.mock(
  '~/components/product/productInfo/ProductInfo',
  () =>
    ({ product }) =>
      <div data-testid="product-info">Product Info: {product.name}</div>
)

jest.mock(
  '~/components/product/productDescriptionTabs/ProductDescriptionTabs',
  () =>
    ({ product }) =>
      (
        <div data-testid="product-description-tabs">
          Product Tabs: {product.name}
        </div>
      )
)

describe('ProductPage', () => {
  const renderProductPage = (id = '1') => {
    render(
      <MemoryRouter initialEntries={[`/product/${id}`]}>
        <Routes>
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    )
  }

  test('displays loading state', () => {
    useProduct.mockReturnValue({ loading: true, error: null, product: null })
    renderProductPage()
    expect(screen.getByText('Завантаження продукту...')).toBeInTheDocument()
  })

  test('displays error state', () => {
    const errorMessage = 'Failed to fetch product'
    useProduct.mockReturnValue({
      loading: false,
      error: errorMessage,
      product: null,
    })
    renderProductPage()
    expect(screen.getByText('Помилка')).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  test('displays product not found state', () => {
    useProduct.mockReturnValue({ loading: false, error: null, product: null })
    renderProductPage()
    expect(screen.getByText('Продукт не знайдено')).toBeInTheDocument()
  })

  test('displays product details when product is loaded successfully', () => {
    const productId = 100
    const productName = 'Test Product'

    const mockProduct = {
      id: '1',
      name: productName,
    }

    useProduct.mockReturnValue({
      loading: false,
      error: null,
      product: mockProduct,
    })

    renderProductPage(productId)

    // Check if main components are rendered
    expect(screen.getByText('Сторінка продукту')).toBeInTheDocument()
    expect(screen.getByText(`Product ID: ${productId}`)).toBeInTheDocument()
    expect(
      screen.getByText(`каталог - молочні продукти - сири - ${productName}`)
    ).toBeInTheDocument()

    // Check if child components are rendered
    expect(screen.getByTestId('product-gallery')).toBeInTheDocument()
    expect(screen.getByTestId('product-info')).toBeInTheDocument()
    expect(screen.getByTestId('product-description-tabs')).toBeInTheDocument()
  })
})
