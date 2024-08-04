import { ErrorBoundary } from 'react-error-boundary';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import HomePage from '../pages/HomePge/HomePage';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import styles from './App.module.scss';


function App() {

  return (
    <ErrorBoundary
      fallback={
        <NotFoundPage />
      }
    >
      <div className={styles.app}>
            <Header />
            <HomePage/>
            <Footer />
        </div>
    </ErrorBoundary>
  );
}

export default App;
