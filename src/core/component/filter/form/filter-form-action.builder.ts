import { FilterActionEnum } from '../filter.interface';
import { BuildListAndFilterFormWrapperStateT } from './filter-form-action.interface';
import {
  activeClassNameFilterFormWrapperMapper,
  disabledActionsListWrapperMapper,
  IApplicationFilterAction,
  IApplicationFilterFormWrapperState,
  IApplicationFilterOptions,
} from '../../../component/filter';

export const buildActiveFilterAction =
    (state: IApplicationFilterFormWrapperState): IApplicationFilterAction => ({
      type: FilterActionEnum.OPEN_FILTER,
      ...activeClassNameFilterFormWrapperMapper(state),
    });

export const buildRefreshFilterFormOptions =
    (state: BuildListAndFilterFormWrapperStateT): IApplicationFilterOptions => {
      const filterFormState = state as IApplicationFilterFormWrapperState;
      return {
        fieldActions: filterFormState.filterForm
            ? [buildActiveFilterAction(filterFormState)]
            : [],
        noSearchField: true,
        searchIcon: 'refresh',
        ...disabledActionsListWrapperMapper(state),
      };
    };
