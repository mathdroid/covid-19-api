import {
  extractSingleValue,
  fetchFeatures,
  attributeSpreader,
  normalizeKeys
} from "./data";

import { endpoints } from "./endpoints";
import {
  queryTotalDeaths,
  queryTotalConfirmed,
  queryTotalRecovered,
  queryLastUpdate,
  queryCasesTimeSeries
} from "./query";
import { getCountryName } from "./countries";
import { getIsoDateFromUnixTime } from "./date";

export const getTotalConfirmed = async (countryName?: string) => {
  return extractSingleValue(
    await fetchFeatures(
      endpoints.cases,
      queryTotalConfirmed(getCountryName(countryName))
    )
  );
};

export const getTotalRecovered = async (countryName?: string) => {
  return extractSingleValue(
    await fetchFeatures(
      endpoints.cases,
      queryTotalRecovered(getCountryName(countryName))
    )
  );
};

export const getTotalDeaths = async (countryName?: string) => {
  return extractSingleValue(
    await fetchFeatures(
      endpoints.cases,
      queryTotalDeaths(getCountryName(countryName))
    )
  );
};

export const getLastUpdate = async (countryName?: string) => {
  const f = await fetchFeatures(
    endpoints.cases,
    queryLastUpdate(getCountryName(countryName))
  );
  const feature = f
    ? f.map(attributeSpreader).map(normalizeKeys)[0]
    : { lastUpdate: new Date() };
  return new Date(feature.lastUpdate).toISOString();
};

export const getDailyCases = async () =>
  (await fetchFeatures(endpoints.casesTime, queryCasesTimeSeries()))
    .map(attributeSpreader)
    .map(normalizeKeys);

export const getConfirmedGraph = async (resultOffset = 0) => {
  const apiResult = (
    await fetchFeatures(
      `https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/4/query`,
      {
        f: `json`,
        where: `1=1`,
        returnGeometry: false,
        spatialRel: `esriSpatialRelIntersects`,
        outFields: `*`,
        orderByFields: `Last_Update asc`,
        resultOffset,
        resultRecordCount: 1000,
        cacheHint: true
      }
    )
  )
    .map(attributeSpreader)
    .map(normalizeKeys)
    .map(data => ({
      ...data,
      date: getIsoDateFromUnixTime(data.lastUpdate)
    }));
  return apiResult.length !== 0
    ? [...apiResult, ...(await getConfirmedGraph(resultOffset + 1000))]
    : apiResult;
};
