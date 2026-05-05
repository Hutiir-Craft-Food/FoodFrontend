import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProductPage from './ProductPage'
import useProduct from '~/components/product/useProduct'

jest.mock('~/components/product/useProduct')

jest.mock('~/components/product/breadcrumbs/Breadcrumbs', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-breadcrumbs">Breadcrumbs</div>,
}))

jest.mock('~/components/product/productGallery/ProductGallery', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-gallery">ProductGallery</div>,
}))

jest.mock('~/components/product/product-info/ProductInfo', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-info">ProductInfo</div>,
}))

jest.mock(
  '~/components/product/product-description/ProductDescriptionTabs',
  () => ({
    __esModule: true,
    default: () => <div data-testid="mock-tabs">ProductDescriptionTabs</div>,
  })
)

jest.mock(
  '~/components/product/shipping-and-payment/ShippingAndPayment',
  () => ({
    __esModule: true,
    default: () => <div data-testid="mock-shipping">ShippingAndPayment</div>,
  })
)

jest.mock('~/components/product/product-price/ProductPrice', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-price">ProductPrice</div>,
}))

describe('ProductPage', () => {
  const mockId = '123'
  const mockProductData = {
    id: mockId,
    name: 'Test Product',
    category: { id: 'cat-1' },
  }

  const renderProductPage = () =>
    render(
      <MemoryRouter initialEntries={[`/products/${mockId}`]}>
        <Routes>
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    )

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('successful render', () => {
    test('should resolve product id correctly and render top-level container', () => {
      useProduct.mockReturnValue({
        product: mockProductData,
        loading: false,
        error: null,
      })

      const { container: productPage } = renderProductPage()

      expect(useProduct).toHaveBeenCalledWith(mockId)
      expect(screen.getByText(`Product ID: ${mockId}`)).toBeInTheDocument()

      const container = productPage.firstChild
      expect(container).toHaveClass('container')
    })
  })

  describe('fallback states', () => {
    test('should render loading state correctly', () => {
      useProduct.mockReturnValue({
        product: null,
        loading: true,
        error: null,
      })

      renderProductPage()

      expect(screen.getByText('Завантаження продукту...')).toBeInTheDocument()
    })

    test('should render error state correctly', () => {
      useProduct.mockReturnValue({
        product: null,
        loading: false,
        error: 'API Error',
      })

      renderProductPage()

      expect(screen.getByText('Помилка')).toBeInTheDocument()
      expect(screen.getByText('API Error')).toBeInTheDocument()
    })

    test('should render not found state when product does not exist', () => {
      useProduct.mockReturnValue({
        product: null,
        loading: false,
        error: null,
      })

      renderProductPage()

      expect(screen.getByText('Продукт не знайдено')).toBeInTheDocument()
    })
  })
})
