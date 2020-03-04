import { endpoints } from "./endpoints";
import {
  fetchFeatures,
  extractSingleValue,
  attributeSpreader,
  normalizeKeys
} from "./data";

export const getConfirmed = async () => {
  return extractSingleValue(fetchFeatures(endpoints.confirmedDesc));
};

export const getRecovered = async () => {
  return extractSingleValue(fetchFeatures(endpoints.recoveredDesc));
};

export const getDeaths = async () => {
  return extractSingleValue(fetchFeatures(endpoints.deathDesc));
};

export const getDailyCases = async () => {
  return fetchFeatures(endpoints.casesTimeSeries).then(features =>
    features.map(attributeSpreader).map(normalizeKeys)
  );
};
