import * as R from 'ramda';

import {
  IAllowEmptyFilterValueWrapper,
  IAlwaysResettableWrapper,
  ICalendarActionRenderedWrapper,
  IChangeableWrapper,
  IDecoratedWrapper,
  IDirtyWrapper,
  IDisabledWrapper,
  IEditedWrapper,
  IErrorMessageRenderedWrapper,
  IErrorWrapper,
  IExpandActionRenderedWrapper,
  IFullWrapper,
  IMultiWrapper,
  INavigateBackWrapper,
  IOpenedWrapper,
  IPlaceActionRenderedWrapper,
  IPreventFocusWrapper,
  IPreventManualChangesWrapper,
  IProgressWrapper,
  IRangeEnabledWrapper,
  IReadOnlyWrapper,
  IReadyWrapper,
  IRefreshOnUpdateWrapper,
  ISelectedWrapper,
  ISortableWrapper,
  ITouchedWrapper,
  IUsePeriodNavigatorWrapper,
  IUsePreviewWrapper,
  IUseZipCodeWrapper,
  IValidWrapper,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import { TypeUtils } from './type';
import { ValueUtils } from './value';

/**
 * @stable [08.06.2020]
 * @param {IValidWrapper} wrapper
 * @returns {boolean}
 */
const isValid = (wrapper: IValidWrapper): boolean =>
  R.isNil(wrapper)
    ? false
    : ValueUtils.isValueValid(wrapper.valid);

/**
 * @stable [03.02.2020]
 * @param {IPreventManualChangesWrapper} wrapper
 * @returns {boolean}
 */
const areManualChangesNotPrevented = (wrapper: IPreventManualChangesWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.preventManualChanges !== true;

/**
 * @stable [30.01.2020]
 * @param {IPreventFocusWrapper} wrapper
 * @returns {boolean}
 */
const isFocusPrevented = (wrapper: IPreventFocusWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.preventFocus === true;

/**
 * @stable [22.08.2020]
 * @param wrapper
 */
const isChangeable = (wrapper: IChangeableWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.changeable !== false;

/**
 * @stable [22.08.2020]
 * @param wrapper
 */
const isReadOnly = (wrapper: IReadOnlyWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.readOnly === true;

/**
 * @stable [02.08.2020]
 * @param wrapper
 */
const inProgress = (wrapper: IProgressWrapper): boolean => R.isNil(wrapper) ? false : wrapper.progress === true;

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
 * @stable [06.03.2020]
 * @param {IRangeEnabledWrapper} wrapper
 * @returns {boolean}
 */
export const isRangeEnabled = (wrapper: IRangeEnabledWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.rangeEnabled === true;

/**
 * @stable [26.10.2019]
 * @param {IEditedWrapper} editedEntity
 * @returns {boolean}
 */
export const isEdited = (editedEntity: IEditedWrapper): boolean =>
  ifNotNilThanValue(editedEntity, () => editedEntity.edited === true, false);

/**
 * @stable [26.10.2019]
 * @param {ISortableWrapper} wrapper
 * @returns {boolean}
 */
export const isSortable = (wrapper: ISortableWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.sortable === true, false);

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
 * @stable [03.02.2020]
 * @param {ICalendarActionRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isCalendarActionRendered = (wrapper: ICalendarActionRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.calendarActionRendered !== false;

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
 * @stable [16.02.2020]
 * @param {IErrorMessageRenderedWrapper} wrapper
 * @returns {boolean}
 */
const isErrorMessageRendered = (wrapper: IErrorMessageRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.errorMessageRendered !== false;

/**
 * @stable [15.03.2020]
 * @param {IOpenedWrapper} wrapper
 * @returns {boolean}
 */
export const isOpened = (wrapper: IOpenedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.opened === true;

/**
 * @stable [16.03.2020]
 * @param {IUsePreviewWrapper} wrapper
 * @returns {boolean}
 */
export const isPreviewUsed = (wrapper: IUsePreviewWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.usePreview !== false;

/**
 * @stable [25.03.2020]
 * @param {IUsePeriodNavigatorWrapper} wrapper
 * @returns {boolean}
 */
export const isPeriodNavigatorUsed = (wrapper: IUsePeriodNavigatorWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.usePeriodNavigator === true;

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
  public static readonly areManualChangesNotPrevented = areManualChangesNotPrevented;      /* @stable [03.06.2020] */
  public static readonly inProgress = inProgress;                                          /* @stable [19.05.2020] */
  public static readonly isAllowEmptyFilterValue = isAllowEmptyFilterValue;                /* @stable [08.08.2020] */
  public static readonly isChangeable = isChangeable;                                      /* @stable [22.08.2020] */
  public static readonly isDecorated = isDecorated;                                        /* @stable [02.06.2020] */
  public static readonly isDirty = isDirty;                                                /* @stable [01.08.2020] */
  public static readonly isDisabled = isDisabled;                                          /* @stable [01.06.2020] */
  public static readonly isErrorMessageRendered = isErrorMessageRendered;                  /* @stable [18.06.2020] */
  public static readonly isExpandActionRendered = isExpandActionRendered;                  /* @stable [16.06.2020] */
  public static readonly isFocusPrevented = isFocusPrevented;                              /* @stable [03.06.2020] */
  public static readonly isFull = isFull;                                                  /* @stable [20.05.2020] */
  public static readonly isNavigateBackNeeded = isNavigateBackNeeded;                      /* @stable [09.09.2020] */
  public static readonly isReadOnly = isReadOnly;                                          /* @stable [22.08.2020] */
  public static readonly isRefreshOnUpdateNeeded = isRefreshOnUpdateNeeded;                /* @stable [08.06.2020] */
  public static readonly isSelected = isSelected;                                          /* @stable [01.06.2020] */
  public static readonly isTouched = isTouched;                                            /* @stable [18.05.2020] */
  public static readonly isValid = isValid;                                                /* @stable [05.06.2020] */
}
