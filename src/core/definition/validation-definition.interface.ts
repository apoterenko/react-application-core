import {
  IDataWrapper,
  IValidWrapper,
} from '../definitions.interface';

/**
 * @stable [06.12.2019]
 */
export enum ValidatorRuleEnum {
  DIGIT,
  NOT_EMPTY_STRING,
  OPTIONAL_NUMBER_LIKE,
  OPTIONAL_STRING,
  POSITIVE_OR_NEGATIVE_NUMBER_LIKE,
  STRING,
}

/**
 * @stable [06.12.2019]
 */
export interface IValidationResultEntity
  extends IValidWrapper,
    IDataWrapper<Record<string, Record<ValidatorRuleEnum, boolean>>> {
}
