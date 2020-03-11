import { NowResponse } from "@now/node";

import { countries, iso3 } from "../../util/countries";

export default (_, res: NowResponse) => {
  res.json({ countries, iso3 });
};
