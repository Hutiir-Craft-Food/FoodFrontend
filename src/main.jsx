import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-multi-carousel/lib/styles.css';
import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
