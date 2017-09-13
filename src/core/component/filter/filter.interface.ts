import { AnyT } from 'core/definition.interface';

export interface IApplicationFilterAttributes {
  activated?: boolean;
  query?: AnyT;
}

export interface IApplicationFilterState extends IApplicationFilterAttributes {
}

export const INITIAL_APPLICATION_FILTER_STATE: IApplicationFilterState = {
  activated: false,
  query: '',
};

export const FILTER_ACTIVATE_ACTION_TYPE = 'filter.activate';
export const FILTER_QUERY_ACTION_TYPE = 'filter.query';
export const FILTER_SECTION = 'filter';
