import * as R from 'ramda';

import { isNumber, isString } from './type';
import {
  IKeyValue,
  AnyT,
  IDataWrapper,
  IValidWrapper,
} from '../definitions.interface';

/**
 * @stable [28.01.2019]
 */
export enum ValidatorRuleEnum {
  NOT_NULL_NUMBER,
  OPTIONAL_NUMBER,
  NOT_EMPTY_STRING,
}

/**
 * @stable [28.01.2019]
 */
interface IValidationResultEntity extends IValidWrapper,
                                          IDataWrapper<Record<string, Record<ValidatorRuleEnum, boolean>>> {
}

/**
 * @stable [28.01.2019]
 * @param value
 * @returns {boolean}
 */
export const notNullNumber = (value): boolean => isNumber(value);

/**
 * @stable [28.01.2019]
 * @param value
 * @returns {boolean}
 */
export const notNullString = (value): boolean => isString(value);

/**
 * @stable [28.01.2019]
 * @param value
 * @returns {boolean}
 */
export const optionalNumber = (value: AnyT): boolean => R.isNil(value) || notNullNumber(value);

/**
 * @stable [28.01.2019]
 * @param {AnyT} value
 * @returns {boolean}
 */
export const notEmptyString = (value: AnyT): boolean => notNullString(value) && !R.isEmpty(value);

/**
 * @stable [28.01.2019]
 */
export const ValidationRules = {
  [ValidatorRuleEnum.NOT_NULL_NUMBER]: notNullNumber,
  [ValidatorRuleEnum.OPTIONAL_NUMBER]: optionalNumber,
  [ValidatorRuleEnum.NOT_EMPTY_STRING]: notEmptyString,
};

/**
 * @stable [28.01.2019]
 * @param {Record<string, ValidatorRuleEnum[]>} payloads
 * @param {IKeyValue} checkedObject
 * @returns {IValidationResultEntity}
 */
export const validate = (payloads: Record<string, ValidatorRuleEnum[]>, checkedObject: IKeyValue): IValidationResultEntity => {
  const data = {};
  let valid = true;
  R.forEachObjIndexed((rules, fieldName) => {
    const res = {};
    rules.forEach((ruleId) => valid = valid && (res[ruleId] = ValidationRules[ruleId](checkedObject[fieldName])));
    data[fieldName] = res;
  }, payloads);
  return {valid, data};
};
