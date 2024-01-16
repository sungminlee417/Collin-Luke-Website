import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";
import { ModalProvider } from "./context/Modal";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ModalProvider>
    <App />
  </ModalProvider>
);
