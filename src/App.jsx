import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import AuthWidget from './components/auth/AuthWidget'
import Modal from './components/modal/Modal'
import { useAuthStore } from './components/auth/store/AuthStore'
import router from './pages/Router'
import NotFoundPage from './pages/not-found/NotFoundPage'
import 'react-multi-carousel/lib/styles.css'
import styles from './App.module.scss'

export default function App() {
  const { isAuthWidgetVisible, hideAuthWidget } = useAuthStore()

  return (
    <ErrorBoundary fallback={<NotFoundPage />}>
      <div className={styles.app}>
        <RouterProvider router={router} />
        {isAuthWidgetVisible && (
          <Modal handleClose={hideAuthWidget}>
            <AuthWidget />
          </Modal>
        )}
      </div>
    </ErrorBoundary>
  )
}
