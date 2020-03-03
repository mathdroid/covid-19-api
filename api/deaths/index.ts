import fetch from "isomorphic-unfetch";

import { NowResponse } from "@now/node";

import { attributeSpreader, normalizeKeys } from "../../util";

export default async (_, response: NowResponse) => {
  const res = await fetch(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=(Confirmed%20%3E%200)%20AND%20(Deaths%3E0)&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Deaths%20desc,Country_Region%20asc,Province_State%20asc&resultOffset=0&resultRecordCount=2000&cacheHint=true"
  );
  const { features } = await res.json();
  response.json(features.map(attributeSpreader).map(normalizeKeys));
};
