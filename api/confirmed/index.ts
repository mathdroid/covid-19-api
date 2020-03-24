import { NowResponse, NowRequest } from "@now/node";
import {
  fetchFeatures,
  attributeSpreader,
  normalizeKeys,
  matchCountryCode,
  getIso3Code
} from "../../util/data";
import { queryConfirmed } from "../../util/query";
import { getEndpoint } from "../../util/endpoints";

const sumObject = (base, newValue) => {
  for (const key in newValue) {
    if (typeof base[key] === "number" && typeof newValue[key] === "number") {
      base[key] += newValue[key];
    }
  }
  return base;
};

const groupByCountryRegion = data => {
  const countriesHash = data.reduce((acc, cur) => {
    if (!acc[cur.countryRegion]) {
      return {
        ...acc,
        [cur.countryRegion]: {
          countryRegion: cur.countryRegion,
          confirmed: cur.confirmed,
          recovered: cur.recovered,
          deaths: cur.deaths,
          active: cur.active
        }
      };
    } else {
      return {
        ...acc,
        [cur.countryRegion]: sumObject(acc[cur.countryRegion], {
          countryRegion: cur.countryRegion,
          confirmed: cur.confirmed,
          recovered: cur.recovered,
          deaths: cur.deaths,
          active: cur.active
        })
      };
    }
  }, {});
  return Object.values(countriesHash);
};

export default async (request: NowRequest, response: NowResponse) => {
  const shouldGroupByCountryRegion = request.query["byCountry"] === "true";

  const data = (
    await fetchFeatures(
      getEndpoint(
        shouldGroupByCountryRegion
          ? "countryRegion"
          : (request.query.level as string)
      ),
      queryConfirmed()
    )
  )
    .map(attributeSpreader)
    .map(normalizeKeys)
    .map(matchCountryCode)
    .map(getIso3Code);
  response.json(data);
};
