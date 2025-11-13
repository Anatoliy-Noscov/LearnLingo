import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/ToastContainer/ToastContainer';
import { AppRoutes } from './routes/AppRoutes';
import { Header } from './components/Header/Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* ToastProvider должен быть ВЫШЕ AuthProvider */}
      <ToastProvider>
        <AuthProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <AppRoutes />
            </main>
            <ToastContainer />
          </div>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;