import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'
import useProducts from './components/product/useProducts'

jest.mock('./components/product/useProducts')

describe('App tests...', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Verify that App is rendering', () => {
    // Mock the useProducts hook, as we don't need to do real call here
    // and test what App is rendering out of it.
    useProducts.mockReturnValue({
      allProducts: [],
      loadMoreProducts: () => {},
      loading: false,
    })

    // TODO: if app variable isn't used for anything specific,
    //  keep only `render(<App />)` here:
    const app = render(<App />)

    // TODO: this is temporary debugging line here.
    //  remove line below, when this test is complete
    screen.debug()
  })
})
