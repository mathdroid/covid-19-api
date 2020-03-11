import { NowRequest, NowResponse } from "@now/node";
import fetch from "isomorphic-unfetch";
import parse from "csv-parse/lib/sync";
import { normalizeKeys } from "../../util/data";

// https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/03-10-2020.csv

const getRequestDate = (date: Date) => {
  const [yyyy, mm, dd] = date
    .toISOString()
    .split("T")[0]
    .split("-");
  return `${mm}-${dd}-${yyyy}`;
};

const fetchCSVByDate = async (date: Date) => {
  const requestDate = getRequestDate(date);
  const data = await fetch(
    `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${requestDate}.csv`
  );
  const raw = await data.text();
  return raw;
};

export default async (request: NowRequest, response: NowResponse) => {
  const { date } = request.query;
  if (Array.isArray(date)) {
    throw new Error("Date must be singular");
  }
  try {
    const raw = await fetchCSVByDate(new Date(date));
    const parsed = parse(raw, {
      columns: true,
      skip_empty_lines: true
    }).map(normalizeKeys);
    if (parsed.length === 0) {
      response.status(404);
    }
    response.json(parsed);
  } catch (error) {
    throw new Error(error.message);
  }
};
