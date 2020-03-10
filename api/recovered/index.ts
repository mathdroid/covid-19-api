import { NowResponse } from "@now/node";
import {
  fetchFeatures,
  attributeSpreader,
  normalizeKeys,
  matchCountryCode,
  getIso3Code
} from "../../util/data";
import { endpoints } from "../../util/endpoints";

export default async (_, response: NowResponse) => {
  response.json(
    (await fetchFeatures(endpoints.recoveredDesc))
      .map(attributeSpreader)
      .map(normalizeKeys)
      .map(matchCountryCode)
      .map(getIso3Code)
  );
};
