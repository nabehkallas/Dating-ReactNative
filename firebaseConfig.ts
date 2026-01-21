
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';



const firebaseConfig = {
 apiKey: "AIzaSyBko5STROB2OOn2ULiYa8xkK5Dx6khvkno",
  authDomain: "dating-2a0c5.firebaseapp.com",
  projectId: "dating-2a0c5",
  storageBucket: "dating-2a0c5.firebasestorage.app",
  messagingSenderId: "299238946499",
  appId: "1:299238946499:web:273fca25d8631574879476",
  measurementId: "G-WHCTKP02TF"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();


let auth;
try {
  
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (e) {
  
  auth = getAuth(app);
}


const db = getFirestore(app);

export { app, auth, db };
