import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBko5STROB2OOn2ULiYa8xkK5Dx6khvkno",
  authDomain: "dating-2a0c5.firebaseapp.com",
  projectId: "dating-2a0c5",
  storageBucket: "dating-2a0c5.firebasestorage.app",
  messagingSenderId: "299238946499",
  appId: "1:299238946499:web:273fca25d8631574879476",
  measurementId: "G-WHCTKP02TF"
};

let app: FirebaseApp;
let auth: Auth;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {

  app = getApp();
  auth = getAuth(app);
}

const db: Firestore = getFirestore(app);

export { app, auth, db };

