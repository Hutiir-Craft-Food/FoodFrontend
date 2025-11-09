import { createBrowserRouter, Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import HomePage from './home/HomePage'
import NotFoundPage from './not-found/NotFoundPage'
import UserProfile from './userProfile/userProfile'
import ProductPage from './product/ProductPage'

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
      {
        path: '/delivery-and-payment',
        element: <h1>Доставка і оплата</h1>,
      },
      {
        path: '/manufacturers',
        element: <h1>Виробники</h1>,
      },
      {
        path: '/cooperation',
        element: <h1>Співпраця</h1>,
      },
      {
        path: '/blog',
        element: <h1>Блог</h1>,
      },
      {
        path: '/about',
        element: <h1>Про нас</h1>,
      },
      {
        path: '/userProfile',
        element: <UserProfile />,
      },
      {
        path: '/product/:id',
        element: <ProductPage />,
      },
      {
        path: '/catalog',
        element: <h1>Каталог товарів</h1>,
      },
      {
        path: '/catalog/category/:categoryId',
        element: <h1>Категорія товарів</h1>,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
