import { NowResponse } from "@now/node";
import { getDeaths } from "../../util/api";

export default async (_, response: NowResponse) => {
  response.json(await getDeaths());
};
