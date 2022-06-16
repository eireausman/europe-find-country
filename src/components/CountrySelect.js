import React, { useState } from "react";

const CountrySelect = ({
  activeCountryOnMap,
  countriesLocations,
  evaluateGuess,
}) => {
  return (
    <select
      onChange={evaluateGuess}
      defaultValue={"Which Country is this?"}
      name="countriesSelector"
      style={{
        top: activeCountryOnMap.yTop + "px",
        left: activeCountryOnMap.xLeft + "px",
      }}
      className="countrySelect"
    >
      <option disabled>Which Country is this?</option>
      {countriesLocations.map((country) =>
        country.guessed === false ? (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ) : (
          <option key={country.name} disabled value={country.name}>
            {country.name}
          </option>
        )
      )}
    </select>
  );
};

export default CountrySelect;
