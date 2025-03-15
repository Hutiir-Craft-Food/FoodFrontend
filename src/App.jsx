import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import AuthWidget from './components/auth/AuthWidget'
import ModalWindow from './components/modal-window/ModalWindow'
import { useAuthStore } from './components/auth/store/AuthStore'
import router from './pages/Router'
import NotFoundPage from './pages/not-found/NotFoundPage'
import 'react-multi-carousel/lib/styles.css'
import styles from './App.module.scss'

export default function App() {
  const showAuthWidget = useAuthStore(state => state.showAuthWidget)
  const setShowAuthWidget = useAuthStore(state => state.setShowAuthWidget)
  const handleClose = () => {
    setShowAuthWidget(false)
  }

  return (
    <ErrorBoundary fallback={<NotFoundPage />}>
      <div className={styles.app}>
        <RouterProvider router={router} />
        {showAuthWidget && <ModalWindow handleClose={handleClose} form={<AuthWidget />} />}
      </div>
    </ErrorBoundary>
  )
}
