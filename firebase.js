// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_uGjVXE2x7vGDm3XO54xAb_2awXIURRI",
  authDomain: "flashcardsaas-c3e6b.firebaseapp.com",
  projectId: "flashcardsaas-c3e6b",
  storageBucket: "flashcardsaas-c3e6b.appspot.com",
  messagingSenderId: "255843748971",
  appId: "1:255843748971:web:6c987fd3da9c09e049b52e",
  measurementId: "G-TWGH5HLQZV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
