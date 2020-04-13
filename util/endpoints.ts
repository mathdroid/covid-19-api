export const endpoints = {
  casesCounty:
    "https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/1/query",
  casesCountryRegion:
    "https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/2/query",
  casesProvinceState:
    "https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/3/query",
  casesOverTime:
    "https://services9.arcgis.com/N9p5hsImWXAccRNI/arcgis/rest/services/Nc2JKvYFoAEOFCG5JSI6/FeatureServer/4/query"
};

export const getEndpoint = (level: string) => {
  switch (level) {
    case "countryRegion":
      return endpoints.casesCountryRegion;
    case "provinceState":
      return endpoints.casesProvinceState;
    case "county":
      return endpoints.casesCounty;
    default:
      return endpoints.casesCounty;
  }
};
