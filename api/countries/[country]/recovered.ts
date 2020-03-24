import { NowResponse, NowRequest } from "@now/node";

import {
  fetchFeatures,
  attributeSpreader,
  normalizeKeys,
  matchCountryCode,
  getIso3Code
} from "../../../util/data";
import { getEndpoint } from "../../../util/endpoints";
import { queryRecovered } from "../../../util/query";
import { getCountryName } from "../../../util/countries";

export default async (req: NowRequest, response: NowResponse) => {
  try {
    const country = getCountryName(req.query.country as string);
    response.json(
      (
        await fetchFeatures(
          getEndpoint(
            country === "US" ? (req.query.level as string) : "county"
          ),
          queryRecovered(getCountryName(req.query.country as string))
        )
      )
        .map(attributeSpreader)
        .map(normalizeKeys)
        .map(matchCountryCode)
        .map(getIso3Code)
    );
  } catch (error) {
    response.statusCode = 404;
    response.json([]);
  }
};
