import { NowResponse } from "@now/node";
import { getRecovered } from "../../util/api";

export default async (_, response: NowResponse) => {
  response.json(await getRecovered());
};
