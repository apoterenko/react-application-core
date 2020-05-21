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
  IExtendedLabeledValueEntity,
  INamedEntity,
  IReduxUserEntity,
  MultiFieldEntityT,
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
  EXTENDED_LABELED_VALUE_ENTITY = 'EXTENDED_LABELED_VALUE_ENTITY',
  GEO_CODER_RESULT = 'GEO_CODER_RESULT',
  ID = 'ID',
  MULTI_FIELD_ENTITY = 'MULTI_FIELD_ENTITY',
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
  fromMultiFieldEntityToDefinedEntities<TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>): TEntity[];
  fromMultiFieldEntityToEntities<TEntity extends IEntity = IEntity>(entity: MultiFieldEntityT<TEntity>): TEntity[];
  fromNamedEntityToExtendedLabeledValueEntity(value: INamedEntity): IExtendedLabeledValueEntity;
  fromOAuthJwtDecodedInfoToUserEntity<TValue = AnyT>(value: TValue): IReduxUserEntity;
  fromPlaceEntityToDisplayValue(value: PlaceEntityValueT): string;
  fromPlaceEntityToPlaceParameter(value: PlaceEntityValueT): string;
  fromSelectOptionEntityToDisplayValue(option: SelectValueT): StringNumberT;
  fromSelectOptionEntityToId(option: SelectValueT): EntityIdT;
  register(config: IFieldConverterConfigEntity): void;
}
