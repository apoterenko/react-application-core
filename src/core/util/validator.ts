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
 * @stable [28.09.2020]
 * @param value
 */
const notEmptyMultiEntityChecker = (value: unknown): boolean =>
  ObjectUtils.isObjectNotEmpty(MultiFieldUtils.multiFieldValueAsEntities(value));

/**
 * @stable [08.09.2020]
 */
const ValidationRules = {
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
 * @stable [08.09.2020]
 * @param payloads
 * @param checkedObject
 */
const validate =
  <TEntity extends IKeyValue = IKeyValue>(payloads: { [K in keyof TEntity]?: ValidationRulesEnum | ValidationRulesEnum[] },
                                          checkedObject: TEntity): IValidationResultEntity => {
    const data = Object.create(null);
    let valid = true;

    R.forEachObjIndexed((rules, fieldName) => {
      const res = Object.create(null);
      data[fieldName] = res;
      [].concat(rules)
        .forEach((ruleId) => valid = valid && (res[ruleId] = ValidationRules[ruleId](checkedObject[fieldName])));
    }, payloads);

    return {valid, data};
  };

/**
 * @stable [22.01.2021]
 * @param rules
 */
const isValid = (rules: ValidationRulesRecordT): boolean =>
  R.reduce((a, b) => a && b, true, Object.values(rules));

/**
 * @stable [08.09.2020]
 */
export class ValidatorUtils {
  public static readonly isValid = isValid;
  public static readonly validate = validate;
}
