import { NowResponse } from "@now/node";
import {
  fetchFeatures,
  attributeSpreader,
  normalizeKeys
} from "../../util/data";
import { endpoints } from "../../util/endpoints";
import { queryCasesTimeSeries } from "../../util/query";

export default async (_, response: NowResponse) => {
  response.json(
    (await fetchFeatures(endpoints.casesTime, queryCasesTimeSeries()))
      .map(attributeSpreader)
      .map(normalizeKeys)
  );
};
