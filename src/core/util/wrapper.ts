import * as R from 'ramda';

import {
  IPreventFocusWrapper,
  IProgressWrapper,
  IUseKeyboardWrapper,
  IValidWrapper,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';

/**
 * @stable [24.10.2019]
 * @param {IValidWrapper} validEntity
 * @returns {boolean}
 */
export const isValid = (validEntity: IValidWrapper): boolean =>
  ifNotNilThanValue(
    validEntity,
    () => R.isNil(validEntity.valid) || validEntity.valid === true,
    true
  );

/**
 * @stable [24.10.2019]
 * @param {IPreventFocusWrapper} preventFocusEntity
 * @returns {boolean}
 */
export const isFocusPrevented = (preventFocusEntity: IPreventFocusWrapper): boolean =>
  ifNotNilThanValue(
    preventFocusEntity,
    () => preventFocusEntity.preventFocus === true,
    false
  );

/**
 * @stable [24.10.2019]
 * @param {IProgressWrapper} progressEntity
 * @returns {boolean}
 */
export const inProgress = (progressEntity: IProgressWrapper): boolean =>
  ifNotNilThanValue(
    progressEntity,
    () => progressEntity.progress === true,
    false
  );

/**
 * @stable [24.10.2019]
 * @param {IUseKeyboardWrapper} useKeyboardEntity
 * @returns {boolean}
 */
export const isKeyboardUsed = (useKeyboardEntity: IUseKeyboardWrapper): boolean =>
  ifNotNilThanValue(
    useKeyboardEntity,
    () => useKeyboardEntity.useKeyboard === true,
    false
  );
