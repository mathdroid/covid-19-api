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

export const inferActive = data => {
  return {
    ...data,
    active: data.active || data.confirmed - (data.deaths + data.recovered)
  };
};

export const fetchFeatures = async (url, query = {}) => {
  const endpoint = `${url}?${qs.stringify(query)}`;
  // console.log({ url, query });
  const headers = {
    authority: "services9.arcgis.com",
    pragma: "no-cache",
    "cache-control": "no-cache",
    "sec-fetch-dest": "empty",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
    dnt: "1",
    accept: "*/*",
    origin: "https://gisanddata.maps.arcgis.com",
    "sec-fetch-site": "same-site",
    "sec-fetch-mode": "cors",
    referer: "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html",
    "accept-language": "en-US,en;q=0.9,id;q=0.8,ms;q=0.7"
  };
  const response = await fetch(endpoint, { headers });
  const data = await response.json();
  // console.log({
  //   endpoint,
  //   query,
  //   features: data.features
  // });
  return Array.isArray(data.features) &&
    data.features &&
    data.features.length === 1000
    ? [
        ...data.features,
        ...(await fetchFeatures(url, {
          ...query,
          //@ts-ignore
          resultOffset: (query.resultOffset || 0) + 1000
        }))
      ]
    : data.features;
};

// export const groupBy = (array: any[], field: string) => {

// }
