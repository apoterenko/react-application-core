import * as R from 'ramda';

import { TypeUtils } from './type';
import { IKeyValue } from '../definitions.interface';
import {
  IValidationResultEntity,
  ValidationRulesEnum,
} from '../definition';

/**
 * @stable [07.09.2020]
 * @param value
 */
const positiveNumberChecker = (value: unknown): boolean => TypeUtils.isPositiveNumber(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const positiveOrNegativeNumberChecker = (value: unknown): boolean => TypeUtils.isNumber(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const positiveNumberLikeChecker = (value: unknown): boolean => TypeUtils.isPositiveNumberLike(value);

/**
 * @stable [29.07.2020]
 * @param value
 */
const positiveOrNegativeNumberLikeChecker = (value: unknown): boolean => TypeUtils.isPositiveOrNegativeNumberLike(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const positiveOrNegativeOptionalNumberLikeChecker = (value: unknown): boolean =>
  TypeUtils.isPositiveOrNegativeOptionalNumberLike(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const positiveOptionalNumberLikeChecker = (value: unknown): boolean =>
  TypeUtils.isPositiveOptionalNumberLike(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const stringChecker = (value): boolean => TypeUtils.isString(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const notEmptyStringChecker = (value: unknown): boolean => stringChecker(value) && !R.isEmpty(value);

/**
 * @stable [28.01.2019]
 */
export const ValidationRules = {
  [ValidationRulesEnum.NOT_EMPTY_STRING]: notEmptyStringChecker,
  [ValidationRulesEnum.POSITIVE_NUMBER]: positiveNumberChecker,
  [ValidationRulesEnum.POSITIVE_NUMBER_LIKE]: positiveNumberLikeChecker,
  [ValidationRulesEnum.POSITIVE_OPTIONAL_NUMBER_LIKE]: positiveOptionalNumberLikeChecker,
  [ValidationRulesEnum.POSITIVE_OR_NEGATIVE_NUMBER]: positiveOrNegativeNumberChecker,
  [ValidationRulesEnum.POSITIVE_OR_NEGATIVE_NUMBER_LIKE]: positiveOrNegativeNumberLikeChecker,
  [ValidationRulesEnum.POSITIVE_OR_NEGATIVE_OPTIONAL_NUMBER_LIKE]: positiveOrNegativeOptionalNumberLikeChecker,
  [ValidationRulesEnum.STRING]: stringChecker,
};

/**
 * @stable [17.04.2020]
 * @param {{[K in keyof TEntity]?: ValidatorRuleEnum[]}} payloads
 * @param {TEntity} checkedObject
 * @returns {IValidationResultEntity}
 */
export const validate =
  <TEntity extends IKeyValue = IKeyValue>(payloads: { [K in keyof TEntity]?: ValidationRulesEnum[] },
                                          checkedObject: TEntity): IValidationResultEntity => {
    const data = Object.create(null);
    let valid = true;

    R.forEachObjIndexed((rules, fieldName) => {
      const res = {};
      rules.forEach((ruleId) => valid = valid && (res[ruleId] = ValidationRules[ruleId](checkedObject[fieldName])));
      data[fieldName] = res;
    }, payloads);
    return {valid, data};
  };
