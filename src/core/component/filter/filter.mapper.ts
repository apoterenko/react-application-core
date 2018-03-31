import { INotUseClassNameWrapper, IClassNameWrapper } from '../../definitions.interface';
import {
  IApplicationFilterFormWrapperState,
  IApplicationFilterOptions,
} from '../../component/filter';
import { IListWrapperEntity } from '../../entities-definitions.interface';

export const disabledActionsListWrapperMapper =
    (state: IListWrapperEntity): IApplicationFilterOptions => ({
      disabledActions: state.list.progress,
    });

export const activeClassNameFilterFormWrapperMapper =
    (state: IApplicationFilterFormWrapperState): INotUseClassNameWrapper & IClassNameWrapper => ({
      className: state.filterForm.dirty && 'rac-filter-active',
    });
