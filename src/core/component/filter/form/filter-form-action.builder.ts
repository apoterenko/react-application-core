import { BuildListAndFilterFormWrapperStateT } from './filter-form-action.interface';
import {
  activeClassNameFilterFormWrapperMapper,
  actionsDisabledListWrapperMapper,
  IApplicationFilterFormWrapperState,
} from '../../../component/filter';
import { IFilterActionConfiguration, FilterActionEnum, IFilterConfiguration } from '../../../configurations-definitions.interface';

export const buildActiveFilterAction =
    (state: IApplicationFilterFormWrapperState): IFilterActionConfiguration => ({
      type: FilterActionEnum.OPEN_FILTER,
      ...activeClassNameFilterFormWrapperMapper(state),
    });

export const buildRefreshFilterFormOptions =
    (state: BuildListAndFilterFormWrapperStateT): IFilterConfiguration => {
      const filterFormState = state as IApplicationFilterFormWrapperState;
      return {
        actions: filterFormState.filterForm
            ? [buildActiveFilterAction(filterFormState)]
            : [],
        notUseField: true,
        icon: 'refresh',
        ...actionsDisabledListWrapperMapper(state),
      };
    };
