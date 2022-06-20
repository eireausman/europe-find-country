import React, { useState } from "react";

const NewGameModal = ({ startGame }) => {
  return (
    <div className="newGameModal gameModal">
      <h1>Locate the Countries of Europe</h1>
      <p>Test your European geography knowledge.</p>
      <p>Instructions on how to play:</p>
      <ol>
        <li>- Click on Start Game below</li>
        <li>- Select a pin on the map</li>
        <li>- Guess the country and wait to see if you were right. </li>
      </ol>
      <p>
        How to win: guess all the countries to join the leaderboard. Whoever
        guesses all countries correctly, wins.
      </p>
      <button onClick={() => startGame(true)}>Start Game</button>
    </div>
  );
};

export default NewGameModal;
