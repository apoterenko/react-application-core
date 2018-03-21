import { IStylizable } from '../../definition.interface';
import { IApplicationListStateWrapper } from '../../component/list';
import {
  IApplicationFilterFormWrapperState,
  IApplicationFilterOptions,
} from '../../component/filter';

export const disabledActionsListWrapperMapper =
    (state: IApplicationListStateWrapper): IApplicationFilterOptions => ({
      disabledActions: state.list.progress,
    });

export const activeClassNameFilterFormWrapperMapper =
    (state: IApplicationFilterFormWrapperState): IStylizable => ({
      className: state.filterForm.dirty && 'rac-filter-active',
    });
