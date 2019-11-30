import * as R from 'ramda';

import {
  IAlwaysReturnEmptyValueIfOriginalValueWrapper,
  ICenteredMenuWrapper,
  IChangeableWrapper,
  IDisabledWrapper,
  IEditedWrapper,
  IEmptyOriginalValueWrapper,
  IErrorWrapper,
  IExpandActionRenderedWrapper,
  IFocusedWrapper,
  IHighlightOddWrapper,
  IHoveredWrapper,
  IIndexedWrapper,
  IKeyboardOpenWrapper,
  ILoadingWrapper,
  IMultiWrapper,
  IPlaceActionRenderedWrapper,
  IPreventFocusWrapper,
  IProgressWrapper,
  IReadOnlyWrapper,
  IReadyWrapper,
  IRemoteFilterWrapper,
  IRequiredWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISortableWrapper,
  ISyntheticCursorWrapper,
  IUseFilterWrapper,
  IUseKeyboardWrapper,
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
 * @stable [24.10.2019]
 * @param {IValidWrapper} validEntity
 * @returns {boolean}
 */
export const isValid = (validEntity: IValidWrapper): boolean =>
  ifNotNilThanValue(validEntity, () => validEntity.valid !== false, false);

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
 * @stable [28.10.2019]
 * @param {IReadOnlyWrapper} readOnlyWrapper
 * @returns {boolean}
 */
export const isReadOnly = (readOnlyWrapper: IReadOnlyWrapper): boolean =>
  ifNotNilThanValue(readOnlyWrapper, () => readOnlyWrapper.readOnly === true, false);

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
 * @stable [12.11.2019]
 * @param {IEmptyOriginalValueWrapper} wrapper
 * @returns {boolean}
 */
export const isEmptyOriginalValueSet = (wrapper: IEmptyOriginalValueWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.emptyOriginalValue === true, false);

/**
 * @stable [14.11.2019]
 * @param {IAlwaysReturnEmptyValueIfOriginalValueWrapper} wrapper
 * @returns {boolean}
 */
export const isAlwaysReturnEmptyValueIfOriginalValue = (wrapper: IAlwaysReturnEmptyValueIfOriginalValueWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.alwaysReturnEmptyValueIfOriginalValue === true, false);

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
export const isRemoteFilter = (wrapper: IRemoteFilterWrapper): boolean =>
  ifNotNilThanValue(wrapper, () => wrapper.remoteFilter === true, false);

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
