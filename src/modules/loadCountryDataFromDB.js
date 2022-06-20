import React from "react";
import initializeApp from "../modules/initializeFirebase";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  limit,
} from "firebase/firestore";

const firestore = getFirestore();

const loadCountryDataFromDB = async () => {
  let countriesArray = [];
  const countriesQuery = query(collection(firestore, `countries`), limit());
  const querySnapshot = await getDocs(countriesQuery);
  await querySnapshot.forEach((snap) => {
    const thisCountry = {
      xLeft: snap.data().xLeft,
      yTop: snap.data().yTop,
      name: snap.data().name,
      guessed: snap.data().guessed,
    };
    countriesArray.push(thisCountry);
  });
  return await countriesArray;
};

export default loadCountryDataFromDB;
