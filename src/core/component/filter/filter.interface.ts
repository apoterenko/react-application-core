import { AnyT, IActiveable, IStylizable, ITypeWrapper } from '../../definition.interface';
import { IApplicationFormState } from '../../component/form';
import { IFieldOptions } from '../../component/field';

export enum FilterActionEnum {
  OPEN_FILTER,
  CLEAR_FILTER,
}

export interface IApplicationFilterAction extends IStylizable,
                                                  ITypeWrapper<FilterActionEnum> {
}

export interface IApplicationFilterOptions {
  fieldActions?: IApplicationFilterAction[];
  disabledActions?: boolean;
  searchIcon?: string;
  noSearchField?: boolean;
  searchFieldOptions?: IFieldOptions;
}

export interface IApplicationFilterState extends IActiveable {
  query?: AnyT;
}

export interface IApplicationFilterWrapperState {
  filter: IApplicationFilterState;
}

export interface IApplicationFilterFormWrapperState {
  filterForm: IApplicationFormState;
}

export const INITIAL_APPLICATION_FILTER_STATE: IApplicationFilterState = {
  query: '',
};

export const FILTER_OPEN_ACTION_TYPE = 'filter.open';
export const FILTER_ACTIVATE_ACTION_TYPE = 'filter.activate';
export const FILTER_CHANGE_ACTION_TYPE = 'filter.change';
export const FILTER_DESTROY_ACTION_TYPE = 'filter.destroy';
export const FILTER_APPLY_ACTION_TYPE = 'filter.apply';
