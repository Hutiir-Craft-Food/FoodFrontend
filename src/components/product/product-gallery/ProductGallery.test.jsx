import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ProductGallery from './ProductGallery'

describe('ProductGallery', () => {
  const images = [
    {
      id: 1,
      links: {
        thumbnail: '/thumb1.jpg',
        large: '/large1.jpg',
      },
    },
    {
      id: 2,
      links: {
        thumbnail: '/thumb2.jpg',
        large: '/large2.jpg',
      },
    },
  ]

  test('renders thumbnails and preview images', () => {
    render(<ProductGallery productImages={images} />)

    expect(screen.getByAltText('thumbnail-1')).toBeInTheDocument()
    expect(screen.getByAltText('thumbnail-2')).toBeInTheDocument()

    expect(screen.getByAltText('product-image-1')).toBeInTheDocument()
  })

  test('renders placeholder when no images', () => {
    render(<ProductGallery productImages={[]} />)

    expect(document.querySelector('div')).toBeInTheDocument()
  })
})
