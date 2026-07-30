import ProductCard from './ProductCard'

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
}

const mockProduct = {
  id: 1,
  name: 'Молоко Яготинське 2.5%',
  available: true,
  images: [
    {
      links: {
        medium: 'https://picsum.photos/300/300',
      },
    },
  ],
  seller: {
    sellerName: 'Яготинське',
  },
  prices: [
    {
      price: 89,
    },
  ],
}

const unavailableProduct = {
  ...mockProduct,
  available: false,
}

const noImageProduct = {
  ...mockProduct,
  images: [
    {
      links: {
        medium: '',
      },
    },
  ],
}

export const Default = {
  args: {
    product: mockProduct,
  },
}

export const Unavailable = {
  args: {
    product: unavailableProduct,
  },
}

export const NoImage = {
  args: {
    product: noImageProduct,
  },
}
