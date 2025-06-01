// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import {getReactNativePersistence} from '@firebase/auth/dist/rn/index.js'
import { getFirestore } from "firebase/firestore";
import  ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);


//import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);