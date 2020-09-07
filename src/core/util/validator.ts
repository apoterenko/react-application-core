import * as R from 'ramda';

import { TypeUtils } from './type';
import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';
import {
  IValidationResultEntity,
  ValidationRulesEnum,
} from '../definition';

/**
 * @stable [29.07.2020]
 * @param value
 */
const positiveOrNegativeNumberLikeChecker = (value: AnyT): boolean => TypeUtils.isPositiveOrNegativeNumberLike(value);

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const optionalNumberLikeChecker = (value: AnyT): boolean => R.isNil(value) || positiveOrNegativeNumberLikeChecker(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const stringChecker = (value): boolean => TypeUtils.isString(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const notEmptyStringChecker = (value: AnyT): boolean => stringChecker(value) && !R.isEmpty(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const positiveNumberChecker = (value): boolean => TypeUtils.isPositiveNumber(value);

/**
 * @stable [28.01.2019]
 */
export const ValidationRules = {
  [ValidationRulesEnum.POSITIVE_NUMBER]: positiveNumberChecker,
  [ValidationRulesEnum.NOT_EMPTY_STRING]: notEmptyStringChecker,
  [ValidationRulesEnum.OPTIONAL_NUMBER_LIKE]: optionalNumberLikeChecker,
  [ValidationRulesEnum.POSITIVE_OR_NEGATIVE_NUMBER_LIKE]: positiveOrNegativeNumberLikeChecker,
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
