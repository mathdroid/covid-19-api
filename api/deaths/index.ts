import { NowResponse } from "@now/node";
import { getDeaths } from "../_lib/api";

export default async (_, response: NowResponse) => {
  response.json(await getDeaths());
};
