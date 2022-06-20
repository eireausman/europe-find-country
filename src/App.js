import React, { useState, useEffect, useRef } from "react";
import initializeApp from "./modules/initializeFirebase";
import { CSSTransition } from "react-transition-group";
import GameNav from "./components/GameNav";
import CountryPins from "./components/CountryPins";
import CountrySelect from "./components/CountrySelect";
import GuessResult from "./components/GuessResult";
import NewGameModal from "./components/NewGameModal";
import GameEndModal from "./components/GameEndModal";
import loadCountryDataFromDB from "./modules/loadCountryDataFromDB";

import "./cssReset.css";
import "./App.css";
import EuropeanMap from "./assets/images/europe-blank-map-countries-hd.jpeg";

const App = () => {
  const [newGameShowModal, setNewGameShowModal] = useState(true);
  const [gameEndShowModal, setGameEndShowModal] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [gameTimer, setGameTimer] = useState(0);
  const [displayedGameTimer, setDisplayedGameTimer] = useState("00:00:00");
  const [guessedCountry, setGuessedCountry] = useState({});
  const [showGuessResult, setShowGuessResult] = useState(false);
  const [countriesLocations, setCountriesLocations] = useState([]);
  const [gameScoreStreak, setGameScoreStreak] = useState(0);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [activeCountryOnMap, setActiveCountryOnMap] = useState({});
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const intervalRef = useRef(null);
  const gameEndTime = useRef({});

  useEffect(() => {
    refreshCountryArray();
  }, []);

  const getDisplayTime = (gameTimerInSeconds) => {
    const minutes = Math.floor(gameTimerInSeconds / 60);
    let displaySeconds = gameTimerInSeconds - minutes * 60;
    if (parseInt(displaySeconds) < 9) {
      displaySeconds = `0${displaySeconds}`;
    }
    return `${minutes}:${displaySeconds}`;
  };

  useEffect(() => {
    const displayTime = getDisplayTime(gameTimer);
    setDisplayedGameTimer(displayTime);
  }, [gameTimer]);

  const refreshCountryArray = async () => {
    const data = await loadCountryDataFromDB().then((data) => {
      setCountriesLocations(data);
    });
  };

  const updateGameState = (toState) => {
    setGameActive(toState);
  };

  const startGame = (startNewGame) => {
    const startTimer = () => {
      intervalRef.current = setInterval(() => {
        setGameTimer((prevState) => prevState + 1);
      }, 1000);
    };
    const resetTimer = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setGameTimer(0);
    };

    if (startNewGame === true) {
      startTimer();
      updateGameState(true);
      setNewGameShowModal(false);
      setGameEndShowModal(false);
    } else {
      resetTimer();
      updateGameState(false);
    }
  };

  const mapDotClickActions = (e, countryName, yTop, xLeft) => {
    const activeCountry = {
      name: countryName,
      yTop: yTop,
      xLeft: xLeft,
    };
    setActiveCountryOnMap(activeCountry);
    setShowCountrySelector(true);
    setShowGuessResult(false);
  };

  const evaluateGuess = (e, countryName) => {
    const guessDetail = {
      country: countryName,
      guessLabelPositionTop: activeCountryOnMap.yTop,
    };
    if (guessDetail.country === activeCountryOnMap.name) {
      // correct guess actions:
      guessDetail.correctGuess = true;
      setGuessedCountry(guessDetail);
      setGameScoreStreak(gameScoreStreak + 1);
      const copyCountriesLocations = [...countriesLocations];
      const foundCountry = copyCountriesLocations.find(
        (element) => element.name === guessDetail.country
      );
      foundCountry.guessed = true;
      setCountriesLocations(copyCountriesLocations);
      // Game end check:
      const leftGuesses = copyCountriesLocations.filter(
        (element) => element.guessed === false
      ).length;
      if (leftGuesses === 0) {
        gameEndTime.current = { seconds: gameTimer, clock: displayedGameTimer };

        startGame(false);
        refreshCountryArray();
        setGameEndShowModal(true);
      }
    } else {
      // incorrect guess actions
      guessDetail.correctGuess = false;
      setGuessedCountry(guessDetail);
    }
    // actions that take place after all guesses (regardless of correctness)
    setActiveCountryOnMap({});
    setShowCountrySelector(false);
    setShowGuessResult(true);
  };

  return (
    <div className="mapContainer">
      <img
        className="gameMapImage"
        src={EuropeanMap}
        alt="Game Map - Europe"
      ></img>

      <div className="gameMapOverlay">
        {gameActive && (
          <GuessResult
            guessedCountry={guessedCountry}
            showGuessResult={showGuessResult}
          />
        )}
        <GameNav
          gameScoreStreak={gameScoreStreak}
          gameActive={gameActive}
          updateGameState={updateGameState}
          startGame={startGame}
          displayedGameTimer={displayedGameTimer}
        />
        {showCountrySelector && (
          <CountrySelect
            activeCountryOnMap={activeCountryOnMap}
            countriesLocations={countriesLocations}
            evaluateGuess={evaluateGuess}
          />
        )}
        {gameActive && (
          <CountryPins
            countriesLocations={countriesLocations}
            mapDotClickActions={mapDotClickActions}
            activeCountryOnMap={activeCountryOnMap}
          />
        )}
      </div>
      <CSSTransition
        in={newGameShowModal}
        timeout={2000}
        unmountOnExit
        classNames="newGameModalTransition"
      >
        <NewGameModal startGame={startGame} />
      </CSSTransition>
      <CSSTransition
        in={gameEndShowModal}
        timeout={2000}
        unmountOnExit
        classNames="gameEndModalTransition"
      >
        <GameEndModal startGame={startGame} gameEndTime={gameEndTime} />
      </CSSTransition>
    </div>
  );
};

export default App;
