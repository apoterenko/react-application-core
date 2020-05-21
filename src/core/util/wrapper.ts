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
  IDrawerHeaderRenderedWrapper,
  IEditedWrapper,
  IErrorMessageRenderedWrapper,
  IErrorWrapper,
  IExpandActionRenderedWrapper,
  IFieldRenderedWrapper,
  IFirstAllowedWrapper,
  IFocusedWrapper,
  IFooterRenderedWrapper,
  IForceReloadWrapper,
  IForciblyApplyLocalFilterWrapper,
  IFullWrapper,
  IHeaderRenderedWrapper,
  IHeightRestrictedWrapper,
  IHighlightOddWrapper,
  IHoveredWrapper,
  IIconLeftAlignedWrapper,
  IIconWrapper,
  IIndexedWrapper,
  IInlineWrapper,
  IKeyboardOpenWrapper,
  ILastAllowedWrapper,
  ILastWrapper,
  ILoadingWrapper,
  IMenuRenderedWrapper,
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
  IRenderedWrapper,
  IRequiredWrapper,
  IScrollableWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISortableWrapper,
  ISubHeaderRenderedWrapper,
  ISyntheticCursorWrapper,
  ITouchedWrapper,
  IUseActionsWrapper,
  IUseFilterWrapper,
  IUseKeyboardWrapper,
  IUsePeriodNavigatorWrapper,
  IUsePreviewWrapper,
  IUseZipCodeWrapper,
  IValidateOnMountWrapper,
  IValidWrapper,
  IVisibleWrapper,
  IWrappedWrapper,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import {
  isBoolean,
  TypeUtils,
} from './type';
import { isOddNumber } from './calc';
import { $isValid } from './value';

/**
 * @stable [03.02.2020]
 * @param {IValidWrapper} wrapper
 * @returns {boolean}
 */
export const isValid = (wrapper: IValidWrapper): boolean => R.isNil(wrapper) ? false : $isValid(wrapper.valid);

/**
 * @stable [03.02.2020]
 * @param {IFieldRenderedWrapper} wrapper
 * @returns {boolean}
 */
const isFieldRendered = (wrapper: IFieldRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.fieldRendered !== false;

/**
 * @stable [05.05.2020]
 * @param {ILastAllowedWrapper} wrapper
 * @returns {boolean}
 */
export const isLastAllowedWrapper = (wrapper: ILastAllowedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.lastAllowed !== false;

/**
 * @stable [05.05.2020]
 * @param {IFirstAllowedWrapper} wrapper
 * @returns {boolean}
 */
export const isFirstAllowedWrapper = (wrapper: IFirstAllowedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.firstAllowed !== false;

/**
 * @stable [12.05.2020]
 * @param {IUseActionsWrapper} wrapper
 * @returns {boolean}
 */
export const areActionsUsed = (wrapper: IUseActionsWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.useActions === true;

/**
 * @stable [30.01.2020]
 * @param {IValidateOnMountWrapper} wrapper
 * @returns {boolean}
 */
export const isValidateOnMount = (wrapper: IValidateOnMountWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.validateOnMount !== false;

/**
 * @stable [03.02.2020]
 * @param {IPreventManualChangesWrapper} wrapper
 * @returns {boolean}
 */
export const isPreventManualChanges = (wrapper: IPreventManualChangesWrapper): boolean =>
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
export const isFocusPrevented = (wrapper: IPreventFocusWrapper): boolean =>
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
 * @stable [02.02.2020]
 * @param {IIconWrapper<boolean | string>} entity
 * @returns {boolean}
 */
export const hasIcon = (entity: IIconWrapper<boolean | string>): boolean =>
  ifNotNilThanValue(entity, () => !R.isNil(entity.icon) && entity.icon !== false, false);

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
      isBoolean(entity.error)
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
 * @stable [03.01.2019]
 * @param {IHeaderRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isHeaderRendered = (wrapper: IHeaderRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.headerRendered !== false;

/**
 * @stable [20.05.2020]
 * @param {IFooterRenderedWrapper} wrapper
 * @returns {boolean}
 */
const isFooterRendered = (wrapper: IFooterRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.footerRendered !== false;

/**
 * @stable [11.01.2020]
 * @param {IRenderedWrapper} value
 * @returns {boolean}
 */
export const isRendered = (value: IRenderedWrapper): boolean =>
  ifNotNilThanValue(value, () => value.rendered !== false, false);

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
export const isSelected = (wrapper: ISelectedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.selected === true;

/**
 * @stable [03.02.2020]
 * @param {ISelectableWrapper} wrapper
 * @returns {boolean}
 */
export const isSelectable = (wrapper: ISelectableWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.selectable !== false;

/**
 * @stable [03.02.2020]
 * @param {IHoveredWrapper} wrapper
 * @returns {boolean}
 */
export const isHovered = (wrapper: IHoveredWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.hovered !== false;

/**
 * @stable [04.05.2020]
 * @param {IOddWrapper} wrapper
 * @returns {boolean}
 */
export const isOdd = (wrapper: IOddWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.odd === true;

/**
 * @stable [04.05.2020]
 * @param {ILastWrapper} wrapper
 * @returns {boolean}
 */
export const isLast = (wrapper: ILastWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.last === true;

/**
 * @stable [03.02.2020]
 * @param {IExpandActionRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isExpandActionRendered  = (wrapper: IExpandActionRenderedWrapper): boolean =>
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
export const isClearActionRendered = (wrapper: IClearActionRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.clearActionRendered !== false;

/**
 * @stable [03.02.2020]
 * @param {IReadOnlyWrapper} wrapper
 * @returns {boolean}
 */
export const isReadOnly = (wrapper: IReadOnlyWrapper): boolean => R.isNil(wrapper) ? false : wrapper.readOnly === true;

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
export const isChangeable = (wrapper: IChangeableWrapper): boolean =>
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
export const isDecorated = (wrapper: IDecoratedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.decorated !== false, false);

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
 * @stable [11.01.2020]
 * @param {IMenuRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isMenuRendered = (wrapper: IMenuRenderedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.menuRendered === true, false);

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
 * @stable [10.02.2020]
 * @param {ISubHeaderRenderedWrapper} entity
 * @returns {boolean}
 */
export const isSubHeaderRendered = (entity: ISubHeaderRenderedWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.subHeaderRendered !== false, false);

/**
 * @stable [19.12.2019]
 * @param {IRefreshOnUpdateWrapper} entity
 * @returns {boolean}
 */
export const isRefreshOnUpdate = (entity: IRefreshOnUpdateWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.refreshOnUpdate === true, false);

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
export const isIconLeftAligned = (entity: IIconLeftAlignedWrapper): boolean =>
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
 * @stable [28.03.2020]
 * @param {IDrawerHeaderRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isDrawerHeaderRendered = (wrapper: IDrawerHeaderRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.drawerHeaderRendered !== false;

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
  public static readonly inProgress = inProgress;                                          /* @stable [19.05.2020] */
  public static readonly isFieldRendered = isFieldRendered;                                /* @stable [18.05.2020] */
  public static readonly isFooterRendered = isFooterRendered;                              /* @stable [20.05.2020] */
  public static readonly isForceReload = isForceReload;                                    /* @stable [18.05.2020] */
  public static readonly isFull = isFull;                                                  /* @stable [20.05.2020] */
  public static readonly isHeaderRendered = isHeaderRendered;                              /* @stable [20.05.2020] */
  public static readonly isLoading = isLoading;                                            /* @stable [19.05.2020] */
  public static readonly isTouched = isTouched;                                            /* @stable [18.05.2020] */
}
