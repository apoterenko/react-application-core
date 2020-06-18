import * as R from 'ramda';

import {
  IAcceptableWrapper,
  IAcceptDisabledWrapper,
  IActionsRenderedWrapper,
  IAllowEmptyFilterValueWrapper,
  IAllowSingleTabWrapper,
  IAlwaysDirtyWrapper,
  IAlwaysResettableWrapper,
  IAnchoredWrapper,
  ICalendarActionRenderedWrapper,
  IChangeableWrapper,
  ICheckModalWrapper,
  IClearActionRenderedWrapper,
  IClosableWrapper,
  ICloseDisabledWrapper,
  ICompactWrapper,
  IConfirmWrapper,
  IDecoratedWrapper,
  IDefaultWrapper,
  IDirtyWrapper,
  IDisabledWrapper,
  IDisplayValueRenderedOnlyWrapper,
  IEditedWrapper,
  IErrorMessageRenderedWrapper,
  IErrorWrapper,
  IExpandActionRenderedWrapper,
  IFieldRenderedWrapper,
  IFocusedWrapper,
  IForceReloadWrapper,
  IForciblyApplyLocalFilterWrapper,
  IFullWrapper,
  IHeightRestrictedWrapper,
  IHighlightOddWrapper,
  IHoveredWrapper,
  IIconLeftAlignedWrapper,
  IIndexedWrapper,
  IInlineWrapper,
  IKeyboardOpenWrapper,
  ILastWrapper,
  ILoadingWrapper,
  IMultiWrapper,
  INavigateBackWrapper,
  IOddWrapper,
  IOpenedWrapper,
  IOverlayClosableWrapper,
  IOverlayWrapper,
  IPlaceActionRenderedWrapper,
  IPlainValueWrapper,
  IPreventFocusWrapper,
  IPreventManualChangesWrapper,
  IProgressWrapper,
  IRangeEnabledWrapper,
  IReadOnlyWrapper,
  IReadyWrapper,
  IRefreshOnUpdateWrapper,
  IRemoteFilterWrapper,
  IRequiredWrapper,
  IScrollableWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISortableWrapper,
  ISyntheticCursorWrapper,
  ITouchedWrapper,
  IUseFilterWrapper,
  IUseKeyboardWrapper,
  IUsePeriodNavigatorWrapper,
  IUsePreviewWrapper,
  IUseZipCodeWrapper,
  IValidWrapper,
  IVisibleWrapper,
  IWrappedWrapper,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import { TypeUtils } from './type';
import { isOddNumber } from './calc';
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
 * @param {IFieldRenderedWrapper} wrapper
 * @returns {boolean}
 */
const isFieldRendered = (wrapper: IFieldRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.fieldRendered !== false;

/**
 * @stable [03.02.2020]
 * @param {IPreventManualChangesWrapper} wrapper
 * @returns {boolean}
 */
const areManualChangesNotPrevented = (wrapper: IPreventManualChangesWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.preventManualChanges !== true;

/**
 * @stable [30.01.2020]
 * @param {ICompactWrapper} wrapper
 * @returns {boolean}
 */
export const isCompact = (wrapper: ICompactWrapper): boolean => R.isNil(wrapper) ? false : wrapper.compact === true;

/**
 * @stable [30.01.2020]
 * @param {IPreventFocusWrapper} wrapper
 * @returns {boolean}
 */
const isFocusPrevented = (wrapper: IPreventFocusWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.preventFocus === true;

/**
 * @stable [03.02.2020]
 * @param {IProgressWrapper} wrapper
 * @returns {boolean}
 */
export const inProgress = (wrapper: IProgressWrapper): boolean => R.isNil(wrapper) ? false : wrapper.progress === true;

/**
 * @stable [15.01.2020]
 * @param {TEntity} wrapper
 * @returns {boolean}
 */
export const isCheckModalNeeded = <TEntity extends ICheckModalWrapper = ICheckModalWrapper>(wrapper: TEntity): boolean =>
  R.isNil(wrapper) ? false : wrapper.checkModal === true;

/**
 * @stable [11.03.2020]
 * @param {IConfirmWrapper} wrapper
 * @returns {boolean}
 */
export const isConfirm = (wrapper: IConfirmWrapper): boolean => R.isNil(wrapper) ? false : wrapper.confirm === true;

/**
 * @stable [31.01.2020]
 * @param {IForceReloadWrapper} entity
 * @returns {boolean}
 */
const isForceReload = (entity: IForceReloadWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.forceReload !== false, false);

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
 * @stable [24.01.2020]
 * @param {IScrollableWrapper} entity
 * @returns {boolean}
 */
export const isScrollable = (entity: IScrollableWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.scrollable !== false, false);

/**
 * @stable [24.01.2020]
 * @param {IDefaultWrapper} entity
 * @returns {boolean}
 */
export const isDefault = (entity: IDefaultWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.default !== false, false);

/**
 * @stable [11.05.2020]
 * @param {IOverlayWrapper} entity
 * @returns {boolean}
 */
export const isOverlay = (entity: IOverlayWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.overlay === true, false);

/**
 * @stable [11.05.2020]
 * @param {IAcceptableWrapper} entity
 * @returns {boolean}
 */
export const isAcceptable = (entity: IAcceptableWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.acceptable !== false, false);

/**
 * @stable [11.05.2020]
 * @param {IClosableWrapper} entity
 * @returns {boolean}
 */
export const isClosable = (entity: IClosableWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.closable !== false, false);

/**
 * @stable [11.05.2020]
 * @param {IOverlayClosableWrapper} entity
 * @returns {boolean}
 */
export const isOverlayClosable = (entity: IOverlayClosableWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.overlayClosable !== false, false);

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
 * @stable [24.10.2019]
 * @param {IUseKeyboardWrapper} wrapper
 * @returns {boolean}
 */
export const isKeyboardUsed = (wrapper: IUseKeyboardWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.useKeyboard === true, false);

/**
 * @stable [25.10.2019]
 * @param {IVisibleWrapper} wrapper
 * @returns {boolean}
 */
export const isVisible = (wrapper: IVisibleWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.visible !== false, false);

/**
 * @stable [30.01.2020]
 * @param {IActionsRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isActionsRendered = (wrapper: IActionsRenderedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.actionsRendered !== false, false);

/**
 * @stable [30.10.2019]
 * @param {IFocusedWrapper} wrapper
 * @returns {boolean}
 */
export const isFocused = (wrapper: IFocusedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.focused === true, false);

/**
 * @stable [06.03.2020]
 * @param {IRangeEnabledWrapper} wrapper
 * @returns {boolean}
 */
export const isRangeEnabled = (wrapper: IRangeEnabledWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.rangeEnabled === true;

/**
 * @stable [04.05.2020]
 * @param {IHighlightOddWrapper} wrapper
 * @param {number} index
 * @returns {boolean}
 */
export const isHighlightOdd = (wrapper: IHighlightOddWrapper, index: number): boolean =>
  R.isNil(wrapper)
    ? false
    : (
      wrapper.highlightOdd !== false && (TypeUtils.isNumber(index) ? isOddNumber(index) : false)
    );

/**
 * @stable [26.10.2019]
 * @param {IIndexedWrapper} indexedEntity
 * @returns {boolean}
 */
export const isIndexed = (indexedEntity: IIndexedWrapper): boolean =>
  ifNotNilThanValue(indexedEntity, () => indexedEntity.indexed === true, false);

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
 * @param {ISelectableWrapper} wrapper
 * @returns {boolean}
 */
const isSelectable = (wrapper: ISelectableWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.selectable !== false;

/**
 * @stable [03.02.2020]
 * @param {IHoveredWrapper} wrapper
 * @returns {boolean}
 */
const isHovered = (wrapper: IHoveredWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.hovered !== false;

/**
 * @stable [04.05.2020]
 * @param {IOddWrapper} wrapper
 * @returns {boolean}
 */
const isOdd = (wrapper: IOddWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.odd === true;

/**
 * @stable [04.05.2020]
 * @param {ILastWrapper} wrapper
 * @returns {boolean}
 */
const isLast = (wrapper: ILastWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.last === true;

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
 * @stable [03.02.2020]
 * @param {IClearActionRenderedWrapper} wrapper
 * @returns {boolean}
 */
const isClearActionRendered = (wrapper: IClearActionRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.clearActionRendered !== false;

/**
 * @stable [03.02.2020]
 * @param {IReadOnlyWrapper} wrapper
 * @returns {boolean}
 */
export const isReadOnly = (wrapper: IReadOnlyWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.readOnly === true;

/**
 * @stable [22.01.2020]
 * @param {IInlineWrapper} wrapper
 * @returns {boolean}
 */
export const isInline = (wrapper: IInlineWrapper): boolean => R.isNil(wrapper) ? false : wrapper.inline === true;

/**
 * @stable [11.05.2020]
 * @param {ICloseDisabledWrapper} wrapper
 * @returns {boolean}
 */
export const isCloseDisabled = (wrapper: ICloseDisabledWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.closeDisabled === true;

/**
 * @stable [11.05.2020]
 * @param {IAcceptDisabledWrapper} wrapper
 * @returns {boolean}
 */
export const isAcceptDisabled = (wrapper: IAcceptDisabledWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.acceptDisabled === true;

/**
 * @stable [23.03.2020]
 * @param {IChangeableWrapper} wrapper
 * @returns {boolean}
 */
const isChangeable = (wrapper: IChangeableWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.changeable !== false;

/**
 * @stable [23.03.2020]
 * @param {IAlwaysResettableWrapper} wrapper
 * @returns {boolean}
 */
export const isAlwaysResettable = (wrapper: IAlwaysResettableWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.alwaysResettable === true;

/**
 * @stable [28.10.2019]
 * @param {IKeyboardOpenWrapper} wrapper
 * @returns {boolean}
 */
export const isKeyboardOpen = (wrapper: IKeyboardOpenWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.keyboardOpen === true, false);

/**
 * @stable [29.10.2019]
 * @param {IRequiredWrapper} wrapper
 * @returns {boolean}
 */
export const isRequired = (wrapper: IRequiredWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.required === true, false);

/**
 * @stable [30.10.2019]
 * @param {ISyntheticCursorWrapper} wrapper
 * @returns {boolean}
 */
export const isSyntheticCursorUsed = (wrapper: ISyntheticCursorWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.syntheticCursor !== false, false);

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
 * @stable [23.11.2019]
 * @param {IRemoteFilterWrapper} wrapper
 * @returns {boolean}
 */
export const isRemoteFilterApplied = (wrapper: IRemoteFilterWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.remoteFilter === true, false);

/**
 * @stable [24.01.2020]
 * @param {IAnchoredWrapper} wrapper
 * @returns {boolean}
 */
export const isAnchored = (wrapper: IAnchoredWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.anchored === true, false);

/**
 * @stable [01.02.2020]
 * @param {IForciblyApplyLocalFilterWrapper} wrapper
 * @returns {boolean}
 */
export const isForceUseLocalFilter = (wrapper: IForciblyApplyLocalFilterWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.forciblyApplyLocalFilter === true;

/**
 * @stable [16.01.2020]
 * @param {ITouchedWrapper} wrapper
 * @returns {boolean}
 */
const isTouched = (wrapper: ITouchedWrapper): boolean => R.isNil(wrapper) ? false : wrapper.touched === true;

/**
 * @stable [23.11.2019]
 * @param {IUseFilterWrapper} wrapper
 * @returns {boolean}
 */
export const isFilterUsed = (wrapper: IUseFilterWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.useFilter === true;

/**
 * @stable [25.01.2020]
 * @param {IHeightRestrictedWrapper} wrapper
 * @returns {boolean}
 */
export const isHeightRestricted = (wrapper: IHeightRestrictedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.heightRestricted !== false;

/**
 * @stable [28.01.2020]
 * @param {IAllowEmptyFilterValueWrapper} wrapper
 * @returns {boolean}
 */
export const isAllowEmptyFilterValue = (wrapper: IAllowEmptyFilterValueWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.allowEmptyFilterValue !== false;

/**
 * @stable [28.01.2020]
 * @param {ILoadingWrapper} entity
 * @returns {boolean}
 */
const isLoading = (entity: ILoadingWrapper): boolean => R.isNil(entity) ? false : entity.loading === true;

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
 * @stable [14.01.2020]
 * @param {IPlainValueWrapper} entity
 * @returns {boolean}
 */
export const isPlainValueApplied = (entity: IPlainValueWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.plainValue !== false, false);

/**
 * @stable [08.06.2020]
 * @param {IRefreshOnUpdateWrapper} wrapper
 * @returns {boolean}
 */
const isRefreshOnUpdateNeeded = (wrapper: IRefreshOnUpdateWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.refreshOnUpdate === true;

/**
 * @stable [28.01.2020]
 * @param {IDisplayValueRenderedOnlyWrapper} entity
 * @returns {boolean}
 */
export const isDisplayValueRenderedOnly = (entity: IDisplayValueRenderedOnlyWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.displayValueRenderedOnly === true, false);

/**
 * @stable [23.04.2020]
 * @param {IAlwaysDirtyWrapper} entity
 * @returns {boolean}
 */
export const isAlwaysDirty = (entity: IAlwaysDirtyWrapper): boolean =>
  R.isNil(entity) ? false : entity.alwaysDirty === true;

/**
 * @stable [26.12.2019]
 * @param {IDirtyWrapper} entity
 * @returns {boolean}
 */
export const isDirty = (entity: IDirtyWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.dirty === true, false);

/**
 * @stable [12.02.2020]
 * @param {IAllowSingleTabWrapper} entity
 * @returns {boolean}
 */
export const isAllowSingleTab = (entity: IAllowSingleTabWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.allowSingleTab === true, false);

/**
 * @stable [12.02.2020]
 * @param {IWrappedWrapper} entity
 * @returns {boolean}
 */
export const isWrapped = (entity: IWrappedWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.wrapped !== false, false);

/**
 * @stable [12.02.2020]
 * @param {IIconLeftAlignedWrapper} entity
 * @returns {boolean}
 */
const isIconLeftAligned = (entity: IIconLeftAlignedWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.iconLeftAligned !== false, false);

/**
 * @stable [16.02.2020]
 * @param {IErrorMessageRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isErrorMessageRendered = (wrapper: IErrorMessageRenderedWrapper): boolean =>
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
 * @stable [11.04.2020]
 * @param {INavigateBackWrapper} wrapper
 * @returns {boolean}
 */
export const isNavigateBackNeeded = (wrapper: INavigateBackWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.navigateBack !== false;

/**
 * @stable [18.05.2020]
 */
export class WrapperUtils {
  public static readonly areManualChangesNotPrevented = areManualChangesNotPrevented;      /* @stable [03.06.2020] */
  public static readonly inProgress = inProgress;                                          /* @stable [19.05.2020] */
  public static readonly isChangeable = isChangeable;                                      /* @stable [05.06.2020] */
  public static readonly isClearActionRendered = isClearActionRendered;                    /* @stable [17.06.2020] */
  public static readonly isDecorated = isDecorated;                                        /* @stable [02.06.2020] */
  public static readonly isDisabled = isDisabled;                                          /* @stable [01.06.2020] */
  public static readonly isExpandActionRendered = isExpandActionRendered;                  /* @stable [16.06.2020] */
  public static readonly isFieldRendered = isFieldRendered;                                /* @stable [18.05.2020] */
  public static readonly isFocusPrevented = isFocusPrevented;                              /* @stable [03.06.2020] */
  public static readonly isForceReload = isForceReload;                                    /* @stable [18.05.2020] */
  public static readonly isFull = isFull;                                                  /* @stable [20.05.2020] */
  public static readonly isHovered = isHovered;                                            /* @stable [01.06.2020] */
  public static readonly isIconLeftAligned = isIconLeftAligned;                            /* @stable [01.06.2020] */
  public static readonly isLast = isLast;                                                  /* @stable [01.06.2020] */
  public static readonly isLoading = isLoading;                                            /* @stable [19.05.2020] */
  public static readonly isOdd = isOdd;                                                    /* @stable [01.06.2020] */
  public static readonly isReadOnly = isReadOnly;                                          /* @stable [18.06.2020] */
  public static readonly isRefreshOnUpdateNeeded = isRefreshOnUpdateNeeded;                /* @stable [08.06.2020] */
  public static readonly isSelectable = isSelectable;                                      /* @stable [01.06.2020] */
  public static readonly isSelected = isSelected;                                          /* @stable [01.06.2020] */
  public static readonly isTouched = isTouched;                                            /* @stable [18.05.2020] */
  public static readonly isValid = isValid;                                                /* @stable [05.06.2020] */
}
