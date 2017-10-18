import { AnyT, ILockable, IStylizable, ITypeable } from '../../definition.interface';
import { IApplicationFormState } from '../../component/form';

export enum FilterActionEnum {
  OPEN_FILTER,
}

export interface IApplicationFilterAction extends IStylizable,
                                                  ITypeable<FilterActionEnum> {
}

export interface IApplicationFilterOptions {
  fieldActions?: IApplicationFilterAction[];
  searchIcon?: string;
  noQuery?: boolean;
}

export interface IApplicationFilterAttributes extends ILockable {
  activated?: boolean;
  query?: AnyT;
}

export interface IApplicationFilterState extends IApplicationFilterAttributes {
}

export interface IApplicationFilterWrapperState {
  filter: IApplicationFilterState;
}

export interface IApplicationFilterFormWrapperState {
  filterForm: IApplicationFormState;
}

export const INITIAL_APPLICATION_FILTER_STATE: IApplicationFilterState = {
  activated: false,
  query: '',
};

export const FILTER_OPEN_ACTION_TYPE = 'filter.open';
export const FILTER_ACTIVATE_ACTION_TYPE = 'filter.activate';
export const FILTER_QUERY_ACTION_TYPE = 'filter.query';
export const FILTER_DESTROY_ACTION_TYPE = 'filter.destroy';
export const FILTER_LOCK_ACTION_TYPE = 'filter.lock';
export const FILTER_APPLY_ACTION_TYPE = 'filter.apply';
