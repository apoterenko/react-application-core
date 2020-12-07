import * as R from 'ramda';
import { injectable } from 'inversify';
import {
  PhoneNumber as PN,
  PhoneNumberFormat as PNF,
  PhoneNumberUtil as PNU,
} from 'google-libphonenumber';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IPhoneConfigEntity,
  IPhoneConverter,
  IPhoneSettingsEntity,
} from '../../definition';
import { ISettingsEntity } from '../../settings';
import {
  ConditionUtils,
  NvlUtils,
  ObjectUtils,
  TypeUtils,
} from '../../util';
import { UNDEF_SYMBOL } from '../../definitions.interface';

@injectable()
export class PhoneConverter implements IPhoneConverter<PNF> {

  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  private readonly phoneUtilInstance = PNU.getInstance();

  /**
   * @stable [30.11.2020]
   * @param cfg
   */
  public parse(cfg: IPhoneConfigEntity<PNF>): PN {
    const {
      countryAbbr,
      value,
    } = cfg;

    if (ObjectUtils.isObjectEmpty(value)) {
      return null;
    }

    const $value = TypeUtils.isString(value) ? value as string : String(value);
    try {
      return this.phoneUtilInstance.parse($value, NvlUtils.nvl(countryAbbr, this.region));
    } catch (e) {
      return null;
    }
  }

  /**
   * @stable [30.11.2020]
   * @param cfg
   */
  public format(cfg: IPhoneConfigEntity<PNF>): string {
    const {
      value,
      format,
    } = cfg;

    const pnObject = this.parse(cfg);
    if (R.isNil(pnObject)) {
      return null;
    }

    try {
      return this.phoneUtilInstance.isValidNumber(pnObject)
        ? this.phoneUtilInstance.format(pnObject, format)
        : `${value}`;
    } catch (e) {
      return `${value}`;
    }
  }

  /**
   * @stable [30.11.2020]
   * @param cfg
   */
  public formatAsInternational(cfg: IPhoneConfigEntity<PNF>): string {
    return this.format({
      ...cfg,
      format: PNF.INTERNATIONAL,
    });
  }

  /**
   * @stable [30.11.2020]
   * @param cfg
   */
  public formatAsNational(cfg: IPhoneConfigEntity<PNF>): string {
    return this.format({
      ...cfg,
      format: PNF.NATIONAL,
    });
  }

  /**
   * @stable [30.11.2020]
   * @param cfg
   */
  public phoneParameter(cfg: IPhoneConfigEntity<PNF>): string {
    return ConditionUtils.ifNotNilThanValue(
      this.formatAsInternational(cfg),
      (formattedValue) => formattedValue.replace(/\D/g, ''),
      UNDEF_SYMBOL
    );
  }

  /**
   * @stable [30.11.2020]
   * @param config
   */
  public phoneDisplayValue(config: IPhoneConfigEntity<PNF>): string {
    return ConditionUtils.ifNotNilThanValue(
      this.parse(config),
      (cfg) => `${cfg.getNationalNumber()}`,
      UNDEF_SYMBOL
    );
  }

  /**
   * @stable [19.09.2020]
   */
  public get countryCodeByRegion(): string {
    return this.phoneUtilInstance.getCountryCodeForRegion(this.region);
  }

  /**
   * @stable [30.11.2020]
   */
  public get countryCodeByRegionDisplayValue(): string {
    return this.phoneSettings.regionCodeTemplate
      .replace('{value}', this.countryCodeByRegion);
  }

  /**
   * @stable [19.09.2020]
   */
  private get region(): string {
    return this.phoneSettings.countryAbbr;
  }

  /**
   * @stable [19.09.2020]
   */
  private get phoneSettings(): IPhoneSettingsEntity {
    return this.settings.phone;
  }
}
