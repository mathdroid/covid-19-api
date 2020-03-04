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
}
  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;
  }

  .data {
    font-family: 'Inter', sans-serif;
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
  `;
}

interface ParsedRequest {
  confirmed?: number;
  recovered?: number;
  deaths?: number;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { confirmed, recovered, deaths } = parsedReq;
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
        <div class="data">
          <div class="heading">Confirmed</div>
          <div class="value">${confirmed}</div>
        </div>

        <div class="data">
          <div class="heading">Recovered</div>
          <div class="value" style="color:green;">${recovered}</div>
        </div>

        <div class="data">
          <div class="heading">Deaths</div>
          <div class="value" style="color:red;">${deaths}</div>
        </div>
      </div>
  </body>
</html>`;
}
