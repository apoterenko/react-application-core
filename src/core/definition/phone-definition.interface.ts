import {
  ICountryAbbrWrapper,
  IFormatWrapper,
  IValueWrapper,
  StringNumberT,
} from '../definitions.interface';

/**
 * @config-entity
 * @stable [19.09.2020]
 */
export interface IPhoneConfigEntity<TFormat>
  extends ICountryAbbrWrapper,
    IFormatWrapper<TFormat>,
    IValueWrapper<StringNumberT> {
}

/**
 * @stable [24.12.2019]
 */
export interface IPhoneEntity {
  getCountryCode?(): number;
  getNationalNumber?(): number;
}

/**
 * @stable [24.12.2019]
 */
export interface IPhoneConverter<TFormat = {}> {
  countryCodeByRegion: string;
  countryCodeByRegionDisplayValue: string;
  format(config: IPhoneConfigEntity<TFormat>): string;
  formatAsInternational(config: IPhoneConfigEntity<TFormat>): string;
  formatAsNational(config: IPhoneConfigEntity<TFormat>): string;
  parse(config: IPhoneConfigEntity<TFormat>): IPhoneEntity;
  phoneDisplayValue(config: IPhoneConfigEntity<TFormat>): string;
  phoneParameter(config: IPhoneConfigEntity<TFormat>): string;
}
