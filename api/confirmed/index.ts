import { NowResponse } from "@now/node";
import {
  fetchFeatures,
  attributeSpreader,
  normalizeKeys,
  matchCountryCode
} from "../../util/data";
import { endpoints } from "../../util/endpoints";

export default async (_, response: NowResponse) => {
  response.json(
    (await fetchFeatures(endpoints.confirmedDesc))
      .map(attributeSpreader)
      .map(normalizeKeys)
      .map(matchCountryCode)
  );
};
