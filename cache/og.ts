import puppeteer from "puppeteer";
import { getHtml } from "../util/template";
import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getLastUpdate,
  getDailyCases,
} from "../util/api";
import { writeTempFile, pathToFileURL } from "../util/file";
export async function og() {
  try {
    const [
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      dailyCases,
    ] = await Promise.all([
      getTotalConfirmed(),
      getTotalRecovered(),
      getTotalDeaths(),
      getLastUpdate(),
      getDailyCases(),
    ]);

    const html = getHtml({
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      dailyCases,
      width: 1200,
      height: 600,
    });
    const text = "textwoot";
    const filePath = await writeTempFile(text, html);
    const fileUrl = pathToFileURL(filePath);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 600 });
    await page.goto(fileUrl);
    await page.screenshot({ path: `cache/og.png` });
    await browser.close();
    return true;
  } catch (e) {
    console.log(e.message);
    return false;
  }
}
