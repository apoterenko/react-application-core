import {
  ICountryAbbrWrapper,
  IFormatWrapper,
  IValueWrapper,
  StringNumberT,
} from '../definitions.interface';

/**
 * @stable [24.12.2019]
 */
export interface IPhoneConfigEntity<TFormat>
  extends IValueWrapper<StringNumberT>,
    IFormatWrapper<TFormat>,
    ICountryAbbrWrapper {
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
  format(config: IPhoneConfigEntity<TFormat>): string;
  parse(config: IPhoneConfigEntity<TFormat>): IPhoneEntity;
}
