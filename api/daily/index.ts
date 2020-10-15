import { NowResponse } from "@now/node";
import unfetch from "isomorphic-unfetch";
import withRetry from "@zeit/fetch-retry";
const fetch = withRetry(unfetch);
export default async (_, response: NowResponse) => {
  const res=await fetch('https://raw.githubusercontent.com/spiritbro1/covid-19-api-cron/main/daily.json')
  response.json(await res.json());
};
