import { readFileSync } from "fs";

const regularInter = readFileSync(
  `${__dirname}/../fonts/Inter-Regular.woff2`
).toString("base64");
const boldInter = readFileSync(
  `${__dirname}/../fonts/Inter-Bold.woff2`
).toString("base64");

function getCss(width: number, height: number) {
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
* {
  box-sizing: border-box;
}

body {
  width: ${width}px;
  height: ${height}px;
  padding: 0;
  margin: 0;
  background: linear-gradient(-45deg, rgba(238,238,238,1) 0%, rgba(240,240,240,1) 25%, rgba(255,255,255,1) 100%);
}
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
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
    font-size: 5rem;
    margin-top: 1rem;
  }

  .font-inter {
    font-family: 'Inter', sans-serif;
  }

  b {
    margin-left: 0.5rem;
  }

  /* line with highlight area */
  .sparkline {
    stroke: black;
    fill: rgba(128, 128, 128, .2);
  }

  .sparkline.green{
    stroke: green;
    fill: rgba(128, 255, 128, .2);
  }

  .sparkline.red{
    stroke: red;
    fill: rgba(255, 128, 128, .2);
  }


  .sparkline.orange{
    stroke: orange;
    fill: rgba(255, 255, 128, .2);
  }

  `;
}

interface ParsedRequest {
  confirmed?: number;
  recovered?: number;
  deaths?: number;
  lastUpdate?: string;
  dailyCases: any[];
  width: number;
  height: number;
  countryRegion?: string;
}

export function getHtml(parsedReq: ParsedRequest) {
  const {
    confirmed,
    recovered,
    deaths,
    lastUpdate,
    dailyCases,
    width,
    height,
    countryRegion
  } = parsedReq;
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(width, height)}
    </style>
    <script src="https://cdn.rawgit.com/fnando/sparkline/master/dist/sparkline.js"></script>
  </head>
  <body>
  
  ${
    dailyCases.length > 0
      ? `  <!-- width, height and stroke-width attributes must be defined on the target SVG -->
    <svg class="sparkline black" width="${width}" height="${height}" stroke-width="4" style="position: absolute; z-index:-1; opacity:0.5;"></svg>
    <svg class="sparkline green" width="${width}" height="${height}" stroke-width="2" style="position: absolute; z-index:-1; opacity:0.5; top: ${height -
          Math.floor(
            (recovered / confirmed) * height
          )}px;" stroke-dasharray="5,5"></svg>
    <svg class="sparkline red" width="${width}" height="${height}" stroke-width="4" style="position: absolute; z-index:-1; opacity:0.5; top: ${height -
          Math.floor((deaths / confirmed) * height)}px;" ></svg>
    <svg class="sparkline orange" width="${width}" height="${height}" stroke-width="4" style="position: absolute; z-index:-1; opacity:0.5; top: ${height -
          Math.floor(
            (dailyCases.slice(-1)[0].otherLocations / confirmed) * height
          )}px;"></svg>
    
    <script>
    
    const svgs = document.querySelectorAll(".sparkline")
    sparkline.sparkline(svgs[0], [${dailyCases
      .map(d => d.totalConfirmed)
      .join(", ")}, ${confirmed}]);
    svgs[1].setAttribute("height", Math.floor(${recovered}/${confirmed} * ${height}))
    sparkline.sparkline(svgs[1], [100,100,100]);
    svgs[2].setAttribute("height", Math.floor(${deaths}/${confirmed} * ${height}))
    sparkline.sparkline(svgs[2], [${dailyCases
      .map(d => d.deaths.total || 0)
      .join(", ")}]);
    svgs[3].setAttribute("height", Math.floor(${
      dailyCases.slice(-1)[0].otherLocations
    }/${confirmed} *  ${height}))
    sparkline.sparkline(svgs[3], [${dailyCases
      .map(d => d.otherLocations || 0)
      .join(", ")}]);
    </script>`
      : ""
  }
      <div class="wrapper">
        <div class="data-wrapper font-inter" style="font-weight: bold; font-size: 2rem; justify-content: flex-start; padding: 2rem 2rem; display: flex;flex-direction: column;align-items: flex-start;">
          <h1 style="margin: 0;font-size: 2rem;font-weight: normal; letter-spacing: 1px;">COVID-19 API</h1>
          <h2 style="margin: 0;">${countryRegion || "Global"}</h2>
        </div>
        <div class="data-wrapper" style="justify-content: space-between; flex: 1; padding: 0 2rem;">
          <div class="data">
            <div class="heading font-inter">Confirmed</div>
            <div class="value font-inter">${confirmed}</div>
            ${
              dailyCases.length > 0
                ? `<div class="heading font-inter" style="font-size: 1.25rem;background: orange;color: white;line-height: 1.5;padding: 0 0.5rem;"><b style="margin: 0;">${
                    dailyCases.slice(-1)[0].otherLocations
                  }</b> outside China <b style="margin: 0;">(${Math.trunc(
                    (dailyCases.slice(-1)[0].otherLocations / confirmed) * 100
                  )}%)</b></div>`
                : ""
            }
          </div>

          <div class="data">
            <div class="heading font-inter">Recovered</div>
            <div class="value font-inter" style="color:green;">${recovered}</div>
            <div class="heading font-inter" style="font-size: 1.25rem;background: green;color: white;line-height: 1.5;padding: 0 0.5rem;"><b style="margin: 0;">${Math.trunc(
              (recovered / confirmed) * 100
            )}%</b> recovery rate</div>
          </div>

          <div class="data">
            <div class="heading font-inter">Deaths</div>
            <div class="value font-inter" style="color:red;">${deaths}</div>
            <div class="heading font-inter" style="font-size: 1.25rem;background: red;color: white;line-height: 1.5;padding: 0 0.5rem;"><b style="margin: 0; ">${Math.trunc(
              (deaths / confirmed) * 100
            )}%</b> fatality rate</div>
          </div>
        </div>
        <div class="data-wrapper font-inter" style="margin: 2rem auto;">
          Last Update: <b>${lastUpdate}</b>. With ♥️ by <b>@mathdroid</b>
        <div>
      </div>
  </body>
</html>`;
}
