import { NowResponse } from "@now/node";
import { getConfirmed } from "../_lib/api";

export default async (_, response: NowResponse) => {
  response.json(await getConfirmed());
};
