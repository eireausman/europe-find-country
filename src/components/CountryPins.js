import React, { Fragment } from "react";
import ReactTooltip from "react-tooltip";
import locationPin from "../assets/images/pin.png";
import Party from "../assets/images/party.png";

const CountryPins = ({
  countriesLocations,
  mapDotClickActions,
  activeCountryOnMap,
}) => {
  return (
    <div>
      {activeCountryOnMap.name ? (
        <div>
          {activeCountryOnMap && (
            <button
              key={activeCountryOnMap.name}
              className="countryPinButton"
              onClick={(e) =>
                mapDotClickActions(
                  e,
                  activeCountryOnMap.name,
                  activeCountryOnMap.yTop,
                  activeCountryOnMap.xLeft
                )
              }
              style={{
                top: activeCountryOnMap.yTop + "px",
                left: activeCountryOnMap.xLeft + "px",
              }}
            >
              <img
                className="countryPinImg"
                src={locationPin}
                alt="Click to guess this country"
              ></img>
            </button>
          )}
        </div>
      ) : (
        <div>
          {countriesLocations.map((country) =>
            country.guessed === false ? (
              <button
                className="countryPinButton"
                onClick={(e) =>
                  mapDotClickActions(
                    e,
                    country.name,
                    country.yTop,
                    country.xLeft
                  )
                }
                style={{
                  top: country.yTop + "px",
                  left: country.xLeft + "px",
                }}
                key={country.name}
              >
                <img
                  className="countryPinImg"
                  src={locationPin}
                  alt="Click to guess this country"
                ></img>
              </button>
            ) : (
              <Fragment key={country.name}>
                <ReactTooltip effect="solid" />
                <button
                  data-tip={country.name}
                  className="countryPinButton"
                  style={{
                    top: country.yTop + "px",
                    left: country.xLeft + "px",
                  }}
                >
                  <img
                    className="countryPinGuessedImg"
                    src={Party}
                    alt={country.name}
                  ></img>
                </button>
              </Fragment>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CountryPins;
