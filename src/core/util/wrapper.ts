import * as R from 'ramda';

import {
  IAllowEmptyFilterValueWrapper,
  IAlwaysResettableWrapper,
  IChangeableWrapper,
  IDecoratedWrapper,
  IDirtyWrapper,
  IDisabledWrapper,
  IErrorMessageRenderedWrapper,
  IErrorWrapper,
  IExpandActionRenderedWrapper,
  IFullWrapper,
  IMultiWrapper,
  INavigateBackWrapper,
  IPlaceActionRenderedWrapper,
  IProgressWrapper,
  IReadOnlyWrapper,
  IReadyWrapper,
  IRefreshOnUpdateWrapper,
  ISelectedWrapper,
  ITouchedWrapper,
  IUseZipCodeWrapper,
  IValidWrapper,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import { TypeUtils } from './type';
import { ValueUtils } from './value';

/**
 * See @Field
 *
 * @stable [30.01.2021]
 * @param wrapper
 */
const isValid = (wrapper: IValidWrapper): boolean => ValueUtils.isValid(wrapper?.valid);

/**
 * See @Field and @Form
 *
 * @stable [30.01.2021]
 * @param wrapper
 */
const isChangeable = (wrapper: IChangeableWrapper): boolean => wrapper?.changeable !== false;

/**
 * See @Field and @Form
 *
 * @stable [30.01.2021]
 * @param wrapper
 */
const isReadOnly = (wrapper: IReadOnlyWrapper): boolean => wrapper?.readOnly === true;

/**
 * @stable [30.01.2021]
 * @param wrapper
 */
const inProgress = (wrapper: IProgressWrapper): boolean => wrapper?.progress === true;

/**
 * @stable [28.11.2019]
 * @param {IReadyWrapper} entity
 * @returns {boolean}
 */
export const isReady = (entity: IReadyWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.ready === true, false);

/**
 * @stable [24.01.2020]
 * @param {IFullWrapper} entity
 * @returns {boolean}
 */
export const isFull = (entity: IFullWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.full !== false, false);

/**
 * @stable [28.11.2019]
 * @param {IErrorWrapper} entity
 * @returns {boolean}
 */
export const doesErrorExist = (entity: IErrorWrapper<string | boolean>): boolean =>
  ifNotNilThanValue(
    entity, () =>
      TypeUtils.isBoolean(entity.error)
        ? entity.error === true
        : !R.isNil(entity.error),
    false
  );

/**
 * @stable [03.02.2020]
 * @param {IDisabledWrapper} wrapper
 * @returns {boolean}
 */
export const isDisabled = (wrapper: IDisabledWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.disabled === true;

/**
 * @stable [03.02.2020]
 * @param {ISelectedWrapper} wrapper
 * @returns {boolean}
 */
const isSelected = (wrapper: ISelectedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.selected === true;

/**
 * @stable [03.02.2020]
 * @param {IExpandActionRenderedWrapper} wrapper
 * @returns {boolean}
 */
const isExpandActionRendered  = (wrapper: IExpandActionRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.expandActionRendered !== false;

/**
 * @stable [23.03.2020]
 * @param {IAlwaysResettableWrapper} wrapper
 * @returns {boolean}
 */
export const isAlwaysResettable = (wrapper: IAlwaysResettableWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.alwaysResettable === true;

/**
 * @stable [24.01.2020]
 * @param {IDecoratedWrapper} wrapper
 * @returns {boolean}
 */
const isDecorated = (wrapper: IDecoratedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.decorated !== false;

/**
 * @stable [13.11.2019]
 * @param {IMultiWrapper} wrapper
 * @returns {boolean}
 */
export const isMulti = (wrapper: IMultiWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.multi === true, false);

/**
 * @stable [16.01.2020]
 * @param {ITouchedWrapper} wrapper
 * @returns {boolean}
 */
const isTouched = (wrapper: ITouchedWrapper): boolean => R.isNil(wrapper) ? false : wrapper.touched === true;

/**
 * @stable [08.08.2020]
 * @param wrapper
 */
const isAllowEmptyFilterValue = (wrapper: IAllowEmptyFilterValueWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.allowEmptyFilterValue !== false;

/**
 * @stable [26.11.2019]
 * @param {IPlaceActionRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isPlaceActionRendered = (wrapper: IPlaceActionRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.placeActionRendered !== false;

/**
 * @stable [11.01.2020]
 * @param {IUseZipCodeWrapper} entity
 * @returns {boolean}
 */
export const isUseZipCode = (entity: IUseZipCodeWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.useZipCode === true, false);

/**
 * @stable [08.06.2020]
 * @param {IRefreshOnUpdateWrapper} wrapper
 * @returns {boolean}
 */
const isRefreshOnUpdateNeeded = (wrapper: IRefreshOnUpdateWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.refreshOnUpdate === true;

/**
 * @stable [01.08.2020]
 * @param entity
 */
export const isDirty = (entity: IDirtyWrapper): boolean =>
  R.isNil(entity) ? false : entity.dirty === true;

/**
 * @stable [18.12.2020]
 * @param wrapper
 */
const isErrorMessageRendered = (wrapper: IErrorMessageRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.errorMessageRendered !== false;

/**
 * @stable [09.09.2020]
 * @param wrapper
 */
const isNavigateBackNeeded = (wrapper: INavigateBackWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.navigateBack !== false;

/**
 * @stable [18.05.2020]
 */
export class WrapperUtils {
  public static readonly inProgress = inProgress;
  public static readonly isAllowEmptyFilterValue = isAllowEmptyFilterValue;
  public static readonly isChangeable = isChangeable;                                     /* @stable @stable [18.12.2020] */
  public static readonly isDecorated = isDecorated;
  public static readonly isDirty = isDirty;
  public static readonly isDisabled = isDisabled;
  public static readonly isErrorMessageRendered = isErrorMessageRendered;
  public static readonly isExpandActionRendered = isExpandActionRendered;
  public static readonly isFull = isFull;
  public static readonly isNavigateBackNeeded = isNavigateBackNeeded;
  public static readonly isReadOnly = isReadOnly;
  public static readonly isRefreshOnUpdateNeeded = isRefreshOnUpdateNeeded;
  public static readonly isSelected = isSelected;
  public static readonly isTouched = isTouched;
  public static readonly isValid = isValid;                                               /* @stable @stable [18.12.2020] */
}
