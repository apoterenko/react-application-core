import { EffectsActionBuilder } from 'redux-effects-promise';

import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
} from '../../definitions.interface';
import { IListConfigurationWrapper } from '../../configurations-definitions.interface';
import { IListWrapperEntity, IListEntity } from '../../entities-definitions.interface';
import { IUniversalContainerProps } from '../../definition';

/**
 * @stable [05.06.2018]
 */
export interface IUniversalListContainerProps extends IUniversalContainerProps,
                                                      IListWrapperEntity {
}

/**
 * @stable [05.05.2018]
 */
export interface IListContainerProps extends IUniversalListContainerProps,
                                             IListConfigurationWrapper {
}

/**
 * @stable [05.05.2018]
 */
export interface IRnListContainerProps extends IUniversalContainerProps,
                                               IListWrapperEntity,
                                               IListConfigurationWrapper {
}

/**
 * @stable [05.04.2018]
 */
export const INITIAL_APPLICATION_LIST_STATE: IListEntity = {
  changes: {},
  directions: {},
  progress: false,
  touched: false,
  lockPage: false,
  data: null,
  rawData: null,
  selected: null,
  page: FIRST_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  totalCount: 0,
};

export const LIST_LOAD_ACTION_TYPE = 'list.load';
export const LIST_CANCEL_LOAD_ACTION_TYPE = 'list.cancel.load';
export const LIST_LAZY_LOAD_ACTION_TYPE = 'list.lazy.load';
export const LIST_LOAD_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(LIST_LOAD_ACTION_TYPE);
export const LIST_LOAD_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(LIST_LOAD_ACTION_TYPE);
export const LIST_LAZY_LOAD_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(LIST_LAZY_LOAD_ACTION_TYPE);
export const LIST_LAZY_LOAD_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(LIST_LAZY_LOAD_ACTION_TYPE);
export const LIST_UN_TOUCH_ACTION_TYPE = 'list.untouch';
export const LIST_DESTROY_ACTION_TYPE = 'list.destroy';
export const LIST_RESET_ACTION_TYPE = 'list.reset';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
export const LIST_CREATE_ACTION_TYPE = 'list.create';
export const LIST_DESELECT_ACTION_TYPE = 'list.deselect';
export const LIST_UPDATE_ACTION_TYPE = 'list.update';
export const LIST_MERGE_ACTION_TYPE = 'list.merge';
export const LIST_INSERT_ACTION_TYPE = 'list.insert';
export const LIST_REMOVE_ACTION_TYPE = 'list.remove';
export const LIST_CHANGE_ACTION_TYPE = 'list.change';
export const LIST_CHANGE_SORT_DIRECTION_ACTION_TYPE = 'list.change.sort.direction';
export const LIST_NEXT_PAGE_ACTION_TYPE = 'list.next.page';
export const LIST_PREVIOUS_PAGE_ACTION_TYPE = 'list.previous.page';
export const LIST_FIRST_PAGE_ACTION_TYPE = 'list.first.page';
export const LIST_LAST_PAGE_ACTION_TYPE = 'list.last.page';
