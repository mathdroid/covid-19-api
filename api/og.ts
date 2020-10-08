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
import capture from 'capture-screenshot-phantomjs';
const isDev = process.env.NOW_REGION === "dev1";
import * as playwright from 'playwright-aws-lambda';

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
const browser = await playwright.launchChromium();
  // Create a page with the Open Graph image size best practise
  const page = await browser.newPage({
    viewport: {
      width: 1200,
      height: 630
    }
  });
  // Generate the full URL out of the given path (GET parameter)
  const url = fileUrl
  await page.goto(url, {
    timeout: 15 * 1000
  })
  const data = await page.screenshot({
    type: "png"
  })
  await browser.close()
  // Set the s-maxage property which caches the images then on the Vercel edge
//   res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
  res.setHeader('Content-Type', 'image/png')
  // write the image to the response with the specified Content-Type
  res.end(data)
    // const file = await getScreenshot(fileUrl, isDev, width, height);
    // res.setHeader("Content-Type", `image/png`);
    // res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("s");
    console.error(e);
  }
}
