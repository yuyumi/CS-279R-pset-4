import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configurations
var firebaseConfig = {
    apiKey: "AIzaSyCD5CSGBB4S6kDoS1uC9G7arIvvGaE31Ro",
  authDomain: "cs-279r-pset-4.firebaseapp.com",
  projectId: "cs-279r-pset-4",
  storageBucket: "cs-279r-pset-4.appspot.com",
  messagingSenderId: "62856794233",
  appId: "1:62856794233:web:8cef0d9bf989c4aee784a8",
  measurementId: "G-S9D5HW9176"
};

// Initialize app
firebase.initializeApp(firebaseConfig);

// Authentication with Google Accounts
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// Initialize firestore database for storing account info and todos
export const db = firebase.firestore();