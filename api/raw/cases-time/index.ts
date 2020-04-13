import { NowResponse, NowRequest } from "@now/node";
import qs from "qs";

import { endpoints } from "../../../util/endpoints";
import { fetcher } from "../__util/fetcher";
import { createSortQuery } from "../__util/query";

const endpoint = endpoints.casesOverTime;

export default async (req: NowRequest, res: NowResponse) => {
  const resultOffset =
    typeof req.query.resultOffset === "string"
      ? parseInt(req.query.resultOffset, 10)
      : 0;
  const query = createSortQuery(`Last_Update asc`, {
    resultOffset,
    where: `${
      typeof req.query.countryRegion === "string"
        ? `(Country_Region = '${req.query.countryRegion as string}') AND `
        : ""
    }((Confirmed <> 0) OR (Delta_Confirmed <> 0))`
  });
  const response = await fetcher(`${endpoint}?${qs.stringify(query)}`);
  const data = await response.json();
  res.json(data);
};
