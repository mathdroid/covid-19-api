import { NowResponse, NowRequest } from "@now/node";
import { getHtml } from "../../../util/template";
import { writeTempFile, pathToFileURL } from "../../../util/file";
import { getScreenshot } from "../../../util/chromium";
import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getLastUpdate
} from "../../../util/api";
import { getCountryName } from "../../../util/countries";

const isDev = process.env.NOW_REGION === "dev1";

export default async function handler(req: NowRequest, res: NowResponse) {
  try {
    const country = req.query.country as string;
    const width = parseInt(req.query.width as string, 10) || 1200;
    const height = parseInt(req.query.height as string, 10) || 627;
    const isHtmlDebug =
      isDev &&
      (process.env.OG_HTML_DEBUG === "1" || req.query.debug === "true");
    const [confirmed, recovered, deaths, lastUpdate] = await Promise.all([
      getTotalConfirmed(country),
      getTotalRecovered(country),
      getTotalDeaths(country),
      getLastUpdate(country)
    ]);
    const html = getHtml({
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      dailyCases: [],
      width,
      height,
      countryRegion: getCountryName(country)
    });
    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const text = country;
    const filePath = await writeTempFile(text, html);
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
