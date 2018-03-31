import {
  IActiveWrapper,
  INotUseClassNameWrapper,
  ITypeWrapper,
  IFilterWrapper,
  IStringQueryWrapper,
  IClassNameWrapper,
} from '../../definitions.interface';
import { IFieldOptions } from '../field';
import { IDefaultFormEntity } from '../../entities-definitions.interface';

/* @stable - 31.03.2018 */
export enum FilterActionEnum {
  OPEN_FILTER,
  CLEAR_FILTER,
}

/* @stable - 31.03.2018 */
export interface IFilterActionEntity extends INotUseClassNameWrapper,
                                             IClassNameWrapper,
                                             ITypeWrapper<FilterActionEnum> {
}

export interface IApplicationFilterOptions {
  fieldActions?: IFilterActionEntity[];
  disabledActions?: boolean;
  searchIcon?: string;
  noSearchField?: boolean;
  searchFieldOptions?: IFieldOptions;
}

export interface IApplicationFilterState extends IActiveWrapper,
                                                 IStringQueryWrapper {
}

// @deprecated
export interface IApplicationFilterWrapperState extends IFilterWrapper<IApplicationFilterState> {
}

export interface IApplicationFilterFormWrapperState {
  filterForm: IDefaultFormEntity;
}

export const INITIAL_APPLICATION_FILTER_STATE: IApplicationFilterState = {
  query: '',
};

export const FILTER_OPEN_ACTION_TYPE = 'filter.open';
export const FILTER_ACTIVATE_ACTION_TYPE = 'filter.activate';
export const FILTER_CHANGE_ACTION_TYPE = 'filter.change';
export const FILTER_DESTROY_ACTION_TYPE = 'filter.destroy';
export const FILTER_APPLY_ACTION_TYPE = 'filter.apply';
