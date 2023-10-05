// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxnj-nELG70Qy_08hrBrJBIMyXhk6daBc",
  authDomain: "trackify-7df8c.firebaseapp.com",
  projectId: "trackify-7df8c",
  storageBucket: "trackify-7df8c.appspot.com",
  messagingSenderId: "1065354877250",
  appId: "1:1065354877250:web:3bdd69791bb3d98c41d0db"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
//export default app;