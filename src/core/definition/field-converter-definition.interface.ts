import {
  EntityIdT,
  IConverterWrapper,
  IEntity,
  IFromWrapper,
  IToWrapper,
  IValueWrapper,
  StringNumberT,
} from '../definitions.interface';
import {
  IMultiFieldValueMergeConfigEntity,
  INamedEntity,
  IPresetsRawDataLabeledValueEntity,
  IReduxUserEntity,
  MultiFieldValueT,
  NotMultiFieldValueT,
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
  EDIT_ENTITIES = 'EDIT_ENTITIES',
  ENTITIES = 'ENTITIES',
  GEO_CODER_RESULT = 'GEO_CODER_RESULT',
  ID = 'ID',
  MULTI_FIELD_VALUE = 'MULTI_FIELD_VALUE',
  NAMED_ENTITY = 'NAMED_ENTITY',
  NOT_MULTI_FIELD_VALUE = 'NOT_MULTI_FIELD_VALUE',
  OAUTH_JWT_DECODED_INFO = 'OAUTH_JWT_DECODED_INFO',
  PLACE_ENTITY = 'PLACE_ENTITY',
  PLACE_PARAMETER = 'PLACE_PARAMETER',
  RAW_DATA_LABELED_VALUE_ENTITY = 'RAW_DATA_LABELED_VALUE_ENTITY',
  RAW_VALUE = 'RAW_VALUE',
  SELECT_VALUE = 'SELECT_VALUE',
  TRUE_ENTITIES_OBJECT = 'TRUE_ENTITIES_OBJECT',
  USER_ENTITY = 'USER_ENTITY',
  ZIP_CODE_ENTITY = 'ZIP_CODE_ENTITY',
}

/**
 * @config-entity
 * @stable [09.01.2020]
 */
export interface IFieldConverterConfigEntity
  extends IConverterWrapper<(value: unknown) => unknown>,
    IFromWrapper<FieldConverterTypesEnum>,
    IToWrapper<FieldConverterTypesEnum>,
    IValueWrapper {
}

/**
 * @stable [09.01.2020]
 */
export interface IFieldConverter {
  // tslint:disable:max-line-length
  convert<TResult = unknown>(config: IFieldConverterConfigEntity): TResult;                                                                                                     /* @stable [01.09.2020] */
  converter(config: IFieldConverterConfigEntity): (value: unknown) => unknown;                                                                                                  /* @stable [01.09.2020] */
  fromCronExpressionToCronParameter(value: string): string;
  fromMultiFieldValueToDefinedEntities<TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[];                                                        /* @stable [29.08.2020] */
  fromMultiFieldValueToEditEntities<TEntity extends IEntity = IEntity>(value: MultiFieldValueT<TEntity>): TEntity[];                                                            /* @stable [03.09.2020] */
  fromMultiFieldValueToEntities<TEntity extends IEntity = IEntity>(entity: MultiFieldValueT<TEntity>): TEntity[];                                                               /* @stable [29.08.2020] */
  fromMultiFieldValueToTrueEntitiesObject<TEntity extends IEntity = IEntity>(value: IMultiFieldValueMergeConfigEntity<TEntity>): Record<EntityIdT, boolean>;   /* @stable [04.09.2020] */
  fromNamedEntityToRawDataLabeledValueEntity(value: INamedEntity): IPresetsRawDataLabeledValueEntity;                                                                           /* @stable [08.07.2020] */
  fromNotMultiFieldValueToEntities<TEntity extends IEntity = IEntity>(value: NotMultiFieldValueT<TEntity>): TEntity[];
  fromOAuthJwtDecodedInfoToUserEntity<TValue = unknown>(value: TValue): IReduxUserEntity;
  fromPlaceEntityToDisplayValue(value: PlaceEntityValueT): string;
  fromPlaceEntityToPlaceParameter(value: PlaceEntityValueT): string;
  fromSelectValueToDisplayValue(value: SelectValueT): StringNumberT;                                                                                                            /* @stable [08.08.2020] */
  fromSelectValueToId(value: SelectValueT): EntityIdT;                                                                                                                          /* @stable [11.08.2020] */
  fromSelectValueToPositiveOrNegativeNumberLikeId(value: SelectValueT): EntityIdT;                                                                                              /* @stable [07.12.2020] */
  fromSelectValueToRawValue<TEntity = IEntity>(value: SelectValueT): TEntity;                                                                                                   /* @stable [28.10.2020] */
  register(config: IFieldConverterConfigEntity): void;                                                                                                                          /* @stable [01.09.2020] */
  // tslint:enable:max-line-length
}
