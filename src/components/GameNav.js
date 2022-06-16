import React, { useState, useRef, useEffect } from "react";

const GameNav = ({ gameScoreStreak, gameActive, updateGameState }) => {
  const [gameTimer, setGameTimer] = useState(0);
  const [displayedGameTimer, setDisplayedGameTimer] = useState("00:00:00");

  const intervalRef = useRef(null);

  useEffect(() => {
    const minutes = Math.floor(gameTimer / 60);
    const seconds = gameTimer - minutes * 60;
    console.log("useEffect " + minutes + ":" + seconds);
    setDisplayedGameTimer(`${minutes}:${seconds}`);
  }, [gameTimer]);

  const startGame = (clear) => {
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

    if (clear === false) {
      startTimer();
      updateGameState(true);
    } else {
      resetTimer();
      updateGameState(false);
    }
  };

  return (
    <div className="topBar">
      <div className="gameScore"> Game Score: {gameScoreStreak}</div>
      {gameActive === false ? (
        <div className="startGame" onClick={() => startGame(false)}>
          Start Game
        </div>
      ) : (
        <div className="gameStopwatch" onClick={() => startGame(true)}>
          Game Time: {displayedGameTimer}
        </div>
      )}
    </div>
  );
};

export default GameNav;
