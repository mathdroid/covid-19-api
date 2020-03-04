import { NowRequest, NowResponse } from "@now/node";
import { getHtml } from "./_lib/template";
import { writeTempFile, pathToFileURL } from "./_lib/file";
import { getScreenshot } from "./_lib/chromium";
import { getConfirmed, getRecovered, getDeaths } from "./_lib/api";

const isDev = process.env.NOW_REGION === "dev1";
const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";

export default async function handler(_, res: NowResponse) {
  try {
    const [confirmed, recovered, deaths] = await Promise.all([
      getConfirmed(),
      getRecovered(),
      getDeaths()
    ]);
    const html = getHtml({ confirmed, recovered, deaths });
    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const text = "textwoot";
    const filePath = await writeTempFile(text, html);
    const fileUrl = pathToFileURL(filePath);
    const file = await getScreenshot(fileUrl, isDev);
    res.setHeader("Content-Type", `image/png`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
