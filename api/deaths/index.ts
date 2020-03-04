import { NowResponse } from "@now/node";
import {
  fetchFeatures,
  attributeSpreader,
  normalizeKeys
} from "../../util/data";
import { endpoints } from "../../util/endpoints";

export default async (_, response: NowResponse) => {
  response.json(
    response.json(
      (await fetchFeatures(endpoints.deathDesc))
        .map(attributeSpreader)
        .map(normalizeKeys)
    )
  );
};
