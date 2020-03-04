import { NowResponse } from "@now/node";
import { getConfirmed } from "../../util/api";

export default async (_, response: NowResponse) => {
  response.json(await getConfirmed());
};
