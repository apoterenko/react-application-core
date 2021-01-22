import { RegexpConstants } from '../definition';
import { TypeUtils } from './type';

/**
 * @stable [22.01.2021]
 * @param value
 */
const isStrong = (value: string): boolean => {
  if (TypeUtils.isNotEmptyString(value)) {
    return value.length >= 8
      && /[A-Z]/.test(value)
      && /[a-z]/.test(value)
      && RegexpConstants.SPECIAL_CHARACTER.test(value);
  }
  return false;
};

/**
 * @stable [22.01.2021]
 * @param value
 */
const isStrongOptional = (value: string): boolean => TypeUtils.isOptionalObject(value) || isStrong(value);

/**
 * @stable [03.11.2020]
 */
export class PasswordUtils {
  public static readonly isStrong = isStrong;
  public static readonly isStrongOptional = isStrongOptional;
}
