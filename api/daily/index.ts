import { NowResponse } from "@now/node";
import { getConfirmedGraph } from "../../util/api";

export default async (_, response: NowResponse) => {
  const result = Object.entries(
    (await getConfirmedGraph()).reduce(
      (acc, cur) => ({
        ...acc,
        [cur.date]: {
          confirmed:
            cur.confirmed + ((acc[cur.date] && acc[cur.date].confirmed) || 0),
          deltaConfirmed:
            cur.deltaConfirmed +
            ((acc[cur.date] && acc[cur.date].deltaConfirmed) || 0),
          deaths: cur.deaths + ((acc[cur.date] && acc[cur.date].deaths) || 0),
          active: cur.active + ((acc[cur.date] && acc[cur.date].active) || 0),
          deltaRecovered:
            cur.deltaRecovered +
            ((acc[cur.date] && acc[cur.date].deltaRecovered) || 0),
          incidentRate:
            cur.incidentRate +
            ((acc[cur.date] && acc[cur.date].incidentRate) || 0),
          peopleTested:
            cur.peopleTested +
            ((acc[cur.date] && acc[cur.date].peopleTested) || 0)
        }
      }),
      {}
    )
  );
  response.json(
    result.map(([date, data]: [string, any]) => ({
      ...data,
      date
    }))
  );
};
