import { NowResponse } from "@now/node";
import unfetch from "isomorphic-unfetch";
import withRetry from "@zeit/fetch-retry";
const fetch = withRetry(unfetch);
export default async (_, response: NowResponse) => {
  const res=await fetch('https://github.com/mathdroid/covid-19-api/releases/download/saved_data/daily.json')
  response.json(await res.json());
};
