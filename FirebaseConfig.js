// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtcZ-A4wiVGcXzinte48GNQek9qLyXC3g",
  authDomain: "supermercado-31a35.firebaseapp.com",
  projectId: "supermercado-31a35",
  storageBucket: "supermercado-31a35.firebasestorage.app",
  messagingSenderId: "1094541207019",
  appId: "1:1094541207019:web:0f65a72dd87d015b0d65ae",
  measurementId: "G-8JT0495TMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
//export const auth = initializeAuth(app,
   //persistence: getReactNativePersistence
//){

//}