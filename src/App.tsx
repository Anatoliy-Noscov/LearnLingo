import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { Header } from './components/Header/Header';
import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <div className="app">
        <Header />
        <main className='main-content'>
          <AppRoutes />
        </main>
        </div>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
