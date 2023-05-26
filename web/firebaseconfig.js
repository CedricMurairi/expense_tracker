// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_7pxsxqk-JQ-UCylG1wcjXB61gnGJDtw",
  authDomain: "extracker-167f5.firebaseapp.com",
  projectId: "extracker-167f5",
  storageBucket: "extracker-167f5.appspot.com",
  messagingSenderId: "161643859326",
  appId: "1:161643859326:web:714c14f2dbaf90904a772f",
  measurementId: "G-FWFWY053DH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);