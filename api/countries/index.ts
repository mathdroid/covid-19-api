import { NowResponse } from "@now/node";

export default async (_, res: NowResponse) => {
  // const availableCountries = (
  //   await fetchFeatures(getEndpoint("countryRegion"), queryConfirmed())
  // )
  //   .map(attributeSpreader)
  //   .map(normalizeKeys)
  //   .map(d => d.countryRegion)
  //   .map(countryRegion => {
  //     const iso2Country =
  //       countries[countryRegion] || aliases[countryRegion.toLowerCase()];
  //     const iso3Country = iso3[iso2Country];
  //     return {
  //       name: countryRegion,
  //       iso2: iso2Country,
  //       iso3: iso3Country
  //     };
  //   });
  // availableCountries.sort((a, b) => (a.name < b.name ? -1 : 1));
  res.json({ countries: [] });
};
