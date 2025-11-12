import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../api/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signUp as apiSignUp, login as apiLogin, logout as apiLogout } from '../api/authApi';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, displayName?: string) => Promise<{success: boolean; error?: string}>;
  login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  logout: () => Promise<{success: boolean; error?: string}>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    } catch (error: any) {
      addToast('An unexpected error occurred during sign up', 'error');
      return { success: false, error: error.message };
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
    } catch (error: any) {
      addToast('An unexpected error occurred during login', 'error');
      return { success: false, error: error.message };
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
    } catch (error: any) {
      addToast('An unexpected error occurred during logout', 'error');
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    signUp,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};