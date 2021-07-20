import { Query, CreateQueryParams } from "./types";

const WHERE = {
  confirmed: `(Confirmed > 0)`,
  deaths: `(Deaths > 0)`,
  recovered: `(Recovered <> 0)`,
  all: `1=1`
};

export const createQuery = (queryParams: CreateQueryParams): Query => ({
  f: "json",
  outFields: "*",
  returnGeometry: false,
  ...queryParams,
  ...(queryParams.field != undefined && {
    outStatistics: `[{"statisticType":"sum","onStatisticField":"${queryParams.field}","outStatisticFieldName":"value"}]`
  })
});

export const withCountryRegion = (where: string, countryRegion?: string): string =>
  countryRegion ? `${where} AND (Country_Region='${countryRegion}')` : where;

export const queryConfirmed = (
  countryRegion?: string,
  shouldUseProvinceState?: boolean
): Query =>
  createQuery({
    where: countryRegion
      ? withCountryRegion(WHERE.confirmed, countryRegion)
      : WHERE.confirmed,
    orderByFields: `Confirmed desc, Country_Region asc${shouldUseProvinceState ? ",Province_State asc" : ""
      }`
  });

export const queryDeaths = (
  countryRegion?: string,
  shouldUseProvinceState?: boolean
): Query =>
  createQuery({
    where: countryRegion
      ? withCountryRegion(WHERE.deaths, countryRegion)
      : WHERE.deaths,
    orderByFields: `Deaths desc, Country_Region asc${shouldUseProvinceState ? ",Province_State asc" : ""
      }`
  });

export const queryRecovered = (
  countryRegion?: string,
  shouldUseProvinceState?: boolean
): Query =>
  createQuery({
    where: countryRegion
      ? withCountryRegion(WHERE.recovered, countryRegion)
      : WHERE.recovered,
    orderByFields: `Recovered desc, Country_Region asc${shouldUseProvinceState ? ",Province_State asc" : ""
      }`
  });

export const queryLastUpdate = (countryRegion?: string) => ({
  ...createQuery({
    where: withCountryRegion(WHERE.confirmed, countryRegion),
    orderByFields: "Last_Update desc"
  }),
  resultRecordCount: 1
});

export const queryTotalConfirmed = (countryRegion?: string): Query =>
  createQuery({
    where: withCountryRegion(WHERE.confirmed, countryRegion),
    field: "Confirmed"
  });

export const queryTotalDeaths = (countryRegion?: string): Query =>
  createQuery({
    where: withCountryRegion(WHERE.deaths, countryRegion),
    field: "Deaths"
  });

export const queryTotalRecovered = (countryRegion?: string): Query =>
  createQuery({
    where: withCountryRegion(WHERE.recovered, countryRegion),
    field: "Recovered",
  });

export const queryCasesTimeSeries = (): Query =>
  createQuery({
    where: WHERE.all,
    orderByFields: "Report_Date_String asc"
  });
