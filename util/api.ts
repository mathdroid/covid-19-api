import {
  extractSingleValue,
  fetchFeatures,
  attributeSpreader,
  normalizeKeys
} from "./data";

import { endpoints } from "./endpoints";

export const getConfirmed = async () => {
  return extractSingleValue(await fetchFeatures(endpoints.confirmedTotal));
};

export const getRecovered = async () => {
  return extractSingleValue(await fetchFeatures(endpoints.recoveredTotal));
};

export const getDeaths = async () => {
  return extractSingleValue(await fetchFeatures(endpoints.deathsTotal));
};

export const getLastUpdate = async () => {
  const feature = (await fetchFeatures(endpoints.lastUpdateDesc))
    .map(attributeSpreader)
    .map(normalizeKeys)[0];
  console.log(feature);
  return new Date(feature.lastUpdate).toISOString();
};
