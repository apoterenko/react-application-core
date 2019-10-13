import { isString } from './type';
import {
  ifNotEmptyThanValue,
  ifNotNilThanValue,
} from './cond';
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
  ifNotNilThanValue(
    value,
    () => {
      let resultValue = value;
      if (isString(value)) {
        resultValue = (value as string).trim();
      }
      return ifNotEmptyThanValue(resultValue, () => resultValue);
    }, UNDEF_SYMBOL
  );
