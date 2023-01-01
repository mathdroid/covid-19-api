import { NowRequest, NowResponse } from "@now/node";

// const groupByCountryRegion

export default async (request: NowRequest, response: NowResponse) => {
  // const shouldGroupByCountryRegion = request.query["byCountry"] === "true";
  // const endpoint = getEndpoint(
  //   shouldGroupByCountryRegion
  //     ? "countryRegion"
  //     : (request.query.level as string)
  // );
  response.json({});
};
