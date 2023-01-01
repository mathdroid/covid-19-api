import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, response: NowResponse) => {
  // try {
  //   const country = getCountryName(req.query.country as string);
  //   response.json(
  //     (
  //       await fetchFeatures(
  //         getEndpoint(
  //           country === "US" ? (req.query.level as string) : "county"
  //         ),
  //         queryRecovered(getCountryName(req.query.country as string))
  //       )
  //     )
  //       .map(attributeSpreader)
  //       .map(normalizeKeys)
  //       .map(inferActive)
  //   );
  // } catch (error) {
  response.statusCode = 404;
  response.json([]);
  // }
};
