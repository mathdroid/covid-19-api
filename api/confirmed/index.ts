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

// const groupByCountryRegion

export default async (request: NowRequest, response: NowResponse) => {
  const shouldGroupByCountryRegion = request.query["byCountry"] === "true";
  const endpoint = getEndpoint(
    shouldGroupByCountryRegion
      ? "countryRegion"
      : (request.query.level as string)
  );
  const data = (await fetchFeatures(endpoint, queryConfirmed()))
    .map(attributeSpreader)
    .map(normalizeKeys)
    .map(matchCountryCode)
    .map(getIso3Code);
  response.json(data);
};
