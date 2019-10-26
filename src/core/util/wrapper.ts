import {
  IEditedWrapper,
  IHighlightOddWrapper,
  IIndexedWrapper,
  IPreventFocusWrapper,
  IProgressWrapper,
  ISortableWrapper,
  IUseKeyboardWrapper,
  IValidWrapper,
  IVisibleWrapper,
} from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import { isNumber } from './type';
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
