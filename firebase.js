// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFireBase, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-8Mwk7O9qvR3POPiHF8mHkYcu_Wn2Usg",
  authDomain: "ai-flashcards-sa.firebaseapp.com",
  projectId: "ai-flashcards-sa",
  storageBucket: "ai-flashcards-sa.appspot.com",
  messagingSenderId: "304702083095",
  appId: "1:304702083095:web:2c45bfec0298c6c2f44c52",
  //measurementId: "G-R7N8436743"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
