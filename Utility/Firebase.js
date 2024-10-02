// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Auth from Firebase
import { getFirestore } from "firebase/firestore"; // Import Firestore from Firebase

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7i0LcFWCiKVexMbKJ867Oa5DYtOeSQ_s",
  authDomain: "clone-43126.firebaseapp.com",
  projectId: "clone-43126",
  storageBucket: "clone-43126.appspot.com",
  messagingSenderId: "665286765598",
  appId: "1:665286765598:web:efb8b8b97388579dd8520f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);


/*
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app"  //this one is bettter than the top 
import { getAuth } from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7i0LcFWCiKVexMbKJ867Oa5DYtOeSQ_s",
  authDomain: "clone-43126.firebaseapp.com",
  projectId: "clone-43126",
  storageBucket: "clone-43126.appspot.com",
  messagingSenderId: "665286765598",
  appId: "1:665286765598:web:efb8b8b97388579dd8520f"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app) //register yargewin app the authority mestet 
// sign in signout maregachinin ena demo log in argual alaregem emilewin emiseraw ehe new 
export const db=app.firestore();
*/