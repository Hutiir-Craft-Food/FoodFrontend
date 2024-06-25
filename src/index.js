import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode >
);
