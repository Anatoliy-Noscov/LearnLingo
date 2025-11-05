import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    UserCredential
  } from 'firebase/auth';
  import { auth } from './firebase';

  export interface AuthResponse {
    success: boolean;
    user?: UserCredential['user'];
    error?: string;
  }

  export const signUp = async (email: string, password: string, displayName?: string): Promise<AuthResponse> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        if (displayName && userCredential.user) {
            await updateProfile(userCredential.user, {
                displayName: displayName
            });
        }

        return {
            success: true,
            user: userCredential.user
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
  }

  export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        return {
            success: true,
            user: userCredential.user
        };
    } catch (error: any) {
        return {
            success: false, 
            error: error.message
        };
    }
  }

  export const logout = async (): Promise<{ success: boolean; error ?: string }> => {
    try {
        await signOut(auth);
        return { success: true};

    } catch (error: any) {
        return {
            success: false,
             error: error.message
        };
    }
  }