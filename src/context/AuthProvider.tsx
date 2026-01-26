// src/context/AuthProvider.tsx
import React, { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { auth } from '../api/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signUp as apiSignUp, login as apiLogin, logout as apiLogout } from '../api/authApi';
import { useToast } from './ToastContext';
import { AuthContext, type AuthContextType } from './AuthContext';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await apiSignUp(email, password, displayName);
      if (result.success) {
        setUser(result.user || null);
        addToast('Account created successfully!', 'success');
      } else {
        addToast(result.error || 'Failed to create account', 'error');
      }
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addToast('Unexpected error during sign up', 'error');
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await apiLogin(email, password);
      if (result.success) {
        setUser(result.user || null);
        addToast('Welcome back!', 'success');
      } else {
        addToast(result.error || 'Failed to log in', 'error');
      }
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addToast('Unexpected error during login', 'error');
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const result = await apiLogout();
      if (result.success) {
        setUser(null);
        addToast('Logged out successfully', 'info');
      } else {
        addToast(result.error || 'Failed to log out', 'error');
      }
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      addToast('Unexpected error during logout', 'error');
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
