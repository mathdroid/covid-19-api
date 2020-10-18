import { NowResponse, NowRequest } from "@now/node";
import sharp from "sharp";
import unfetch from "isomorphic-unfetch";
import withRetry from "@zeit/fetch-retry";
import { ogUrl } from "../util/cacheurl";
const fetch = withRetry(unfetch);
export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const width = parseInt(req.query.width as string, 10) || 1200;
    const height = parseInt(req.query.height as string, 10) || 627;
    const response = await fetch(ogUrl);
    const result = response.body.pipe(
      sharp()
        .resize({ width, height, fit: "contain", background: "white" })
        .png()
    );
    res.setHeader("Content-Type", `image/png`);
    result.pipe(res);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
