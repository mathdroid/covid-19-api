import { countries, iso3, getCountryName } from './countries';

describe('getCountryName', () => {

  test('returns undefined when countryName is invalid', () => {
    expect(getCountryName('')).toBe(undefined)
  })

  test('returns countryName if it exists in countries', () => {
    expect(getCountryName('United States')).toBe('United States');
  })

  test('converts ISO2 to jhu country name', () => {
    expect(getCountryName('PL')).toBe('Poland');
    expect(getCountryName('KR')).toBe('Korea, South');
  })

  test('converts ISO3 to jhu country name', () => {
    expect(getCountryName('DEU')).toBe('Germany');
  })

  test('converts aliases to jhu country names', () => {
    expect(getCountryName('taiwan')).toBe('Taiwan*');
    expect(getCountryName('north Korea')).toBe("People's Republic of Korea");
    expect(getCountryName('Gambia')).toBe('Gambia, The');
  })
})