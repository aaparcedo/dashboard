// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCa1yaXqX3juDdinSR5IY1KVsMct2cXZYU",
  authDomain: "admin-dashboard-d8c28.firebaseapp.com",
  projectId: "admin-dashboard-d8c28",
  storageBucket: "admin-dashboard-d8c28.appspot.com",
  messagingSenderId: "1061110961820",
  appId: "1:1061110961820:web:8f327cb56c382852083f59",
  measurementId: "G-FV37DJV1FL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);