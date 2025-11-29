import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { ToastProvider } from './context/ToastContext';

import { AppRoutes } from './routes/AppRoutes';
import { Header } from './components/Header/Header';
import { ToastContainer } from './components/ToastContainer/ToastContainer';
import { AuthModal } from './components/AuthModal/AuthModal';

import './App.css';

function App() {
  const [authMode, setAuthMode] = useState<"login" | "register" | null>(null);

  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <div className="app">

            <Header
              onLoginClick={() => setAuthMode("login")}
              onRegisterClick={() => setAuthMode("register")}
            />

            <main className="main-content">
              <AppRoutes />
            </main>

            <ToastContainer />

            <AuthModal
              isOpen={authMode !== null}
              defaultMode={authMode || "login"}
              onClose={() => setAuthMode(null)}
            />
          </div>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
