import { NowResponse } from "@now/node";

import { getDailyCases } from "../util/api";

export default async (_, response: NowResponse) => {
  const cases = await getDailyCases;
  response.json(cases);
};
