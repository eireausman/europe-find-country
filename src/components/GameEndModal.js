import React from "react";

const GameEndModal = ({ startGame, gameEndTime }) => {
  console.log(gameEndTime);

  return (
    <div className="gameModal">
      <h1>You did it! Well done.</h1>
      <p>You completed the game in {gameEndTime.current.seconds} seconds. </p>
      <p>The time on the clock was: {gameEndTime.current.clock}.</p>

      <button onClick={() => startGame(true)}>Play again</button>
    </div>
  );
};

export default GameEndModal;
