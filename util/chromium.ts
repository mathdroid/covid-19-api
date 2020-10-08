import * as playwright from "playwright-aws-lambda";
import { getOptions } from "./options";


async function getPage(isDev: boolean) {
  const options = await getOptions(isDev);
  const browser = await playwright.launchChromium(options);
  const context = await browser.newContext();
  const _page = await context.newPage();
  return _page;
}

export async function getScreenshot(
  url: string,
  isDev: boolean,
  width: number = 1200,
  height: number = 627
) {
  const page = await getPage(isDev);
  await page.setViewportSize({ width, height });
  await page.goto(url);
  const file = await page.screenshot({ type: "png" });
  return file;
}
