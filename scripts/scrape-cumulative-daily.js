const fs = require("fs");
const fetch = require("isomorphic-unfetch");
const ObjectsToCsv = require("objects-to-csv");

const getISODate = date => date.toISOString().split("T")[0];
const addDays = (date, days) =>
  new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const begin = new Date("2020-01-22T00:00:00.000Z"); // Earliest data point in JHU CSSE
const tomorrow = getISODate(addDays(new Date(), 1)); // to be safe

async function main() {
  let rows = [];
  for (
    let i = 0, currentDay;
    (currentDay = getISODate(addDays(begin, i))), currentDay !== tomorrow;
    i++
  ) {
    console.log(`Scraping ${currentDay}`);
    const response = await fetch(
      `http://localhost:3000/api/daily/${currentDay}`
    );
    const cases = await response.json();
    rows = [...rows, ...cases];
  }
  const csv = new ObjectsToCsv(rows);
  await csv.toDisk("cumulative-daily.csv");
}

main();
