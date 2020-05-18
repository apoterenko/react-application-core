import * as R from 'ramda';

import {
  isDigit,
  isNumberLike,
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
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const numberLikeChecker = (value: AnyT): boolean => isNumberLike(value);

/**
 * @stable [06.12.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const optionalNumberLikeChecker = (value: AnyT): boolean => R.isNil(value) || numberLikeChecker(value);

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
  [ValidatorRuleEnum.NUMBER_LIKE]: numberLikeChecker,
  [ValidatorRuleEnum.OPTIONAL_NUMBER_LIKE]: optionalNumberLikeChecker,
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
