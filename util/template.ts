import { readFileSync } from "fs";

const regularInter = readFileSync(
  `${__dirname}/../fonts/Inter-Regular.woff2`
).toString("base64");
const boldInter = readFileSync(
  `${__dirname}/../fonts/Inter-Bold.woff2`
).toString("base64");

function getCss(_theme, _fontSize) {
  return `
  @font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,${regularInter}) format('woff2');
}
@font-face {
    font-family: 'Inter';
    font-style:  normal;
    font-weight: bold;
    src: url(data:font/woff2;charset=utf-8;base64,${boldInter}) format('woff2');
}

body {
  height: 627px;
  padding: 0;
  margin: 0;
}
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 0 4rem;
  }

  .data-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .data {
    display: flex;
    flex-direction: column;
  }
  
  .heading {
    text-transform: uppercase;
  }

  .value {
    font-weight: bold;
    font-size: 6rem;
    margin-top: 1rem;
  }

  .font-inter {
    font-family: 'Inter', sans-serif;
  }

  b {
    margin-left: 0.5rem;
  }
  `;
}

interface ParsedRequest {
  confirmed?: number;
  recovered?: number;
  deaths?: number;
  lastUpdate?: string;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { confirmed, recovered, deaths, lastUpdate } = parsedReq;
  return `<!DOCTYPE html>
<html>
  <meta charset="utf-8">
  <title>Generated Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
      ${getCss(null, null)}
  </style>
  <body>
      <div class="wrapper">
        <div class="data-wrapper font-inter" style="font-weight: bold; font-size: 2rem;">COVID-19</div>
        <div class="data-wrapper" style="justify-content: space-between;">
          <div class="data">
            <div class="heading font-inter">Confirmed</div>
            <div class="value font-inter">${confirmed}</div>
          </div>

          <div class="data">
            <div class="heading font-inter">Recovered</div>
            <div class="value font-inter" style="color:green;">${recovered}</div>
          </div>

          <div class="data">
            <div class="heading font-inter">Deaths</div>
            <div class="value font-inter" style="color:red;">${deaths}</div>
          </div>
        </div>
        <div class="data-wrapper font-inter">
          Last Update: <b>${lastUpdate}</b>
        <div>
      </div>
  </body>
</html>`;
}
