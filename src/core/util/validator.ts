import * as R from 'ramda';

import { TypeUtils } from './type';
import { IKeyValue } from '../definitions.interface';
import {
  IValidationResultEntity,
  ValidationRulesEnum,
  ValidationRulesRecordT,
} from '../definition';
import { MultiFieldUtils } from './multi-field';
import { ObjectUtils } from './object';
import { PasswordUtils } from './password';

/**
 * @stable [22.01.2021]
 * @param value
 */
const notEmptyMultiEntityChecker = (value: unknown): boolean =>
  ObjectUtils.isObjectNotEmpty(MultiFieldUtils.multiFieldValueAsEntities(value));

/**
 * @stable [22.01.2021]
 */
const ValidationRules = {
  [ValidationRulesEnum.EMAIL]: TypeUtils.isEmail,
  [ValidationRulesEnum.EMAIL_OPTIONAL]: TypeUtils.isOptionalEmail,
  [ValidationRulesEnum.NOT_EMPTY_MULTI_ENTITY]: notEmptyMultiEntityChecker,
  [ValidationRulesEnum.NOT_EMPTY_OBJECT]: TypeUtils.isNotEmptyObject,
  [ValidationRulesEnum.NOT_EMPTY_STRING]: TypeUtils.isNotEmptyString,
  [ValidationRulesEnum.POSITIVE_NUMBER]: TypeUtils.isPositiveNumber,
  [ValidationRulesEnum.POSITIVE_NUMBER_LIKE]: TypeUtils.isPositiveNumberLike,
  [ValidationRulesEnum.POSITIVE_OPTIONAL_NUMBER_LIKE]: TypeUtils.isPositiveOptionalNumberLike,
  [ValidationRulesEnum.POSITIVE_OR_NEGATIVE_NUMBER]: TypeUtils.isNumber,
  [ValidationRulesEnum.POSITIVE_OR_NEGATIVE_NUMBER_LIKE]: TypeUtils.isPositiveOrNegativeNumberLike,
  [ValidationRulesEnum.POSITIVE_OR_NEGATIVE_OPTIONAL_NUMBER_LIKE]: TypeUtils.isPositiveOrNegativeOptionalNumberLike,
  [ValidationRulesEnum.STRING]: TypeUtils.isString,
  [ValidationRulesEnum.STRONG_OPTIONAL_PASSWORD]: PasswordUtils.isStrongOptional,
  [ValidationRulesEnum.STRONG_PASSWORD]: PasswordUtils.isStrong,
};

/**
 * @stable [22.01.2021]
 * @param payloads
 * @param checkedObject
 */
const validate =
  <TEntity extends IKeyValue = IKeyValue>(payloads: { [K in keyof TEntity]?: ValidationRulesEnum | ValidationRulesEnum[] },
                                          checkedObject: TEntity): IValidationResultEntity => {
    const data = Object.create(null);
    let valid = true;

    R.forEachObjIndexed(
      (rules, fieldName) => {
        const result = Object.create(null);
        data[fieldName] = result;

        [].concat(rules)
          .forEach((ruleId) => {
            const validator = ValidationRules[ruleId];
            const res = result[ruleId] = !TypeUtils.isFn(validator) || validator(checkedObject[fieldName]);
            valid = valid && res;
          });
      },
      payloads
    );

    return {
      data,
      valid,
    };
  };

/**
 * @stable [22.01.2021]
 * @param rules
 */
const isValid = (rules: ValidationRulesRecordT): boolean =>
  R.reduce((a, b) => a && b, true, Object.values(rules));

/**
 * @stable [22.01.2021]
 */
export class ValidatorUtils {
  public static readonly isValid = isValid;
  public static readonly validate = validate;
}
