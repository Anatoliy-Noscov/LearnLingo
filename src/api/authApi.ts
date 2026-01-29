import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from 'firebase/auth';
  
  import type { User } from 'firebase/auth';
  import { auth } from './firebase';
  
  export interface AuthResponse {
    success: boolean;
    user?: User;
    error?: string;
  }
  
  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    return 'Unknown error';
  };
  
  export const signUp = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<AuthResponse> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
  
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  };
  
  export const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  };
  
  export const logout = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: unknown) {
      return {
        success: false,
        error: getErrorMessage(error),
      };
    }
  };
  