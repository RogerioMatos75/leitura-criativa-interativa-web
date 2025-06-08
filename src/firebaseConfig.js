// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // analytics é opcional para o funcionamento básico
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq7u3rTG_783L_6LcVadqcqoy9HCSLQO8",
  authDomain: "leitura-criativa-interativa.firebaseapp.com",
  projectId: "leitura-criativa-interativa",
  storageBucket: "leitura-criativa-interativa.firebasestorage.app",
  messagingSenderId: "924872658228",
  appId: "1:924872658228:web:c3bbcfa298fc8958c1e961",
  measurementId: "G-HBKTVDQ3WZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicialize e exporte os serviços que você vai usar
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
