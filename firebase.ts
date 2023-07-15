import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: "chat-gpt-clone-9e86f.firebaseapp.com",
  projectId: "chat-gpt-clone-9e86f",
  storageBucket: "chat-gpt-clone-9e86f.appspot.com",
  messagingSenderId: "766615223936",
  appId: "1:766615223936:web:8675e7723e2d67e784b065",
  measurementId: "G-5D4LLWVJ89",
};

// singleton instance design pattern
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
