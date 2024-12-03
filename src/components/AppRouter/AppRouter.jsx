import { createBrowserRouter, Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import HomePage from '../../pages/HomePage/HomePage'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

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
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
