import { NowResponse } from "@now/node";
import qs from "qs";

import { endpoints } from "../../util/endpoints";
import { fetcher } from "./__util/fetcher";
import { createSortQuery } from "./__util/query";

const endpoint = endpoints.casesCounty;

const query = createSortQuery(`Last_Update desc`, { resultRecordCount: 1 });

export default async (_, res: NowResponse) => {
  const response = await fetcher(`${endpoint}?${qs.stringify(query)}`);
  const data = await response.json();
  res.json(data);
};
