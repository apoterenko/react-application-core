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
  NUMBER_LIKE,
  OPTIONAL_NUMBER_LIKE,
  OPTIONAL_STRING,
  STRING,
}

/**
 * @stable [06.12.2019]
 */
export interface IValidationResultEntity
  extends IValidWrapper,
    IDataWrapper<Record<string, Record<ValidatorRuleEnum, boolean>>> {
}
