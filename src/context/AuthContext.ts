import { createContext } from 'react';
import type { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, displayName?: string) => Promise<{success: boolean; error?: string}>;
  login: (email: string, password: string) => Promise<{success: boolean; error?: string}>;
  logout: () => Promise<{success: boolean; error?: string}>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);