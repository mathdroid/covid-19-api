import { NowResponse } from "@now/node";
import {
  fetchFeatures,
  attributeSpreader,
  normalizeKeys,
  matchCountryCode,
  getIso3Code
} from "../../util/data";
import { endpoints } from "../../util/endpoints";
import { queryConfirmed } from "../../util/query";

export default async (_, response: NowResponse) => {
  response.json(
    (await fetchFeatures(endpoints.cases, queryConfirmed()))
      .map(attributeSpreader)
      .map(normalizeKeys)
      .map(matchCountryCode)
      .map(getIso3Code)
  );
};
