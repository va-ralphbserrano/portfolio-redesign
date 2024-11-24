import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../features/theme/context/ThemeContext';
import { ErrorBoundary } from '../shared/components';
import App from './App';

// Import styles
import '../shared/styles/index.css';

// Get base URL from Vite
const base = import.meta.env.BASE_URL;

// React Router future flags
const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={routerFutureConfig} basename={base}>
      <ThemeProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
