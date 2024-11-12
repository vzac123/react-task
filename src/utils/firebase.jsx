import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAubcxIeT31JT-7lScdDC_SygDJw_W8SGE',
  authDomain: 'chat-ee90e.firebaseapp.com',
  projectId: 'chat-ee90e',
  storageBucket: 'chat-ee90e.appspot.com',
  messagingSenderId: '21168364078',
  appId: '1:21168364078:web:1ac9c9c7c2be189d089dbf',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return;

  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};
