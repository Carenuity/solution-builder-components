import {
  countries,
  getCountryData,
  getEmojiFlag,
  TCountryCode,
} from 'countries-list';
import { CountryOptionItem } from './index.types';

export const getCountryList = () => {
  // get a list of country codes
  const countryCodes = Object.keys(countries) as TCountryCode[];

  // generate a list of country objects
  const countryNames: CountryOptionItem[] = countryCodes.map((code) => {
    const country = getCountryData(code);
    const emoji = getEmojiFlag(code);
    const name = country.name;

    const countryData: CountryOptionItem = {
      emoji,
      label: name,
      value: name,
    };
    return countryData;
  });

  // return the list of country objects
  return countryNames;
};
