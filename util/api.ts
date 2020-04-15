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
  queryCasesTimeSeries,
  queryConfirmed
} from "./query";
import { getCountryName, countries } from "./countries";
import { getIsoDateFromUnixTime } from "./date";

const getRecoveredUS = async () => {
  return (await fetchFeatures(endpoints.casesCounty, queryConfirmed()))
    .filter(d => d.attributes["Country_Region"] === "US")
    .map(d => d.attributes.Recovered);
};

export const getTotalConfirmed = async (countryName?: string) => {
  const name = getCountryName(countryName);
  return extractSingleValue(
    await fetchFeatures(endpoints.casesCounty, queryTotalConfirmed(name))
  );
};

export const getTotalRecovered = async (countryName?: string) => {
  const name = getCountryName(countryName);
  // if (name === "US") {
  //   return getRecoveredUS();
  // }
  return extractSingleValue(
    await fetchFeatures(
      endpoints.casesCounty,
      queryTotalRecovered(getCountryName(countryName))
    )
  );
};

export const getTotalDeaths = async (countryName?: string) => {
  return extractSingleValue(
    await fetchFeatures(
      endpoints.casesCounty,
      queryTotalDeaths(getCountryName(countryName))
    )
  );
};

export const getLastUpdate = async (countryName?: string) => {
  const f = await fetchFeatures(
    endpoints.casesCounty,
    queryLastUpdate(getCountryName(countryName))
  );
  const feature = f
    ? f.map(attributeSpreader).map(normalizeKeys)[0]
    : { lastUpdate: new Date() };
  return new Date(feature.lastUpdate).toISOString();
};

export const getConfirmedGraph = async (resultOffset = 0) => {
  const apiResult = (
    await fetchFeatures(
      `https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/4/query`,
      {
        f: `json`,
        where: `(UID <> 840) AND (Confirmed<>0)`,
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
  return apiResult;
};

export const getDailyCases = async () => {
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
          acc[cur.date].deltaConfirmedDetail &&
          acc[cur.date].deltaConfirmedDetail.total) ||
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
          // cur: [...((acc[cur.date] && acc[cur.date].cur) || []), cur],
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
                acc[cur.date].deltaConfirmedDetail &&
                acc[cur.date].deltaConfirmedDetail.china) ||
                0),
            outsideChina:
              (cur.countryRegion !== "China" ? cur.deltaConfirmed : 0) +
              ((acc[cur.date] &&
                acc[cur.date].deltaConfirmedDetail &&
                acc[cur.date].deltaConfirmedDetail.outsideChina) ||
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
