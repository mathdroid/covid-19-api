import fetch from "isomorphic-unfetch";
import * as countries from "./countries.json";

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

export const matchCountryCode = countryName => {
  return Object.entries(countries).filter(
    ([code, country]) => country === countryName
  );
};

export const extractSingleValue = features =>
  (features[0] && features[0].attributes && features[0].attributes.value) || 0;

export const fetchFeatures = async url => {
  const response = await fetch(url);
  const { features } = await response.json();
  return features;
};
