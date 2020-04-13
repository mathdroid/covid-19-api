import unfetch from "isomorphic-unfetch";
import withRetry from "@zeit/fetch-retry";

const fetch = withRetry(unfetch);

export default async (req, res) => {
  res.json(
    await (
      await fetch(
        "https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22value%22%7D%5D&cacheHint=true",
        {
          method: "GET",
          headers: {
            authority: "services9.arcgis.com",
            pragma: "no-cache",
            "cache-control": "no-cache",
            "sec-fetch-dest": "empty",
            "user-agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
            dnt: "1",
            accept: "*/*",
            origin: "https://gisanddata.maps.arcgis.com",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            referer:
              "https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html",
            "accept-language": "en-US,en;q=0.9,id;q=0.8,ms;q=0.7"
          }
        }
      )
    ).json()
  );
};
