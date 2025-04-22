import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { AuthContext } from '/src/context/AuthContext'
import router from './pages/Router'
import NotFoundPage from './pages/not-found/NotFoundPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.scss'

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
