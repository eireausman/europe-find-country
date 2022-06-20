import React from "react";
import { CSSTransition } from "react-transition-group";
import Party from "../assets/images/party.png";
import Incorrect from "../assets/images/incorrect.png";

const GuessResult = ({ showGuessResult, guessedCountry }) => {
  const newTop = parseInt(guessedCountry.guessLabelPositionTop) - 40;
  return (
    <CSSTransition
      in={showGuessResult}
      timeout={2000}
      classNames="guessResultLabelTransition"
    >
      <div
        className="guessResultLabel"
        style={{
          top: newTop + "px",
        }}
      >
        {guessedCountry.correctGuess === true ? (
          <div>
            {" "}
            <img
              height="40px"
              src={Party}
              alt="Well done - that was a correct guess"
            ></img>
            <p>
              <b>Well Done! {guessedCountry.country}</b> is correct!
            </p>
          </div>
        ) : (
          <div>
            <img
              height="40px"
              src={Incorrect}
              alt="Incorrect guess - try again"
            ></img>
            <p>
              <b>{guessedCountry.country}</b> is not right! Try again.
            </p>
          </div>
        )}
      </div>
    </CSSTransition>
  );
};

export default GuessResult;
