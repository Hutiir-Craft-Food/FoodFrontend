import { ErrorBoundary } from 'react-error-boundary';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
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
            <Home/>
            <Footer />
        </div>
    </ErrorBoundary>
  );
}

export default App;
