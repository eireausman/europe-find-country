import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9DNpYg41-9XMWqyE8mDs-TB7KOhfwdNU",
  authDomain: "europe-find-country.firebaseapp.com",
  projectId: "europe-find-country",
  storageBucket: "europe-find-country.appspot.com",
  messagingSenderId: "350974432756",
  appId: "1:350974432756:web:8e108dbfe0c8224b7815a1",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default initializeApp;
