import { EffectsActionBuilder } from 'redux-effects-promise';

import { IBaseContainerInternalProps, IBaseComponentInternalProps } from '../base';
import {
  DEFAULT_PAGE_SIZE,
  FIRST_PAGE,
} from '../../definitions.interface';
import { IListConfiguration, IListConfigurationWrapper } from '../../configurations-definitions.interface';
import { IListEntity, IListWrapperEntity } from '../../entities-definitions.interface';

/* @stable - 31.03.2018 */
export interface IListInternalProps extends IBaseComponentInternalProps,
                                            IListConfiguration,
                                            IListEntity {
}

/* @stable - 31.03.2018 */
export interface IListContainerInternalProps extends IBaseContainerInternalProps,
                                                     IListConfigurationWrapper,
                                                     IListWrapperEntity {
}

/* @stable - 31.03.2018 */
export type ListWrapperEntityResolverT <TApplicationState> = (state: TApplicationState) => IListWrapperEntity;

/* @stable - 31.03.2018 */
export const INITIAL_APPLICATION_LIST_STATE: IListEntity = {
  changes: {},
  directions: {},
  progress: false,
  touched: false,
  data: null,
  selected: null,
  page: FIRST_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  totalCount: 0,
};

export const LIST_LOAD_ACTION_TYPE = 'list.load';
export const LIST_LOAD_DONE_ACTION_TYPE = EffectsActionBuilder.buildDoneActionType(LIST_LOAD_ACTION_TYPE);
export const LIST_LOAD_ERROR_ACTION_TYPE = EffectsActionBuilder.buildErrorActionType(LIST_LOAD_ACTION_TYPE);
export const LIST_UN_TOUCH_ACTION_TYPE = 'list.untouch';
export const LIST_DESTROY_ACTION_TYPE = 'list.destroy';
export const LIST_SELECT_ACTION_TYPE = 'list.select';
export const LIST_SEARCH_ACTION_TYPE = 'list.search';
export const LIST_CREATE_ACTION_TYPE = 'list.create';
export const LIST_DESELECT_ACTION_TYPE = 'list.deselect';
export const LIST_UPDATE_ACTION_TYPE = 'list.update';
export const LIST_INSERT_ACTION_TYPE = 'list.insert';
export const LIST_CHANGE_ACTION_TYPE = 'list.change';
export const LIST_CHANGE_SORT_DIRECTION_ACTION_TYPE = 'list.change.sort.direction';
export const LIST_NEXT_PAGE_ACTION_TYPE = 'list.next.page';
export const LIST_PREVIOUS_PAGE_ACTION_TYPE = 'list.previous.page';
export const LIST_FIRST_PAGE_ACTION_TYPE = 'list.first.page';
export const LIST_LAST_PAGE_ACTION_TYPE = 'list.last.page';
