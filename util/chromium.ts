import { launch, Page } from "puppeteer-core";
import { getOptions } from "./options";

let _page: Page | null;

async function getPage(isDev: boolean) {
  if (_page) {
    return _page;
  }
  const options = await getOptions(isDev);
  const browser = await launch(options);
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(
  url: string,
  isDev: boolean,
  width: number = 1200,
  height: number = 627
) {
  const page = await getPage(isDev);
  await page.setViewport({ width, height });
  await page.goto(url);
  const file = await page.screenshot({ type: "png" });
  return file;
}
