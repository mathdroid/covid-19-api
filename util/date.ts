export const getIsoDateFromUnixTime = (unixTime: number) =>
  new Date(unixTime).toISOString().split("T")[0];
