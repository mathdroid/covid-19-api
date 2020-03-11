import { NowResponse } from "@now/node";
import { getDailyCases } from "../../util/api";

export default async (_, response: NowResponse) => {
  response.json(await getDailyCases());
};
