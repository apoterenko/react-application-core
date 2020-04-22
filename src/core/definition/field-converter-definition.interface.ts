import {
  AnyT,
  IConverterWrapper,
  IFromWrapper,
  IToWrapper,
  IValueWrapper,
} from '../definitions.interface';
import {
  IExtendedLabeledValueEntity,
  INamedEntity,
  IUserEntity,
} from '../definition';

/**
 * @stable [09.01.2020]
 */
export enum FieldConverterTypesEnum {
  CRON_EXPRESSION = 'CRON_EXPRESSION',
  CRON_PARAMETER = 'CRON_PARAMETER',
  DATES_RANGE_ENTITY = 'DATES_RANGE_ENTITY',
  DATES_RANGE_VALUE = 'DATES_RANGE_VALUE',
  DISPLAY_VALUE = 'DISPLAY_VALUE',
  EXTENDED_LABELED_VALUE_ENTITY = 'EXTENDED_LABELED_VALUE_ENTITY',
  GEO_CODER_RESULT = 'GEO_CODER_RESULT',
  ID = 'ID',
  NAMED_ENTITY = 'NAMED_ENTITY',
  OAUTH_JWT_DECODED_INFO = 'OAUTH_JWT_DECODED_INFO',
  PLACE_ENTITY = 'PLACE_ENTITY',
  PLACE_PARAMETER = 'PLACE_PARAMETER',
  SELECT_OPTION_ENTITY = 'SELECT_OPTION_ENTITY',
  USER_ENTITY = 'USER_ENTITY',
  ZIP_CODE_ENTITY = 'ZIP_CODE_ENTITY',
}

/**
 * @stable [09.01.2020]
 */
export interface IFieldConverterConfigEntity
  extends IConverterWrapper<(value: AnyT) => AnyT>,
    IFromWrapper<FieldConverterTypesEnum>,
    IToWrapper<FieldConverterTypesEnum>,
    IValueWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IFieldConverter {
  convert<TResult = AnyT>(config: IFieldConverterConfigEntity): TResult;
  converter(config: IFieldConverterConfigEntity): (value: AnyT) => AnyT;
  fromCronExpressionToCronParameter(value: string): string;
  fromNamedEntityToExtendedLabeledValueEntity(value: INamedEntity): IExtendedLabeledValueEntity;
  fromOAuthJwtDecodedInfoToUserEntity<TValue = AnyT>(value: TValue): IUserEntity;
  register(config: IFieldConverterConfigEntity): void;
}
