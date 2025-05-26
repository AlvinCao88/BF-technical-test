import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Router from './router/Router'; 
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from '../theme/theme-provider';
import './index.css'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </App>
    </AuthProvider>
  </React.StrictMode>
);
