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

export const getDaily = async () => {
  const result = Object.entries(
    (await getConfirmedGraph()).reduce((acc, cur) => {
      const totalConfirmed =
        cur.confirmed +
        ((acc[cur.date] &&
          acc[cur.date].confirmed &&
          acc[cur.date].confirmed.total) ||
          0);
      const mainlandChina =
        (cur.countryRegion === "China" ? cur.confirmed : 0) +
        ((acc[cur.date] &&
          acc[cur.date].confirmed &&
          acc[cur.date].confirmed.china) ||
          0);

      const otherLocations =
        (cur.countryRegion !== "China" ? cur.confirmed : 0) +
        ((acc[cur.date] &&
          acc[cur.date].confirmed &&
          acc[cur.date].confirmed.outsideChina) ||
          0);
      const deltaConfirmed =
        cur.deltaConfirmed +
        ((acc[cur.date] &&
          acc[cur.date].deltaConfirmed &&
          acc[cur.date].deltaConfirmed.total) ||
          0);

      const totalRecovered =
        cur.recovered +
        ((acc[cur.date] &&
          acc[cur.date].recovered &&
          acc[cur.date].recovered.total) ||
          0);

      return {
        ...acc,
        [cur.date]: {
          totalConfirmed,
          mainlandChina,
          otherLocations,
          deltaConfirmed,
          totalRecovered,
          confirmed: {
            total: totalConfirmed,
            china: mainlandChina,
            outsideChina: otherLocations
          },
          deltaConfirmedDetail: {
            total: deltaConfirmed,
            china:
              (cur.countryRegion === "China" ? cur.deltaConfirmed : 0) +
              ((acc[cur.date] &&
                acc[cur.date].deltaConfirmed &&
                acc[cur.date].deltaConfirmed.china) ||
                0),
            outsideChina:
              (cur.countryRegion !== "China" ? cur.deltaConfirmed : 0) +
              ((acc[cur.date] &&
                acc[cur.date].deltaConfirmed &&
                acc[cur.date].deltaConfirmed.outsideChina) ||
                0)
          },
          deaths: {
            total:
              cur.deaths +
              ((acc[cur.date] &&
                acc[cur.date].deaths &&
                acc[cur.date].deaths.total) ||
                0),
            china:
              (cur.countryRegion === "China" ? cur.deaths : 0) +
              ((acc[cur.date] &&
                acc[cur.date].deaths &&
                acc[cur.date].deaths.china) ||
                0),
            outsideChina:
              (cur.countryRegion !== "China" ? cur.deaths : 0) +
              ((acc[cur.date] &&
                acc[cur.date].deaths &&
                acc[cur.date].deaths.outsideChina) ||
                0)
          },
          recovered: {
            total: totalRecovered,
            china:
              (cur.countryRegion === "China" ? cur.recovered : 0) +
              ((acc[cur.date] &&
                acc[cur.date].recovered &&
                acc[cur.date].recovered.china) ||
                0),
            outsideChina:
              (cur.countryRegion !== "China" ? cur.recovered : 0) +
              ((acc[cur.date] &&
                acc[cur.date].recovered &&
                acc[cur.date].recovered.outsideChina) ||
                0)
          },
          active: cur.active + ((acc[cur.date] && acc[cur.date].active) || 0),
          deltaRecovered:
            cur.deltaRecovered +
            ((acc[cur.date] && acc[cur.date].deltaRecovered) || 0),
          incidentRate:
            cur.incidentRate +
            ((acc[cur.date] && acc[cur.date].incidentRate) || 0),
          peopleTested:
            cur.peopleTested +
            ((acc[cur.date] && acc[cur.date].peopleTested) || 0)
        }
      };
    }, {})
  );
  return result.map(([reportDate, data]: [string, any]) => ({
    ...data,
    reportDate
  }));
};
