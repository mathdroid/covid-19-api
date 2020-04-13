import { NowResponse, NowRequest } from "@now/node";
import { getHtml } from "../util/template";
import { writeTempFile, pathToFileURL } from "../util/file";
import { getScreenshot } from "../util/chromium";
import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getLastUpdate,
  getDailyCases
} from "../util/api";

const isDev = process.env.NOW_REGION === "dev1";

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const width = parseInt(req.query.width as string, 10) || 1200;
    const height = parseInt(req.query.height as string, 10) || 627;
    const isHtmlDebug =
      isDev &&
      (process.env.OG_HTML_DEBUG === "1" || req.query.debug === "true");
    const [
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      dailyCases
    ] = await Promise.all([
      getTotalConfirmed(),
      getTotalRecovered(),
      getTotalDeaths(),
      getLastUpdate(),
      getDailyCases()
    ]);
    // console.log({
    //   confirmed,
    //   recovered,
    //   deaths,
    //   lastUpdate
    // });
    const html = getHtml({
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      dailyCases,
      width,
      height
    });
    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const text = "textwoot";
    // console.log("writing html", html);
    const filePath = await writeTempFile(text, html);
    // console.log({ filePath });
    const fileUrl = pathToFileURL(filePath);
    const file = await getScreenshot(fileUrl, isDev, width, height);
    res.setHeader("Content-Type", `image/png`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
