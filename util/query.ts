const where = {
  confirmed: `(Confirmed > 0)`,
  deaths: `(Confirmed > 0) AND (Deaths > 0)`,
  recovered: `(Confirmed > 0) AND (Recovered <> 0)`,
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

export const queryConfirmed = (countryRegion?: string) =>
  createArrayQuery({
    where: withCountryRegion(where.confirmed, countryRegion),
    orderByFields: "Confirmed desc, Country_Region asc, Province_State asc"
  });

export const queryDeaths = (countryRegion?: string) =>
  createArrayQuery({
    where: withCountryRegion(where.deaths, countryRegion),
    orderByFields: "Deaths desc, Country_Region asc, Province_State asc"
  });

export const queryRecovered = (countryRegion?: string) =>
  createArrayQuery({
    where: withCountryRegion(where.recovered, countryRegion),
    orderByFields: "Recovered desc, Country_Region asc, Province_State asc"
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
