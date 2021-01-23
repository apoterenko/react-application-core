import {
  IDataWrapper,
  IValidWrapper,
} from '../definitions.interface';

/**
 * @enum
 * @stable [07.09.2020]
 */
export enum ValidationRulesEnum {
  EMAIL,
  EMAIL_OPTIONAL,
  NOT_EMPTY_MULTI_ENTITY,
  NOT_EMPTY_OBJECT,
  NOT_EMPTY_STRING,
  POSITIVE_NUMBER,
  POSITIVE_NUMBER_LIKE,
  POSITIVE_OPTIONAL_NUMBER_LIKE,
  POSITIVE_OR_NEGATIVE_NUMBER,
  POSITIVE_OR_NEGATIVE_NUMBER_LIKE,
  POSITIVE_OR_NEGATIVE_OPTIONAL_NUMBER_LIKE,
  STRING,
  STRONG_OPTIONAL_PASSWORD,
  STRONG_PASSWORD,
}

/**
 * @table [22.01.2021]
 */
export type ValidationRulesRecordT = Record<ValidationRulesEnum, boolean>;

/**
 * @entity
 * @stable [07.09.2020]
 */
export interface IValidationResultEntity<TEntity = unknown>
  extends IDataWrapper<Record<keyof TEntity, ValidationRulesRecordT>>,
    IValidWrapper {
}
