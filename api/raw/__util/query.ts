export const createSumQuery = (field: string) => ({
  f: "json",
  where: "1=1",
  returnGeometry: "false",
  spatialRel: "esriSpatialRelIntersects",
  outFields: "*",
  cacheHint: "true",
  outStatistics: `[{"statisticType":"sum","onStatisticField":"${field}","outStatisticFieldName":"value"}]`
});

export const createCountQuery = (field: string) => ({
  f: "json",
  where: "1=1",
  returnGeometry: "false",
  spatialRel: "esriSpatialRelIntersects",
  outFields: "*",
  cacheHint: "true",
  outStatistics: `[{"statisticType":"count","onStatisticField":"${field}","outStatisticFieldName":"value"}]`
});

interface SortOptions {
  resultOffset?: number;
  resultRecordCount?: number;
  where?: string;
}

export const createSortQuery = (orderByFields: string, opts?: SortOptions) => ({
  orderByFields,
  resultOffset: opts.resultOffset ?? 0,
  resultRecordCount: opts.resultRecordCount ?? 1000,
  f: `json`,
  where: opts.where ?? `1=1`,
  returnGeometry: false,
  spatialRel: `esriSpatialRelIntersects`,
  outFields: `*`,
  cacheHint: true
});

export const sortBy = {
  confirmed: `Confirmed desc`,
  recovered: `Recovered desc`,
  deaths: `Deaths desc`
};

export const createCountySortGroup = (field: string) =>
  `${sortBy[field] ?? sortBy.confirmed},Country_Region asc,Province_State asc`;

export const createRegionSortGroup = (field: string) =>
  `${sortBy[field] ?? sortBy.confirmed},Country_Region asc`;
