import fetch from "isomorphic-unfetch";

import { extractSingleValue } from "./index";

export const getConfirmed = async () => {
  const res = await fetch(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22,%22onStatisticField%22%3A%22Confirmed%22,%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
  );
  const { features } = await res.json();
  return extractSingleValue(features);
};

export const getRecovered = async () => {
  const res = await fetch(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22,%22onStatisticField%22%3A%22Recovered%22,%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
  );
  const { features } = await res.json();
  return extractSingleValue(features);
};

export const getDeaths = async () => {
  const res = await fetch(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=Confirmed%20%3E%200&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22,%22onStatisticField%22%3A%22Deaths%22,%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true"
  );
  const { features } = await res.json();
  return extractSingleValue(features);
};
