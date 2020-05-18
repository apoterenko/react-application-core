import { TypeUtils } from './type';
import { ConditionUtils } from './cond';
import {
  AnyT,
  UNDEF_SYMBOL,
} from '../definitions.interface';

/**
 * @stable [13.10.2019]
 * @param {AnyT} value
 * @returns {AnyT}
 */
export const toStringParameter = (value: AnyT): AnyT =>
  ConditionUtils.ifNotNilThanValue(
    value,
    () => {
      let resultValue = value;
      if (TypeUtils.isString(value)) {
        resultValue = (value as string).trim();
      }
      return ConditionUtils.ifNotEmptyThanValue(resultValue, () => resultValue);
    },
    UNDEF_SYMBOL
  );
