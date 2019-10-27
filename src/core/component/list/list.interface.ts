import { EffectsActionBuilder } from 'redux-effects-promise';

import { IListConfigurationWrapperEntity } from '../../definition';
import { IKeyValue } from '../../definitions.interface';

export interface IListContainerProps extends IKeyValue,  // TODO
  IListConfigurationWrapperEntity {
}

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
export const LIST_SORTING_DIRECTION_CHANGE_ACTION_TYPE = 'list.sorting.direction.change';
export const LIST_NEXT_PAGE_ACTION_TYPE = 'list.next.page';
export const LIST_PREVIOUS_PAGE_ACTION_TYPE = 'list.previous.page';
export const LIST_FIRST_PAGE_ACTION_TYPE = 'list.first.page';
export const LIST_LAST_PAGE_ACTION_TYPE = 'list.last.page';
