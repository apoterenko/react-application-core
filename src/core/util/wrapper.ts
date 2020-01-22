import * as R from 'ramda';

import {
  IAlwaysDirtyWrapper,
  ICalendarActionRenderedWrapper,
  ICenteredMenuWrapper,
  IChangeableWrapper,
  ICheckScrimWrapper,
  IClearActionRenderedWrapper,
  IDirtyWrapper,
  IDisabledWrapper,
  IDisplayValueOnlyWrapper,
  IEditedWrapper,
  IErrorWrapper,
  IExpandActionRenderedWrapper,
  IFieldRenderedWrapper,
  IFocusedWrapper,
  IHeaderRenderedWrapper,
  IHighlightOddWrapper,
  IHoveredWrapper,
  IIndexedWrapper,
  IInlineWrapper,
  IKeyboardOpenWrapper,
  ILoadingWrapper,
  IMenuRenderedWrapper,
  IMultiWrapper,
  IPlaceActionRenderedWrapper,
  IPlainValueWrapper,
  IPreventFocusWrapper,
  IProgressWrapper,
  IRangeEnabledWrapper,
  IReadOnlyWrapper,
  IReadyWrapper,
  IRefreshOnUpdateWrapper,
  IRemoteFilterWrapper,
  IRenderedWrapper,
  IRequiredWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISortableWrapper,
  ISyntheticCursorWrapper,
  ITouchedWrapper,
  IUseFilterWrapper,
  IUseKeyboardWrapper,
  IUseZipCodeWrapper,
  IValidWrapper,
  IVisibleWrapper,
  IWaitingForDataWrapper,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import {
  isBoolean,
  isNumber,
} from './type';
import { isOddNumber } from './calc';

/**
 * @stable [24.10.2019]
 * @param {IValidWrapper} validEntity
 * @returns {boolean}
 */
export const isValid = (validEntity: IValidWrapper): boolean =>
  ifNotNilThanValue(validEntity, () => validEntity.valid !== false, false);

/**
 * @stable [22.01.2020]
 * @param {IFieldRenderedWrapper} validEntity
 * @returns {boolean}
 */
export const isFieldRendered = (validEntity: IFieldRenderedWrapper): boolean =>
  ifNotNilThanValue(validEntity, () => validEntity.fieldRendered !== false, false);

/**
 * @stable [24.10.2019]
 * @param {IPreventFocusWrapper} preventFocusEntity
 * @returns {boolean}
 */
export const isFocusPrevented = (preventFocusEntity: IPreventFocusWrapper): boolean =>
  ifNotNilThanValue(preventFocusEntity, () => preventFocusEntity.preventFocus === true, false);

/**
 * @stable [24.10.2019]
 * @param {IProgressWrapper} progressEntity
 * @returns {boolean}
 */
export const inProgress = (progressEntity: IProgressWrapper): boolean =>
  ifNotNilThanValue(progressEntity, () => progressEntity.progress === true, false);

/**
 * @stable [15.01.2020]
 * @param {TEntity} checkScrim
 * @returns {boolean}
 */
export const isCheckScrimNeeded = <TEntity extends ICheckScrimWrapper = ICheckScrimWrapper>(checkScrim: TEntity): boolean =>
  ifNotNilThanValue(checkScrim, () => checkScrim.checkScrim === true, false);

/**
 * @stable [28.11.2019]
 * @param {IReadyWrapper} entity
 * @returns {boolean}
 */
export const isReady = (entity: IReadyWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.ready === true, false);

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
 * @param {IUseKeyboardWrapper} useKeyboardEntity
 * @returns {boolean}
 */
export const isKeyboardUsed = (useKeyboardEntity: IUseKeyboardWrapper): boolean =>
  ifNotNilThanValue(useKeyboardEntity, () => useKeyboardEntity.useKeyboard === true, false);

/**
 * @stable [25.10.2019]
 * @param {IVisibleWrapper} visibleEntity
 * @returns {boolean}
 */
export const isVisible = (visibleEntity: IVisibleWrapper): boolean =>
  ifNotNilThanValue(visibleEntity, () => visibleEntity.visible !== false, false);

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
 * @param {ISortableWrapper} sortableEntity
 * @returns {boolean}
 */
export const isSortable = (sortableEntity: ISortableWrapper): boolean =>
  ifNotNilThanValue(sortableEntity, () => sortableEntity.sortable === true, false);

/**
 * @stable [27.10.2019]
 * @param {IDisabledWrapper} disabledEntity
 * @returns {boolean}
 */
export const isDisabled = (disabledEntity: IDisabledWrapper): boolean =>
  ifNotNilThanValue(disabledEntity, () => disabledEntity.disabled === true, false);

/**
 * @stable [27.10.2019]
 * @param {IDisabledWrapper} selectedWrapper
 * @returns {boolean}
 */
export const isSelected = (selectedWrapper: ISelectedWrapper): boolean =>
  ifNotNilThanValue(selectedWrapper, () => selectedWrapper.selected === true, false);

/**
 * @stable [27.10.2019]
 * @param {ISelectableWrapper} selectableWrapper
 * @returns {boolean}
 */
export const isSelectable = (selectableWrapper: ISelectableWrapper): boolean =>
  ifNotNilThanValue(selectableWrapper, () => selectableWrapper.selectable !== false, false);

/**
 * @stable [27.10.2019]
 * @param {IHoveredWrapper} hoveredWrapper
 * @returns {boolean}
 */
export const isHovered = (hoveredWrapper: IHoveredWrapper): boolean =>
  ifNotNilThanValue(hoveredWrapper, () => hoveredWrapper.hovered !== false, false);

/**
 * @stable [27.10.2019]
 * @param {IExpandActionRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isExpandActionRendered  = (wrapper: IExpandActionRenderedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.expandActionRendered !== false, false);

/**
 * @stable [21.01.2020]
 * @param {ICalendarActionRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isCalendarActionRendered  = (wrapper: ICalendarActionRenderedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.calendarActionRendered !== false, false);

/**
 * @stable [01.12.2019]
 * @param {IClearActionRenderedWrapper} wrapper
 * @returns {boolean}
 */
export const isClearActionRendered  = (wrapper: IClearActionRenderedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.clearActionRendered !== false, false);

/**
 * @stable [28.10.2019]
 * @param {IReadOnlyWrapper} wrapper
 * @returns {boolean}
 */
export const isReadOnly = (wrapper: IReadOnlyWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.readOnly === true, false);

/**
 * @stable [22.01.2020]
 * @param {IInlineWrapper} wrapper
 * @returns {boolean}
 */
export const isInline = (wrapper: IInlineWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.inline === true, false);

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
 * @stable [13.11.2019]
 * @param {IMultiWrapper} wrapper
 * @returns {boolean}
 */
export const isMulti = (wrapper: IMultiWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.multi === true, false);

/**
 * @stable [23.11.2019]
 * @param {ICenteredMenuWrapper} wrapper
 * @returns {boolean}
 */
export const isCenteredMenu = (wrapper: ICenteredMenuWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.centeredMenu === true, false);

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
export const isMenuOpened = (wrapper: IMenuRenderedWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.menuRendered === true, false);

/**
 * @stable [11.01.2020]
 * @param {IWaitingForDataWrapper} wrapper
 * @returns {boolean}
 */
export const isWaitingForData = (wrapper: IWaitingForDataWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.waitingForData === true, false);

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
 * @stable [22.11.2019]
 * @param {ILoadingWrapper} entity
 * @returns {boolean}
 */
export const isBeingLoaded = (entity: ILoadingWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.loading === true, false);

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
  ifNotNilThanValue(entity, () => entity.plainValue === true, false);

/**
 * @stable [19.12.2019]
 * @param {IRefreshOnUpdateWrapper} entity
 * @returns {boolean}
 */
export const isRefreshOnUpdate = (entity: IRefreshOnUpdateWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.refreshOnUpdate === true, false);

/**
 * @stable [21.12.2019]
 * @param {IDisplayValueOnlyWrapper} entity
 * @returns {boolean}
 */
export const isDisplayValueOnly = (entity: IDisplayValueOnlyWrapper): boolean =>
  ifNotNilThanValue(entity, () => entity.displayValueOnly === true, false);

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
