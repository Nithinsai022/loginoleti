import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPYQl7tZWYisup60JkGSgDPJdX2C6OwUI",
  authDomain: "login-ff557.firebaseapp.com",
  projectId: "login-ff557",
  storageBucket: "login-ff557.firebasestorage.app",
  messagingSenderId: "650207134651",
  appId: "1:650207134651:web:b05802689f384569a33a9e",
  measurementId: "G-LYFZK69227"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);