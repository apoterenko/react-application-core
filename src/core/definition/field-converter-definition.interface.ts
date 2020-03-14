import {
  AnyT,
  IConverterWrapper,
  IFromWrapper,
  IToWrapper,
  IValueWrapper,
} from '../definitions.interface';
import { IUserEntity } from '../definition';

/**
 * @stable [09.01.2020]
 */
export enum FieldConverterTypesEnum {
  DATES_RANGE_ENTITY = 'DATES_RANGE_ENTITY',
  DATES_RANGE_VALUE = 'DATES_RANGE_VALUE',
  DISPLAY_VALUE = 'DISPLAY_VALUE',
  GEO_CODER_RESULT = 'GEO_CODER_RESULT',
  ID = 'ID',
  OAUTH_JWT_DECODED_INFO = 'OAUTH_JWT_DECODED_INFO',
  OAUTH_USER_INFO = 'OAUTH_USER_INFO',
  PLACE_ENTITY = 'PLACE_ENTITY',
  PLACE_PARAMETER = 'PLACE_PARAMETER',
  SELECT_OPTION_ENTITY = 'SELECT_OPTION_ENTITY',
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
  fromOAuthJwtDecodedInfoToOAuthUserInfo<TValue = AnyT>(value: TValue): IUserEntity;
  register(config: IFieldConverterConfigEntity): void;
}
