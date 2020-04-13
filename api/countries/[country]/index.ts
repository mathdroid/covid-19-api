import { NowResponse, NowRequest } from "@now/node";

import globalHandler from "../../index";
import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getLastUpdate
} from "../../../util/api";

export default async (req: NowRequest, response: NowResponse) => {
  try {
    const country = req.query.country as string;
    if (typeof country === undefined) {
      return globalHandler(req, response);
    }
    const [confirmed, recovered, deaths, lastUpdate] = await Promise.all([
      getTotalConfirmed(country),
      getTotalRecovered(country),
      getTotalDeaths(country),
      getLastUpdate(country)
    ]);
    // console.log({ confirmed, recovered, deaths, lastUpdate });
    response.json({
      confirmed: {
        value: confirmed,
        detail: `https://covid19.mathdro.id/api/countries/${country}/confirmed`
      },
      recovered: {
        value: recovered,
        detail: `https://covid19.mathdro.id/api/countries/${country}/recovered`
      },
      deaths: {
        value: deaths,
        detail: `https://covid19.mathdro.id/api/countries/${country}/deaths`
      },
      lastUpdate
    });
  } catch (error) {
    response.statusCode = 404;
    response.json({
      error: {
        message: `Country \`${req.query.country}\` not found in JHU database`
      }
    });
  }
};
