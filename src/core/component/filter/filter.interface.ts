import { IFormEntity, IQueryFilterEntity } from '../../entities-definitions.interface';

export interface IApplicationFilterFormWrapperState {
  filterForm?: IFormEntity;
}

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
export const FILTER_ACTIVATE_ACTION_TYPE = 'filter.activate';
export const FILTER_CHANGE_ACTION_TYPE = 'filter.change';
export const FILTER_DESTROY_ACTION_TYPE = 'filter.destroy';
export const FILTER_APPLY_ACTION_TYPE = 'filter.apply';
