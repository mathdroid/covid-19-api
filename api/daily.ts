import { NowResponse } from "@now/node";

import { getDailyCases } from "./_lib/api";

export default async (_, response: NowResponse) => {
  const cases = await getDailyCases;
  response.json(cases);
};
