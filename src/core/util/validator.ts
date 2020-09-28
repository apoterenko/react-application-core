import * as R from 'ramda';

import { TypeUtils } from './type';
import { IKeyValue } from '../definitions.interface';
import {
  IValidationResultEntity,
  ValidationRulesEnum,
} from '../definition';
import { MultiFieldUtils } from './multi-field';
import { ObjectUtils } from './object';

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
 * @stable [07.09.2020]
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
const positiveOptionalNumberLikeChecker = (value: unknown): boolean => TypeUtils.isPositiveOptionalNumberLike(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const stringChecker = (value): boolean => TypeUtils.isString(value);

/**
 * @stable [07.09.2020]
 * @param value
 */
const notEmptyStringChecker = (value: unknown): boolean => TypeUtils.isNotEmptyString(value);

/**
 * @stable [28.09.2020]
 * @param value
 */
const notEmptyObjectChecker = (value: unknown): boolean => TypeUtils.isNotEmptyObject(value);

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
  [ValidationRulesEnum.NOT_EMPTY_OBJECT]: notEmptyObjectChecker,
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
 * @stable [08.09.2020]
 */
export class ValidatorUtils {
  public static readonly validate = validate;
}
