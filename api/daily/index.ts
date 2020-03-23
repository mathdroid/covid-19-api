import { NowResponse } from "@now/node";
import { getDaily } from "../../util/api";

export default async (_, response: NowResponse) => {
  response.json(await getDaily());
};
