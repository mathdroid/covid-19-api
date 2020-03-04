import { NowResponse } from "@now/node";

import { getConfirmed, getRecovered, getDeaths } from "../util/api";

export default async (_, response: NowResponse) => {
  const [confirmed, recovered, deaths] = await Promise.all([
    getConfirmed(),
    getRecovered(),
    getDeaths()
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
    source: "https://github.com/mathdroid/covid19"
  });
};
