import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthContext } from './AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-multi-carousel/lib/styles.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import HomePage from '../pages/HomePage/HomePage'
import NotFoundPage from '../components/NotFoundPage/NotFoundPage'
import styles from './App.module.scss'

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

const App = () => {
  const [token, setToken] = useState(null)

  return (
    <ErrorBoundary fallback={<NotFoundPage />}>
      <AuthContext.Provider value={{ token, setToken }}>
        <div className={styles.app}>
          <RouterProvider router={router} />
        </div>
      </AuthContext.Provider>
    </ErrorBoundary>
  )
}

export default App
