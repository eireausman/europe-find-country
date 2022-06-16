import React, { useState, useEffect } from "react";
import initializeApp from "./modules/initializeFirebase";
import GameNav from "./components/GameNav";
import CountrySelect from "./components/CountrySelect";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  where,
  orderBy,
  addDoc,
} from "firebase/firestore";

import "./cssReset.css";
import "./App.css";
import EuropeanMap from "./assets/images/europe-blank-map-countries-hd.jpeg";
import locationPin from "./assets/images/pin.png";
import Party from "./assets/images/party.png";
import { isCompositeComponent } from "react-dom/test-utils";

const firestore = getFirestore();

// writeANewRecipe();

const App = () => {
  const [gameActive, setGameActive] = useState(false);
  const [countriesLocations, setCountriesLocations] = useState([]);
  const [gameScoreStreak, setGameScoreStreak] = useState(0);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [activeCountryOnMap, setActiveCountryOnMap] = useState({});
  const [inProp, setInProp] = useState(false);
  useEffect(() => {
    createInitialCountriesArray();
  }, []);

  const createInitialCountriesArray = async () => {
    let countriesArray = [];
    const countriesQuery = query(collection(firestore, `countries`));
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
    setCountriesLocations(countriesArray);
  };

  const updateGameState = (toState) => {
    setGameActive(toState);
    console.log(true);
  };

  const mapDotClickActions = (e, countryName, yTop, xLeft) => {
    const activeCountry = {
      name: countryName,
      yTop: yTop,
      xLeft: xLeft,
    };

    setActiveCountryOnMap(activeCountry);
    setShowCountrySelector(true);
    setInProp(true);
  };

  const evaluateGuess = (e) => {
    const guessedCountry = e.target.value;
    if (guessedCountry === activeCountryOnMap.name) {
      setGameScoreStreak(gameScoreStreak + 1);
      const copyCountriesLocations = [...countriesLocations];
      const foundCountry = copyCountriesLocations.find(
        (element) => element.name === guessedCountry
      );
      foundCountry.guessed = true;
      setCountriesLocations(copyCountriesLocations);
      console.log(countriesLocations);
      setShowCountrySelector(false);
    }
  };

  return (
    <div className="mapContainer">
      <GameNav
        gameScoreStreak={gameScoreStreak}
        gameActive={gameActive}
        updateGameState={updateGameState}
      />
      <img
        className="gameMapImage"
        src={EuropeanMap}
        alt="Game Map - Europe"
      ></img>
      {showCountrySelector ? (
        <div className="gameMapOverlay">
          <CSSTransition in={inProp} timeout={4000} classNames="my-node">
            <CountrySelect
              activeCountryOnMap={activeCountryOnMap}
              countriesLocations={countriesLocations}
              evaluateGuess={evaluateGuess}
            />
          </CSSTransition>
        </div>
      ) : (
        <div className="gameMapOverlay">
          {countriesLocations.map((country) =>
            country.guessed === false ? (
              <img
                src={locationPin}
                className="countryPin"
                alt="Click to guess this country"
                onClick={(e) =>
                  mapDotClickActions(
                    e,
                    country.name,
                    country.yTop,
                    country.xLeft
                  )
                }
                key={country.name}
                style={{
                  top: country.yTop + "px",
                  left: country.xLeft + "px",
                }}
              ></img>
            ) : (
              <img
                src={Party}
                className="countryPinGuessed"
                alt={country.name}
                key={country.name}
                style={{
                  top: country.yTop + "px",
                  left: country.xLeft + "px",
                }}
              ></img>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default App;
