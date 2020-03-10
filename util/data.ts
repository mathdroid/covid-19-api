import fetch from "isomorphic-unfetch";
import * as countries from "./countries.json";
import * as iso3 from "./iso3.json";

export const attributeSpreader = ({ attributes }) => ({
  ...attributes
});

const pascalSnakeToCamel = string => {
  const [first, ...rest] = string.split("_");
  return `${first.toLowerCase()}${rest.join("")}`;
};

const idKeyFilter = ([key, _]) => key !== "OBJECTID";

export const normalizeKeys = object => {
  return Object.entries(object)
    .filter(idKeyFilter)
    .reduce((previous, [currentKey, currentValue]) => {
      return {
        ...previous,
        [pascalSnakeToCamel(currentKey)]: currentValue
      };
    }, {});
};

export const matchCountryCode = update => {
  const countryCode = Object.entries(countries).find(
    country => country[0] === update.countryRegion
  );
  if (countryCode) {
    update.iso2 = countryCode[1];
  }
  return update;
};

export const getIso3Code = update => {
  const countryCode3 = Object.entries(iso3).find(
    country => country[0] === update.iso2
  );
  if (countryCode3) {
    update.iso3 = countryCode3[1];
  }
  return update;
};

export const extractSingleValue = features =>
  (features[0] && features[0].attributes && features[0].attributes.value) || 0;

export const fetchFeatures = async url => {
  const response = await fetch(url);
  const { features } = await response.json();
  return features;
};
