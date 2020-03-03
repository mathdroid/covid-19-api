import fetch from "isomorphic-unfetch";

import { NowResponse } from "@now/node";

import { attributeSpreader, normalizeKeys } from "../util";

export default async (_, response: NowResponse) => {
  const res = await fetch(
    "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/cases_time_v3/FeatureServer/0/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Report_Date_String%20asc&resultOffset=0&resultRecordCount=2000&cacheHint=true"
  );
  const { features } = await res.json();
  response.json(features.map(attributeSpreader).map(normalizeKeys));
};
