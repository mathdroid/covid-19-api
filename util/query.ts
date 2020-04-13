const where = {
  confirmed: `(Confirmed > 0)`,
  deaths: `(Deaths > 0)`,
  recovered: `(Recovered <> 0)`,
  all: `1=1`
};

export const createQuery = ({ where }) => ({
  f: "json",
  outFields: "*",
  returnGeometry: false,
  where
});

export const withCountryRegion = (where: string, countryRegion?: string) =>
  countryRegion ? `${where} AND (Country_Region='${countryRegion}')` : where;

export const createArrayQuery = ({ where, orderByFields }) => ({
  ...createQuery({ where }),
  orderByFields
});

export const queryConfirmed = (
  countryRegion?: string,
  shouldUseProvinceState?: boolean
) =>
  createArrayQuery({
    where: countryRegion
      ? withCountryRegion(where.confirmed, countryRegion)
      : where.confirmed,
    orderByFields: `Confirmed desc, Country_Region asc${
      shouldUseProvinceState ? ",Province_State asc" : ""
    }`
  });

export const queryDeaths = (
  countryRegion?: string,
  shouldUseProvinceState?: boolean
) =>
  createArrayQuery({
    where: countryRegion
      ? withCountryRegion(where.deaths, countryRegion)
      : where.deaths,
    orderByFields: `Deaths desc, Country_Region asc${
      shouldUseProvinceState ? ",Province_State asc" : ""
    }`
  });

export const queryRecovered = (
  countryRegion?: string,
  shouldUseProvinceState?: boolean
) =>
  createArrayQuery({
    where: countryRegion
      ? withCountryRegion(where.recovered, countryRegion)
      : where.recovered,
    orderByFields: `Recovered desc, Country_Region asc${
      shouldUseProvinceState ? ",Province_State asc" : ""
    }`
  });

export const queryLastUpdate = (countryRegion?: string) => ({
  ...createArrayQuery({
    where: withCountryRegion(where.confirmed, countryRegion),
    orderByFields: "Last_Update desc"
  }),
  resultRecordCount: 1
});

export const createTotalQuery = ({ where, field }) => ({
  ...createQuery({ where }),
  outStatistics: `[{"statisticType":"sum","onStatisticField":"${field}","outStatisticFieldName":"value"}]`
});

export const queryTotalConfirmed = (countryRegion?: string) =>
  createTotalQuery({
    where: withCountryRegion(where.confirmed, countryRegion),
    field: "Confirmed"
  });

export const queryTotalDeaths = (countryRegion?: string) =>
  createTotalQuery({
    where: withCountryRegion(where.deaths, countryRegion),
    field: "Deaths"
  });

export const queryTotalRecovered = (countryRegion?: string) =>
  createTotalQuery({
    where: withCountryRegion(where.recovered, countryRegion),
    field: "Recovered"
  });

export const queryCasesTimeSeries = () =>
  createArrayQuery({
    where: where.all,
    orderByFields: "Report_Date_String asc"
  });
