declare module "countries-phone-masks" {
  interface ICountryData {
    name: string;
    code: string;
    iso: string;
    flag: string;
    mask: Array<string>;
  }
  const countries: Array<ICountryData>;
  export default countries;
}
