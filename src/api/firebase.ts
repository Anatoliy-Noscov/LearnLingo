import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
    apiKey: "you-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "http://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "1223456789",
    appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);

export default app;