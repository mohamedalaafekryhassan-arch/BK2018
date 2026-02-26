import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-YLS6ymZHO5JS9QLPJ2ei04J5lw06cy0",
  authDomain: "bk-2018-44daf.firebaseapp.com",
  projectId: "bk-2018-44daf",
  storageBucket: "bk-2018-44daf.firebasestorage.app",
  messagingSenderId: "311826211658",
  appId: "1:311826211658:web:6e88035c96d6a409d917b3",
  measurementId: "G-LNMXBZE0MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
