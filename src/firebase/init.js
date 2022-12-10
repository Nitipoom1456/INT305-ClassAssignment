// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore" ;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBb6JeGmzr72bYs-hXtkKqhglvP9CS8cO0",
    authDomain: "stupidproject-8a898.firebaseapp.com",
    projectId: "stupidproject-8a898",
    storageBucket: "stupidproject-8a898.appspot.com",
    messagingSenderId: "934520311698",
    appId: "1:934520311698:web:99dd7f6a0a0b7e4ecbfb4b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore()

export default db 

