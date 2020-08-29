import {
  AnyT,
  EntityIdT,
  IConverterWrapper,
  IEntity,
  IFromWrapper,
  IToWrapper,
  IValueWrapper,
  StringNumberT,
} from '../definitions.interface';
import {
  INamedEntity,
  IPresetsRawDataLabeledValueEntity,
  IReduxUserEntity,
  MultiFieldValueT,
  PlaceEntityValueT,
  SelectValueT,
} from '../definition';

/**
 * @stable [09.01.2020]
 */
export enum FieldConverterTypesEnum {
  CRON_EXPRESSION = 'CRON_EXPRESSION',
  CRON_PARAMETER = 'CRON_PARAMETER',
  DATES_RANGE_ENTITY = 'DATES_RANGE_ENTITY',
  DATES_RANGE_VALUE = 'DATES_RANGE_VALUE',
  DEFINED_ENTITIES = 'DEFINED_ENTITIES',
  DISPLAY_VALUE = 'DISPLAY_VALUE',
  ENTITIES = 'ENTITIES',
  GEO_CODER_RESULT = 'GEO_CODER_RESULT',
  ID = 'ID',
  MULTI_FIELD_VALUE = 'MULTI_FIELD_VALUE',
  NAMED_ENTITY = 'NAMED_ENTITY',
  OAUTH_JWT_DECODED_INFO = 'OAUTH_JWT_DECODED_INFO',
  PLACE_ENTITY = 'PLACE_ENTITY',
  PLACE_PARAMETER = 'PLACE_PARAMETER',
  RAW_DATA_LABELED_VALUE_ENTITY = 'RAW_DATA_LABELED_VALUE_ENTITY',
  SELECT_VALUE = 'SELECT_VALUE',
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
  fromMultiFieldValueToDefinedEntities<TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[];          /* @stable [29.08.2020] */
  fromMultiFieldValueToEntities<TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[];                 /* @stable [29.08.2020] */
  fromNamedEntityToRawDataLabeledValueEntity(value: INamedEntity): IPresetsRawDataLabeledValueEntity;                             /* @stable [08.07.2020] */
  fromOAuthJwtDecodedInfoToUserEntity<TValue = AnyT>(value: TValue): IReduxUserEntity;
  fromPlaceEntityToDisplayValue(value: PlaceEntityValueT): string;
  fromPlaceEntityToPlaceParameter(value: PlaceEntityValueT): string;
  fromSelectValueToDisplayValue(value: SelectValueT): StringNumberT;                                                              /* @stable [08.08.2020] */
  fromSelectValueToId(value: SelectValueT): EntityIdT;                                                                            /* @stable [11.08.2020] */
  register(config: IFieldConverterConfigEntity): void;
}
