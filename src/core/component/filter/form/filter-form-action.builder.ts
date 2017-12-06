import { FilterActionEnum } from '../filter.interface';
import { BuildListAndFilterFormWrapperStateT } from './filter-form-action.interface';
import { IApplicationFilterFormWrapperState } from '../../../component/filter';

export const buildActiveFilterFormActionConfig = (state: IApplicationFilterFormWrapperState) => ({
  type: FilterActionEnum.OPEN_FILTER,
  className: state.filterForm.dirty && 'rac-filter-active',
});

export const buildRefreshFilterFormOptions = (state: BuildListAndFilterFormWrapperStateT) => {
  const filterFormState = state as IApplicationFilterFormWrapperState;
  return {
    fieldActions: filterFormState.filterForm
        ? [buildActiveFilterFormActionConfig(filterFormState)]
        : [],
    noSearchField: true,
    disabledActions: state.list.progress,
    searchIcon: 'refresh',
  };
};
