import {
  FilterActionEnum,
  IApplicationFilterFormWrapperState,
} from '../filter.interface';

export const buildActiveFilterFormActionConfig = (state: IApplicationFilterFormWrapperState) => ({
  type: FilterActionEnum.OPEN_FILTER,
  className: state.filterForm.dirty && 'rac-filter-active',
});
