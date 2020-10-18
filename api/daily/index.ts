import { NowResponse } from "@now/node";
import unfetch from "isomorphic-unfetch";
import withRetry from "@zeit/fetch-retry";
import { dailyUrl } from "../../util/cacheurl";
const fetch = withRetry(unfetch);
export default async (_, response: NowResponse) => {
  const res=await fetch(dailyUrl)
  response.json(await res.json());
};
