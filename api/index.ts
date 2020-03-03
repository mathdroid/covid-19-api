import { NowResponse } from "@now/node";

import { getConfirmed, getRecovered, getDeaths } from "../util/data";

export default async (_, response: NowResponse) => {
  const [confirmed, recovered, deaths] = await Promise.all([
    getConfirmed(),
    getRecovered(),
    getDeaths()
  ]);

  response.json({
    confirmed: {
      value: confirmed,
      detail: "/api/confirmed"
    },
    recovered: {
      value: recovered,
      detail: "/api/recovered"
    },
    deaths: {
      value: deaths,
      detail: "/api/deaths"
    },
    daily: "/api/daily",
    image: "/api/og"
  });
};
