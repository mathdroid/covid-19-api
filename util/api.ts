import { extractSingleValue, fetchFeatures } from "./data";

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
