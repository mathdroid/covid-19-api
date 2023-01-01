import { NowRequest, NowResponse } from "@now/node";

export default async (request: NowRequest, response: NowResponse) => {
  // const shouldGroupByCountryRegion = request.query["byCountry"] === "true";
  // const endpoint = getEndpoint(
  //   shouldGroupByCountryRegion
  //     ? "countryRegion"
  //     : (request.query.level as string)
  // );
  // const data = (await fetchFeatures(endpoint, queryDeaths()))
  //   .map(attributeSpreader)
  //   .map(normalizeKeys)
  //   .map(matchCountryCode)
  //   .map(getIso3Code);
  response.json([]);
};
