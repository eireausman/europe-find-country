import React from "react";

const CountrySelect = ({
  activeCountryOnMap,
  countriesLocations,
  evaluateGuess,
}) => {
  const newTop = parseInt(activeCountryOnMap.yTop) - 30;
  const newLeft = parseInt(activeCountryOnMap.xLeft) + 30;

  return (
    <div
      defaultValue={"Which Country is this?"}
      name="countriesSelector"
      style={{
        top: newTop + "px",
        left: newLeft + "px",
      }}
      className="countrySelect"
    >
      <p>Which Country is this?</p>
      {countriesLocations.map(
        (country) =>
          country.guessed === false && (
            <button
              className="countrySelectListItem"
              key={country.name}
              onClick={(e) =>
                evaluateGuess(e, country.name, country.yTop, country.xLeft)
              }
              value={country.name}
            >
              {country.name}
            </button>
          )
        //  : (
        //   <option key={country.name} disabled value={country.name}>
        //     {country.name}
        //   </option>
        // )
      )}
      <div className="countrySelectGuessedCountries">
        <b>Guessed countries:</b>
        <ul>
          {countriesLocations.map(
            (country) =>
              country.guessed === true && (
                <li key={country.name}>- {country.name}</li>
              )
            //  : (
            //   <option key={country.name} disabled value={country.name}>
            //     {country.name}
            //   </option>
            // )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CountrySelect;
