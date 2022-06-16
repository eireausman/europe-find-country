// This was a copy of index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  addDoc,
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
  onSnapshot,
  DocumentSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { isCompositeComponent } from "react-dom/test-utils";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const firestore = getFirestore();

const specialOfTheDay = doc(firestore, "recipes/4rTIt4M9glhWj4qxrDyF");

function writeANewRecipe() {
  const docData = { carb: "pasta", size: "large" };
  setDoc(specialOfTheDay, docData, { merge: true });
}

const customerCollection = collection(firestore, "recipes");
const addANewDocument = async () => {
  const newDoc = await addDoc(customerCollection, {
    customer: "james",
    table: 4,
    alone: true,
  });
  console.log(`your doc was created at ${newDoc.path} with ID: ${newDoc.id}`);
};

const readASingleDocument = async () => {
  const mySnapshop = await getDoc(specialOfTheDay);
  if (mySnapshop.exists()) {
    const docData = mySnapshop.data();
    console.log(`My data is ${JSON.stringify(docData)}`);
  }
};

const listToADocument = () => {
  onSnapshot(specialOfTheDay, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const docData = docSnapshot.data();
      console.log(`in realtime, docData is ${JSON.stringify(docData)}`);
    }
  });
};

const queryForDocuments = async () => {
  const customerOrderQuery = query(
    collection(firestore, `recipes`),
    where(`carb`, `==`, `pasta`)
  );
  const querySnapshot = await getDocs(customerOrderQuery);

  await querySnapshot.forEach((snap) => {
    console.log(`Document ${snap.id} contains ${JSON.stringify(snap.data())}`);
  });
};

const realTimeDocumentQuery = async () => {
  const customerOrderQuery = query(
    collection(firestore, `recipes`),
    where(`carb`, `==`, `pasta`)
  );
  // const querySnapshot = await getDocs(customerOrderQuery);
  onSnapshot(customerOrderQuery, (querySnapshot) => {
    console.log(JSON.stringify(querySnapshot.docs.map((e) => e.data())));
  });
};

const addANewCountryDocument = async () => {
  countriesLocations.forEach(async (country) => {
    try {
      await setDoc(doc(firestore, "countries", country.name), {
        yTop: country.yTop,
        xLeft: country.xLeft,
        name: country.name,
        guessed: country.guessed,
      });
    } catch (error) {
      console.error(error);
    }
  });
};

writeANewRecipe();
// addANewDocument();
readASingleDocument();
listToADocument();
queryForDocuments();
realTimeDocumentQuery();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
