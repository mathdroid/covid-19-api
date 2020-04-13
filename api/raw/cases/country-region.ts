import { NowResponse, NowRequest } from "@now/node";
import qs from "qs";

import { endpoints } from "../../../util/endpoints";
import { fetcher } from "../__util/fetcher";
import {
  createSortQuery,
  sortBy,
  createRegionSortGroup
} from "../__util/query";

const endpoint = endpoints.casesCountryRegion;

export default async (req: NowRequest, res: NowResponse) => {
  const resultOffset =
    typeof req.query.resultOffset === "string"
      ? parseInt(req.query.resultOffset, 10)
      : 0;
  const field =
    req.query.field in sortBy ? (req.query.field as string) : "confirmed";
  const query = createSortQuery(createRegionSortGroup(field), { resultOffset });
  const response = await fetcher(`${endpoint}?${qs.stringify(query)}`);
  const data = await response.json();
  res.json(data);
};
