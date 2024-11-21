import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import App from './App';
import { PDFProvider } from './context/PDFContext';

// Import styles
import './styles/index.css';

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
          <PDFProvider>
            <App />
          </PDFProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
