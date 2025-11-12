import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "you-api-key",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "http://your-project-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1223456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "your-app-id"
};

const validateFirebaseConfig = (config: typeof firebaseConfig) => {
    const required = ['apiKey', 'authDomain', 'databaseURL', 'projectId'];
    const missing = required.filter(field => !config[field as keyof typeof config]);

    if (missing.length > 0) {
        console.warn('Missing Firebase configuration fields:', missing);
        return false;
    }

    return true;
};

const app = initializeApp(firebaseConfig);

if (!validateFirebaseConfig(firebaseConfig)) {
    console.error('Firebase configuration is incomplete is incomplete. Please check your environment variables.');
}



export const auth = getAuth(app);
export const database = getDatabase(app);

export {firebaseConfig};

export default app;