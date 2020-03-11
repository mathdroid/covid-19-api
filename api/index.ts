import { NowResponse } from "@now/node";

import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getLastUpdate
} from "../util/api";

export default async (_, response: NowResponse) => {
  const [confirmed, recovered, deaths, lastUpdate] = await Promise.all([
    getTotalConfirmed(),
    getTotalRecovered(),
    getTotalDeaths(),
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
    daily: "https://covid19.mathdro.id/api/daily",
    image: "https://covid19.mathdro.id/api/og",
    source: "https://github.com/mathdroid/covid19",
    countries: "https://covid19.mathdro.id/api/countries",
    countryDetail: "https://covid19.mathdro.id/api/countries/[country]",
    lastUpdate
  });
};
