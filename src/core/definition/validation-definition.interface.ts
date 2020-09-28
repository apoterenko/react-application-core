import {
  IDataWrapper,
  IValidWrapper,
} from '../definitions.interface';

/**
 * @enum
 * @stable [07.09.2020]
 */
export enum ValidationRulesEnum {
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
}

/**
 * @stable [07.09.2020]
 */
export interface IValidationResultEntity
  extends IDataWrapper<Record<string, Record<ValidationRulesEnum, boolean>>>,
    IValidWrapper {
}
