import React, {createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../api/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {signUp as apiSignUp, login as apiLogin, logout as apiLogout} from '../api/authApi';


interface AuthContextType {
    user: User | null;
    signUp: (email: string, password: string, displayName?: string) => Promise<{success: boolean; error?: string}>;
    login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
    logout: () => Promise<{success: boolean; error?: string}>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const signUp = async (email: string, password: string, displayName?: string) => {
        const result = await apiSignUp(email, password, displayName);
        if (result.success) {
            setUser(result.user || null);
        };
        return result;

    };

    const login = async (email: string, password: string) => {
       const result = await apiLogin(email, password);
       if (result.success) {
        setUser(result.user || null);
       }
       return result;
    };

    const logout = async () => {
        const result = await apiLogout();
        if (result.success) {
            setUser(null);
        }
        return result;
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        user, signUp, login, logout, loading
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