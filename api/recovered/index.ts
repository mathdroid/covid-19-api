import { NowResponse } from "@now/node";
import { getRecovered } from "../_lib/api";

export default async (_, response: NowResponse) => {
  response.json(await getRecovered());
};
