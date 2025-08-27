# q:

how do i change src\pages\Router.jsx in order to add a router with path variable in it for displaying a product with variable id, like /product/:productId ?

# a:

To add a route with a path variable for displaying a product by its ID
(e.g., `/product/:productId)`,
you need to:

Add a new route object with the path `/product/:productId`.
Point its element to a component that will display the product details (e.g., ProductPage).

Create the ProductPage component if it doesn't exist.
Example change for Router.jsx:

```js
// ...existing code...
import ProductPage from './product/ProductPage' // <-- Add this import

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      // ...existing routes...
      {
        path: '/product/:productId', // <-- Add this route
        element: <ProductPage />,
      },
      // ...existing routes...
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
// ...existing code...
```

You also need to create src/pages/product/ProductPage.jsx
Here’s a simple example:

```js
import { useParams } from 'react-router-dom'

export default function ProductPage() {
  const { productId } = useParams()
  return <h1>Product ID: {productId}</h1>
}
```

Now, navigating to /product/123 will render ProductPage and display Product ID: 123.
