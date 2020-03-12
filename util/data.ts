import unfetch from "isomorphic-unfetch";
import qs from "qs";
import withRetry from "@zeit/fetch-retry";

import { countries, iso3 } from "./countries";

const fetch = withRetry(unfetch);

export const attributeSpreader = ({ attributes }) => ({
  ...attributes
});

const sanitizeToPascal = (str: string) =>
  str.replace("/", "_").replace(" ", "_");

const pascalSnakeToCamel = (str: string) => {
  const [first, ...rest] = sanitizeToPascal(str).split("_");
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
  (features &&
    features[0] &&
    features[0].attributes &&
    features[0].attributes.value) ||
  0;

const isEmpty = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

export const fetchFeatures = async (url, query = {}) => {
  const endpoint = `${url}${isEmpty(query) ? "" : `?${qs.stringify(query)}`}`;
  const response = await fetch(endpoint);
  const { features } = await response.json();
  return features;
};
