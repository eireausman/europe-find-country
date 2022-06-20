import React from "react";

const GameNav = ({
  gameScoreStreak,
  gameActive,
  startGame,
  displayedGameTimer,
}) => {
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
