import {
  EffectsAction,
  EffectsActionBuilder,
  IEffectsAction,
} from 'redux-effects-promise';

import {
  AnyT,
  EntityIdT,
  IDataWrapper,
  IEntity,
} from '../../definitions.interface';
import {
  IFluxModifyEntityPayloadEntity,
  IFluxPayloadEntityIdTWrapperEntity,
  IFluxSectionDataEntity,
  IFluxSelectedEntity,
  IReduxPagedEntity,
  ISelectedEntity,
  LIST_CANCEL_LOAD_ACTION_TYPE,
  LIST_CREATE_ACTION_TYPE,
  LIST_LAZY_LOAD_ACTION_TYPE,
  LIST_LAZY_LOAD_DONE_ACTION_TYPE,
  LIST_LAZY_LOAD_ERROR_ACTION_TYPE,
  LIST_LOAD_ACTION_TYPE,
  LIST_LOAD_DONE_ACTION_TYPE,
  LIST_LOAD_ERROR_ACTION_TYPE,
  LIST_MERGE_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
} from '../../definition';
import { SectionUtils } from '../../util';
import {
  LIST_DESELECT_ACTION_TYPE,
  LIST_DESTROY_ACTION_TYPE,
  LIST_FIRST_PAGE_ACTION_TYPE,
  LIST_INSERT_ACTION_TYPE,
  LIST_LAST_PAGE_ACTION_TYPE,
  LIST_NEXT_PAGE_ACTION_TYPE,
  LIST_PREVIOUS_PAGE_ACTION_TYPE,
  LIST_REMOVE_ACTION_TYPE,
  LIST_RESET_ACTION_TYPE,
  LIST_SORTING_DIRECTION_CHANGE_ACTION_TYPE,
  LIST_UN_TOUCH_ACTION_TYPE,
  LIST_UPDATE_ACTION_TYPE,
} from './list.interface';

export class ListActionBuilder {

  /**
   * @stable [13.11.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildSortingDirectionChangeActionType(section: string): string {
    return `${section}.${LIST_SORTING_DIRECTION_CHANGE_ACTION_TYPE}`;
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
    return `${SectionUtils.actionPrefix(section)}.${LIST_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [31.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildCancelLoadActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_CANCEL_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildLazyLoadActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_LAZY_LOAD_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildLazyLoadDoneActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_LAZY_LOAD_DONE_ACTION_TYPE}`;
  }

  /**
   * @stable [08.09.2020]
   * @param section
   */
  public static buildLazyLoadErrorActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_LAZY_LOAD_ERROR_ACTION_TYPE}`;
  }

  /**
   * @stable [15.04.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildUnTouchActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_UN_TOUCH_ACTION_TYPE}`;
  }

  /**
   * @stable [31.08.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildLoadDoneActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_LOAD_DONE_ACTION_TYPE}`;
  }

  /**
   * @stable [26.07.2020]
   * @param section
   */
  public static buildLoadErrorActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_LOAD_ERROR_ACTION_TYPE}`;
  }

  /**
   * @stable [07.12.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildSelectActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_SELECT_ACTION_TYPE}`;
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
    return `${SectionUtils.actionPrefix(section)}.${LIST_REMOVE_ACTION_TYPE}`;
  }

  public static buildUpdateActionType(section: string): string {
    return `${section}.${LIST_UPDATE_ACTION_TYPE}`;
  }

  /**
   * @stable [30.03.2020]
   * @param {string} section
   * @returns {string}
   */
  public static buildCreateActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_CREATE_ACTION_TYPE}`;
  }

  /**
   * @stable [26.10.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildDeselectActionType(section: string): string {
    return `${section}.${LIST_DESELECT_ACTION_TYPE}`;
  }

  /**
   * @stable [19.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildDestroyActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_DESTROY_ACTION_TYPE}`;
  }

  /**
   * @stable [19.03.2019]
   * @param {string} section
   * @returns {string}
   */
  public static buildResetActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_RESET_ACTION_TYPE}`;
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
   * @stable [15.04.2020]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildUnTouchAction(section: string): IEffectsAction {
    const plainAction = this.buildUnTouchPlainAction(section);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [03.06.2018]
   * @param {string} section
   * @param {ISelectedEntity} payload
   * @returns {IEffectsAction}
   */
  public static buildLazyLoadAction(section: string, payload: IFluxSelectedEntity): IEffectsAction {
    return EffectsAction.create(this.buildLazyLoadActionType(section), SectionUtils.applySection(section, payload));
  }

  /**
   * @stable [10.09.2020]
   * @param section
   */
  public static buildDeselectAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDeselectActionType(section), SectionUtils.applySection(section));
  }

  public static buildDeselectPlainAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDeselectActionType(section), SectionUtils.applySection(section));
  }

  /**
   * @stable [19.03.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildDestroyAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildDestroyActionType(section), SectionUtils.applySection(section));
  }

  /**
   * @stable [19.03.2019]
   * @param {string} section
   * @returns {IEffectsAction}
   */
  public static buildResetAction(section: string): IEffectsAction {
    return EffectsAction.create(this.buildResetActionType(section), SectionUtils.applySection(section));
  }

  /**
   * @stable [19.01.2020]
   * @param {string} section
   * @param {EntityIdT} id
   * @returns {IEffectsAction}
   */
  public static buildRemoveAction(section: string, id: EntityIdT): IEffectsAction {
    const plainAction = this.buildRemovePlainAction(section, id);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  public static buildUpdateAction(section: string, data?: IFluxModifyEntityPayloadEntity): IEffectsAction {
    return EffectsAction.create(this.buildUpdateActionType(section), SectionUtils.applySection(section, data));
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

  /**
   * @stable [11.12.2019]
   * @param section
   * @param data
   */
  public static buildLoadAction<TData = AnyT>(section: string, data?: TData): IEffectsAction {
    return EffectsAction.create(this.buildLoadActionType(section), SectionUtils.applySection(section, data));
  }

  /**
   * @stable [13.05.2019]
   * @param {string} section
   * @param {IDataWrapper<AnyT> & IReduxPagedEntity} data
   * @returns {IEffectsAction}
   */
  public static buildLoadDoneAction(section: string, data?: IDataWrapper<AnyT> & IReduxPagedEntity): IEffectsAction {
    return EffectsAction.create(this.buildLoadDoneActionType(section), SectionUtils.applySection(section, data));
  }

  public static buildNextPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildNextPageActionType(section), SectionUtils.applySection(section, data));
  }

  public static buildPreviousPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildPreviousPageActionType(section), SectionUtils.applySection(section, data));
  }

  public static buildFirstPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildFirstPageActionType(section), SectionUtils.applySection(section, data));
  }

  public static buildLastPageAction(section: string, data?: AnyT): IEffectsAction {
    return EffectsAction.create(this.buildLastPageActionType(section), SectionUtils.applySection(section, data));
  }

  /**
   * @stable [10.09.2020]
   * @param section
   */
  public static buildMergeActionType(section: string): string {
    return `${SectionUtils.actionPrefix(section)}.${LIST_MERGE_ACTION_TYPE}`;
  }

  /**
   * @stable [10.09.2020]
   * @param section
   * @param data
   */
  public static buildMergeAction(section: string, data?: IFluxModifyEntityPayloadEntity): IEffectsAction {
    const plainAction = this.buildMergePlainAction(section, data);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [10.09.2020]
   * @param section
   * @param payload
   */
  public static buildSelectAction(section: string, payload: IFluxSelectedEntity): IEffectsAction {
    const plainAction = this.buildSelectPlainAction(section, payload);
    return EffectsAction.create(plainAction.type, plainAction.data);
  }

  /**
   * @stable [10.09.2020]
   * @param section
   * @param id
   */
  public static buildRemovePlainAction(section: string, id: EntityIdT): IEffectsAction {
    return {
      type: this.buildRemoveActionType(section),
      data: SectionUtils.applySection<IFluxSectionDataEntity, IFluxPayloadEntityIdTWrapperEntity>(section, {payload: {id}}),
    };
  }

  /**
   * @stable [10.09.2020]
   * @param section
   */
  public static buildCancelLoadPlainAction(section: string): IEffectsAction {
    return {type: this.buildCancelLoadActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [10.09.2020]
   * @param section
   * @param data
   */
  public static buildSelectPlainAction(section: string, data: IFluxSelectedEntity): IEffectsAction {
    return {type: this.buildSelectActionType(section), data: SectionUtils.applySection(section, data)};
  }

  /**
   * @stable [10.09.2020]
   * @param section
   */
  public static buildCreatePlainAction(section: string): IEffectsAction {
    return {type: this.buildCreateActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [10.09.2020]
   * @param section
   */
  public static buildUnTouchPlainAction(section: string): IEffectsAction {
    return {type: this.buildUnTouchActionType(section), data: SectionUtils.applySection(section)};
  }

  /**
   * @stable [10.09.2020]
   * @param section
   * @param data
   */
  public static buildMergePlainAction(section: string, data?: IFluxModifyEntityPayloadEntity): IEffectsAction {
    return {type: this.buildMergeActionType(section), data: SectionUtils.applySection(section, data)};
  }
}
