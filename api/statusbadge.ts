import { NowResponse, NowRequest } from "@now/node";
import unfetch from "isomorphic-unfetch";
import withRetry from "@zeit/fetch-retry";
import { statusUrl } from "../util/cacheurl";
const fetch = withRetry(unfetch);
export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const result = await fetch(statusUrl);
    const badge = await result.json();
    res.json({
      schemaVersion: 1,
      label: (<string>req.query.status).replace(/_/g, " "),
      message: badge[req.query.status],
      color: req.query.status === "error" ? "red" : "green",
    });
  } catch (e) {
    res.json({
      isError: true,
      schemaVersion: 1,
      label: (<string>req.query.status).replace(/_/g, " "),
      message: "error",
      color: "red",
    });
  }
}
