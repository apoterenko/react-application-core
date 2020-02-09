import * as R from 'ramda';

import {
  IActionsRenderedWrapper,
  IAllowEmptyFilterValueWrapper,
  IAlwaysDirtyWrapper,
  IAnchoredWrapper,
  IBackActionRenderedWrapper,
  ICalendarActionRenderedWrapper,
  IChangeableWrapper,
  ICheckModalWrapper,
  IClearActionRenderedWrapper,
  ICompactWrapper,
  IDecoratedWrapper,
  IDefaultWrapper,
  IDirtyWrapper,
  IDisabledWrapper,
  IDisplayValueRenderedOnlyWrapper,
  IEditedWrapper,
  IErrorWrapper,
  IExpandActionRenderedWrapper,
  IFieldRenderedWrapper,
  IFocusedWrapper,
  IForceReloadWrapper,
  IForceUseLocalFilterWrapper,
  IFullWrapper,
  IHeaderRenderedWrapper,
  IHeightRestrictedWrapper,
  IHighlightOddWrapper,
  IHoveredWrapper,
  IIconWrapper,
  IIndexedWrapper,
  IInlineWrapper,
  IKeyboardOpenWrapper,
  ILoadingWrapper,
  IMenuRenderedWrapper,
  IMultiWrapper,
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
  IRippledWrapper,
  IScrollableWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISortableWrapper,
  ISyntheticCursorWrapper,
  ITouchedWrapper,
  IUseFilterWrapper,
  IUseKeyboardWrapper,
  IUseZipCodeWrapper,
  IValidateOnMountWrapper,
  IValidWrapper,
  IVisibleWrapper,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import {
  isBoolean,
  isNumber,
} from './type';
import { isOddNumber } from './calc';

/**
 * @stable [03.02.2020]
 * @param {IValidWrapper} wrapper
 * @returns {boolean}
 */
export const isValid = (wrapper: IValidWrapper): boolean => R.isNil(wrapper) ? false : wrapper.valid !== false;

/**
 * @stable [03.02.2020]
 * @param {IFieldRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isFieldRendered = (wrapper: IFieldRenderedWrapper): boolean =>
  R.isNil(wrapper) ? false : wrapper.fieldRendered !== false;

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
 * @stable [31.01.2020]
 * @param {IForceReloadWrapper} entity
 * @returns {boolean}
 */
export const isForceReload = (entity: IForceReloadWrapper): boolean =>
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
 * @stable [20.01.2020]
 * @param {IRangeEnabledWrapper} wrapper
 * @returns {boolean}
 */
export const isRangeEnabled = (wrapper: IRangeEnabledWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.rangeEnabled === true, false);

/**
 * @stable [26.10.2019]
 * @param {IHighlightOddWrapper} highlightOddEntity
 * @param {number} index
 * @returns {boolean}
 */
export const isHighlightOdd = (highlightOddEntity: IHighlightOddWrapper, index: number): boolean =>
  ifNotNilThanValue(
    highlightOddEntity,
    () => highlightOddEntity.highlightOdd !== false && (isNumber(index) ? isOddNumber(index) : false),
    false
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
 * @param {IHeaderRenderedWrapper} headerRendered
 * @returns {boolean}
 */
export const isHeaderRendered = (headerRendered: IHeaderRenderedWrapper): boolean =>
  ifNotNilThanValue(headerRendered, () => headerRendered.headerRendered !== false, false);

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
 * @stable [28.10.2019]
 * @param {IChangeableWrapper} changeableWrapper
 * @returns {boolean}
 */
export const isChangeable = (changeableWrapper: IChangeableWrapper): boolean =>
  ifNotNilThanValue(changeableWrapper, () => changeableWrapper.changeable !== false, false);

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
 * @stable [24.01.2020]
 * @param {IRippledWrapper} wrapper
 * @returns {boolean}
 */
export const isRippled = (wrapper: IRippledWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.rippled !== false, false);

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
 * @param {IForceUseLocalFilterWrapper} wrapper
 * @returns {boolean}
 */
export const isForceUseLocalFilter = (wrapper: IForceUseLocalFilterWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.forceUseLocalFilter === true, false);

/**
 * @stable [16.01.2020]
 * @param {ITouchedWrapper} wrapper
 * @returns {boolean}
 */
export const isTouched = (wrapper: ITouchedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.touched === true, false);

/**
 * @stable [23.11.2019]
 * @param {IUseFilterWrapper} wrapper
 * @returns {boolean}
 */
export const isFilterUsed = (wrapper: IUseFilterWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.useFilter === true, false);

/**
 * @stable [25.01.2020]
 * @param {IHeightRestrictedWrapper} wrapper
 * @returns {boolean}
 */
export const isHeightRestricted = (wrapper: IHeightRestrictedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.heightRestricted !== false, false);

/**
 * @stable [28.01.2020]
 * @param {IAllowEmptyFilterValueWrapper} wrapper
 * @returns {boolean}
 */
export const isAllowEmptyFilterValue = (wrapper: IAllowEmptyFilterValueWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.allowEmptyFilterValue !== false, false);

/**
 * @stable [28.01.2020]
 * @param {ILoadingWrapper} entity
 * @returns {boolean}
 */
export const isLoading = (entity: ILoadingWrapper): boolean =>
  R.isNil(entity) ? false : entity.loading === true;

/**
 * @stable [26.11.2019]
 * @param {IPlaceActionRenderedWrapper} entity
 * @returns {boolean}
 */
export const isPlaceActionRendered = (entity: IPlaceActionRenderedWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.placeActionRendered !== false, false);

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
 * @param {IBackActionRenderedWrapper} entity
 * @returns {boolean}
 */
export const isBackActionRendered = (entity: IBackActionRenderedWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.backActionRendered !== false, false);

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
 * @stable [26.12.2019]
 * @param {IAlwaysDirtyWrapper} entity
 * @returns {boolean}
 */
export const isAlwaysDirty = (entity: IAlwaysDirtyWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.alwaysDirty === true, false);

/**
 * @stable [26.12.2019]
 * @param {IDirtyWrapper} entity
 * @returns {boolean}
 */
export const isDirty = (entity: IDirtyWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.dirty === true, false);
