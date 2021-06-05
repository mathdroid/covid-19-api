import { NowResponse } from "@now/node";

import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getLastUpdate,
  getPredicitonDeaths,
  getPredictionRecov
} from "../util/api";

export default async (_, response: NowResponse) => {
  const [confirmed, recovered, deaths, projected_recovered, projected_dead, lastUpdate] = await Promise.all([
    getTotalConfirmed(),
    getTotalRecovered(),
    getTotalDeaths(),
    getPredictionRecov(),
    getPredictionDeaths(),
    getLastUpdate()
  ]);

  response.json({
    confirmed: {
      value: confirmed,
      detail: "https://covid19.mathdro.id/api/confirmed"
    },
    recovered: {
      value: recovered,
      detail: "https://covid19.mathdro.id/api/recovered"
    },
    deaths: {
      value: deaths,
      detail: "https://covid19.mathdro.id/api/deaths"
    },
    projectedDeaths: projected_dead,
    projectedRecovered: projected_recovered,
    dailySummary: "https://covid19.mathdro.id/api/daily",
    dailyTimeSeries: {
      pattern: "https://covid19.mathdro.id/api/daily/[dateString]",
      example: "https://covid19.mathdro.id/api/daily/2-14-2020"
    },
    image: "https://covid19.mathdro.id/api/og",
    source: "https://github.com/mathdroid/covid19",
    countries: "https://covid19.mathdro.id/api/countries",
    countryDetail: {
      pattern: "https://covid19.mathdro.id/api/countries/[country]",
      example: "https://covid19.mathdro.id/api/countries/USA"
    },
    lastUpdate
  });
};
