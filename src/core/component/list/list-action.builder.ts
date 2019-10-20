import { EffectsAction, IEffectsAction, EffectsActionBuilder } from 'redux-effects-promise';

import {
  AnyT,
  EntityIdT,
  IDataWrapper,
  IEntity,
  IRemovedEntityWrapper,
} from '../../definitions.interface';
import {
  IModifyEntityPayloadWrapperEntity,
  IPagedEntity,
  ISelectEntityPayloadEntity,
  ISelectedWrapperEntity,
} from '../../definition';
import { applySection, toActionPrefix } from '../../util';
import {
  LIST_CANCEL_LOAD_ACTION_TYPE,
  LIST_CHANGE_ACTION_TYPE,
  LIST_CREATE_ACTION_TYPE,
  LIST_DESELECT_ACTION_TYPE,
  LIST_DESTROY_ACTION_TYPE,
  LIST_FIRST_PAGE_ACTION_TYPE,
  LIST_INSERT_ACTION_TYPE,
  LIST_LAST_PAGE_ACTION_TYPE,
  LIST_LAZY_LOAD_ACTION_TYPE,
  LIST_LAZY_LOAD_DONE_ACTION_TYPE,
  LIST_LAZY_LOAD_ERROR_ACTION_TYPE,
  LIST_LOAD_ACTION_TYPE,
  LIST_LOAD_DONE_ACTION_TYPE,
  LIST_LOAD_ERROR_ACTION_TYPE,
  LIST_MERGE_ACTION_TYPE,
  LIST_NEXT_PAGE_ACTION_TYPE,
  LIST_PREVIOUS_PAGE_ACTION_TYPE,
  LIST_REMOVE_ACTION_TYPE,
  LIST_RESET_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
  LIST_SORTING_DIRECTION_CHANGE_ACTION_TYPE,
  LIST_UN_TOUCH_ACTION_TYPE,
  LIST_UPDATE_ACTION_TYPE,
} from './list.interface';

export class ListActionBuilder {

  public static buildSortingDirectionChangeActionType(section: string): string {
    return `${section}.${LIST_SORTING_DIRECTION_CHANGE_ACTION_TYPE}`;
  }

  public static buildChangeActionType(section: string): string {
    return `${section}.${LIST_CHANGE_ACTION_TYPE}`;
  }

  public static buildFirstPageActionType(section: string): string {
    return `${section}.${LIST_FIRST_PAGE_ACTION_TYPE}`;
  }

  public static buildLastPageActionType(section: string): string {
    return `${section}.${LIST_LAST_PAGE_ACTION_TYPE}`;
  }

  public static buildPreviousPageActionType(section: string): string {
    return `${section}.${LIST_PREVIOUS_PAGE_ACTION_TYPE}`;
  }

  public static buildNextPageActionType(section: string): string {
    return `${section}.${LIST_NEXT_PAGE_ACTION_TYPE}`;
  }

  /**
   * @stable [31.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [31.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildCancelLoadActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_CANCEL_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [03.06.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildLazyLoadActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_LAZY_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [03.06.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildLazyLoadDoneActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_LAZY_LOAD_DONE_ACTION_TYPE}`;
  }

  public static buildUnTouchActionType(section: string): string {
    return `${section}.${LIST_UN_TOUCH_ACTION_TYPE}`;
  }

  /**
   * @stable [31.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadDoneActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_LOAD_DONE_ACTION_TYPE}`;
  }

  /**
   * @stable [31.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadErrorActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_LOAD_ERROR_ACTION_TYPE}`;
  }

  /**
   * @stable [04.06.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildLazyLoadErrorActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_LAZY_LOAD_ERROR_ACTION_TYPE}`;
  }

  /**
   * @stable [07.12.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildSelectActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_SELECT_ACTION_TYPE}`;
  }

  /**
   * @stable [07.12.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildSelectErrorActionType(section: string): string {
    return EffectsActionBuilder.buildErrorActionType(this.buildSelectActionType(section));
  }

  public static buildInsertActionType(section: string): string {
    return `${section}.${LIST_INSERT_ACTION_TYPE}`;
  }

  /**
   * @stable [17.05.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildRemoveActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_REMOVE_ACTION_TYPE}`;
  }

  public static buildUpdateActionType(section: string): string {
    return `${section}.${LIST_UPDATE_ACTION_TYPE}`;
  }

  /**
   * @stable [07.12.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildCreateActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_CREATE_ACTION_TYPE}`;
  }

  public static buildDeselectActionType(section: string): string {
    return `${section}.${LIST_DESELECT_ACTION_TYPE}`;
  }

  /**
   * @stable [19.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildDestroyActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [19.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildResetActionType(section: string): string {
    return `${toActionPrefix(section)}.${LIST_RESET_ACTION_TYPE}`;
  }

  /**
   * @stable [19.10.2019]
   * @param {string} section
   * @param {ISelectedWrapperEntity<TEntity extends IEntity>} selectedWrapper
   * @returns {IEffectsAction}
   */
  public static buildLazyLoadDoneAction<TEntity extends IEntity = IEntity>(
    section: string, selectedWrapper: ISelectedWrapperEntity<TEntity>): IEffectsAction {
    return EffectsAction.create(this.buildLazyLoadDoneActionType(section), applySection(section, selectedWrapper));
  }

  /**
   * @stable [15.03.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildCreateAction(section: string): IEffectsAction {
    const plainAction = this.buildCreatePlainAction(section);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [03.06.2018]
   * @param {string} section
   * @param {ISelectedWrapperEntity} payload
   * @returns {IEffectsAction}
   */
  public static buildLazyLoadAction(section: string, payload: ISelectEntityPayloadEntity): IEffectsAction {
    return EffectsAction.create(this.buildLazyLoadActionType(section), applySection(section, payload));
  }

  public static buildDeselectAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDeselectActionType(section), applySection(section));
  }

  /**
   * @stable [19.03.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), applySection(section));
  }

  /**
   * @stable [19.03.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildResetAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildResetActionType(section), applySection(section));
  }

  /**
   * @stable [17.05.2018]
   * @param {string} section
   * @param {IRemovedEntityWrapper} data
   * @returns {IEffectsAction}
   */
  public static buildRemoveAction(section: string, data: IRemovedEntityWrapper): IEffectsAction {
    return EffectsAction.create(this.buildRemoveActionType(section), applySection(section, data));
  }

  public static buildUpdateAction(section: string, data?: IModifyEntityPayloadWrapperEntity): IEffectsAction {
    return EffectsAction.create(this.buildUpdateActionType(section), applySection(section, data));
  }

  /**
   * @stable [20.10.2019]
   * @param {string} section
   * @param {EntityIdT} id
   * @param {TChanges} changes
   * @returns {IEffectsAction}
   */
  public static buildMergeItemAction<TChanges = IEntity>(section: string, id: EntityIdT, changes: TChanges): IEffectsAction {
    return this.buildMergeAction(section, {payload: {id, changes}});
  }

  public static buildLoadAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildLoadActionType(section), applySection(section, data));
  }

  /**
   * @stable [13.05.2019]
   * @param {string} section
   * @param {IDataWrapper<AnyT> & IPagedEntity} data
   * @returns {IEffectsAction}
   */
  public static buildLoadDoneAction(section: string, data?: IDataWrapper<AnyT> & IPagedEntity): IEffectsAction {
    return EffectsAction.create(this.buildLoadDoneActionType(section), applySection(section, data));
  }

  public static buildNextPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildNextPageActionType(section), applySection(section, data));
  }

  public static buildPreviousPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildPreviousPageActionType(section), applySection(section, data));
  }

  public static buildFirstPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildFirstPageActionType(section), applySection(section, data));
  }

  public static buildLastPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildLastPageActionType(section), applySection(section, data));
  }

  /**
   * @stable [20.10.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildMergeActionType(section: string): string {
    return `${section}.${LIST_MERGE_ACTION_TYPE}`;
  }

  /**
   * @stable [20.10.2019]
   * @param {string} section
   * @param {IModifyEntityPayloadWrapperEntity} data
   * @returns {IEffectsAction}
   */
  public static buildMergeAction(section: string, data?: IModifyEntityPayloadWrapperEntity): IEffectsAction {
    const plainAction = this.buildMergePlainAction(section, data);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [20.10.2019]
   * @param {string} section
   * @param {IModifyEntityPayloadWrapperEntity} data
   * @returns {IEffectsAction}
   */
  public static buildMergePlainAction(section: string, data?: IModifyEntityPayloadWrapperEntity): IEffectsAction {
    return {
      type: this.buildMergeActionType(section),
      data: applySection(section, data),
    };
  }

  /**
   * @stable [20.10.2019]
   * @param {string} section
   * @param {ISelectEntityPayloadEntity} payload
   * @returns {IEffectsAction}
   */
  public static buildSelectAction(section: string, payload: ISelectEntityPayloadEntity): IEffectsAction {
    const plainAction = this.buildSelectPlainAction(section, payload);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [20.10.2019]
   * @param {string} section
   * @param {ISelectEntityPayloadEntity} payload
   * @returns {IEffectsAction}
   */
  public static buildSelectPlainAction(section: string, payload: ISelectEntityPayloadEntity): IEffectsAction {
    return {
      type: this.buildSelectActionType(section),
      data: applySection(section, payload),
    };
  }

  /**
   * @stable [20.01.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildCreatePlainAction(section: string): IEffectsAction {
    return {
      type: this.buildCreateActionType(section),
      data: applySection(section),
    };
  }
}
