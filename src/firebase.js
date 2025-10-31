import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgl4fflARcELAaRtBTl6JrX7tFhhl9oq0",
  authDomain: "arnazon-3c7a2.firebaseapp.com",
  projectId: "arnazon-3c7a2",
  storageBucket: "arnazon-3c7a2.firebasestorage.app",
  messagingSenderId: "799157279471",
  appId: "1:799157279471:web:11a482e84f64bd4af6d91a",
  measurementId: "G-B039JSJM77"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
// 
// project-799157279471