import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAge9y6A9CoP2IgEoXtydm0EjZZxRUsLhc",
  authDomain: "courses-992d1.firebaseapp.com",
  projectId: "courses-992d1",
  storageBucket: "courses-992d1.appspot.com",
  messagingSenderId: "327622019068",
  appId: "1:327622019068:web:df2fd61fc0e10063195479"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);