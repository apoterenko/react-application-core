import * as R from 'ramda';

import {
  isDigit,
  TypeUtils,
} from './type';
import {
  AnyT,
  IKeyValue,
} from '../definitions.interface';
import {
  IValidationResultEntity,
  ValidatorRuleEnum,
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
 * @stable [06.12.2019]
 * @param value
 * @returns {boolean}
 */
export const stringChecker = (value): boolean => TypeUtils.isString(value);

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const notEmptyString = (value: AnyT): boolean => !R.isEmpty(value) && stringChecker(value);

/**
 * @stable [06.12.2019]
 * @param value
 * @returns {boolean}
 */
export const digitChecker = (value): boolean => isDigit(value);

/**
 * @stable [28.01.2019]
 */
export const ValidationRules = {
  [ValidatorRuleEnum.DIGIT]: digitChecker,
  [ValidatorRuleEnum.NOT_EMPTY_STRING]: notEmptyString,
  [ValidatorRuleEnum.OPTIONAL_NUMBER_LIKE]: optionalNumberLikeChecker,
  [ValidatorRuleEnum.POSITIVE_OR_NEGATIVE_NUMBER_LIKE]: positiveOrNegativeNumberLikeChecker,
  [ValidatorRuleEnum.STRING]: stringChecker,
};

/**
 * @stable [17.04.2020]
 * @param {{[K in keyof TEntity]?: ValidatorRuleEnum[]}} payloads
 * @param {TEntity} checkedObject
 * @returns {IValidationResultEntity}
 */
export const validate =
  <TEntity extends IKeyValue = IKeyValue>(payloads: { [K in keyof TEntity]?: ValidatorRuleEnum[] },
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
