import { IQueryFilterEntity } from '../../definition';

/**
 * @stable [18.05.2018]
 */
export const INITIAL_APPLICATION_FILTER_STATE: IQueryFilterEntity = {
  query: '',
};

/**
 * @stable [18.05.2018]
 */
export const FILTER_OPEN_ACTION_TYPE = 'filter.open';
export const FILTER_MANUAL_APPLY_ACTION_TYPE = 'filter.manual.apply';
export const FILTER_ACTIVATE_ACTION_TYPE = 'filter.activate';
export const FILTER_DEACTIVATE_ACTION_TYPE = 'filter.deactivate';
export const FILTER_CHANGE_ACTION_TYPE = 'filter.change';
export const FILTER_DESTROY_ACTION_TYPE = 'filter.destroy';
export const FILTER_APPLY_ACTION_TYPE = 'filter.apply';
export const FILTER_REFRESH_ACTION_TYPE = 'filter.refresh';
